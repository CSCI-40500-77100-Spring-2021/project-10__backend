import { Sequelize } from 'sequelize';
import config from '../../config/database';
import AppStage, { getAppStage } from '../../constant/app_stage';

// Public for Testing
export function createSequelizeInstance(): Sequelize {
  try {
    console.log('Connecting to DB...');
    const sequelize = new Sequelize(config.ConnectionURL, {
      dialect: config.Dialect,
      logging: getAppStage() === AppStage.Test ? false : console.log,
    });
    console.log('\t\tSuccess!');
    return sequelize;
  } catch (error) {
    console.log('\t\tUnable to connect to database');
    throw error;
  }
}

export default createSequelizeInstance();
