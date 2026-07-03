import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { prisma } from '../database/prisma.js';
import { AppError } from '../shared/http.js';
export async function requireAuth(req, _res, next) {
    const header = req.headers.authorization;
    const token = header?.startsWith('Bearer ') ? header.slice(7) : undefined;
    if (!token)
        return next(new AppError(401, 'Authentication required'));
    try {
        const payload = jwt.verify(token, env.JWT_SECRET);
        const user = await prisma.user.findUnique({ where: { id: payload.id } });
        if (!user || !user.isActive)
            return next(new AppError(401, 'Inactive account'));
        req.user = { id: user.id, role: user.role, email: user.email };
        next();
    }
    catch {
        next(new AppError(401, 'Invalid or expired token'));
    }
}
export const allowRoles = (...roles) => (req, _res, next) => {
    if (!req.user)
        return next(new AppError(401, 'Authentication required'));
    if (!roles.includes(req.user.role))
        return next(new AppError(403, 'Insufficient role scope'));
    next();
};
