import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient = new PrismaClient();

async function querySwitchPositions(req: Request, res: Response) {
  try {
    switch (req.body.queryType) {
      case "projection":
        return await projectionQueryPositions(req, res);
      case "selection":
        return await selectionQueryPositions(req, res);
      // case "join":
      //   return await joinQueryPositions(req, res);
      case "aggregation":
        return await aggregationQueryPositions(req, res);
      case "division":
        return await divisionQueryPositions(req, res);
      default:
        res.status(404).json({err: "Not found"});
    }
  } catch (e) {
    res.status(400).json({err: e});
  }
}

function selectFieldOptionsPositions(fields: any): any {
  let pid = fields.pid;
  let url = fields.url;
  let description = fields.description;
  let title = fields.title;
  let expiry = fields.expiry;
  let comid = fields.comid;
  let ptype = fields.ptype;

    const options = {
      pid: pid,
      url: url,
      description: description,
      title: title,
      expiry: expiry,
      comid: comid,
      ptype: ptype
    }
    return options;
}

async function projectionQueryPositions(req: Request, res: Response) {
  try{
    const fields = req.body.fields;
    const selectOptions = selectFieldOptionsPositions(fields);
    const getQuery: object | null = await prisma.positions.findMany({
      select: selectOptions
    });
    if(getQuery === null) {
      res.status(400).json(getQuery);
    } else {
      res.status(200).json(getQuery);
    }
  } catch (e) {
    res.status(400).json({err: e});
  }
}

async function selectionQueryPositions(req: Request, res: Response) {
  try{
    const fields = req.body.fields;
    let date = new Date();
    const selectOptions = selectFieldOptionsPositions(fields);
    const getQuery: object | null = await prisma.positions.findMany({
      where: {
        expiry: {
          gt: date
        }
      },
      select: fields
    });
    if(getQuery === null) {
      res.status(400).json(getQuery);
    } else {
      res.status(200).json(getQuery);
    }
  } catch (e) {
    res.status(400).json({err: e});
  }
}

// async findJobs(): Promise<object | null>{
//     const getQuery: object | null = await this.prisma.requires.findMany({
//         where: {
//             positions: {
//                 expiry: {
//                     gt: new Date()
//                 }
//             }
//         },
//         select: {
//             reqid: true,
//             positions: {
//                 select: {
//                     url: true
//                 }
//             }
//         },
//     })
//     return getQuery;

// async function joinQueryPositions(req: Request, res: Response): Promise <object | null> {
//   try{
//
//   } catch (e) {
//     res.status(400).json({err: e});
//   }
// }

async function insertRowPositions(req: Request, res: Response) {
  try{
    const reqData = req.body;

    await prisma.positions.create({
      data: {
        pid: reqData.pid,
        url: reqData.url,
        description: reqData.description,
        title: reqData.title,
        expiry: reqData.expiry,
        comid: reqData.comid,
        ptype: reqData.ptype
      }
    });
    res.status(200).json({status: "OK"});
  } catch (e) {
    res.status(400).json({err: e});
  }
}

async function aggregationQueryPositions(req: Request, res: Response){
  try{
    const getQuery2: object | null = await prisma.positions.aggregate({
      _count: {
        pid: true
      }, where: {
        expiry: {
          gt: new Date()
        }
      }
    })
    if(getQuery2 === null) {
      res.status(404).json(getQuery2);
    } else{
      res.status(200).json(getQuery2);
    }
  } catch (e) {
    res.status(400).json({err: e});
  }
}
async function divisionQueryPositions(req: Request, res: Response) {
  try{
    const getAllPositionTypes: any = await prisma.position_types.findMany({
        select: {
            ptype: true
        }
    });
    if (getAllPositionTypes === null) {
      res.status(404).json(getAllPositionTypes);
      return;
    }
    let pTypes = [];
    for(let i  = 0; i < getAllPositionTypes.length; i++) {
      pTypes.push(getAllPositionTypes[i].ptype);
    }

    const getAllPositionsOfACompany: any = await prisma.companies.findMany({
        select: {
            comid: true,
            positions: {
                select: {
                    ptype: true
                }
            }
        }
    });
    if (getAllPositionsOfACompany === null) {
      res.status(404).json(getAllPositionTypes);
      return;
    }
    let comid = [];
    for(let i  = 0; i < getAllPositionsOfACompany.length; i++) {
      let companyPType = [];
      for(let j  = 0; j < getAllPositionsOfACompany[i].positions.length; j++) {
        companyPType.push(getAllPositionsOfACompany[i].positions[j].ptype);
      }
      let validCom = true;
      for(let j = 0; j < pTypes.length; j++) {
        if(!companyPType.includes(pTypes[j])) {
          validCom = false;
        }
      }
      if(validCom) {
        comid.push(getAllPositionsOfACompany[i].comid);
      }
    }
    const getQuery: object | null = await prisma.companies.findMany({
        where: {
            comid: {
              in: comid
            }
        },
        select: {
            comid: true,
            comname: true,
            nempl: true,
        }
    });
    if(getQuery === null) {
      res.status(404).json(getQuery);
    } else{
      res.status(200).json(getQuery);
    }
  } catch (e) {
    console.log(e);
    res.status(400).json({err: e});
  }
}