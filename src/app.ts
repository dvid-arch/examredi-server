import 'dotenv/config';
import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import path from 'path';

import { getPort, getAllowedOrigins } from './config.js';

const app: Express = express();
const port = getPort();
const allowedOrigins = getAllowedOrigins();

// Security Middleware
app.use(helmet());

// CORS Configuration from environment
app.use(cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body Parser Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser());

// Basic Route for testing
app.get('/', (req: Request, res: Response) => {
    res.send('ExamRedi Backend API is running');
});

// Health check endpoint for Render/Monitoring
app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({
        status: 'UP',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// Routes
import authRoutes from './routes/authRoutes.js';
app.use('/auth', authRoutes);
import dataRoutes from './routes/dataRoutes.js';
app.use('/data', dataRoutes);
import aiRoutes from './routes/aiRoutes.js';
app.use('/ai', aiRoutes);
import adminRoutes from './routes/adminRoutes.js';
app.use('/admin', adminRoutes);

// Database Initialization (Mock)
import { initializeData } from './repositories/dataStore.js';
initializeData();


app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});

export default app;
