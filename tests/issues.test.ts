// Day 31 — instructor-provided automated tests for the Issue Tracker.
//
// You run this file; you do not write it. It assumes only one thing about
// your repo: that src/app.ts exports a fully-configured Express `app` with
// no app.listen() and no database connection (the same split the Instructor
// Demo Project uses for its own tests) and that src/db.ts exports a
// getIssuesCollection() function your controllers call for every request.
// If your db access is structured differently, talk to your instructor —
// the assumption is stated here on purpose, not hidden.
//
// Every test below maps to something a Module 4 lab (04-01 through 04-04)
// tells you to build, so a red test means a lab requirement isn't met yet.
// Fix YOUR code, never this file.
//
// This suite never touches a real MongoDB. It replaces getIssuesCollection()
// with an in-memory fake that supports the handful of operations the
// Issue Tracker's controllers actually call, so every test runs in
// milliseconds and never depends on network access or a running database.

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

const { app } = await import("../src/app.js");

describe("Issue Tracker — cross-section smoke tests (Days 24-30)", () => {
  beforeEach(() => {
    fakeIssues.docs = [];
  });

  const validIssue = {
    title: "Search box ignores Enter",
    description: "Pressing Enter in the search box does nothing",
    stepsToReproduce: "1. Click the search box 2. Type a word 3. Press Enter",
    priority: "medium",
  };

  // Day 24
  it("POST /issues creates an issue and returns 201 with a generated id", async () => {
    const res = await request(app).post("/issues").send({
      title: "Login button unresponsive",
      description: "Clicking Login does nothing on Safari",
      stepsToReproduce: "1. Open Safari 2. Click Login",
      priority: "high",
    });
    expect(res.status).toBe(201);
    expect(res.body.title).toBe("Login button unresponsive");
    expect(res.body.status).toBe("open");
    expect(res.body.classification).toBe("unclassified");
    expect(res.body._id).toBeDefined();
  });

  // Day 26 — semantic state-transition endpoint
  it("PATCH /issues/:id/status updates status and 404s for an unknown id", async () => {
    const created = await request(app).post("/issues").send({
      title: "Crash on save",
      description: "App crashes when saving a draft",
      stepsToReproduce: "1. Start a draft 2. Save",
      priority: "medium",
    });
    const id = created.body._id;

    const updated = await request(app)
      .patch(`/issues/${id}/status`)
      .send({ status: "in-progress" });
    expect(updated.status).toBe(200);
    expect(updated.body.status).toBe("in-progress");

    const missing = await request(app)
      .patch(`/issues/${new ObjectId()}/status`)
      .send({ status: "closed" });
    expect(missing.status).toBe(404);
  });

  // Day 27 — embedded-array $push
  it("POST /issues/:id/comments appends a comment", async () => {
    const created = await request(app).post("/issues").send({
      title: "Typo on settings page",
      description: "\"Preferances\" should be \"Preferences\"",
      stepsToReproduce: "1. Open Settings",
      priority: "low",
    });
    const id = created.body._id;

    const res = await request(app)
      .post(`/issues/${id}/comments`)
      .send({ comment: "Confirmed, fixing now." });
    expect(res.status).toBe(201);
    expect(res.body.comments).toHaveLength(1);
    expect(res.body.comments[0].comment).toBe("Confirmed, fixing now.");
  });

  // Day 27 — embedded-array $pull
  it("DELETE /issues/:id/comments/:commentId removes only the targeted comment", async () => {
    const created = await request(app).post("/issues").send({
      title: "Duplicate email notifications",
      description: "Users get the digest email twice",
      stepsToReproduce: "1. Trigger a digest",
      priority: "medium",
    });
    const id = created.body._id;

    const withComment = await request(app)
      .post(`/issues/${id}/comments`)
      .send({ comment: "Looking into it." });
    const commentId = withComment.body.comments[0]._id;

    const afterDelete = await request(app).delete(
      `/issues/${id}/comments/${commentId}`,
    );
    expect(afterDelete.status).toBe(200);
    expect(afterDelete.body.comments).toHaveLength(0);
  });

  // Day 28 — arrayFilters $set on a matched subdocument
  it("PATCH /issues/:id/test-cases/:testCaseId sets only the matching test case's result", async () => {
    const created = await request(app).post("/issues").send({
      title: "Password reset email never arrives",
      description: "Reset flow silently fails",
      stepsToReproduce: "1. Request a reset",
      priority: "high",
    });
    const id = created.body._id;

    const withTestCase = await request(app).post(`/issues/${id}/test-cases`);
    const testCaseId = withTestCase.body.testCases[0]._id;

    const res = await request(app)
      .patch(`/issues/${id}/test-cases/${testCaseId}`)
      .send({ passed: true });
    expect(res.status).toBe(200);
    expect(res.body.testCases[0].passed).toBe(true);
  });

  // ---------------------------------------------------------------------
  // Lab 04-01 (Days 24-25) — Zod validation, server-set author, partial update
  // ---------------------------------------------------------------------
  it("POST /issues with no title is rejected: 400, ValidationFailed, and details name the field", async () => {
    const res = await request(app).post("/issues").send({
      description: "No title here",
      stepsToReproduce: "1. Skip the title",
      priority: "low",
    });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("ValidationFailed");
    expect(res.body.details.map((d: any) => d.path)).toContain("title");
    expect(fakeIssues.docs).toHaveLength(0);
  });

  it("POST /issues sets author on the server and ignores an author in the request body", async () => {
    const res = await request(app).post("/issues").send({
      ...validIssue,
      author: { userId: "someone-else", fullName: "Not The Real Author" },
    });
    expect(res.status).toBe(201);
    expect(res.body.author).toBeDefined();
    expect(res.body.author.userId).toBeTruthy();
    expect(res.body.author.userId).not.toBe("someone-else");
    expect(res.body.author.fullName).not.toBe("Not The Real Author");
  });

  it("PATCH /issues/:id changes only the fields that were sent", async () => {
    const created = await request(app).post("/issues").send(validIssue);
    const id = created.body._id;

    const patched = await request(app).patch(`/issues/${id}`).send({ priority: "low" });
    expect(patched.status).toBeLessThan(300);

    const after = await request(app).get(`/issues/${id}`);
    expect(after.status).toBe(200);
    expect(after.body.priority).toBe("low");
    expect(after.body.title).toBe(validIssue.title);
    expect(after.body.description).toBe(validIssue.description);
    expect(after.body.comments).toEqual([]);
  });

  it("GET /issues/:id returns 400 for a malformed id and 404 for an id that doesn't exist", async () => {
    const malformed = await request(app).get("/issues/not-an-id");
    expect(malformed.status).toBe(400);

    const missing = await request(app).get(`/issues/${new ObjectId()}`);
    expect(missing.status).toBe(404);
  });

  // ---------------------------------------------------------------------
  // Lab 04-02 (Day 26) — semantic endpoints
  // ---------------------------------------------------------------------
  it("PATCH /issues/:id/status rejects a value that isn't open, in-progress or closed", async () => {
    const created = await request(app).post("/issues").send(validIssue);
    const res = await request(app)
      .patch(`/issues/${created.body._id}/status`)
      .send({ status: "done" });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("ValidationFailed");
  });

  it("PATCH /issues/:id/classify sets only the classification, and rejects an unknown value", async () => {
    const created = await request(app).post("/issues").send(validIssue);
    const id = created.body._id;

    const ok = await request(app).patch(`/issues/${id}/classify`).send({ classification: "approved" });
    expect(ok.status).toBe(200);
    expect(ok.body.classification).toBe("approved");
    expect(ok.body.status).toBe("open");

    const bad = await request(app).patch(`/issues/${id}/classify`).send({ classification: "maybe" });
    expect(bad.status).toBe(400);
    expect(bad.body.error).toBe("ValidationFailed");
  });

  it("PATCH /issues/:id/assign sets assignedTo exactly as sent, and rejects a missing fullName", async () => {
    const created = await request(app).post("/issues").send(validIssue);
    const id = created.body._id;

    const ok = await request(app)
      .patch(`/issues/${id}/assign`)
      .send({ userId: "u-42", fullName: "Dana Developer" });
    expect(ok.status).toBe(200);
    expect(ok.body.assignedTo).toEqual({ userId: "u-42", fullName: "Dana Developer" });

    const bad = await request(app).patch(`/issues/${id}/assign`).send({ userId: "u-42" });
    expect(bad.status).toBe(400);
    expect(bad.body.error).toBe("ValidationFailed");
  });

  it("the semantic endpoints return 400 for a malformed issue id", async () => {
    const status = await request(app).patch("/issues/not-an-id/status").send({ status: "closed" });
    const classify = await request(app).patch("/issues/not-an-id/classify").send({ classification: "approved" });
    const assign = await request(app).patch("/issues/not-an-id/assign").send({ userId: "u-1", fullName: "A B" });
    expect([status.status, classify.status, assign.status]).toEqual([400, 400, 400]);
  });

  // ---------------------------------------------------------------------
  // Lab 04-03 (Days 27-28) — comments and test cases
  // ---------------------------------------------------------------------
  it("POST /issues/:id/comments rejects an empty comment with 400 ValidationFailed", async () => {
    const created = await request(app).post("/issues").send(validIssue);
    const res = await request(app)
      .post(`/issues/${created.body._id}/comments`)
      .send({ comment: "" });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("ValidationFailed");
  });

  it("a comment's userId and fullName come from the server, not the request body", async () => {
    const created = await request(app).post("/issues").send(validIssue);
    const res = await request(app)
      .post(`/issues/${created.body._id}/comments`)
      .send({ comment: "Trying to impersonate", userId: "hacker", fullName: "Evil Hacker" });
    expect(res.status).toBe(201);
    const [saved] = res.body.comments;
    expect(saved.userId).toBeTruthy();
    expect(saved.userId).not.toBe("hacker");
    expect(saved.fullName).not.toBe("Evil Hacker");
  });

  it("DELETE /issues/:id/comments/:commentId leaves the other comments on the issue untouched", async () => {
    const created = await request(app).post("/issues").send(validIssue);
    const id = created.body._id;
    await request(app).post(`/issues/${id}/comments`).send({ comment: "first" });
    const two = await request(app).post(`/issues/${id}/comments`).send({ comment: "second" });
    const firstId = two.body.comments[0]._id;

    const res = await request(app).delete(`/issues/${id}/comments/${firstId}`);
    expect(res.status).toBe(200);
    expect(res.body.comments).toHaveLength(1);
    expect(res.body.comments[0].comment).toBe("second");
  });

  it("POST /issues/:id/test-cases adds a test case that starts with passed: false", async () => {
    const created = await request(app).post("/issues").send(validIssue);
    const res = await request(app).post(`/issues/${created.body._id}/test-cases`);
    expect(res.status).toBe(201);
    expect(res.body.testCases).toHaveLength(1);
    expect(res.body.testCases[0].passed).toBe(false);
  });

  it("marking one test case passed leaves the other test case unchanged", async () => {
    const created = await request(app).post("/issues").send(validIssue);
    const id = created.body._id;
    await request(app).post(`/issues/${id}/test-cases`);
    const two = await request(app).post(`/issues/${id}/test-cases`);
    const [firstCase, secondCase] = two.body.testCases;

    const res = await request(app)
      .patch(`/issues/${id}/test-cases/${secondCase._id}`)
      .send({ passed: true });
    expect(res.status).toBe(200);
    const byId = Object.fromEntries(res.body.testCases.map((t: any) => [t._id, t.passed]));
    expect(byId[secondCase._id]).toBe(true);
    expect(byId[firstCase._id]).toBe(false);
  });

  it("PATCH /issues/:id/test-cases/:testCaseId rejects a passed value that isn't true or false", async () => {
    const created = await request(app).post("/issues").send(validIssue);
    const id = created.body._id;
    const withCase = await request(app).post(`/issues/${id}/test-cases`);
    const res = await request(app)
      .patch(`/issues/${id}/test-cases/${withCase.body.testCases[0]._id}`)
      .send({ passed: "yes" });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("ValidationFailed");
  });

  // Days 29-30 — query-param filtering, keyword search (Atlas Search), and pagination
  describe("GET /issues", () => {
    beforeEach(async () => {
      // createIssue always sets status: "open" on creation (Day 24) — the
      // only way to get a non-"open" issue is through the Day 26 semantic
      // endpoint, same as a real client would have to. The descriptions are
      // chosen so the keyword-search tests below can tell them apart.
      const seed = [
        { title: "Crash on save", description: "login screen freezes", priority: "low" },
        { title: "Slow dashboard", description: "login takes ten seconds", priority: "high" },
        { title: "Typo", description: "settings page is misspelled", priority: "medium" },
      ];
      for (const issue of seed) {
        await request(app).post("/issues").send({
          ...issue,
          stepsToReproduce: "seed",
        });
      }
      const [, , third] = fakeIssues.docs;
      await request(app)
        .patch(`/issues/${third._id}/status`)
        .send({ status: "closed" });
    });

    it("filters by status", async () => {
      const res = await request(app).get("/issues").query({ status: "open" });
      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(2);
      expect(res.body.every((i: any) => i.status === "open")).toBe(true);
    });

    it("rejects an invalid sort value with 400", async () => {
      const res = await request(app).get("/issues").query({ sort: "title" });
      expect(res.status).toBe(400);
      expect(res.body.error).toBe("ValidationFailed");
    });

    it("paginates with page and limit", async () => {
      const res = await request(app)
        .get("/issues")
        .query({ limit: 2, page: 1 });
      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(2);
    });

    it("paginates: page 2 is the next slice, not a repeat of page 1", async () => {
      const first = await request(app).get("/issues").query({ limit: 2, page: 1 });
      const second = await request(app).get("/issues").query({ limit: 2, page: 2 });
      expect(first.body).toHaveLength(2);
      expect(second.body).toHaveLength(1);
      const firstIds = first.body.map((i: any) => i._id);
      expect(firstIds).not.toContain(second.body[0]._id);
    });

    it("filters by priority alone", async () => {
      const res = await request(app).get("/issues").query({ priority: "low" });
      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(1);
      expect(res.body[0].title).toBe("Crash on save");
    });

    it("combines status and priority filters instead of applying only one", async () => {
      const res = await request(app).get("/issues").query({ status: "open", priority: "high" });
      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(1);
      expect(res.body[0].title).toBe("Slow dashboard");
    });

    it("filters by assignedTo (the assignee's userId)", async () => {
      const [first] = fakeIssues.docs;
      await request(app)
        .patch(`/issues/${first._id}/assign`)
        .send({ userId: "u-7", fullName: "Riley Reviewer" });
      const res = await request(app).get("/issues").query({ assignedTo: "u-7" });
      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(1);
      expect(res.body[0].title).toBe("Crash on save");
    });

    it("sorts by createdOn: -createdOn is newest first, createdOn is oldest first", async () => {
      // Give the seeded issues known, distinct dates so the order is certain.
      fakeIssues.docs.forEach((doc, i) => {
        doc.createdOn = new Date(2026, 0, i + 1);
      });
      const newest = await request(app).get("/issues").query({ sort: "-createdOn" });
      expect(newest.body.map((i: any) => i.title)).toEqual(["Typo", "Slow dashboard", "Crash on save"]);
      const oldest = await request(app).get("/issues").query({ sort: "createdOn" });
      expect(oldest.body.map((i: any) => i.title)).toEqual(["Crash on save", "Slow dashboard", "Typo"]);
    });

    it("rejects a limit above 50 with 400 ValidationFailed", async () => {
      const res = await request(app).get("/issues").query({ limit: 51 });
      expect(res.status).toBe(400);
      expect(res.body.error).toBe("ValidationFailed");
    });

    it("rejects a status, priority or classification filter that isn't an allowed value", async () => {
      const badStatus = await request(app).get("/issues").query({ status: "done" });
      const badPriority = await request(app).get("/issues").query({ priority: "urgent" });
      const badClass = await request(app).get("/issues").query({ classification: "maybe" });
      expect([badStatus.status, badPriority.status, badClass.status]).toEqual([400, 400, 400]);
    });

    // Atlas Search (Lab 04-04, Day 29) — these exercise your q branch against
    // the fake aggregate() above, not a real Atlas cluster.
    it("q finds a word that appears only in the description", async () => {
      const res = await request(app).get("/issues").query({ q: "login" });
      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(2);
      expect(res.body.map((i: any) => i.title).sort()).toEqual([
        "Crash on save",
        "Slow dashboard",
      ]);
    });

    it("q matches whole words, not fragments", async () => {
      const res = await request(app).get("/issues").query({ q: "log" });
      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(0);
    });

    it("q combines with another filter instead of replacing it", async () => {
      const closed = await request(app)
        .get("/issues")
        .query({ q: "misspelled", status: "closed" });
      expect(closed.body).toHaveLength(1);
      expect(closed.body[0].title).toBe("Typo");

      const open = await request(app)
        .get("/issues")
        .query({ q: "misspelled", status: "open" });
      expect(open.body).toHaveLength(0);
    });

    it("q results are paginated too", async () => {
      const first = await request(app).get("/issues").query({ q: "login", limit: 1, page: 1 });
      const second = await request(app).get("/issues").query({ q: "login", limit: 1, page: 2 });
      const third = await request(app).get("/issues").query({ q: "login", limit: 1, page: 3 });
      expect(first.body).toHaveLength(1);
      expect(second.body).toHaveLength(1);
      expect(second.body[0]._id).not.toBe(first.body[0]._id);
      expect(third.body).toHaveLength(0);
    });
  });
});
