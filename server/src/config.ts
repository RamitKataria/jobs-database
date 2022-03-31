import {PrismaClient} from "@prisma/client";
// const { Client } = require('pg') // import node-postgres

const isProduction = process.env.NODE_ENV === 'production';
if (!isProduction) {
    require('dotenv').config({ path: '.env.local' });
    console.log('DATABASE_URL: ' + process.env.DATABASE_URL);
}

let prisma: PrismaClient = new PrismaClient();

// const client = new Client({
//     connectionString: process.env.DATABASE_URL,
//     ssl: {
//         rejectUnauthorized: false
//     }
// });
//
// client.connect();

module.exports = { prisma, isProduction };
