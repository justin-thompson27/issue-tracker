import { MongoClient , Db ,Collection } from "mongodb";
import { Issue } from "./data/issue";

const client = new MongoClient(process.env.MONGODB_URI as string)

let db: Db;

export async function  getDb()
{
  await client.connect();
  db = client.db(process.env.DB_NAME as string);
   console.log("MONGODB HOST:", client.options.hosts);
  console.log("MONGODB DATABASE:", db.databaseName);
  return db ;
}

export function getIssuesCollection()
{
  
   return db.collection<Issue>("issues");
}