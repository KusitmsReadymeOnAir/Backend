require('dotenv').config();

const db_url = process.env.DB_URL;
const accessKeyId = process.env.accessKeyId;
const secretAccessKey = process.env.secretAccessKey;

const config = {
    dbURL: db_url,
    accessKeyId : accessKeyId,
    secretAccessKey : secretAccessKey
}

export default config;