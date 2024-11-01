import bcrypt from "bcrypt";

export const hashPassword = async (password: string): Promise<string> => {
    if (!password) {  
        throw new Error('Password cannot be empty');
    }
    if (typeof password !== 'string') {  
        throw new Error('Password must be a string');
    }
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};
