import { Request, Response } from 'express';
import User from '../models/user'; 
import { userRegisterationSchema } from '../validation/userValidation';
import { hashPassword } from '../utilits/PasswordUtilits';
import logger from '../log/logger';

export const registerControl = async (req: Request, res: Response): Promise<void> => {
    const { username, password, confirmPassword } = req.body;
    
    try {
        const { error } = userRegisterationSchema.validate(req.body);
        if (error) {
            logger.warn(`Validation error: ${error.details[0].message}`); 
            res.status(400).json({ message: error.details[0].message });
            return;
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            logger.warn(`User already exists: ${username}`);
            res.status(400).json({ message: 'User with this username already exists' });
            return;
        }

        if (password !== confirmPassword) {
            logger.warn(`Password confirmation mismatch for user: ${username}`); 
            res.status(400).json({ message: 'Password confirmation does not match' });
            return;
        }

        const hashedPassword =await hashPassword(password)
        const newUser = new User({ username, password: hashedPassword}); 
        await newUser.save();

        logger.info(`User successfully registered: ${username}`); 
        res.status(201).json({ message: 'User successfully registered' });
    } catch (error:any) {
        logger.error(`Server error during registration: ${error.message}`);
        res.status(500).json({ message: 'Server error' });
    }
};