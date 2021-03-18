# MealSnap Backend

[![Continous Integration](https://github.com/CSCI-40500-77100-Spring-2021/project-10__backend/actions/workflows/continous-integration.yml/badge.svg)](https://github.com/CSCI-40500-77100-Spring-2021/project-10__backend/actions/workflows/continous-integration.yml)
[![Continous Deployment](https://github.com/CSCI-40500-77100-Spring-2021/project-10__backend/actions/workflows/continous-deployment.yml/badge.svg)](https://github.com/CSCI-40500-77100-Spring-2021/project-10__backend/actions/workflows/continous-deployment.yml)

API Link: https://dbkw974ay1.execute-api.us-east-1.amazonaws.com/prod

Architecture: https://github.com/CSCI-40500-77100-Spring-2021/project-10__backend/wiki/Full-Architecture

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
4. Setup CDK Environment Variables in `cdk/.env` with the properties listed below
5. Setup Lambda Environment Variables in `api_root_lambda/.env` with the properties listed below
6. Run `yarn install`

#### CDK Environment Variables

The following properties are database credential for the API that will be deployed by AWS

```
DB_URL=postgres://<user>:<password>@<hostname>/<db_name>
```

Example URL: `postgres://mealsnap_admin:password@localhost:5432/mealsnap_dev`

#### Lambda Environment Variables

The following properties are database credential for local unit tests run by lambda

```
TEST_DB_URL=postgres://<user>:<password>@<hostname>/<db_name>
```

### Deployment

##### Requirements

- All dependencies installed
- AWS Credential are configured (`aws configure`)

#### How to Deploy

1. Navigate to `cdk` directory
2. Run `cdk deploy`
