import { Request, Response, NextFunction } from 'express';
const {prisma} = require('../config');

function selectFieldOptionsCities(fields: any): any {
    let cityname = fields.cityname;
    let statename = fields.statename;
    let counname = fields.counname;

    const options = {
        cityname: cityname,
        statename: statename,
        counname: counname
    }
    return options;
}


async function projectionQueryCities(req: Request, res: Response) {
    try{
        const fields = req.body.fields;
        const selectOptions = selectFieldOptionsCities(fields);
        const getQuery: object | null = await prisma.cities.findMany({
            select: selectOptions
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

async function deleteRowCities(req: Request, res: Response) {
    try{
        const reqData = req.body;

        await prisma.cities.delete({
            where: {
                cityname_counname: {
                    cityname: reqData.cityname,
                    counname: reqData.counname
                }
            }
        });
        res.status(200).json({status: "OK"});
    } catch (e) {
        console.log("test");
        console.log(e);
        res.status(400).json({err: e});
    }
}

export{projectionQueryCities, deleteRowCities}

