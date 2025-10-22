import { Request, Response, NextFunction } from "express";

type AppError = { type?: "conflict" | "notFound" | "unprocessable"; message?: any };

export function errorHandler(err: AppError, _req: Request, res: Response, _next: NextFunction) {
    if (err.type === "conflict")      return res.status(409).send({ error: err.message });
    if (err.type === "notFound")      return res.status(404).send({ error: err.message });
    if (err.type === "unprocessable") return res.status(422).send({ error: err.message });
    console.error(err);
    return res.status(500).send({ error: "Internal Server Error" });
}
