import * as Phones from "../repositories/phones-repo";
import * as Recharges from "../repositories/recharges-repo";

export async function getSummary(document: string) {
    const phones = await Phones.listPhonesByDocument(document);

    const phonesWithRelations = await Promise.all(
        phones.map(async (p: any) => {
        const recharges = await Recharges.listRechargesByPhoneId(p.id);
        return {
            id: p.id,
            number: p.number,
            name: p.name,
            description: p.description,
            carrier: { id: p.carrier_id, name: p.carrier_name, code: p.carrier_code },
            recharges: recharges.map(r => ({
            id: r.id,
            amount: r.amount,
            createdAt: r.created_at
            }))
        };
        })
    );

    return { document, phones: phonesWithRelations };
}
