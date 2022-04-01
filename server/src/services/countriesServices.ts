import { Request, Response, NextFunction } from 'express';
const {prisma} = require('../config');


async function projectionQueryCountries(req: Request, res: Response) {
    try{
        const getQuery: object | null = await prisma.countries.findMany({
            select: {
                counname: true
            }
        });
        if(getQuery === null) {
            res.status(400).json(getQuery);
        } else {
            res.status(200).json(getQuery);
        }
    } catch (e) {
        console.log(e);
        res.status(400).json({err: e});
    }
}

async function deleteRowCountries(req: Request, res: Response) {
    try{
        const reqData = req.params;

        await prisma.countries.delete({
            where: {
                counname: reqData.counname
            }
        });
        res.status(200).json({status: "OK"});
    } catch (e) {
        res.status(400).json({err: e});
    }
}

export{projectionQueryCountries, deleteRowCountries}

