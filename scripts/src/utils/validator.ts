import * as dotenv from 'dotenv'
import { MissingEnvVar } from './error_message'
dotenv.config()

export const GetEnv = (varname: string, throwIfNotFound = true) => {
  const value = process.env[varname]
  if(value === undefined && throwIfNotFound){
    throw new Error(MissingEnvVar(varname))
  }
  return value
}