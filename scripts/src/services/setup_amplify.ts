import Amplify from 'aws-amplify'
import * as dotenv from 'dotenv'
import { MissingEnvVar } from '../utils/error_message'
dotenv.config()

const getAuthConfig = () => {
  const {
    AWS_REGION,
    COGNITO_USER_POOL_ID,
    USER_POOL_CLIENT_ID
  } = process.env
  if(AWS_REGION === undefined) throw new Error(MissingEnvVar("AWS_REGION"))
  if(COGNITO_USER_POOL_ID === undefined) throw new Error(MissingEnvVar("COGNITO_USER_POOL_ID"))
  if(USER_POOL_CLIENT_ID === undefined) throw new Error(MissingEnvVar("USER_POOL_CLIENT_ID"))
  return {
    region: AWS_REGION,
    userPoolId: COGNITO_USER_POOL_ID,
    userPoolWebClientId: USER_POOL_CLIENT_ID,
  }
}

export const ConfigureAmplify = () => {
  Amplify.configure({
    Auth: getAuthConfig()
  })
}