import { ZodError } from 'zod';
import { AppError } from '../shared/http.js';
export function notFound(req, res) {
    res.status(404).json({ message: `Route not found: ${req.method} ${req.path}` });
}
export function errorHandler(error, _req, res, _next) {
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
    }
    if (error instanceof ZodError) {
        return res.status(400).json({ message: 'Validation failed', issues: error.issues });
    }
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
}
