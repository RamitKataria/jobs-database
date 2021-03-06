import { Request, Response, NextFunction } from 'express';
const { prisma } = require('../config');

async function querySwitchPositions(req: Request, res: Response) {
  switch (req.params.queryType) {
    case "projection":
      return await projectionQueryPositions(req, res);
    case "selection":
      return await selectionQueryPositions(req, res);
    case "join":
      return await joinQueryPositions(req, res);
    case "aggregation_positions_count":
      return await aggregationQueryPositions(req, res);
    case "aggregation_positions_count_groupby":
      return await aggregationQueryPositionsGroupBy(req, res);
    case "division":
      return await divisionQueryPositions(req, res);
    default:
      res.status(404).json({err: "Not found"});
  }
}

async function selectAllFields(req: Request, res: Response) {
  try {
    const getQuery: object | null = await prisma.positions.findMany();
    if(getQuery === null) {
      res.status(400).json(getQuery);
    } else {
      res.status(200).json(getQuery);
    }
  } catch (e) {
    res.status(400).json({err: e});
  }
}

function selectFieldOptionsPositions(fields: any): any {
  let pid = eval(fields.pid);
  let url = eval(fields.url);
  let description = eval(fields.description);
  let title = eval(fields.title);
  let expiry = eval(fields.expiry);
  let comid = eval(fields.comid);
  let ptype = eval(fields.ptype);

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
    const fields = req.params;
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
    console.log(e);
    res.status(400).json({err: e});
  }
}

async function selectionQueryPositions(req: Request, res: Response) {
  try{
    const fields = req.params;
    const selectOptions = selectFieldOptionsPositions(fields);
    let date = new Date();
    const getQuery: object | null = await prisma.positions.findMany({
      where: {
        expiry: {
          gt: date
        }
      },
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

async function joinQueryPositions(req: Request, res: Response) {
  try{
    const getQuery: object | null = await prisma.positions.findMany({
      where: {
        expiry: {
          gt: new Date()
        }
      },
      select: {
        pid: true,
        url: true,
        title: true,
        companies: {
          select: {
            comname: true
          }
        }
      }
    });
    if(getQuery === null) {
      res.status(400).json(getQuery);
    } else {
      // @ts-ignore
      for (let result of getQuery) {
        result.companies = result.companies.comname;
      }
      res.status(200).json(getQuery);
    }
  } catch (e) {
    console.log(e);
    res.status(400).json({err: e});
  }
}

async function insertRowPositions(req: Request, res: Response) {
  try{
    const reqData = req.body;

    await prisma.positions.create({
      data: {
        url: reqData.url,
        description: reqData.description,
        title: reqData.title,
        expiry: reqData.expiry,
        comid: reqData.comid,
        ptype: reqData.ptype
      }
    });

    const getQuery = await prisma.positions.findFirst({
      orderBy:{
        pid: 'desc'
      },
      select: {
        pid: true
      }
    });

    await prisma.located_in.create({
      data: {
        pid: getQuery.pid,
        cityname: reqData.cityname,
        counname: reqData.counname
      }
    });
    res.status(200).json({status: "OK"});
  } catch (e) {
    console.log(e);
    res.status(400).json({err: e});
  }
}

async function aggregationQueryPositionsGroupBy(req: Request, res: Response){
  try{
    const getQuery2: object | null = await prisma.located_in.groupBy({
      by: ['cityname'],
      where: {
        positions: {
          expiry: {
            gt: new Date()
          }
        }
      },
      _count: {
        pid: true
      }
    })
    if(getQuery2 === null) {
      res.status(404).json(getQuery2);
    } else{
      // @ts-ignore
      for (let result of getQuery2) {
        result._count= result._count.pid;
      }
      res.status(200).json(getQuery2);
    }
  } catch (e) {
    console.log(e);
    res.status(400).json({err: e});
  }
}

async function aggregationQueryPositions(req: Request, res: Response){
  try{
    const getQuery2: object | null = await prisma.positions.aggregate({
      where: {
        expiry: {
          gt: new Date()//
        }
      },
      _count: {
        pid: true
      }
    })
    if(getQuery2 === null) {
      res.status(404).json(getQuery2);
    } else{
      //@ts-ignore
      getQuery2._count= getQuery2._count.pid;
      res.status(200).json(getQuery2);
    }
  } catch (e) {
    console.log(e);
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

async function updateRowPositions(req: Request, res: Response) {
  try{
    const reqData = req.body;

    await prisma.positions.update({
      where:{
        pid: reqData.fields.pid
      },
      data: reqData.fields
    });
    res.status(200).json({status: "OK"});
  } catch (e) {
    console.log(e);
    res.status(400).json({err: e});
  }
}

async function deleteRowPositions(req: Request, res: Response) {
  try{
    const reqData = req.params;

    await prisma.located_in.deleteMany({
      where: {
        pid: parseInt(reqData.pid)
      }
    });

    await prisma.positions.delete({
      where: {
        pid: parseInt(reqData.pid)
      }
    });
    res.status(200).json({status: "OK"});
  } catch (e) {
    console.log(e);
    res.status(400).json({err: e});
  }
}

const { client } = require('../config');

function testAPI(req: Request, res: Response) {
    res.json({
        message: 'Hello',
    });
}

// async function getPositions(req: Request, res: Response) {
//     const qText = 'SELECT * FROM Positions;';
//
//     try {
//         const dbResponse = await client.query(qText);
//         console.log(dbResponse);
//         if ('rows' in dbResponse) {
//             for (let row of dbResponse.rows) {
//                 console.log(JSON.stringify(row));
//             }
//             res.status(200).json(dbResponse.rows);
//         }
//     } catch (err: unknown) {
//         console.log(err);
//     }
// }

// export {testAPI, getPositions, insertRowPositions, querySwitchPositions};
export {testAPI, insertRowPositions, updateRowPositions, deleteRowPositions, querySwitchPositions};
