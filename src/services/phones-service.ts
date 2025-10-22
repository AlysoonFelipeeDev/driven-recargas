import * as Clients from "../repositories/clients-repo";
import * as Phones from "../repositories/phones-repo";
import * as Carriers from "../repositories/carriers-repo";

type CreatePhoneDTO = { number: string; carrierId: number; name: string; description: string; document: string };

export async function createPhone(data: CreatePhoneDTO) {
    const carrier = await Carriers.findCarrierById(data.carrierId);
    if (!carrier) throw { type: "unprocessable", message: "carrierId inválido" };

    const exists = await Phones.findPhoneByNumber(data.number);
    if (exists) throw { type: "conflict", message: "Número já cadastrado" };

    await Clients.upsertClient(data.document);
    const total = await Clients.countPhones(data.document);
    if (total >= 3) throw { type: "conflict", message: "Limite de 3 telefones por cliente" };

    const created = await Phones.insertPhone(data);
    return created; 
}

export async function listByDocument(document: string) {
    const rows = await Phones.listPhonesByDocument(document);
    return rows.map(r => ({
        id: r.id,
        number: r.number,
        name: r.name,
        description: r.description,
        carrier: { id: r.carrier_id, name: r.carrier_name, code: r.carrier_code }
    }));
}
