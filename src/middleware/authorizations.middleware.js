import connection from "../db/psql.js";

export async function authenticateToken(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');

    if (!token) return res.sendStatus(401);

    try {
        // TODO - mudar o numero de keys do obj session
        const { rows: session } = await connection.query(
            `SELECT * FROM public."sessions" WHERE token = $1 LIMIT 1;`,
            [token]
        );
        if (session.length === 0) return res.sendStatus(401);

        res.locals.session = session[0];

        next();
    } catch (error) {
        return res.send(500);
    }
}
