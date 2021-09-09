import bcrypt from "bcrypt";

export default async function hashPassword(password:string):Promise<string> {
  const salt = await bcrypt.genSalt();
  password = await bcrypt.hash(password, salt);
  return password;
};

