import connection from '../db/psql.js';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';


import { accountSchema, loginSchema } from '../schemas/login.schemas.js';

export async function signUp(req, res) {
    const validation = accountSchema.validate(req.body, { abortEarly: false });

    if (validation.error) {
        const errors = validation.error.details.map(detail => detail.message);
        res.status(422).send(errors);
        return;
    }

    try {
        const { rows: user } = await connection.query(
            `SELECT * FROM public."users" WHERE email = $1 LIMIT 1;`,
            [validation.value.email]
        );
        if (user.length !== 0) {
            res.status(409).send({
                message: 'Invalid email'
            });
            return;
        }
        await connection.query(
            `INSERT INTO public."users" (name, email, password) VALUES ($1, $2, $3);`,
            [
                validation.value.name,
                validation.value.email,
                bcrypt.hashSync(validation.value.password, 10),
            ]
        );
        // TODO - implementar login automático
        res.sendStatus(201);
        return;
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
        return;
    }
}

export async function signIn(req, res) {
    const validation = loginSchema.validate(req.body, { abortEarly: false });

    if (validation.error) {
        const errors = validation.error.details.map(detail => detail.message);
        res.status(422).send(errors);
        return;
    }

    try {
        const { rows: user } = await connection.query(
            `SELECT id, email, password FROM public."users" WHERE email = $1 LIMIT 1;`,
            [validation.value.email]
        );
        if (user.length === 0 || !bcrypt.compareSync(validation.value.password, user[0].password)) {
            res.status(401).send({
                message: 'Email or password invalid'
            });
            return;
        }

        const userToken = uuidv4();
        const { rows: session } = await connection.query(
            `SELECT * FROM public."sessions" WHERE id_user = $1 LIMIT 1;`,
            [user[0].id]
        );
        if (session.length !== 0) {
            await connection.query(`UPDATE public."sessions"
                SET token = $1
                WHERE id_user = $2;`,
                [
                    userToken,
                    user[0].id,
                ]
            );
        } else {
            await connection.query(
                `INSERT INTO public."sessions" (id_user, token) VALUES ($1, $2);`,
                [
                    user[0].id,
                    userToken,
                ]
            );
        }
        if (userToken) {
            res.status(201).send({
                token: userToken
            });
            return;
        }
        res.sendStatus(500);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
        return;
    }
}