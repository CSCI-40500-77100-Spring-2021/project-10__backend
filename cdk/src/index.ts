#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import AppStack from './stack/root_stack';
import { getAppStage } from './constant/app_stage';

const {
  DB_URL,
} = process.env;
if (DB_URL === undefined) throw new Error('DB_URL is not set as an env variable');

const app = new cdk.App();
// eslint-disable-next-line no-new
new AppStack(app, `MealSnapAppStack-${getAppStage()}`, {
  stage: getAppStage(),
});
