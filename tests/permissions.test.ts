import { describe, it, expect, vi, beforeEach } from "vitest";
import request from "supertest";
 
// This file's own mock replaces the shared one from tests/setup.ts,
// but only for this file.
const getSession = vi.fn();
const userHasPermission = vi.fn();
const setRole = vi.fn();
vi.mock("../src/auth.js", () => ({
  auth: { handler: vi.fn(), api: { getSession, userHasPermission, setRole } },
}));
 
// Import the app AFTER the lines above,
// because the mock refers to those functions.
const { app } = await import("../src/app.js");
 
const signedIn = { user: { id: "u1", name: "Dana Dev", role: "developer" } };
 
beforeEach(() => {
  getSession.mockReset().mockResolvedValue(signedIn);
  userHasPermission.mockReset();
  setRole.mockReset();
});
 
describe("permissions", () => {
  it("returns 401 before asking about permissions", async () => {
    getSession.mockResolvedValue(null);
    const res = await request(app)
      .patch("/issues/abc/classify")
      .send({ classification: "approved" });
    expect(res.status).toBe(401);
    expect(userHasPermission).not.toHaveBeenCalled(); //Proves the guard order: with nobody signed in, the permission question is never even asked.
  });
 
  it("returns 403 when the role lacks the permission", async () => {
    userHasPermission.mockResolvedValue({ success: false });//Makes the fake answer "no" the way the real one does.
    const res = await request(app)
      .patch("/issues/abc/classify")
      .send({ classification: "approved" });
    expect(res.status).toBe(403);
    expect(res.body).toEqual({ error: "Your role may not issue:classify" });
  });
 
  it("lets the request through when the role has the permission", async () => {
    userHasPermission.mockResolvedValue({ success: true }); //A fake "may this person?" function. Each test decides whether it answers yes or no.
    // "abc" is not a real id, so the controller answers 400,
    // which proves the guard let us in.
    const res = await request(app)
      .patch("/issues/abc/classify")
      .send({ classification: "approved" });
    expect(res.status).toBe(400);
  });
 
  it("asks about exactly the permission the route needs", async () => {
    userHasPermission.mockResolvedValue({ success: false });
    await request(app).delete("/issues/abc");
    expect(userHasPermission).toHaveBeenCalledWith({ //Proves the route asks for exactly the permission you meant. A route guarded with the wrong word fails here.
      body: { userId: "u1", permissions: { issue: ["delete"] } },
    });
  });
 
  it("only asks for issue:close when the new status is closed", async () => {
    userHasPermission.mockResolvedValue({ success: false });
    const closing = await request(app)
      .patch("/issues/abc/status")
      .send({ status: "closed" });
    const working = await request(app)
      .patch("/issues/abc/status")
      .send({ status: "in-progress" });
    expect(closing.status).toBe(403);
    // Not a role question; Lab 05-04 handles who may do this.
    expect(working.status).not.toBe(403);
  });
});
 
describe("changing a role", () => {
  it("returns 403 when the caller may not set roles", async () => {
    userHasPermission.mockResolvedValue({ success: false });
    const res = await request(app)
      .patch("/users/u2/role")
      .send({ role: "developer" });
    expect(res.status).toBe(403);
    expect(setRole).not.toHaveBeenCalled();
  });
 
  it("rejects a role that is not one of the five", async () => {
    userHasPermission.mockResolvedValue({ success: true });
    const res = await request(app)
      .patch("/users/u2/role")
      .send({ role: "wizard" });
    expect(res.status).toBe(400);
  });
 
  it("refuses to let anybody change their own role", async () => {
    userHasPermission.mockResolvedValue({ success: true });
    const res = await request(app)
      .patch("/users/u1/role")
      .send({ role: "technicalManager" });
    expect(res.status).toBe(400);
    expect(setRole).not.toHaveBeenCalled();
  });
 
  it("passes a valid change on to better-auth", async () => {
    userHasPermission.mockResolvedValue({ success: true });
    setRole.mockResolvedValue({
      user: { id: "u2", role: "businessAnalyst" },
    });
    const res = await request(app)
      .patch("/users/u2/role")
      .send({ role: "businessAnalyst" });
    expect(res.status).toBe(200);
    expect(setRole.mock.calls[0][0].body).toEqual({
      userId: "u2",
      role: "businessAnalyst",
    });
  });
});
