import * as dotenv from 'dotenv';

dotenv.config();

const {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
} = process.env;
if (DB_HOST === undefined) throw new Error('DB_HOST is not set as an env variable');
if (DB_USER === undefined) throw new Error('DB_USER is not set as an env variable');
if (DB_PASSWORD === undefined) throw new Error('DB_PASSWORD is not set as an env variable');
if (DB_NAME === undefined) throw new Error('DB_NAME is not set as an env variable');

export default {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
};
