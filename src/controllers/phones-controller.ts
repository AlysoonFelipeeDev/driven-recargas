import { Request, Response, NextFunction } from "express";
import * as PhonesService from "../services/phones-service";

export async function createPhone(req: Request, res: Response, next: NextFunction) {
    try {
        const result = await PhonesService.createPhone(req.body);
        return res.status(201).send(result); // { id }
    } catch (err) {
        next(err);
    }
}

export async function listPhones(req: Request, res: Response, next: NextFunction) {
    try {
        const { document } = req.params;
        const list = await PhonesService.listByDocument(document);
        return res.send(list);
    } catch (err) {
        next(err);
    }
}
