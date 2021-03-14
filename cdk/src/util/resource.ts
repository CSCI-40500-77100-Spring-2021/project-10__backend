import AppStage from '../constant/app_stage';

export const resourceName = (
  resource: string,
  stage: AppStage,
) : string => `${resource}-${stage}`;
