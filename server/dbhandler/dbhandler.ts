import { PrismaClient } from "@prisma/client";

// TODO: put queries here
export class DBHandler {
    prisma: PrismaClient = new PrismaClient();

    // show jobs that are not expired
    async findJobs(): Promise<object | null>{
        const getQuery: object | null = await this.prisma.requires.findMany({
            where: {
                positions: {
                    expiry: {
                        gt: new Date()
                    }
                }
            },
            select: {
                reqid: true,
                positions: {
                    select: {
                        url: true
                    }
                }
            },
        })
        return getQuery;
    }

    // template
    // async showAllJobs(): Promise<object | null> {
    //
    // }

    // shows all jobs
    async showAllJobs(): Promise<object | null> {
        const getQuery: object | null = await this.prisma.positions.findMany()
        return getQuery;
    }

    // shows available jobs
    async showNumberOfJobsAvailable(): Promise<object | null> {
        const getQuery: object | null = await this.prisma.positions.aggregate({
            _count: {
                pid: true
            }
        })
        return getQuery;
    }

    // company that has all of position types
    async companyWithAllPositionTypes(): Promise<object | null> {
        const getAllPositionTypes: object | null = await this.prisma.position_types.findMany({
            select: {
                ptype: true
            }
        });
        const getAllPositionsOfACompany: object | null = await this.prisma.companies.findMany({
            select: {
                comid: true,
                positions: {
                    select: {
                        ptype: true
                    }
                }
            }
        })
        const getQuery: object | null = await this.prisma.companies.findMany({
            where: {
                positions: {
                }
            },
            select: {
                comid: true,
                positions: {
                    select: {
                        pid: true
                    }
                }
            }
        })
        return getQuery;
    }
}