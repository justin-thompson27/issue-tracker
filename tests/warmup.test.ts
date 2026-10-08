import { describe, it, expect,vi  } from "vitest";
import { createIssueSchema } from "../src/schema/issueSchemas.js";
import { title } from "node:process";
import request from "supertest";
import {app } from "../src/app.js"
vi.mock("../src/db.js", () => ({
  getIssuesCollection: vi.fn(),
  getDb: vi.fn(),
})); 

describe("my very first test", () => {
  it("knows that 2 + 2 is 4", () => {
    expect(2 + 2).toBe(4);
  });
});


describe("createIssueSchema",()=> {
  const validIssue = {
    title: "Login button does nothing",
    description: "Clicking Login on Safari has no effect",
    stepsToReproduce: "1. Open Safari 2. Click Login",
    priority:"high",
  };

  it("accepts a complete, valid issue",() => {
    const result = createIssueSchema.safeParse(validIssue);
    expect(result.success).toBe(true);
  });

  it("rejects an issue with no title",() => {
    const {title, ...noTitle} = validIssue;
    const result = createIssueSchema.safeParse(noTitle);
    expect(result.success).toBe(false);
  });

  it("rejects a priority that is not low,medium or high",()=>
  {
    const result = createIssueSchema.safeParse({...validIssue,priority:"urgent"});
    expect(result.success).toBe(false);
  })

}
);

describe("POST /issues", () => {
  it("rejects an empty body with 400 and ValidationFailed", async () => {
    const response = await request(app).post("/issues").send({});
    expect(response.status).toBe(400);
    expect(response.body.error).toBe("ValidationFailed");
  });
});

