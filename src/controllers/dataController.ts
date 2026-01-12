import { Request, Response } from 'express';
import { readData, writeData, FILE_NAMES } from '../repositories/dataStore';
import { AuthRequest } from '../middleware/auth';
import { PerformanceEntry, User, Paper, Guide, RecentActivity } from '../types';

export const getPerformance = (req: AuthRequest, res: Response) => {
    if (!req.user) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized',
            error: 'Authentication required',
            statusCode: 401
        });
    }

    const allPerformance = readData<PerformanceEntry>(FILE_NAMES.PERFORMANCE);
    const userPerformance = allPerformance.filter(p => p.userId === req.user!.id);
    res.json({
        success: true,
        message: 'Performance data retrieved successfully',
        data: userPerformance,
        statusCode: 200
    });
};

export const savePerformance = (req: AuthRequest, res: Response) => {
    if (!req.user) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized',
            error: 'Authentication required',
            statusCode: 401
        });
    }

    const result = req.body;
    const performanceLog = readData<PerformanceEntry>(FILE_NAMES.PERFORMANCE);

    const newEntry: PerformanceEntry = {
        id: Date.now().toString(),
        userId: req.user.id,
        score: result.score,
        quizId: result.quizId,
        timeTaken: result.timeTaken,
        timestamp: Date.now()
    };

    performanceLog.push(newEntry);
    writeData(FILE_NAMES.PERFORMANCE, performanceLog);

    // Update User Progress (Streak & Activity)
    const users = readData<User>(FILE_NAMES.USERS);
    const userIndex = users.findIndex(u => u.id === req.user!.id);

    if (userIndex !== -1) {
        const user = users[userIndex];
        const today = new Date().toISOString().split('T')[0];
        const lastDate = user.lastPracticeDate || '';

        let newStreak = user.streak || 0;

        if (lastDate !== today) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toISOString().split('T')[0];

            if (lastDate === yesterdayStr) {
                newStreak += 1;
            } else if (lastDate === '') {
                newStreak = 1;
            } else {
                newStreak = 1; // Reset if missed a day
            }
            user.lastPracticeDate = today;
            user.streak = newStreak;
        }

        // Add to Recent Activity
        const papers = readData<Paper>(FILE_NAMES.PAPERS);
        const paper = papers.find(p => p.id === result.quizId);

        const newActivity: RecentActivity = {
            id: `practice-${Date.now()}`,
            title: paper?.title || 'Practice Session',
            path: '/practice',
            type: 'quiz',
            timestamp: Date.now()
        };

        const activity = user.recentActivity || [];
        // Keep last 5 unique activities
        const filteredActivity = activity.filter(a => a.title !== newActivity.title).slice(0, 4);
        user.recentActivity = [newActivity, ...filteredActivity];

        writeData(FILE_NAMES.USERS, users);
    }

    res.status(201).json({
        success: true,
        message: 'Performance data saved successfully',
        data: newEntry,
        statusCode: 201
    });
};

export const getGuides = (req: Request, res: Response) => {
    const guides = readData(FILE_NAMES.GUIDES);
    res.json({
        success: true,
        message: 'Guides retrieved successfully',
        data: guides,
        statusCode: 200
    });
};

export const getLeaderboard = (req: Request, res: Response) => {
    const leaderboard = readData(FILE_NAMES.LEADERBOARD);
    res.json({
        success: true,
        message: 'Leaderboard retrieved successfully',
        data: leaderboard,
        statusCode: 200
    });
};

export const updateLeaderboard = (req: Request, res: Response) => {
    const newScore = req.body;
    const leaderboard = readData<any>(FILE_NAMES.LEADERBOARD);
    leaderboard.push(newScore);
    // Sort and limit
    leaderboard.sort((a, b) => b.score - a.score);
    const top10 = leaderboard.slice(0, 10);
    writeData(FILE_NAMES.LEADERBOARD, top10);
    res.json({
        success: true,
        message: 'Leaderboard updated successfully',
        data: top10,
        statusCode: 200
    });
};

export const searchData = (req: Request, res: Response) => {
    const query = (req.query.q as string || '').toLowerCase();

    if (!query) {
        return res.json({
            success: true,
            message: 'Search results',
            data: { questions: [], guides: [] },
            statusCode: 200
        });
    }

    const papers = readData<Paper>(FILE_NAMES.PAPERS);
    const guides = readData<Guide>(FILE_NAMES.GUIDES);

    const questions: any[] = [];
    papers.forEach(paper => {
        paper.questions.forEach(q => {
            const matchInQuestion = q.text.toLowerCase().includes(query);
            const matchInOptions = q.options.some(o => o.text.toLowerCase().includes(query));

            if (matchInQuestion || matchInOptions) {
                questions.push({
                    ...q,
                    subject: paper.subject,
                    paperTitle: paper.title,
                    paperId: paper.id
                });
            }
        });
    });

    const filteredGuides = guides.filter(g =>
        g.title.toLowerCase().includes(query) ||
        g.topic.toLowerCase().includes(query) ||
        g.content.toLowerCase().includes(query)
    );

    res.json({
        success: true,
        message: 'Search results retrieved successfully',
        data: {
            questions: questions.slice(0, 50),
            guides: filteredGuides
        },
        statusCode: 200
    });
};
