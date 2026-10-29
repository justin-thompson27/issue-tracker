import { describe, it, expect, vi } from "vitest";
import request from "supertest";
 
// This file's own mock replaces the shared one from tests/setup.ts, but only for this file.
const getSession = vi.fn(); //A fake "who is this?" function. Each test decides what it answers: null (nobody) or a user.
vi.mock("../src/auth.js", () => ({ //Replaces auth.ts for this file only. It wins over the shared stand-in in tests/setup.ts.
  auth: { handler: vi.fn(), api: { getSession } },
}));
 
// Import the app AFTER the lines above, because the mock refers to getSession.
const { app } = await import("../src/app.js"); //Loads your app after the mock exists. A normal import at the top would run first and fail with Cannot access 'getSession' before initialization.

 
describe("authentication", () => {
  it("returns 401 on GET /issues when nobody is signed in", async () => {
    getSession.mockResolvedValue(null); //Tells the fake what to answer for the next calls.
    const res = await request(app).get("/issues");
    expect(res.status).toBe(401);
    expect(res.body).toEqual({ error: "Please sign in first" });
  });
 
  it("returns 401 on GET /api/me when nobody is signed in", async () => {
    getSession.mockResolvedValue(null);
    const res = await request(app).get("/api/me");
    expect(res.status).toBe(401);
  });
 
  it("returns the signed-in user from GET /api/me", async () => {
    getSession.mockResolvedValue({ user: { id: "u1", name: "Dana Dev" } });
    const res = await request(app).get("/api/me");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ userId: "u1", fullName: "Dana Dev", role: "none" });
  });
 
  it("keeps /health public", async () => {
    getSession.mockResolvedValue(null);
    expect((await request(app).get("/health")).status).toBe(200);
  });
});
