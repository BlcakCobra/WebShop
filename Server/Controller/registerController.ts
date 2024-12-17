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
            const AllErrors = error.details.map((el) => el.message).join(', ');
            logger.warn(`Validation error: ${AllErrors}`);
            res.status(400).json({ message: AllErrors });
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

        const role = password === process.env.ADMIN_SECRET ? 'admin' : 'user';

        const hashedPassword = await hashPassword(password);
        const newUser = new User({ username, password: hashedPassword, role });
        await newUser.save();

        logger.info(`User successfully registered: ${username}`);
        res.status(201).json({ message: 'User successfully registered' });
    } catch (error: any) {
        logger.error(`Server error during registration: ${error.message}`);
        res.status(500).json({ message: 'Server error' });
    }
};
