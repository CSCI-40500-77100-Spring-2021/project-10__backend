enum AppStage {
  Dev = 'dev',
  Test = 'test',
  Prod = 'prod'
}

export function getAppStage() : AppStage {
  // Stage can be set by either NODE_ENV or STAGE
  // STAGE variable takes priority and is expected to be set by CDK
  const stageStr = process.env.STAGE ? process.env.STAGE : process.env.NODE_ENV;
  switch (stageStr?.toLowerCase()) {
    case 'test':
      return AppStage.Test;
    case 'prod':
      return AppStage.Prod;
    default:
      return AppStage.Dev;
  }
}

export default AppStage;
