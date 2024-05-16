const Pool = require('pg').Pool
require("dotenv").config();


const devConfig = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;

const pool = new Pool({
    connectionString: devConfig,
    ssl: process.env.DATABASE_URL ? true : false
});
module.exports = pool;