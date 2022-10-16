import joi from 'joi';

const accountSchema = joi.object({
    email: joi.string().email().required().trim(),
    name: joi.string().required().trim(),
    password: joi.string().required().trim(),
    confirmPassword: joi.string()
        .required()
        .valid(joi.ref('password'))
        .trim(),
});

const loginSchema = joi.object({
    email: joi.string().email().required().trim(),
    password: joi.string().required().trim(),
});


export { accountSchema, loginSchema };
