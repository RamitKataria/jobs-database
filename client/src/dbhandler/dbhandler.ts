import { PrismaClient } from "@prisma/client";

// TODO: put queries here
export class DBHandler {
    prisma: PrismaClient = new PrismaClient();

    // sample query
    async query1 (id: number): Promise<object>{
        // Returns an object or null
        const getUser: object | null = await this.prisma.user.findUnique({
            where: {
                id: id,
            },
            select: {
                email: true,
                name: true,
            },
        })
        return getUser;
    }
}