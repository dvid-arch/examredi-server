# ExamRedi Standalone Server

This is the standalone backend for the ExamRedi platform, built with Node.js, Express, and TypeScript.

## 🚀 Deployment on Render

To host this server on [Render](https://render.com), follow these steps:

1. **Create a New Web Service**:
   - Log in to Render and click **New +** > **Web Service**.
   - Connect the GitHub repository containing this code.

2. **Configure Settings**:
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Region**: Choose the one closest to your users.

3. **Environment Variables**:
   Click the **Advanced** button and add the following:
   - `PORT`: `3000` (Render will use its own but this is a good fallback)
   - `NODE_ENV`: `production`
   - `JWT_SECRET`: A long, random string (e.g., 64 characters)
   - `JWT_REFRESH_SECRET`: Another different long, random string
   - `ALLOWED_ORIGINS`: Your frontend URL (e.g., `https://examredi.vercel.app`)
   - `RATE_LIMIT_WINDOW_MS`: `900000` (15 mins)
   - `RATE_LIMIT_MAX_REQUESTS`: `100`

4. **Health Check (Optional but Recommended)**:
   - Render will automatically look for a server responding on the specified port.
   - You can explicitly set the Health Check Path to `/health`.

### ⚠️ Important Note on Data Persistence
This server currently uses local JSON files in the `/data` directory to store data. On Render, the file system is **ephemeral**.
- **Issue**: Any updates to users, results, or settings will be lost whenever the server restarts or redeploys.
- **Solution**: To persist data, you should either:
  - Add a **Render Disk** (paid) and mount it to `/data`.
  - Migrate the data store to an external database like **MongoDB Atlas** or **Render PostgreSQL**.

## 🛠️ Local Development

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Setup Environment**:
   - Copy `.env.example` to `.env`.
   - Update the values in `.env`.

3. **Run in Development Mode**:
   ```bash
   npm run dev
   ```

4. **Build and Run (Production Simulation)**:
   ```bash
   npm run build
   npm start
   ```

## 🔍 API Health
The server includes a health check endpoint at `/health` to verify its status.
