import { Request, Response, NextFunction } from 'express';

const { client } = require('../config');

function testAPI(req: Request, res: Response) {
    res.json({
        message: 'Hello',
    });
}

async function getPositions(req: Request, res: Response) {
    const qText = 'SELECT * FROM Positions;';

    try {
        const dbResponse = await client.query(qText);
        console.log(dbResponse);
        if ('rows' in dbResponse) {
            for (let row of dbResponse.rows) {
                console.log(JSON.stringify(row));
            }
            res.status(200).json(dbResponse.rows);
        }
    } catch (err: unknown) {
        console.log(err);
    }
}

export {testAPI, getPositions};