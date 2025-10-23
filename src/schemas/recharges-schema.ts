import Joi from "joi";

export const createRechargeSchema = Joi.object({
    phoneId: Joi.number().integer().positive().required(),
    amount: Joi.number().min(10).max(1000).required()
});
