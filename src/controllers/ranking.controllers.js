import connection from '../db/psql.js';

export async function returnRanking(req, res) {
    try {
        const { rows: ranking } = await connection.query(
            `SELECT
                users.id,
                users.name,
                COUNT(url_shorten.*) as "linkCounts",
                SUM(visits) as "visitsCount"  
            FROM
                url_shorten
                JOIN users ON users.id = url_shorten.id_user
            GROUP BY
                users.id,
                users.name
            ORDER BY "visitsCount" DESC
            LIMIT 10;`
        );
        res.status(200).send(ranking);
        return;
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
        return;
    }
}
