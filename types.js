const zod = require('zod');

const signUpSchema = zod.object({
    username: zod.string(),
    password: zod.string()
});

const loginSchema = zod.object({
    username: zod.string().nonempty(),
    password: zod.string().nonempty()
});

const postSchema = zod.object({
    title: zod.string(),
    description: zod.string()
})

module.exports = { signUpSchema, loginSchema, postSchema };
