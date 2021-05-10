import { CognitoIdentityServiceProvider } from 'aws-sdk';
import CognitoConfig from '../config/cognito';

export interface IUser {
  id: string;
  username: string;
  firstName?: string,
  lastName?: string
}

interface CognitoUserAttribute {
  Name: string,
  Value?: string
}

const Cognito = new CognitoIdentityServiceProvider();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ParseAttributeList = (username: string, attributes: Array<CognitoUserAttribute>) => {
  const user : Record<string, string> = {};
  attributes.forEach(({ Name, Value }) => {
    if (Value === undefined || Value === null) return;
    switch (Name) {
      case 'sub': {
        user.id = Value;
        break;
      }
      case 'given_name': {
        user.firstName = Value;
        break;
      }
      case 'family_name': {
        user.lastName = Value;
        break;
      }
      default:
        break;
    }
  });
  return {
    username,
    ...user,
  } as IUser;
};

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

const UniqueOnly = (users: IUser[]) : IUser[] => {
  const uniqueUsers : IUser[] = [];
  const seenIds = new Set<string>();
  users.forEach((user) => {
    if (!seenIds.has(user.id)) {
      seenIds.add(user.id);
      uniqueUsers.push(user);
    }
  });
  return uniqueUsers;
};

const QueryUserList = async (attributeKey: string, value: string) : Promise<Array<IUser>> => {
  const response = await Cognito.listUsers({
    UserPoolId: CognitoConfig.UserPoolId,
    Filter: `${attributeKey} = "${value}"`,
  }).promise();
  const users = response.Users?.map((user) => ParseAttributeList(
    user.Username as string,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    user.Attributes!,
  ));
  return users || [];
};

export const FindUser = async (query: string) : Promise<Array<IUser>> => {
  const [firstOrUserName, lastName] = query.split(' ');
  const userRequests : Array<Promise<IUser[]>> = [
    QueryUserList('given_name', firstOrUserName),
    QueryUserList('username', firstOrUserName),
  ];
  if (lastName) { userRequests.push(QueryUserList('family_name', lastName)); }
  const userResponses = await Promise.all(userRequests);
  const users : IUser[] = [];
  userResponses.forEach((userArray) => userArray.forEach((user) => users.push(user)));
  console.log(users);
  return UniqueOnly(users);
};
