import connection from '../db/psql.js';


export async function returnUser(req, res) {
    const { session } = res.locals;

    try {
        const { rows: user } = await connection.query(
            `SELECT id, name FROM public."users" WHERE users.id = $1 LIMIT 1;`,
            [session.id_user]
        );
        if (user.length < 1) {
            res.status(404).send({
                message: 'user not found',
            });
            return;
        }
        const { rows: userUrls } = await connection.query(
            `SELECT 
                url_shorten.id,
                url_shorten.identifier AS "shortUrl",
                url_shorten.url,
                url_shorten.visits AS "visitCount"
            FROM public."users"
                RIGHT JOIN public."url_shorten" ON users."id"=url_shorten."id_user"
            WHERE users.id = $1;`,
            [session.id_user]
        );
        let visitCount = 0;
        if (userUrls.length > 0) {
            userUrls.forEach(url => {
                visitCount += url.visitCount;
            });
        }
        res.status(200).send({
            id: user[0].id,
            name: user[0].name,
            visitCount: visitCount,
            shortenUrls: userUrls
        });
        return;
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
        return;
    }
}
