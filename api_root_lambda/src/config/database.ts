/* eslint-disable max-classes-per-file */
import { Dialect } from 'sequelize';
import dotenv from 'dotenv';
import AppStage, { getAppStage } from '../constant/app_stage';

dotenv.config();

export interface DatabaseConfig {
  Dialect: Dialect
  ConnectionURL: string
}

class DefaultConfig implements DatabaseConfig {
  Dialect: Dialect;

  ConnectionURL: string;

  constructor() {
    const {
      DB_URL,
    } = process.env;
    if (DB_URL === undefined) throw new Error('Environment Variable Mission: DB_URL');

    this.Dialect = 'postgres';
    this.ConnectionURL = DB_URL;
  }
}

class TestConfig extends DefaultConfig {
  constructor() {
    super();
    const {
      TEST_DB_URL,
    } = process.env;
    if (TEST_DB_URL === undefined) throw new Error('Environment Variable Mission: TEST_DB_URL');
  }
}

const getConfig = () => {
  if (getAppStage() === AppStage.Test) {
    return new TestConfig();
  }
  return new DefaultConfig();
};

export default getConfig();
