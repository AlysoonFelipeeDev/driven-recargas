import Joi from "joi";

export const createPhoneSchema = Joi.object({
    number: Joi.string().pattern(/^\d{10,11}$/).required(), 
    carrierId: Joi.number().integer().positive().required(),
    name: Joi.string().min(1).required(),
    description: Joi.string().min(1).required(),
    document: Joi.string().pattern(/^\d{11}$/).required() 
});
