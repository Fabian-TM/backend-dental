import * as Joi from 'joi';

const validAccountTypes = ["manager", "worker"];
//Falta incluir regex a las contraseñas
export const registerSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().required(),
    cellphone: Joi.string(),
    dni: Joi.string().required(),
    sex: Joi.string().required(),
    company: Joi.string().required(),
    accountType: Joi.string().valid(...validAccountTypes).required(),
});

export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

export const renewSchema = Joi.object({
    email: Joi.string().email().required(),
});

export const verifyRenewSchema = Joi.object({
    code: Joi.string().required(),
});

export const changePasswordSchema = Joi.object({
    accountId: Joi.string().required(),
    newPassword: Joi.string().required(),
});

export const validationSchemas = {
    registerSchema,
    loginSchema,
    renewSchema,
    verifyRenewSchema,
    changePasswordSchema,
};