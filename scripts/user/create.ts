/**
 * Creates Cognito User
 * Required Parameters
 * --firstname
 * --lastname
 * --username
 * --email
 * --password
 */

import Auth from "@aws-amplify/auth";
import * as minimist from "minimist";
import { ConfigureAmplify } from "../src/services/setup_amplify";

const create = async () => {
  // parse args
  try {
    const { firstname, lastname, username, email, password } = minimist(
      process.argv.slice(2)
    );
    if (firstname === undefined)
      throw new Error("Argument --firstname is required");
    if (lastname === undefined)
      throw new Error("Argument --lastname is required");
    if (username === undefined)
      throw new Error("Argument --username is required");
    if (email === undefined) throw new Error("Argument --email is required");
    if (password === undefined)
      throw new Error("Argument --password is required");
    // amplify setup
    console.log(password);
    ConfigureAmplify();
    await Auth.signUp({
      username: username as string,
      password: password as string,
      attributes: {
        email: email as string,
        given_name: firstname as string,
        family_name: lastname as string,
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
