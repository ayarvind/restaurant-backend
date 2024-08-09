import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

function authMiddleWare(req: Request, res: Response, next: NextFunction) {
    const unProtectedRoutes = ['/api/login', '/api/register','/health'];
    if (unProtectedRoutes.includes(req.path)) {
        return next();
    }
    // Retrieve the token from headers
    const token = req.headers['x-auth-token'] as string;
    // If there is no token, return an error response
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }
    try {
        // Verify token
        const secret = process.env.JWT_SECRET || '';
        if (!secret) {
            throw new Error('JWT_SECRET is not defined');
        }
        const decoded = jwt.verify(token, secret) as jwt.JwtPayload;
        // Attach the decoded user information to the request object
        req.body.user = decoded;
        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(401).json({ message: 'Token is not valid' });
    }
}
export default authMiddleWare;
