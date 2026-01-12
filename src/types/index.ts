export interface RecentActivity {
  id: string;
  title: string;
  path: string;
  type: 'quiz' | 'guide' | 'game';
  timestamp: number;
}

// User model
export interface User {
  id: string;
  fullName: string;
  email: string;
  password: string;
  phone: string;
  educationalLevel: string;
  state: string;
  institution: string;
  role: 'user' | 'admin';
  subscriptionStatus: 'free' | 'premium' | 'trial';
  createdAt: string;
  streak?: number;
  lastPracticeDate?: string;
  recentActivity?: RecentActivity[];
}

export interface UserWithoutPassword extends Omit<User, 'password'> { }

// Performance tracking
export interface PerformanceEntry {
  id: string;
  userId: string;
  score: number;
  quizId: string;
  timeTaken: number;
  timestamp: number;
  topic?: string;
}

// Paper/Quiz
export interface QuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface QuestionData {
  id: string;
  text: string;
  options: QuestionOption[];
  explanation?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export interface Paper {
  id: string;
  title: string;
  subject: string;
  questions: QuestionData[];
  duration?: number; // in minutes
  createdAt: string;
  updatedAt?: string;
}

// Study Guide
export interface Guide {
  id: string;
  title: string;
  topic: string;
  content: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  createdAt: string;
  updatedAt?: string;
}

// Leaderboard
export interface LeaderboardEntry {
  id?: string;
  userId: string;
  userName: string;
  score: number;
  rank?: number;
  timestamp?: number;
}

// JWT Token payload
export interface TokenPayload {
  id: string;
  email: string;
  role: 'user' | 'admin';
}

// API Responses
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  statusCode: number;
}

// Auth request with user
export interface AuthenticatedRequest {
  user?: TokenPayload;
  [key: string]: any;
}
