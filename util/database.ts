// src/util/database.ts
import { MongoClient, Db } from "mongodb";

const url = process.env.MONGO_URI || ""; // 실제 URL은 .env에 있어야 함

let connectDB: Promise<MongoClient>;

declare global {
  var _mongo: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongo) {
    global._mongo = new MongoClient(url).connect();
  }
  connectDB = global._mongo;
} else {
  connectDB = new MongoClient(url).connect();
}

export { connectDB };
