import * as dotenv from 'dotenv';

dotenv.config();

export const DatabaseURL = () : string => {
  const {
    DB_URL,
  } = process.env;
  if (DB_URL === undefined) throw new Error('DB_URL is not set as an env variable');
  return DB_URL;
};
