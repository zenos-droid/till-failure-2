import dotenv from 'dotenv';
import { z } from 'zod';
dotenv.config();
const schema = z.object({
    DATABASE_URL: z.string().min(1),
    PORT: z.coerce.number().default(4010),
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    CLIENT_URL: z.string().url().default('http://localhost:3000'),
    JWT_SECRET: z.string().min(32),
    REFRESH_TOKEN_SECRET: z.string().min(32),
    ACCESS_TOKEN_TTL: z.string().default('15m'),
    REFRESH_TOKEN_TTL: z.string().default('30d'),
    WHATSAPP_PROVIDER: z.string().default('disabled')
});
export const env = schema.parse(process.env);
