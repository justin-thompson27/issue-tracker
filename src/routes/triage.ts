import { Router } from "express";
import { triage } from "../controllers/triageController.js";
import { validateBody } from "../middleware/validate.js";
import { triageInputSchema } from "../schema/triageSchemas.js";
 
const triageRouter = Router();
 
triageRouter.post("/", validateBody(triageInputSchema), triage);
 
export default triageRouter