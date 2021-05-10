# Scripts

## Getting Started

1. Add the following variables to `.env` file
   ```
   AWS_REGION
   COGNITO_USER_POOL_ID
   USER_POOL_CLIENT_ID
   ```
   - `COGNITO_USER_POOL_ID` is located in Cognito -> This app's user pool -> General Setting. The entry is titled `Pool Id`
   - `USER_POOL_CLIENT_ID` is located in Cognito -> This app's user pool -> General Settings -> App Clients. The entry is titled `App client id`
2. Install Dependencies: `yarn install`
3. Run a script with `yarn run file <filename>`

## Scripts

### Create User

- Documentation: See file header
- Create Default User: `yarn run file user/create.ts -d --email <your-email>`
- Create Any User: `yarn run file user/create.ts <arguments>`
  Arguments are listed in the header of `user/create.ts` file

### Generate Auth Token

- Get Token for Default User: `yarn run file user/get_token.ts -d`

- Get Token for Specific User: `yarn run file user/get_token.ts --username <username> --password <password>`

### Populate Database with Gallery Entries

1. Add the following entries to `.env` file
   ```
   DB_TABLE_NAME
   DB_TABLE_REGION
   ```
2. Run command: `yarn run file gallery/add_entries.ts --userid <userid> --count<total-entries-to-add>`
