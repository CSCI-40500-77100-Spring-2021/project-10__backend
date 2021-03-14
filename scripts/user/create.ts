/**
 * Creates Cognito User
 * You can either create a user passing in all their info(Custom User)
 * or create a default user from `src/config/default_user.ts`
 *
 * ======= Custom User =======
 * Required Parameters
 * --firstname
 * --lastname
 * --username
 * --email
 * --password
 *
 * ======= Default User =======
 * Required Parameter
 * -d
 * --email
 */

import Auth from "@aws-amplify/auth";
import * as minimist from "minimist";
import default_user from "../src/config/default_user";
import { ConfigureAmplify } from "../src/services/setup_amplify";

const getCredential = () => {
  const {
    firstname,
    lastname,
    username,
    email,
    password,
    d: defaultUser,
  } = minimist(process.argv.slice(2));
  if (email === undefined) throw new Error("Argument --email is required");
  if (defaultUser) {
    return {
      email: email as string,
      ...default_user,
    };
  }
  if (firstname === undefined)
    throw new Error("Argument --firstname is required");
  if (lastname === undefined)
    throw new Error("Argument --lastname is required");
  if (username === undefined)
    throw new Error("Argument --username is required");
  if (password === undefined)
    throw new Error("Argument --password is required");
  return {
    username: username as string,
    password: password as string,
    firstname: firstname as string,
    lastname: lastname as string,
    email: email as string
  }
};

const create = async () => {
  // parse args
  try {
    // amplify setup
    ConfigureAmplify();
    const {
      firstname,
      lastname,
      email,
      username,
      password
    } = getCredential()
    await Auth.signUp({
      username: username,
      password: password,
      attributes: {
        email: email,
        given_name: firstname,
        family_name: lastname,
      },
    });
    console.log(
      "Successfully created user. Check your email to confirm registration"
    );
  } catch (error) {
    console.error(error);
    if (error.message) {
      console.error(error.message);
    }
    throw error;
  }
};

create();
