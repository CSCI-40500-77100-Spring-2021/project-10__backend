import { CognitoIdentityServiceProvider } from 'aws-sdk';
import AppConfig from '../config';

export type CognitoUserSummary = {
  id: string,
  username: string
}

export default class CognitoUserPool {
  private static Cognito = new CognitoIdentityServiceProvider()

  static async GetByUsername(username: string) : Promise<CognitoUserSummary> {
    const response = await this.Cognito.adminGetUser({
      UserPoolId: AppConfig.CognitoUserPoolId,
      Username: username,
    }).promise();
    const id = response.UserAttributes?.find((entry) => entry.Name === 'sub')?.Value;
    if (id === undefined) throw new Error('User ID not defined');
    return {
      id,
      username: response.Username,
    };
  }
}
