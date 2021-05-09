import { GetENVOrThrow } from '../util/setup';

export default class CognitoConfig {
  static UserPoolId = GetENVOrThrow('COGNITO_USER_POOL_ID')
}
