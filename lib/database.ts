// src/util/database.ts
import { MongoClient } from "mongodb";

const url = process.env.MONGO_URI || ""; // MongoDB 연결 URL (.env 파일에서 가져옴)

let connectDB: Promise<MongoClient>;

declare global {
  // TypeScript 글로벌 선언에서는 var를 사용해야 하므로 ESLint 규칙 무시
  // eslint-disable-next-line no-var
  var _mongo: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === "development") {
  // 개발 환경에서는 연결을 재사용하여 성능 최적화
  if (!global._mongo) {
    global._mongo = new MongoClient(url).connect();
  }
  connectDB = global._mongo;
} else {
  // 프로덕션 환경에서는 새로운 연결 생성
  connectDB = new MongoClient(url).connect();
}

export { connectDB };
