import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user";
import { Request, Response } from 'express';
import logger from "../log/logger";

export const loginControll = async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;

    try {
        if (!username || !password) {
            logger.warn('Login attempt missing username or password');
            res.status(400).json({ message: 'Username and password are required' });
            return;
        }

        const user = await User.findOne({ username });
        if (!user) {
            logger.warn(`Login attempt for non-existent user: ${username}`);
            res.status(404).json({ message: 'User not found' });
            return;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            logger.warn(`Invalid password attempt for user: ${username}`);
            res.status(401).json({ message: 'Invalid password' });
            return;
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET as string,
            { expiresIn: '8d' }
        );

        const refreshToken = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_REFRESH_SECRET as string,
            { expiresIn: '7d' }
        );
        logger.info(`User logged in successfully: ${username}`);

        res.status(200).json({ token, refreshToken });

    } catch (error: any) {
        logger.error(`Server error during login: ${error.message}`);
        res.status(500).json({ message: 'Internal server error' });
    }
};
