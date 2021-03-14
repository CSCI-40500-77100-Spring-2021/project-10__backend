enum AppStage {
  Dev = 'dev',
  Prod = 'prod',
  Test = 'test'
}

export function getAppStage() : AppStage {
  switch (process.env.NODE_ENV?.toLowerCase()) {
    case 'test':
      return AppStage.Test;
    case 'prod':
      return AppStage.Prod;
    default:
      return AppStage.Dev;
  }
}

export default AppStage;
