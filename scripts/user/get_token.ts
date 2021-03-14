/**
 * Get JWT Token for Cognito User
 * You can either get credential using login and password
 * or get token for default user `src/config/default_user.ts`
 *
 * ======= Login/Password =======
 * Required Parameters
 * --username
 * --password
 *
 * ======= Default User =======
 * Required Parameter
 * -d
 */

import Auth from "@aws-amplify/auth";
import * as minimist from "minimist";
import default_user from "../src/config/default_user";
import { ConfigureAmplify } from "../src/services/setup_amplify";

const getCredential = () => {
  const { username, password, d: useDefault } = minimist(process.argv.slice(2));
  if(useDefault) {
    return{
      username: default_user.username,
      password: default_user.password
    }
  }
  if (username === undefined)
    throw new Error("Argument --username is required");
  if (password === undefined)
    throw new Error("Argument --password is required");
  return {
    username: username as string,
    password: password as string
  }
}

const getToken = async () => {
  // parse args
  try {
    const {
      username,
      password
    } = getCredential()
    // amplify setup
    ConfigureAmplify();
    await Auth.signIn({
      username,
      password,
    });
    const token = (await Auth.currentSession()).getIdToken().getJwtToken();
    console.log(token);
  } catch (error) {
    console.error(error);
    if (error.message) {
      console.error(error.message);
    }
    throw error;
  }
};

getToken();
