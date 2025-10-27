# Quick Start Guide

Get your YouTube Downloader running in 5 minutes!

## Prerequisites

- Node.js installed (v14 or higher)
- Git installed
- A web browser

## Step-by-Step Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Sarthak-commits/youtube-downloader.git
cd youtube-downloader
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Start the Backend Server

```bash
npm start
```

You should see:
```
=================================
YouTube Downloader API
=================================
Server running on http://localhost:3000
Ready to accept requests!
=================================
```

**Keep this terminal window open!**

### 4. Open the Frontend

Open a new terminal/file explorer and navigate to the `frontend` folder.

**Option A: Direct File Open**
- Simply double-click `frontend/index.html` to open it in your browser

**Option B: Using a Local Server (Recommended)**
```bash
cd frontend
python -m http.server 8080
# Then open http://localhost:8080 in your browser
```

### 5. Test the Application

1. Copy any YouTube video URL (e.g., `https://www.youtube.com/watch?v=dQw4w9WgXcQ`)
2. Paste it into the input field
3. Click "Get Video Info" - you should see video preview
4. Click "Download Video" - the video should download to your Downloads folder

## Troubleshooting

### Backend won't start
- Make sure Node.js is installed: `node --version`
- Check if port 3000 is available
- Try deleting `node_modules` and running `npm install` again

### Frontend can't connect to backend
- Make sure the backend is running on port 3000
- Check browser console for error messages
- Verify the API_URL in `frontend/app.js` is `http://localhost:3000`

### Download fails
- YouTube frequently updates their systems, which can break ytdl-core
- Check if the video is available and not private
- Try a different video

### CORS errors
- Make sure you're accessing the frontend properly
- If using file:// protocol, try using a local server instead

## What's Next?

- Read [DEPLOYMENT.md](DEPLOYMENT.md) to deploy your app online
- Read [README.md](README.md) for more information
- Customize the frontend styling in `frontend/styles.css`
- Add new features to `backend/server.js`

## Support

If you encounter issues:
1. Check the backend terminal for error messages
2. Check browser console (F12) for frontend errors
3. Review the troubleshooting section in DEPLOYMENT.md
4. Check ytdl-core GitHub issues for known problems

---

**Enjoy your YouTube Downloader! 🎉**
