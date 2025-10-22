import { query } from "../config/db";

export async function findPhoneByNumber(number: string) {
    const res = await query<{ id: number }>("SELECT id FROM phones WHERE number = $1", [number]);
    return res.rows[0] || null;
}

export async function findPhoneById(id: number) {
    const res = await query<{ id: number; number: string; carrier_id: number; name: string; description: string; client_document: string }>(
        "SELECT id, number, carrier_id, name, description, client_document FROM phones WHERE id = $1",
        [id]
    );
    return res.rows[0] || null;
}

export async function insertPhone(data: { number: string; name: string; description: string; carrierId: number; document: string }) {
    const res = await query<{ id: number }>(
        `INSERT INTO phones (number, name, description, carrier_id, client_document)
        VALUES ($1,$2,$3,$4,$5) RETURNING id`,
        [data.number, data.name, data.description, data.carrierId, data.document]
    );
    return res.rows[0];
}

export async function listPhonesByDocument(document: string) {
    const res = await query<{
        id: number;
        number: string;
        name: string;
        description: string;
        carrier_id: number;
        carrier_name: string;
        carrier_code: number;
    }>(
        `SELECT p.id, p.number, p.name, p.description,
                c.id as carrier_id, c.name as carrier_name, c.code as carrier_code
        FROM phones p
        JOIN carriers c ON c.id = p.carrier_id
        WHERE p.client_document = $1
        ORDER BY p.id`,
        [document]
    );
    return res.rows;
}
