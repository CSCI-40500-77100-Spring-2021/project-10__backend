# Scripts

## Running a script file

- Command: `yarn run file <filename> <arguments>`
- Example: `yarn run file user/create.ts --username shikdernyc`

## User

### Setup

Add the following variables to `.env` file

```
AWS_REGION
COGNITO_USER_POOL_ID
USER_POOL_CLIENT_ID
```

- `COGNITO_USER_POOL_ID` is located in Cognito -> This app's user pool -> General Setting. The entry is titled `Pool Id`
- `USER_POOL_CLIENT_ID` is located in Cognito -> This app's user pool -> General Settings -> App Clients. The entry is titled `App client id`

### Create User

- Documentation: See file header
- Location: `src/user/create.ts`
