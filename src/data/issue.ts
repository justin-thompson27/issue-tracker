
import { ObjectId } from "mongodb";
export interface Issue { //interface containing possible issues
  _id?: ObjectId;
  title: string;
  description: string;
  status: "open" | "in-progress" | "closed";
  priority: "low" | "medium" | "high";
  stepsToReproduce: string;
  classification: "unclassified" | "approved" | "unapproved" | "duplicate";
  author: IssueUserRef;
  assignedTo?: IssueUserRef;
  createdOn: Date;
  comments: Comment[];
  testCases: TestCase[];
  timeLog: TimeLogEntry[];
  fixed?: FixInfo;
}

export interface IssueUserRef {
  userId: string;
  fullName: string;
}

interface Comment {
  _id: string;
  userId: string;
  fullName: string;
  comment: string;
  createdOn: Date;
}

interface TestCase{
  _id: string;
  userId: string;
  passed: boolean;
  createdOn: Date;
}

interface TimeLogEntry {
  userId: string;
  hoursWorked: number;
  loggedOn: Date;
}

interface FixInfo {
  fixedBy: IssueUserRef;
  fixedonVersion: string;
  fixedOnDate: Date; 
}