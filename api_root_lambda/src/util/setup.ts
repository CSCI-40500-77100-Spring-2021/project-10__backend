import dotenv from 'dotenv';

dotenv.config();

export const GetENVOrThrow = (varname: string) : string => {
  if (process.env[varname] === undefined) throw new Error(`Missing ENV Var: ${varname}`);
  return process.env[varname] as string;
};
