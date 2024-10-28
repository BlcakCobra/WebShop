import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user";
import { Request, Response } from 'express';
import logger from "../log/logger";

export const loginControll = async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            logger.warn(`Login attempt for non-existent user: ${username}`);
            res.status(400).json({ message: 'User not found' });
            return;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            logger.warn(`Invalid password attempt for user: ${username}`);
            res.status(401).json({ message: 'Invalid password' });
            return;
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET as string,
            { expiresIn: '1h' }
        );
        logger.info(`User logged in successfully: ${username}`); 
        res.status(200).json({ token });
    } catch (error:any) {
        logger.error(`Server error during login: ${error.message}`); 
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};