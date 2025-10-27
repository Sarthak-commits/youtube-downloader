# YouTube Video Downloader

A modern web application to download YouTube videos using just the video URL.

## Features

- Simple, clean user interface
- Download videos by pasting YouTube URL
- Video preview with thumbnail and title
- Progress indicator during download
- Error handling for invalid URLs

## Tech Stack

**Frontend:**
- HTML5
- Tailwind CSS
- Vanilla JavaScript

**Backend:**
- Node.js
- Express.js
- ytdl-core

## Project Structure

```
youtube-downloader/
├── frontend/
│   ├── index.html
│   ├── app.js
│   └── styles.css
├── backend/
│   ├── server.js
│   └── package.json
└── README.md
```

## Setup Instructions

### Backend Setup

```bash
cd backend
npm install
npm start
```

Server will run on `http://localhost:3000`

### Frontend Setup

Simply open `frontend/index.html` in your browser, or use a local server:

```bash
cd frontend
# Use any local server (e.g., Python, VS Code Live Server, etc.)
```

## Development

- Backend API runs on port 3000
- Frontend can be served statically

## Deployment

- **Frontend:** Vercel or Netlify
- **Backend:** Render or Railway

## Important Notes

⚠️ **ytdl-core Dependency**: YouTube frequently updates their systems, which can break `ytdl-core`. If you encounter issues:

1. **Update ytdl-core**: `npm install ytdl-core@latest`
2. **Alternative Solution**: Consider using `yt-dlp` with a Node.js wrapper:
   ```bash
   npm install yt-dlp-wrap
   ```
3. **Check for Updates**: Visit [ytdl-core GitHub](https://github.com/fent/node-ytdl-core) for latest fixes

## Current Status

✅ **Working**:
- Frontend UI (fully functional)
- Backend server (running)
- API endpoints (implemented)
- Error handling
- File download mechanism

⚠️ **May Need Updates**:
- ytdl-core library (depends on YouTube changes)
- Test with current videos to verify functionality

## Legal Notice

This application is for educational purposes only. Please respect YouTube's Terms of Service.

## License

MIT
