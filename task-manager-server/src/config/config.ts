import dotenv from 'dotenv';

dotenv.config();

export const config = {
    port: parseInt(process.env.PORT || '3000', 10),
    jwtSecret: process.env.JWT_SECRET || 'superStrongSecretKey123',
    ENCRYPTION_KEY: process.env.ENCRYPTION_KEY || '12345678901234567890123456789012',
  };