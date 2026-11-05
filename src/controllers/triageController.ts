import { Request, Response, NextFunction } from "express";
import { triageIssue } from "../agent/triage.js";
import {
  isRateLimited,
  isUnusableAnswer,
  retryAfterSeconds,
} from "../agent/groqErrors.js";
import type { TriageInput } from "../schema/triageSchemas.js";
 
export async function triage(req: Request, res: Response, next: NextFunction) {
  try {
    const suggestion = await triageIssue(req.body as TriageInput);
    res.status(200).json({ suggestion });
  } catch (err) {
    if (isRateLimited(err)) {
      const seconds = retryAfterSeconds(err);
      res.set("Retry-After", String(seconds));
      res.status(429).json({
        error: `The assistant is busy. Try again in ${seconds} seconds.`,
      });
      return;
    }
    if (isUnusableAnswer(err)) {
      res.status(502).json({
        error: "The assistant gave an answer I could not use. Try again.",
      });
      return;
    }
    next(err);
  }
}
