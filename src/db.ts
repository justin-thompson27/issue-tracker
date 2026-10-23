import { MongoClient , Db ,Collection } from "mongodb";
import { Issue } from "./data/issue.js";


let db: Db;

export async function  getDb()
{
  const MONGODB_URI = process.env.MONGODB_URI as string;
  const DB_NAME = process.env.DB_NAME as string;
  if (db) return db; // already connected: hand back the same Db
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  db = client.db(DB_NAME);
  await db.collection("issues").createIndex({status: 1, createdOn: -1});
  return db ;
};

export  function getIssuesCollection()
{
  
   return db.collection<Issue>("issues");
}