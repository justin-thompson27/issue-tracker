import { vi } from "vitest";
 
// Stand-in for auth.ts: importing your app must never need BETTER_AUTH_* or Atlas.
// By default every test behaves as a signed-in user, so your Module 4 tests keep passing.
// A test file that needs "nobody is signed in" writes its own vi.mock (see tests/auth.test.ts).
vi.mock("../src/auth.js", () => ({
  auth: {
    handler: vi.fn(async () => new Response(null, { status: 404 })),
    api: {
      getSession: vi.fn().mockResolvedValue({
        user: { id: "6aad780ce470879405ff14af", name: "Miyabi Hoshimi" },
      }),
    },
  },
}));
