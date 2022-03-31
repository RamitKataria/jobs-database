// const fetch = require('node-fetch'); // import node-fetch (enables the fetch API to be used server-side)
const { Client } = require('pg') // import node-postgres

const isProduction = process.env.NODE_ENV === 'production';
if (!isProduction) {
    require('dotenv').config({ path: '.env.local' });
    console.log('DATABASE_URL: ' + process.env.DATABASE_URL);
}

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

// client.connect();

module.exports = { client, isProduction };
