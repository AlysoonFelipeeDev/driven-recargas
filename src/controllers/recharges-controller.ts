import { Request, Response, NextFunction } from "express";
import * as RechargesService from "../services/recharges-service";

export async function createRecharge(req: Request, res: Response, next: NextFunction) {
    try {
        const result = await RechargesService.createRecharge(req.body);
        return res.status(201).send(result);
    } catch (err) { next(err); }
}

export async function listByNumber(req: Request, res: Response, next: NextFunction) {
    try {
        const { number } = req.params;
        const list = await RechargesService.listByNumber(number);
        return res.send(list);
    } catch (err) { next(err); }
}
