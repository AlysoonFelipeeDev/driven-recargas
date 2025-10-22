import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

export function validateSchema(schema: ObjectSchema) {
    return (req: Request, _res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            return next({ type: "unprocessable", message: error.details.map(d => d.message) });
        }
        next();
    };
}
