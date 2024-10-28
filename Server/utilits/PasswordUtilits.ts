import bcrypt from "bcrypt"

export const hashPassword = async (password: string): Promise<string> => {
    const saltRounds = 15;
    return await bcrypt.hash(password, saltRounds);
  };
