import { Pool, QueryResult, QueryResultRow } from "pg";


if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const isProd = process.env.NODE_ENV === "production";

export const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: isProd ? { rejectUnauthorized: false } : undefined,
});

export async function query<T extends QueryResultRow = any>(
    text: string,
    params?: any[]
) {
    return pool.query<T>(text, params) as Promise<QueryResult<T>>;
}
