import joi from 'joi';

const urlSchema = joi.object({
    url: joi.string().uri().required().trim(),
});

const loginSchema = joi.object({
    email: joi.string().email().required().trim(),
    password: joi.string().required().trim(),
});


export { urlSchema, loginSchema };
