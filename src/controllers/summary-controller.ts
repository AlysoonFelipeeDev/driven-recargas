import { Request, Response, NextFunction } from "express";
import * as SummaryService from "../services/summary-service";

export async function getSummary(req: Request, res: Response, next: NextFunction) {
    try {
        const { document } = req.params;
        const summary = await SummaryService.getSummary(document);
        res.status(200).send(summary);
    } catch (err) {
        next(err);
    }
}
