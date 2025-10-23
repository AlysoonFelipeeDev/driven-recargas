import { query } from "../config/db";

export async function insertRecharge(phoneId: number, amount: number) {
    const res = await query<{ id: number }>(
        "INSERT INTO recharges (phone_id, amount) VALUES ($1,$2) RETURNING id",
        [phoneId, amount]
    );
    return res.rows[0];
}

export async function listRechargesByPhoneNumber(number: string) {
    const res = await query<{ id: number; amount: string; created_at: Date }>(
        `SELECT r.id, r.amount::text as amount, r.created_at
        FROM recharges r
        JOIN phones p ON p.id = r.phone_id
        WHERE p.number = $1
        ORDER BY r.id`,
        [number]
    );
    return res.rows.map(r => ({ ...r, amount: Number(r.amount) }));
}

export async function listRechargesByPhoneId(phoneId: number) {
    const res = await query<{ id: number; amount: string; created_at: Date }>(
        "SELECT id, amount::text as amount, created_at FROM recharges WHERE phone_id = $1 ORDER BY id",
        [phoneId]
    );
    return res.rows.map(r => ({ ...r, amount: Number(r.amount) }));
}
