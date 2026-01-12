# ExamRedi Standalone Server

This is the standalone backend for the ExamRedi platform, ready for deployment on Render.

## Deployment Instructions (Render)

1. Create a new "Web Service" on Render.
2. Connect your GitHub repository.
3. Use the following settings:
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build` (Ensure you have a build script)
   - **Start Command**: `node dist/app.js` (or your entry point)
   - **Environment Variables**:
     - `PORT`: `10000` (Render default)
     - `JWT_SECRET`: Your secret key
     - `JWT_REFRESH_SECRET`: Your refresh secret key
     - `CORS_ORIGIN`: Your frontend URL (e.g., `https://examredife.vercel.app`)

## Local Development

1. `npm install`
2. `npm run dev`
