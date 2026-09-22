
import { ObjectId } from "mongodb";
export interface Issue { //interface containing possible issues
  _id?: ObjectId;
  title: string;
  description: string;
  status: "open" | "in-progress" | "closed";
  priority: "low" | "medium" | "high";
}

