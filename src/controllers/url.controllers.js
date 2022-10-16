import connection from '../db/psql.js';
import { nanoid } from 'nanoid';

import { urlSchema } from '../schemas/urls.schemas.js';


export async function urlShorten(req, res) {
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
                session.id_user,
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
    const { id } = req.params;
    try {
        const { rows: url } = await connection.query(
            `SELECT id, identifier, url FROM public."url_shorten" WHERE id = $1 LIMIT 1;`,
            [id]
        );
        if (url.length > 0) {
            res.status(200).send({
                id: url[0].id,
                shortUrl: url[0].identifier,
                url: url[0].url,
            })
            return;
        }
        res.sendStatus(404);
        return;
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
        return;
    }
}

export async function redirectUrl(req, res) {
    const { shortUrl } = req.params;

    try {
        const { rows: url } = await connection.query(
            `SELECT url, id_user, visits FROM public."url_shorten" WHERE identifier = $1 LIMIT 1;`,
            [shortUrl]
        );
        if (url.length > 0) {
            // adicionando visit na url
            url[0].visits += 1;
            await connection.query(
                `UPDATE public."url_shorten" SET visits = $1 WHERE identifier = $2;`,
                [
                    url[0].visits,
                    shortUrl,
                ]
            );
            res.redirect(url[0].url);
            return;
        }
        res.sendStatus(404);
        return;
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
        return;
    }
}

export async function deleteUrl(req, res) {
    const { id } = req.params;
    const { session } = res.locals;

    try {
        const { rows: userUrl } = await connection.query(
            `SELECT id_user FROM public."url_shorten" WHERE id = $1 LIMIT 1;`,
            [id]
        );
        if (userUrl.length > 0) {
            if (userUrl[0].id_user !== session.id_user) {
                res.status(401).send({ message: 'action not authorized' });
                return;
            }

            await connection.query(
                `DELETE FROM public."url_shorten" WHERE id = $1;`,
                [id]
            )
            res.sendStatus(204);
            return;
        }
        res.sendStatus(404);
        return;
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
        return;
    }
}