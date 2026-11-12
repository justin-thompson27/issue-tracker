// Module 5 Team Sprint — instructor-provided tests for the two protected endpoints.
//
// You run this file; you do not write it. Copy it into the shared repo's
// tests/ folder, never edit it, and fix YOUR code until it passes:
//
//   npx vitest run tests/sprint5.test.ts
//
// It is split by who owns what:
//   - "Partner A" tests   -> PATCH  /issues/:id/fixed                      (the Developer endpoint)
//   - "Partner B" tests   -> DELETE /issues/:id/test-cases/:testCaseId     (the Quality Analyst endpoint)
//   - "Team" tests        -> only pass once BOTH Pull Requests are merged into one working branch
//
// On your own branch you will see the OTHER partner's tests fail. That is
// expected: their code is not on your branch yet. Only your own half has to
// pass before you open your Pull Request. After the merge, every test passes.
//
// It assumes the same things your Module 5 labs already set up:
//   - src/app.ts exports a configured Express `app` (no listen(), no database)
//   - src/db.ts exports getIssuesCollection(), which your controllers use
//   - src/permissions.ts exports `statement` and `roles` (Lab 05-03)
//   - requireAuth is mounted on /issues and fills in req.user (Lab 05-02)
//
// Nothing here touches a real MongoDB or a real sign-in. The database is an
// in-memory fake, and the signed-in person is chosen by each test (the same
// idea as Study Guide 8.5).
//
// What these tests do NOT check: your git history, your Pull Requests, your
// reviews, and the Postman proof. Your grader reads those.

import { describe, it, expect, vi, beforeEach } from "vitest";
import request from "supertest";
import { ObjectId } from "mongodb";

// A minimal in-memory stand-in for a MongoDB Collection<Issue> — just
// enough of find/aggregate/insertOne/findOne/findOneAndUpdate to support what
// issuesController.ts calls, including $set, $push, $pull, and the
// arrayFilters form $set uses for Day 28's setTestCaseResult.
class FakeCollection {
  docs: any[] = [];

  // The real MongoDB driver's find() returns a cursor whose sort/skip/limit
  // MUTATE that same cursor and return `this` for chaining — they don't
  // hand back a new cursor each call. listIssues (Days 29-30) relies on
  // exactly that: it calls cursor.skip(skip).limit(limit) as a bare
  // statement, without reassigning the result, then calls cursor.toArray()
  // on the original reference. An immutable/copy-on-write fake cursor would
  // silently drop the skip/limit here, so this one mutates in place too.
  find(filter: Record<string, unknown> = {}) {
    const results = this.docs.filter((doc) => matches(doc, filter));
    const cursor = {
      _results: results,
      sort(spec: Record<string, 1 | -1>) {
        const [field, dir] = Object.entries(spec)[0] as [string, 1 | -1];
        cursor._results = [...cursor._results].sort((a, b) => {
          if (a[field] < b[field]) return -1 * dir;
          if (a[field] > b[field]) return 1 * dir;
          return 0;
        });
        return cursor;
      },
      skip(n: number) {
        cursor._results = cursor._results.slice(n);
        return cursor;
      },
      limit(n: number) {
        cursor._results = cursor._results.slice(0, n);
        return cursor;
      },
      toArray: async () => cursor._results,
    };
    return cursor;
  }

  // Atlas Search needs a real Atlas cluster and a search index, so it can't
  // run in memory. This stand-in understands only the pipeline listIssues
  // builds when q is present — $search, then $match, $sort, $skip, $limit —
  // and treats $search as a case-insensitive whole-word match on the listed
  // fields. It proves your q branch is wired up and paginated; it can't prove
  // your Atlas Search index exists, so still try ?q= against your real
  // cluster (Lab 04-04, Day 29 step 3).
  aggregate(pipeline: Record<string, any>[]) {
    let results = [...this.docs];
    for (const stage of pipeline) {
      if (stage.$search) {
        const { query, path } = stage.$search.text;
        const wanted = String(query).toLowerCase().split(/\W+/).filter(Boolean);
        const fields: string[] = Array.isArray(path) ? path : [path];
        results = results.filter((doc) => {
          const words = fields.flatMap((f) =>
            String(doc[f] ?? "").toLowerCase().split(/\W+/),
          );
          return wanted.some((w) => words.includes(w));
        });
      } else if (stage.$match) {
        results = results.filter((doc) => matches(doc, stage.$match));
      } else if (stage.$sort) {
        const [field, dir] = Object.entries(stage.$sort)[0] as [string, 1 | -1];
        results.sort((a, b) =>
          a[field] < b[field] ? -1 * dir : a[field] > b[field] ? 1 * dir : 0,
        );
      } else if (stage.$skip !== undefined) {
        results = results.slice(stage.$skip);
      } else if (stage.$limit !== undefined) {
        results = results.slice(0, stage.$limit);
      } else {
        throw new Error(
          `This test file's fake aggregate() doesn't support ${Object.keys(stage)[0]}`,
        );
      }
    }
    return { toArray: async () => results };
  }

  // Like the real driver, insertOne() adds a generated _id to the very object
  // you hand it (MongoDB's driver mutates it), so a controller that responds
  // with that object, or with { ...thatObject, _id: result.insertedId },
  // behaves the same here as against a real database.
  async insertOne(doc: any) {
    doc._id ??= new ObjectId();
    this.docs.push({ ...doc });
    return { acknowledged: true, insertedId: doc._id };
  }

  async findOne(filter: Record<string, unknown>) {
    return this.docs.find((doc) => matches(doc, filter)) ?? null;
  }

  async updateOne(filter: Record<string, unknown>, update: Record<string, any>) {
    const doc = this.docs.find((d) => matches(d, filter));
    if (!doc) return { acknowledged: true, matchedCount: 0, modifiedCount: 0 };
    for (const [key, value] of Object.entries(update.$set ?? {})) {
      applySet(doc, key, value);
    }
    return { acknowledged: true, matchedCount: 1, modifiedCount: 1 };
  }

  async findOneAndUpdate(
    filter: Record<string, unknown>,
    update: Record<string, any>,
    _options?: { arrayFilters?: any[]; returnDocument?: "after" },
  ) {
    const doc = this.docs.find((d) => matches(d, filter));
    if (!doc) return null;

    if (update.$set) {
      for (const [key, value] of Object.entries(update.$set)) {
        applySet(doc, key, value, _options?.arrayFilters);
      }
    }
    if (update.$push) {
      for (const [key, value] of Object.entries(update.$push)) {
        (doc[key] ??= []).push(value);
      }
    }
    if (update.$pull) {
      for (const [key, condition] of Object.entries(update.$pull)) {
        doc[key] = (doc[key] ?? []).filter(
          (item: any) => !matches(item, condition as Record<string, unknown>),
        );
      }
    }
    return doc;
  }
}

function matches(doc: any, filter: Record<string, unknown>): boolean {
  return Object.entries(filter).every(([key, value]) => {
    if (key === "_id") return String(doc._id) === String(value);
    return getPath(doc, key) === value;
  });
}

function getPath(obj: any, path: string) {
  return path.split(".").reduce((acc, part) => acc?.[part], obj);
}

// Supports the one dotted, arrayFilters-qualified path this app uses:
// "testCases.$[tc].passed" together with arrayFilters: [{ "tc._id": id }].
function applySet(doc: any, key: string, value: unknown, arrayFilters?: any[]) {
  const match = key.match(/^(\w+)\.\$\[(\w+)\]\.(\w+)$/);
  if (match && arrayFilters) {
    const [, arrayField, filterName, targetField] = match;
    const filterCondition = arrayFilters.find((f) => filterName + "._id" in f);
    const targetId = filterCondition?.[`${filterName}._id`];
    for (const item of doc[arrayField] ?? []) {
      if (String(item._id) === String(targetId)) {
        item[targetField] = value;
      }
    }
    return;
  }
  doc[key] = value;
}


const fakeIssues = new FakeCollection();

vi.mock("../src/db.js", () => ({
  getIssuesCollection: () => fakeIssues,
  getDb: vi.fn(),
}));

// ---------------------------------------------------------------------------
// The pretend sign-in. Each test says who is signed in and what role they have.
// The fake permission check answers from the class permission chart below,
// so these tests do not depend on how YOU wrote your roles (Partner A and Partner B check that).
// ---------------------------------------------------------------------------
const getSession = vi.fn();
const userHasPermission = vi.fn();

vi.mock("../src/auth.js", () => ({
  auth: {
    handler: vi.fn(),
    api: { getSession, userHasPermission, setRole: vi.fn() },
  },
}));

// The class chart, plus the two new permissions for this sprint.
const CHART: Record<string, string[]> = {
  developer: ["issue:create", "issue:markFixed", "comment:create", "timeLog:create"],
  businessAnalyst: ["issue:create", "issue:classify", "issue:close", "issue:assign", "comment:create"],
  qualityAnalyst: ["issue:create", "comment:create", "testCase:create", "testCase:setResult", "testCase:delete"],
  productManager: ["issue:create", "issue:assign", "comment:create"],
  technicalManager: ["issue:create", "issue:assign", "issue:delete", "comment:create", "comment:deleteAny", "user:set-role"],
  user: [], // someone who signed up and has no role yet
};

let currentRole = "user";

userHasPermission.mockImplementation(async ({ body }: { body: { permissions: Record<string, string[]> } }) => ({
  success: Object.entries(body.permissions).every(([resource, actions]) =>
    actions.every((action) => (CHART[currentRole] ?? []).includes(`${resource}:${action}`)),
  ),
}));

function signInAs(role: string, person: { userId: string; fullName: string }) {
  currentRole = role;
  getSession.mockResolvedValue({ user: { id: person.userId, name: person.fullName, role } });
}
function signedOut() {
  currentRole = "user";
  getSession.mockResolvedValue(null);
}

// The app is imported AFTER the mocks above (see Study Guide 8.5).
const { app } = await import("../src/app.js");
const { roles, statement } = await import("../src/permissions.js");


// ---------------------------------------------------------------------------
// The cast
// ---------------------------------------------------------------------------
const EVE = { userId: "u-eve", fullName: "Eve Dev" }; // Developer, the assignee in the Partner A tests
const NATE = { userId: "u-nate", fullName: "Nate Dev" }; // another Developer, NOT the assignee
const QUINN = { userId: "u-quinn", fullName: "Quinn QA" }; // Quality Analyst, the assignee in the Partner B tests
const RIO = { userId: "u-rio", fullName: "Rio QA" }; // another Quality Analyst, NOT the assignee
const BO = { userId: "u-bo", fullName: "Bo Analyst" }; // Business Analyst, author of the issues
const TIA = { userId: "u-tia", fullName: "Tia Manager" }; // Technical Manager
const PAT = { userId: "u-pat", fullName: "Pat Product" }; // Product Manager
const ZED = { userId: "u-zed", fullName: "Zed Newcomer" }; // signed up, no role yet

function seedIssue(overrides: Record<string, unknown> = {}) {
  const _id = new ObjectId();
  fakeIssues.docs.push({
    _id,
    title: "Search box ignores Enter",
    description: "Pressing Enter in the search box does nothing",
    stepsToReproduce: "1. Click the search box 2. Type a word 3. Press Enter",
    priority: "medium",
    status: "in-progress",
    classification: "approved",
    author: BO,
    assignedTo: EVE,
    createdOn: new Date("2026-10-01T10:00:00.000Z"),
    comments: [{ _id: "c1", userId: "u-bo", fullName: "Bo Analyst", comment: "Looks real", createdOn: new Date("2026-10-02T10:00:00.000Z") }],
    testCases: [
      { _id: "t1", userId: "u-quinn", passed: false, createdOn: new Date("2026-10-03T10:00:00.000Z") },
      { _id: "t2", userId: "u-quinn", passed: true, createdOn: new Date("2026-10-03T11:00:00.000Z") },
    ],
    timeLog: [{ userId: "u-eve", hoursWorked: 2, loggedOn: new Date("2026-10-03T12:00:00.000Z") }],
    ...overrides,
  });
  return String(_id);
}

const markFixed = (id: string, body: unknown = { fixedOnVersion: "1.4.2" }) =>
  request(app).patch(`/issues/${id}/fixed`).send(body as object);

const deleteTestCase = (id: string, testCaseId = "t1") =>
  request(app).delete(`/issues/${id}/test-cases/${testCaseId}`);

const stored = (id: string) => fakeIssues.docs.find((d) => String(d._id) === id);
const snapshot = (id: string) => structuredClone(stored(id));

beforeEach(() => {
  fakeIssues.docs = [];
  signedOut();
});

const allowed = (role: string, resource: string, action: string): boolean => {
  try {
    return (roles as any)[role].authorize({ [resource]: [action] }).success === true;
  } catch {
    return false;
  }
};

// ===========================================================================
describe("Partner A — PATCH /issues/:id/fixed (Developer who is the assignee)", () => {
  it("Partner A: the issue resource lists a markFixed action", () => {
    expect((statement as any).issue).toContain("markFixed");
  });

  it("Partner A: only the Developer role is allowed issue:markFixed", () => {
    expect(allowed("developer", "issue", "markFixed")).toBe(true);
    expect(allowed("businessAnalyst", "issue", "markFixed")).toBe(false);
    expect(allowed("qualityAnalyst", "issue", "markFixed")).toBe(false);
    expect(allowed("productManager", "issue", "markFixed")).toBe(false);
    expect(allowed("technicalManager", "issue", "markFixed")).toBe(false);
  });

  it("Partner A: signed out gets 401 and nothing changes", async () => {
    const id = seedIssue();
    const before = snapshot(id);
    const res = await markFixed(id);
    expect(res.status).toBe(401);
    expect(stored(id)).toEqual(before);
  });

  it.each([
    ["businessAnalyst", BO],
    ["qualityAnalyst", QUINN],
    ["productManager", PAT],
    ["technicalManager", TIA],
    ["user", ZED],
  ])("Partner A: a %s gets 403 (wrong role) and nothing changes", async (role, person) => {
    const id = seedIssue();
    const before = snapshot(id);
    signInAs(role, person);
    const res = await markFixed(id);
    expect(res.status).toBe(403);
    expect(stored(id)).toEqual(before);
  });

  it("Partner A: a Developer who is NOT the assignee gets 403 (right role, wrong person)", async () => {
    const id = seedIssue();
    const before = snapshot(id);
    signInAs("developer", NATE);
    const res = await markFixed(id);
    expect(res.status).toBe(403);
    expect(stored(id)).toEqual(before);
  });

  it("Partner A: the wrong role is refused even when that person IS the assignee", async () => {
    const id = seedIssue({ assignedTo: QUINN });
    const before = snapshot(id);
    signInAs("qualityAnalyst", QUINN);
    const res = await markFixed(id);
    expect(res.status).toBe(403);
    expect(stored(id)).toEqual(before);
  });

  it("Partner A: the assignee Developer gets 200 and the issue records who fixed it, in which version, and when", async () => {
    const id = seedIssue();
    signInAs("developer", EVE);
    const res = await markFixed(id, { fixedOnVersion: "1.4.2" });
    expect(res.status).toBe(200);
    const fixed = res.body.fixed;
    expect(fixed.fixedBy).toEqual(EVE);
    // Lab 03-02 spells it fixedOnVersion; an older copy of the interface spelled it fixedonVersion. Either is accepted.
    expect(fixed.fixedOnVersion ?? fixed.fixedonVersion).toBe("1.4.2");
    expect(new Date(fixed.fixedOnDate).getTime()).toBeGreaterThan(Date.now() - 60_000);
    expect(stored(id)?.fixed.fixedBy).toEqual(EVE);
  });

  it("Partner A: it stamps updatedBy and updatedAt like the other endpoints do", async () => {
    const id = seedIssue();
    signInAs("developer", EVE);
    await markFixed(id);
    expect(stored(id)?.updatedBy).toEqual(EVE);
    expect(new Date(stored(id)?.updatedAt).getTime()).toBeGreaterThan(Date.now() - 60_000);
  });

  it("Partner A: it changes only the fixed information, not the status or anything else", async () => {
    const id = seedIssue();
    const before = snapshot(id);
    signInAs("developer", EVE);
    await markFixed(id);
    const after = stored(id);
    for (const key of ["title", "description", "status", "priority", "classification", "author", "assignedTo", "comments", "testCases", "timeLog"]) {
      expect(after[key]).toEqual(before[key]);
    }
  });

  it("Partner A: the person's name and id come from the signed-in user, never from the request body", async () => {
    const id = seedIssue();
    signInAs("developer", EVE);
    await markFixed(id, { fixedOnVersion: "2.0.0", fixedBy: { userId: "hacker", fullName: "Mallory" }, status: "closed" });
    expect(JSON.stringify(stored(id))).not.toContain("Mallory");
    expect(stored(id)?.status).toBe("in-progress");
    expect(stored(id)?.fixed.fixedBy).toEqual(EVE);
  });

  it.each([
    ["missing", {}],
    ["empty", { fixedOnVersion: "" }],
    ["not a version", { fixedOnVersion: "fixed it" }],
    ["only two parts", { fixedOnVersion: "1.4" }],
    ["a leading v", { fixedOnVersion: "v1.4.2" }],
    ["a number, not a string", { fixedOnVersion: 142 }],
  ])("Partner A: a bad fixedOnVersion (%s) gets 400 ValidationFailed and nothing changes", async (_label, body) => {
    const id = seedIssue();
    const before = snapshot(id);
    signInAs("developer", EVE);
    const res = await markFixed(id, body);
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("ValidationFailed");
    expect(stored(id)).toEqual(before);
  });

  it("Partner A: the checks run in order — someone who may not do it gets 403 even with a bad body", async () => {
    const id = seedIssue();
    signInAs("developer", NATE);
    const res = await markFixed(id, { fixedOnVersion: "nope" });
    expect(res.status).toBe(403);
  });

  it("Partner A: an issue id that does not exist gets 404", async () => {
    signInAs("developer", EVE);
    const res = await markFixed(String(new ObjectId()));
    expect(res.status).toBe(404);
  });

  it("Partner A: an id that is not a valid id gets 400", async () => {
    signInAs("developer", EVE);
    const res = await markFixed("not-an-id");
    expect(res.status).toBe(400);
  });
});

// ===========================================================================
describe("Partner B — DELETE /issues/:id/test-cases/:testCaseId (Quality Analyst who is the assignee)", () => {
  it("Partner B: the testCase resource lists a delete action", () => {
    expect((statement as any).testCase).toContain("delete");
  });

  it("Partner B: only the Quality Analyst role is allowed testCase:delete", () => {
    expect(allowed("qualityAnalyst", "testCase", "delete")).toBe(true);
    expect(allowed("developer", "testCase", "delete")).toBe(false);
    expect(allowed("businessAnalyst", "testCase", "delete")).toBe(false);
    expect(allowed("productManager", "testCase", "delete")).toBe(false);
    expect(allowed("technicalManager", "testCase", "delete")).toBe(false);
  });

  it("Partner B: signed out gets 401 and nothing changes", async () => {
    const id = seedIssue({ assignedTo: QUINN });
    const before = snapshot(id);
    const res = await deleteTestCase(id);
    expect(res.status).toBe(401);
    expect(stored(id)).toEqual(before);
  });

  it.each([
    ["developer", EVE],
    ["businessAnalyst", BO],
    ["productManager", PAT],
    ["technicalManager", TIA],
    ["user", ZED],
  ])("Partner B: a %s gets 403 (wrong role) and nothing changes", async (role, person) => {
    const id = seedIssue({ assignedTo: QUINN });
    const before = snapshot(id);
    signInAs(role, person);
    const res = await deleteTestCase(id);
    expect(res.status).toBe(403);
    expect(stored(id)).toEqual(before);
  });

  it("Partner B: a Quality Analyst who is NOT the assignee gets 403 (right role, wrong person)", async () => {
    const id = seedIssue({ assignedTo: QUINN });
    const before = snapshot(id);
    signInAs("qualityAnalyst", RIO);
    const res = await deleteTestCase(id);
    expect(res.status).toBe(403);
    expect(stored(id)).toEqual(before);
  });

  it("Partner B: the wrong role is refused even when that person IS the assignee", async () => {
    const id = seedIssue({ assignedTo: EVE });
    const before = snapshot(id);
    signInAs("developer", EVE);
    const res = await deleteTestCase(id);
    expect(res.status).toBe(403);
    expect(stored(id)).toEqual(before);
  });

  it("Partner B: the assignee Quality Analyst gets 200 and that one test case is gone", async () => {
    const id = seedIssue({ assignedTo: QUINN });
    signInAs("qualityAnalyst", QUINN);
    const res = await deleteTestCase(id, "t1");
    expect(res.status).toBe(200);
    expect(res.body.testCases.map((t: any) => t._id)).toEqual(["t2"]);
    expect(stored(id)?.testCases.map((t: any) => t._id)).toEqual(["t2"]);
  });

  it("Partner B: it removes only the test case named in the URL and leaves the rest of the issue alone", async () => {
    const id = seedIssue({ assignedTo: QUINN });
    const before = snapshot(id);
    signInAs("qualityAnalyst", QUINN);
    await deleteTestCase(id, "t2");
    const after = stored(id);
    expect(after.testCases).toEqual([before.testCases[0]]);
    for (const key of ["title", "status", "priority", "author", "assignedTo", "comments", "timeLog"]) {
      expect(after[key]).toEqual(before[key]);
    }
  });

  it("Partner B: it stamps updatedBy and updatedAt like the other endpoints do", async () => {
    const id = seedIssue({ assignedTo: QUINN });
    signInAs("qualityAnalyst", QUINN);
    await deleteTestCase(id);
    expect(stored(id)?.updatedBy).toEqual(QUINN);
    expect(new Date(stored(id)?.updatedAt).getTime()).toBeGreaterThan(Date.now() - 60_000);
  });

  it("Partner B: a test case id that is not on this issue gets 404 and nothing changes", async () => {
    const id = seedIssue({ assignedTo: QUINN });
    const before = snapshot(id);
    signInAs("qualityAnalyst", QUINN);
    const res = await deleteTestCase(id, "t99");
    expect(res.status).toBe(404);
    expect(stored(id)).toEqual(before);
  });

  it("Partner B: a test case on a different issue is not touched", async () => {
    const mine = seedIssue({ assignedTo: QUINN });
    const other = seedIssue({ assignedTo: QUINN });
    const otherBefore = snapshot(other);
    signInAs("qualityAnalyst", QUINN);
    await deleteTestCase(mine, "t1");
    expect(stored(other)).toEqual(otherBefore);
  });

  it("Partner B: an issue id that does not exist gets 404", async () => {
    signInAs("qualityAnalyst", QUINN);
    const res = await deleteTestCase(String(new ObjectId()));
    expect(res.status).toBe(404);
  });

  it("Partner B: an id that is not a valid id gets 400", async () => {
    signInAs("qualityAnalyst", QUINN);
    const res = await deleteTestCase("not-an-id");
    expect(res.status).toBe(400);
  });
});

// ===========================================================================
describe("Team — both endpoints together on one branch", () => {
  it("Team: both new routes exist (neither Pull Request dropped the other's route)", async () => {
    const id = seedIssue({ assignedTo: QUINN });
    signInAs("qualityAnalyst", QUINN);
    expect((await deleteTestCase(id, "t1")).status).toBe(200);
    // A route that does not exist at all would answer 404 with no JSON error from our code; ours says "Issue not found".
    signInAs("developer", EVE);
    const res = await markFixed(seedIssue());
    expect(res.status).toBe(200);
  });

  it("Team: both permissions are in the one shared permissions file", () => {
    expect((statement as any).issue).toContain("markFixed");
    expect((statement as any).testCase).toContain("delete");
    expect(allowed("developer", "issue", "markFixed")).toBe(true);
    expect(allowed("qualityAnalyst", "testCase", "delete")).toBe(true);
  });

  it("Team: the permissions the roles already had are untouched", () => {
    expect(allowed("developer", "issue", "create")).toBe(true);
    expect(allowed("developer", "timeLog", "create")).toBe(true);
    expect(allowed("businessAnalyst", "issue", "close")).toBe(true);
    expect(allowed("businessAnalyst", "issue", "classify")).toBe(true);
    expect(allowed("qualityAnalyst", "testCase", "create")).toBe(true);
    expect(allowed("qualityAnalyst", "testCase", "setResult")).toBe(true);
    expect(allowed("productManager", "issue", "assign")).toBe(true);
    expect(allowed("technicalManager", "issue", "delete")).toBe(true);
    expect(allowed("technicalManager", "comment", "deleteAny")).toBe(true);
    expect(allowed("developer", "issue", "delete")).toBe(false);
  });

  it("Team: the older test-case endpoints still work next to the new one", async () => {
    const id = seedIssue({ assignedTo: QUINN, testCases: [] });
    signInAs("qualityAnalyst", QUINN);
    const added = await request(app).post(`/issues/${id}/test-cases`).send({});
    expect(added.status).toBe(201);
    const newId = added.body.testCases[0]._id;
    const flipped = await request(app).patch(`/issues/${id}/test-cases/${newId}`).send({ passed: true });
    expect(flipped.status).toBe(200);
    expect(flipped.body.testCases[0].passed).toBe(true);
    const removed = await deleteTestCase(id, newId);
    expect(removed.status).toBe(200);
    expect(removed.body.testCases).toEqual([]);
  });

  it("Team: a request fails in the right order on both endpoints — 401, then 403 for the role, then 403 for the person, then success", async () => {
    const fixedId = seedIssue(); // assigned to Eve
    const qaId = seedIssue({ assignedTo: QUINN });
    const ladder: Array<[string, () => Promise<{ status: number }>, number]> = [];

    signedOut();
    ladder.push(["fixed, signed out", () => markFixed(fixedId), 401]);
    ladder.push(["delete, signed out", () => deleteTestCase(qaId), 401]);
    for (const [label, fn, want] of ladder) expect([label, (await fn()).status]).toEqual([label, want]);

    signInAs("qualityAnalyst", QUINN);
    expect((await markFixed(fixedId)).status).toBe(403); // wrong role for fixed
    signInAs("developer", EVE);
    expect((await deleteTestCase(qaId)).status).toBe(403); // wrong role for delete

    signInAs("developer", NATE);
    expect((await markFixed(fixedId)).status).toBe(403); // right role, not the assignee
    signInAs("qualityAnalyst", RIO);
    expect((await deleteTestCase(qaId)).status).toBe(403); // right role, not the assignee

    signInAs("developer", EVE);
    expect((await markFixed(fixedId)).status).toBe(200);
    signInAs("qualityAnalyst", QUINN);
    expect((await deleteTestCase(qaId)).status).toBe(200);
  });
});
