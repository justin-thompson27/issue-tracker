// Provided for Lab 05-04. You do not write this file.
// Copy it into your tests folder as it is, and replace any older copy.

import { describe, it, expect, vi, beforeEach } from "vitest";
import request from "supertest";
import { ObjectId } from "mongodb";

// This file's own mocks replace the shared ones from tests/setup.ts,
// but only for this file.
const getSession = vi.fn();
const userHasPermission = vi.fn();
const findOne = vi.fn();
const findOneAndUpdate = vi.fn();
const getUserRole = vi.fn();

vi.mock("../src/auth.js", () => ({
  auth: {
    handler: vi.fn(),
    api: { getSession, userHasPermission, setRole: vi.fn() },
  },
}));
vi.mock("../src/db.js", () => ({
  getIssuesCollection: () => ({ findOne, findOneAndUpdate }),
  getDb: vi.fn(),
}));
vi.mock("../src/userLookup.js", () => ({ getUserRole }));

// Import the app AFTER the lines above, because the mocks refer to
// those functions.
const { app } = await import("../src/app.js");

const id = new ObjectId().toString();
const issue = {
  _id: new ObjectId(id),
  author: { userId: "u-ann", fullName: "Ann Author" },
  assignedTo: { userId: "u-eve", fullName: "Eve Dev" },
  comments: [
    { _id: "c1", userId: "u-ann", fullName: "Ann Author", comment: "hi" },
  ],
};

function signInAs(userId: string, name: string) {
  getSession.mockResolvedValue({
    user: { id: userId, name, role: "developer" },
  });
}

beforeEach(() => {
  getSession.mockReset();
  userHasPermission.mockReset().mockResolvedValue({ success: true });
  findOne.mockReset().mockResolvedValue(issue);
  findOneAndUpdate.mockReset().mockResolvedValue(issue);
  getUserRole.mockReset().mockResolvedValue("developer");
});

describe("editing an issue", () => {
  it("lets the author edit it", async () => {
    signInAs("u-ann", "Ann Author");
    const res = await request(app)
      .patch(`/issues/${id}`)
      .send({ title: "Better title" });
    expect(res.status).toBe(200);
  });

  it("returns 403 when somebody other than the author edits it", async () => {
    signInAs("u-eve", "Eve Dev"); // the assignee, but not the author
    const res = await request(app)
      .patch(`/issues/${id}`)
      .send({ title: "Eve was here" });
    expect(res.status).toBe(403);
    expect(res.body).toEqual({
      error: "Only the author may edit this issue",
    });
  });

  it("returns 404, not 403, when the issue does not exist", async () => {
    signInAs("u-eve", "Eve Dev");
    findOne.mockResolvedValue(null);
    const res = await request(app)
      .patch(`/issues/${id}`)
      .send({ title: "Anything" });
    expect(res.status).toBe(404);
  });
});

describe("working on an issue", () => {
  it("returns 403 when a non-assignee moves it to in-progress", async () => {
    signInAs("u-ann", "Ann Author");
    const res = await request(app)
      .patch(`/issues/${id}/status`)
      .send({ status: "in-progress" });
    expect(res.status).toBe(403);
  });

  it("does not use the assignee rule when closing", async () => {
    signInAs("u-ann", "Ann Author");
    userHasPermission.mockResolvedValue({ success: false });
    const res = await request(app)
      .patch(`/issues/${id}/status`)
      .send({ status: "closed" });
    expect(res.status).toBe(403);
    // The ROLE message, not the assignee message.
    expect(res.body).toEqual({ error: "Your role may not issue:close" });
  });

  it("returns 403 when a non-assignee adds a test case", async () => {
    signInAs("u-ann", "Ann Author");
    const res = await request(app).post(`/issues/${id}/test-cases`);
    expect(res.status).toBe(403);
  });
});

describe("assigning an issue", () => {
  const body = { userId: "u-new", fullName: "New Person" };

  it("returns 403 when neither a manager nor the assignee", async () => {
    signInAs("u-ann", "Ann Author");
    userHasPermission.mockResolvedValue({ success: false });
    const res = await request(app).patch(`/issues/${id}/assign`).send(body);
    expect(res.status).toBe(403);
  });

  it("lets the current assignee hand it off, without the role", async () => {
    signInAs("u-eve", "Eve Dev");
    userHasPermission.mockResolvedValue({ success: false });
    const res = await request(app).patch(`/issues/${id}/assign`).send(body);
    expect(res.status).toBe(200);
  });

  it("refuses to assign to a non-Developer, non-BA, non-QA", async () => {
    signInAs("u-ann", "Ann Author");
    getUserRole.mockResolvedValue("productManager");
    const res = await request(app).patch(`/issues/${id}/assign`).send(body);
    expect(res.status).toBe(400);
  });

  it("returns 404 when the person to assign does not exist", async () => {
    signInAs("u-ann", "Ann Author");
    getUserRole.mockResolvedValue(undefined);
    const res = await request(app).patch(`/issues/${id}/assign`).send(body);
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: "User not found" });
  });
});

describe("deleting a comment", () => {
  it("returns 403 for a non-author without comment:deleteAny", async () => {
    signInAs("u-eve", "Eve Dev");
    userHasPermission.mockResolvedValue({ success: false });
    const res = await request(app).delete(`/issues/${id}/comments/c1`);
    expect(res.status).toBe(403);
  });
});

describe("the audit trail", () => {
  it("stamps updatedBy from the session when it is edited", async () => {
    signInAs("u-ann", "Ann Author");
    await request(app).patch(`/issues/${id}`).send({ title: "Better title" });
    const changes = findOneAndUpdate.mock.calls[0][1].$set;
    expect(changes.updatedBy).toEqual({
      userId: "u-ann",
      fullName: "Ann Author",
    });
    expect(changes.updatedAt).toBeInstanceOf(Date);
  });

  it("stamps closedBy and closedAt when an issue is closed", async () => {
    signInAs("u-bo", "Bo Analyst");
    await request(app).patch(`/issues/${id}/status`).send({ status: "closed" });
    const changes = findOneAndUpdate.mock.calls[0][1].$set;
    expect(changes.closedBy).toEqual({
      userId: "u-bo",
      fullName: "Bo Analyst",
    });
    expect(changes.closedAt).toBeInstanceOf(Date);
  });

  it("ignores a closedBy sent in the request body", async () => {
    signInAs("u-bo", "Bo Analyst");
    await request(app)
      .patch(`/issues/${id}/status`)
      .send({
        status: "closed",
        closedBy: { userId: "hacker", fullName: "Evil Hacker" },
      });
    const changes = findOneAndUpdate.mock.calls[0][1].$set;
    expect(changes.closedBy.userId).toBe("u-bo");
  });
});
