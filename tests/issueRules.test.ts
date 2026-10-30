// Provided for Lab 05-04. You do not write this file.
// Copy it into your tests folder as it is, and replace any older copy.

import { describe, it, expect } from "vitest";
import type { Issue } from "../src/data/issue.js";
import {
  canEditIssue,
  canWorkOnIssue,
  canDeleteComment,
} from "../src/issueRules.js";

const ann = { userId: "u-ann", fullName: "Ann Author" };
const eve = { userId: "u-eve", fullName: "Eve Dev" };
const bo = { userId: "u-bo", fullName: "Bo Analyst" };

// Only the fields the rules look at; the cast keeps the test short.
const issue = {
  author: ann,
  assignedTo: eve,
  comments: [
    {
      _id: "c1",
      userId: "u-bo",
      fullName: "Bo Analyst",
      comment: "hi",
      createdOn: new Date(),
    },
  ],
} as unknown as Issue;

describe("canEditIssue", () => {
  it("allows the author and nobody else", () => {
    expect(canEditIssue(issue, ann)).toBe(true);
    // Eve is assigned, but did not write it.
    expect(canEditIssue(issue, eve)).toBe(false);
    expect(canEditIssue(issue, bo)).toBe(false);
  });
});

describe("canWorkOnIssue", () => {
  it("allows the assignee and nobody else", () => {
    expect(canWorkOnIssue(issue, eve)).toBe(true);
    // Ann wrote it, but is not assigned.
    expect(canWorkOnIssue(issue, ann)).toBe(false);
  });

  it("allows nobody when the issue is not assigned yet", () => {
    const unassigned = {
      ...issue,
      assignedTo: undefined,
    } as unknown as Issue;
    expect(canWorkOnIssue(unassigned, eve)).toBe(false);
  });
});

describe("canDeleteComment", () => {
  it("allows the comment's author only", () => {
    expect(canDeleteComment(issue, "c1", bo)).toBe(true);
    expect(canDeleteComment(issue, "c1", ann)).toBe(false);
  });

  it("allows nobody when the comment does not exist", () => {
    expect(canDeleteComment(issue, "missing", bo)).toBe(false);
  });
});
