#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import AppStack from './stack/root_stack';

const app = new cdk.App();
new AppStack(app, 'MealSnapAppStack');
