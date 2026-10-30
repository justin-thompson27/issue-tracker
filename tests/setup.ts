// Provided for Lab 05-04. You do not write this file.
// Copy it into your tests folder as it is, and replace any older copy.

import { vi } from "vitest";

// Stand-in for auth.ts: importing your app must never need BETTER_AUTH_* or Atlas.
// By default every test behaves as a signed-in user, so your Module 4 tests keep passing.
// A test file that needs "nobody is signed in" writes its own vi.mock (see tests/auth.test.ts).
vi.mock("../src/auth.js", () => ({
  auth: {
    handler: vi.fn(async () => new Response(null, { status: 404 })),
    api: {
      // By default every permission check says yes,
      // so your Module 4 tests keep passing.
      userHasPermission: vi.fn().mockResolvedValue({ success: true }),
      setRole: vi.fn().mockResolvedValue({
        user: { id: "u9", role: "developer" },
      }),
      getSession: vi.fn().mockResolvedValue({
        user: { id: "6aad780ce470879405ff14af", name: "Miyabi Hoshimi" },
      }),
    },
  },
}));

// Stand-in for the user lookup: by default everybody you assign
// is a Developer.
vi.mock("../src/userLookup.js", () => ({
  getUserRole: vi.fn().mockResolvedValue("developer"),
}));
