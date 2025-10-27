# Deployment Guide

## Testing Locally

### 1. Backend Testing

**Start the backend server:**
```bash
cd backend
npm start
```

The server should start on `http://localhost:3000`

**Test the API manually:**
```bash
# Health check
curl http://localhost:3000

# Get video info (use PowerShell or a REST client)
curl -X POST http://localhost:3000/info -H "Content-Type: application/json" -d '{"url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"}'
```

### 2. Frontend Testing

Simply open `frontend/index.html` in your browser while the backend is running.

Or use a simple HTTP server:
```bash
cd frontend
python -m http.server 8080
# Then open http://localhost:8080
```

### 3. Testing Checklist

- [ ] Backend server starts without errors
- [ ] API health check returns 200
- [ ] Frontend loads correctly
- [ ] Can paste a YouTube URL
- [ ] "Get Video Info" shows video preview
- [ ] "Download Video" successfully downloads the video
- [ ] Error messages display for invalid URLs
- [ ] Video downloads with correct filename

---

## Production Deployment

### Backend Deployment (Render)

1. **Sign up at [render.com](https://render.com)**

2. **Create a new Web Service:**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository: `youtube-downloader`
   - Configure the service:
     - **Name:** `youtube-downloader-api`
     - **Region:** Choose closest to you
     - **Branch:** `master`
     - **Root Directory:** `backend`
     - **Runtime:** Node
     - **Build Command:** `npm install`
     - **Start Command:** `npm start`
     - **Instance Type:** Free

3. **Environment Variables:**
   - Set `PORT` (Render auto-sets this, but you can specify 3000)

4. **Deploy:**
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)
   - Note your backend URL: `https://youtube-downloader-api.onrender.com`

### Frontend Deployment (Vercel)

1. **Sign up at [vercel.com](https://vercel.com)**

2. **Import Project:**
   - Click "Add New" → "Project"
   - Import from GitHub: `youtube-downloader`
   - Configure:
     - **Framework Preset:** Other
     - **Root Directory:** `frontend`
     - **Build Command:** (leave empty)
     - **Output Directory:** (leave empty)

3. **Update API URL:**
   - Before deploying, update `frontend/app.js`:
   ```javascript
   const API_URL = 'https://youtube-downloader-api.onrender.com';
   ```
   - Commit and push this change

4. **Deploy:**
   - Click "Deploy"
   - Wait for deployment (1-2 minutes)
   - Your site will be live at: `https://your-project.vercel.app`

### Alternative: Deploy Both on Render

You can deploy both frontend and backend on Render:

**Backend:** Same as above

**Frontend:**
1. Create a new "Static Site"
2. Connect GitHub repository
3. Set root directory to `frontend`
4. Update the API URL in `app.js` before deploying

---

## Environment Configuration

### Development (.env for backend)
```env
PORT=3000
```

### Production

**Render:**
- Set environment variables in the Render dashboard
- Update CORS origin if needed

**Vercel:**
- No backend environment needed (frontend only)
- Update API_URL in frontend code to point to production backend

---

## Post-Deployment

### 1. Update CORS (if needed)

If you get CORS errors in production, update `backend/server.js`:

```javascript
app.use(cors({
    origin: 'https://your-frontend-domain.vercel.app'
}));
```

### 2. Test Production

- Visit your frontend URL
- Try downloading a YouTube video
- Check browser console for errors
- Verify download works correctly

### 3. Monitor

- **Render:** Check logs in Render dashboard
- **Vercel:** Check deployment logs in Vercel dashboard

---

## Troubleshooting

### Common Issues

**1. CORS Error:**
- Update backend CORS configuration
- Ensure API URL is correct in frontend

**2. ytdl-core Errors:**
- YouTube frequently breaks ytdl-core
- Consider switching to `yt-dlp` wrapper if issues persist
- Check ytdl-core GitHub issues

**3. Render Free Tier Limitations:**
- Service sleeps after 15 minutes of inactivity
- First request may be slow (cold start)
- Consider upgrading for production use

**4. Large Videos Timeout:**
- Free tiers have request timeout limits
- Consider implementing chunked downloads
- Or limit video length/quality

---

## Cost Estimate

**Free Tier:**
- Render: Free (with limitations)
- Vercel: Free (hobby projects)
- **Total: $0/month**

**Paid (Recommended for production):**
- Render: $7/month (Starter plan)
- Vercel: Free (sufficient for frontend)
- **Total: ~$7/month**

---

## Security Considerations

1. **Rate Limiting:** Add rate limiting to prevent abuse
2. **API Keys:** Consider adding API authentication
3. **HTTPS:** Both platforms provide SSL by default
4. **Content Policy:** Respect YouTube's ToS

---

## Scaling Considerations

If your app gets popular:

1. **Add caching** for video info
2. **Implement queue system** for downloads
3. **Add CDN** for frontend assets
4. **Database** for analytics/tracking
5. **Load balancer** for multiple backend instances
