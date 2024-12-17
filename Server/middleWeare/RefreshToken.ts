import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import User from '../models/user';

export const refreshToken = async (req: Request, res: Response): Promise<void> => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        res.status(401).json({ message: 'No refresh token provided' });
        return;
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET as string) as { id: string; role: string };

        const user = await User.findById(decoded.id);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        const newAccessToken = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET as string,
            { expiresIn: '1h' }
        );

        const newRefreshToken = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_REFRESH_SECRET as string,
            { expiresIn: '7d' }
        );

        res.status(200).json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            res.status(401).json({ message: 'Refresh token has expired' });
        } else if (error instanceof jwt.JsonWebTokenError) {
            res.status(401).json({ message: 'Invalid refresh token' });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};
