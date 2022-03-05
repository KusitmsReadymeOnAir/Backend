require('dotenv').config();

const db_url = process.env.DB_URL;

const config = {
    dbURL: db_url
}

export default config;