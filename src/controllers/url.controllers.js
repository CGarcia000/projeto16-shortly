import connection from '../db/psql.js';
import { nanoid } from 'nanoid';

import { urlSchema } from '../schemas/urls.schemas.js';


export async function urlShorten(req, res) {
    // TODO - adicionar o authorization middleware
    const { session } = res.locals;

    const validation = urlSchema.validate(req.body, { abortEarly: false });

    if (validation.error) {
        const errors = validation.error.details.map(detail => detail.message);
        res.status(422).send(errors);
        return;
    }

    try {

        const { rows: urls } = await connection.query(
            `SELECT url FROM public."url_shorten" WHERE id_user = $1 AND url = $2;`,
            [
                session.id_user,
                validation.value.url,
            ]
        );
        if (urls.length > 0) {
            res.status(400).send({
                message: 'url alread being used by user'
            });
            return;
        }

        const identifier = nanoid(12);

        await connection.query(
            `INSERT INTO public."url_shorten" (url, identifier, id_user, visits) VALUES ($1, $2, $3, 0);`,
            [
                validation.value.url,
                identifier,
                session.id_user
            ]
        );
        res.sendStatus(201);
        return;
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
        return;
    }
}

export async function returnUrl(req, res) {

}

export async function redirectUrl(req, res) {

}

export async function deleteUrl(req, res) {

}