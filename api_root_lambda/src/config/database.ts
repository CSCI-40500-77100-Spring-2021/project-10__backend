/* eslint-disable max-classes-per-file */
import { Dialect } from 'sequelize';
import dotenv from 'dotenv';
import AppStage, { getAppStage } from '../constant/app_stage';

dotenv.config();

// Database Development Guide: https://csci435bookrec.atlassian.net/wiki/spaces/BRecSpace/pages/69664769/Database
export interface DatabaseConfig {
  Host: string
  User: string
  Password: string
  Dialect: Dialect
  DatabaseName: string
}

class DefaultConfig implements DatabaseConfig {
  Host: string;

  User: string;

  Password: string;

  Dialect: Dialect;

  DatabaseName: string;

  constructor() {
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
    this.Host = DB_HOST;
    this.User = DB_USER;
    this.Password = DB_PASSWORD;
    this.Dialect = 'postgres';
    this.DatabaseName = DB_NAME;
  }
}

class TestConfig implements DatabaseConfig {
  Host: string;

  User: string;

  Password: string;

  Dialect: Dialect;

  DatabaseName: string;

  constructor() {
    // USER WILL NEED TO SETUP THIS DB IN THEIR OWN MACHINE
    const {
      TEST_DB_HOST,
      TEST_DB_USER,
      TEST_DB_PASSWORD,
      TEST_DB_NAME,
    } = process.env;
    console.log(process.env);
    if (TEST_DB_HOST === undefined) throw new Error('TEST_DB_HOST is not set as an env variable');
    if (TEST_DB_USER === undefined) throw new Error('TEST_DB_USER is not set as an env variable');
    if (TEST_DB_PASSWORD === undefined) throw new Error('TEST_DB_PASSWORD is not set as an env variable');
    if (TEST_DB_NAME === undefined) throw new Error('TEST_DB_NAME is not set as an env variable');
    this.Host = TEST_DB_HOST;
    this.User = TEST_DB_USER;
    this.Password = TEST_DB_PASSWORD;
    this.Dialect = 'postgres';
    this.DatabaseName = TEST_DB_NAME;
  }
}

const getConfig = () => {
  if (getAppStage() === AppStage.Test) return new TestConfig();
  return new DefaultConfig();
};

export default getConfig();
