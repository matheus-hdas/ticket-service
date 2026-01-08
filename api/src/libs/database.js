import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { createClient } from "@libsql/client";

import "dotenv/config";

const libsql = createClient({
  url: process.env.DATABASE_URL,
});

const adapter = new PrismaLibSql(libsql);
const database = new PrismaClient({ adapter });
export default database;
