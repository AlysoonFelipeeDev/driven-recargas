import { query } from "../config/db";

export async function findCarrierById(id: number) {
    const res = await query<{ id: number; name: string; code: number }>("SELECT id, name, code FROM carriers WHERE id = $1", [id]);
    return res.rows[0] || null;
}
