# MealSnap Backend
[![Merge Check](https://github.com/CSCI-40500-77100-Spring-2021/project-10__backend/actions/workflows/merge-check.yml/badge.svg?branch=master)](https://github.com/CSCI-40500-77100-Spring-2021/project-10__backend/actions/workflows/merge-check.yml)

## Requirements

- [NodeJS 12](https://github.com/nvm-sh/nvm)
- Yarn: `npm install -g yarn`
- Typescript: `yarn global add typescript`
- [AWS CLI 2](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)
- [Configure AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html)
- AWS CDK: `yarn global add aws-cdk`

## Get Started

### Installing Dependencies

1. Navigate to `cdk` folder
2. Run `yarn install`
3. Navigate to `api_root_lambda`
4. Run `yarn install`

### Deployment

##### Requirements

- All dependencies installed
- AWS Credential are configured (`aws configure`)

#### How to Deploy

1. Navigate to `cdk` directory
2. Run `cdk deploy`
