/* eslint-disable max-classes-per-file */
import AppStage, { getAppStage } from '../constant/app_stage';

class DefaultConfig {}

class TestConfig extends DefaultConfig {}

const getConfig = () => {
  if (getAppStage() === AppStage.Test) {
    return new TestConfig();
  }
  return new DefaultConfig();
};

export default getConfig();
