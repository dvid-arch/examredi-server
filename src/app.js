import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

import { getPort, getAllowedOrigins } from './config.js';

const app = express();
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
app.get('/', (req, res) => {
    res.send('ExamRedi Backend API is running');
});

// Health check endpoint for Render/Monitoring
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'UP',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// Routes
import authRoutes from './routes/authRoutes.js';
app.use('/api/auth', authRoutes);
import dataRoutes from './routes/dataRoutes.js';
app.use('/api/data', dataRoutes);
import aiRoutes from './routes/aiRoutes.js';
app.use('/api/ai', aiRoutes);
import adminRoutes from './routes/adminRoutes.js';
app.use('/api/admin', adminRoutes);

// Database Initialization (Mock)
import { initializeData } from './repositories/dataStore.js';
initializeData();


// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        success: false,
        message: 'Server Error',
        error: err.message || 'Internal Server Error',
        statusCode: err.status || 500
    });
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});

export default app;
