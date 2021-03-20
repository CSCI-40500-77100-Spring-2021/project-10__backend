import AppStage from '../constant/app_stage';

export const resourceName = (
  resource: string,
  stage: AppStage,
) : string => {
  const base = `${resource}-${stage}`;
  if (stage !== AppStage.Prod) return `${base}-${process.env.USER}`;
  return base;
};

resourceName('abc', AppStage.Prod);
