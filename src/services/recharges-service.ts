import * as Phones from "../repositories/phones-repo";
import * as Recharges from "../repositories/recharges-repo";

export async function createRecharge(data: { phoneId: number; amount: number }) {
    const phone = await Phones.findPhoneById(data.phoneId);
    if (!phone) throw { type: "notFound", message: "Telefone não encontrado" };
    const created = await Recharges.insertRecharge(data.phoneId, data.amount);
    return created; // { id }
}

export async function listByNumber(number: string) {
    return Recharges.listRechargesByPhoneNumber(number);
}
