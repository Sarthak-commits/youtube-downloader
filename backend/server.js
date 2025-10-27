const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Health check endpoint
app.get('/', (req, res) => {
    res.json({ 
        message: 'YouTube Downloader API is running',
        version: '1.0.0',
        endpoints: {
            info: 'POST /info',
            download: 'POST /download'
        }
    });
});

// Get video information endpoint
app.post('/info', async (req, res) => {
    const { url } = req.body;
    
    // Validate URL
    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }
    
    if (!ytdl.validateURL(url)) {
        return res.status(400).json({ error: 'Invalid YouTube URL' });
    }
    
    try {
        console.log('Fetching info for:', url);
        
        // Get video info
        const info = await ytdl.getInfo(url);
        const videoDetails = info.videoDetails;
        
        // Extract relevant information
        const videoInfo = {
            title: videoDetails.title,
            author: videoDetails.author.name,
            duration: parseInt(videoDetails.lengthSeconds),
            thumbnail: videoDetails.thumbnails[videoDetails.thumbnails.length - 1].url,
            description: videoDetails.description.substring(0, 200) + '...',
            views: videoDetails.viewCount,
            uploadDate: videoDetails.uploadDate
        };
        
        console.log('Video info retrieved:', videoInfo.title);
        res.json(videoInfo);
        
    } catch (error) {
        console.error('Error fetching video info:', error.message);
        res.status(500).json({ 
            error: 'Failed to fetch video information',
            details: error.message 
        });
    }
});

// Download video endpoint
app.post('/download', async (req, res) => {
    const { url } = req.body;
    
    // Validate URL
    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }
    
    if (!ytdl.validateURL(url)) {
        return res.status(400).json({ error: 'Invalid YouTube URL' });
    }
    
    try {
        console.log('Starting download for:', url);
        
        // Get video info for the title
        const info = await ytdl.getInfo(url);
        const title = info.videoDetails.title;
        
        // Sanitize filename
        const sanitizedTitle = title
            .replace(/[^a-z0-9]/gi, '_')
            .toLowerCase()
            .substring(0, 50);
        
        // Set headers for download
        res.setHeader('Content-Disposition', `attachment; filename="${sanitizedTitle}.mp4"`);
        res.setHeader('Content-Type', 'video/mp4');
        
        // Stream video to response
        const videoStream = ytdl(url, {
            quality: 'highest',
            filter: 'audioandvideo'
        });
        
        // Handle stream events
        videoStream.on('error', (error) => {
            console.error('Stream error:', error.message);
            if (!res.headersSent) {
                res.status(500).json({ 
                    error: 'Failed to download video',
                    details: error.message 
                });
            }
        });
        
        videoStream.on('end', () => {
            console.log('Download completed:', title);
        });
        
        // Pipe video to response
        videoStream.pipe(res);
        
    } catch (error) {
        console.error('Download error:', error.message);
        if (!res.headersSent) {
            res.status(500).json({ 
                error: 'Failed to download video',
                details: error.message 
            });
        }
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ 
        error: 'Internal server error',
        details: err.message 
    });
});

// Start server
app.listen(PORT, () => {
    console.log('=================================');
    console.log('YouTube Downloader API');
    console.log('=================================');
    console.log(`Server running on http://localhost:${PORT}`);
    console.log('Ready to accept requests!');
    console.log('=================================');
});
