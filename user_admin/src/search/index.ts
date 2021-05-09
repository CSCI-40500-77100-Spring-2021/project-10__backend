import { CognitoIdentityServiceProvider } from 'aws-sdk';
import CognitoConfig from '../config/cognito';

interface IUser {
  id: string;
  username: string;
}

const Cognito = new CognitoIdentityServiceProvider();

export const FindUserByUsername = async (
  username: string,
): Promise<IUser | undefined> => {
  const response = await Cognito.adminGetUser({
    UserPoolId: CognitoConfig.UserPoolId,
    Username: username,
  }).promise();
  const id = response.UserAttributes?.find((entry) => entry.Name === 'sub')
    ?.Value as string;
  return {
    id,
    username: response.Username,
  };
};
