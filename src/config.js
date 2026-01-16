export const getSecretKey = () => {
    const key = process.env.JWT_SECRET;
    if (!key) throw new Error('JWT_SECRET environment variable is required');
    return key;
};

export const getRefreshSecretKey = () => {
    const key = process.env.JWT_REFRESH_SECRET;
    if (!key) throw new Error('JWT_REFRESH_SECRET environment variable is required');
    return key;
};

export const getPort = () => process.env.PORT || 3000;

export const getAllowedOrigins = () => (process.env.ALLOWED_ORIGINS || 'http://localhost:5000').split(',');
