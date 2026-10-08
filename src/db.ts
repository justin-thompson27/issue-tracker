import { MongoClient , Db ,Collection } from "mongodb";
import { Issue } from "./data/issue.js";

const MONGODB_URI = process.env.MONGODB_URI as string;

const DB_NAME = process.env.DB_NAME as string;


const client = new MongoClient(MONGODB_URI);
let db: Db;

export async function  getDb()
{
  await client.connect();
  db = client.db(DB_NAME);
  await db.collection("issues").createIndex({status: 1, createdOn: -1});
  return db ;
};

export  function getIssuesCollection()
{
  
   return db.collection<Issue>("issues");
}