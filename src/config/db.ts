import dotenv from "dotenv";
import { Pool, QueryResult, QueryResultRow } from "pg";

dotenv.config();

export const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl:
        process.env.DATABASE_URL?.includes("render.com") ||
        process.env.DATABASE_URL?.includes("?ssl=true")
        ? { rejectUnauthorized: false }
        : undefined,
    });

    export async function query<T extends QueryResultRow = any>(
    text: string,
    params?: any[]
    ) {
    return pool.query<T>(text, params);
}


