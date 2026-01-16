import jwt from 'jsonwebtoken';
import { getSecretKey } from '../config.js';

export const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized',
            error: 'Authorization header is missing',
            statusCode: 401
        });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized',
            error: 'Bearer token is missing',
            statusCode: 401
        });
    }

    jwt.verify(token, getSecretKey(), (err, decoded) => {
        if (err) {
            return res.status(401).json({
                success: false,
                message: 'Token verification failed',
                error: err.message === 'jwt expired' ? 'Token has expired' : 'Invalid token',
                statusCode: 401
            });
        }
        req.user = decoded;
        next();
    });
};

export const authorizeAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({
            success: false,
            message: 'Forbidden',
            error: 'Admin access is required',
            statusCode: 403
        });
    }
    next();
};
