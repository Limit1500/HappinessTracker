import pkg from "pg";

const { Pool } = pkg;
export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "D_QWERTY_T9",
  port: 5432,
});
