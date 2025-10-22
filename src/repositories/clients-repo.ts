import { query } from "../config/db";

export async function upsertClient(document: string) {
    await query("INSERT INTO clients (document) VALUES ($1) ON CONFLICT (document) DO NOTHING", [document]);
}

export async function countPhones(document: string): Promise<number> {
    const res = await query<{ count: string }>("SELECT COUNT(*)::text AS count FROM phones WHERE client_document = $1", [document]);
    return Number(res.rows[0]?.count ?? 0);
}
