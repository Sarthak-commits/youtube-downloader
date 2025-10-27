// Configuration
const API_URL = 'http://localhost:3000';

// DOM Elements
const videoUrlInput = document.getElementById('videoUrl');
const getInfoBtn = document.getElementById('getInfoBtn');
const downloadBtn = document.getElementById('downloadBtn');
const loadingDiv = document.getElementById('loading');
const errorDiv = document.getElementById('error');
const successDiv = document.getElementById('success');
const videoPreviewDiv = document.getElementById('videoPreview');

// State
let currentVideoInfo = null;

// Helper Functions
function showLoading() {
    loadingDiv.classList.remove('hidden');
    hideError();
    hideSuccess();
}

function hideLoading() {
    loadingDiv.classList.add('hidden');
}

function showError(message) {
    errorDiv.classList.remove('hidden');
    errorDiv.classList.add('fade-in');
    document.getElementById('errorMessage').textContent = message;
    hideSuccess();
}

function hideError() {
    errorDiv.classList.add('hidden');
}

function showSuccess(message) {
    successDiv.classList.remove('hidden');
    successDiv.classList.add('fade-in');
    document.getElementById('successMessage').textContent = message;
    hideError();
}

function hideSuccess() {
    successDiv.classList.add('hidden');
}

function showVideoPreview(info) {
    videoPreviewDiv.classList.remove('hidden');
    videoPreviewDiv.classList.add('fade-in');
    
    document.getElementById('thumbnail').src = info.thumbnail;
    document.getElementById('videoTitle').textContent = info.title;
    document.getElementById('videoAuthor').textContent = `By ${info.author}`;
    document.getElementById('videoDuration').textContent = `Duration: ${formatDuration(info.duration)}`;
    
    downloadBtn.disabled = false;
}

function hideVideoPreview() {
    videoPreviewDiv.classList.add('hidden');
    downloadBtn.disabled = true;
}

function formatDuration(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
        return `${hours}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
    return `${minutes}:${String(secs).padStart(2, '0')}`;
}

function validateYouTubeUrl(url) {
    const pattern = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]+/;
    return pattern.test(url);
}

// API Functions
async function getVideoInfo() {
    const url = videoUrlInput.value.trim();
    
    if (!url) {
        showError('Please enter a YouTube URL');
        return;
    }
    
    if (!validateYouTubeUrl(url)) {
        showError('Please enter a valid YouTube URL');
        return;
    }
    
    showLoading();
    hideVideoPreview();
    
    try {
        const response = await fetch(`${API_URL}/info`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Failed to fetch video information');
        }
        
        currentVideoInfo = data;
        showVideoPreview(data);
        showSuccess('Video information loaded successfully!');
        
    } catch (error) {
        showError(error.message);
        currentVideoInfo = null;
    } finally {
        hideLoading();
    }
}

async function downloadVideo() {
    const url = videoUrlInput.value.trim();
    
    if (!url || !currentVideoInfo) {
        showError('Please get video information first');
        return;
    }
    
    showLoading();
    hideError();
    hideSuccess();
    
    try {
        const response = await fetch(`${API_URL}/download`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url })
        });
        
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error || 'Failed to download video');
        }
        
        // Get the blob from response
        const blob = await response.blob();
        
        // Create download link
        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = downloadUrl;
        
        // Use video title for filename, sanitize it
        const filename = currentVideoInfo.title
            .replace(/[^a-z0-9]/gi, '_')
            .toLowerCase()
            .substring(0, 50);
        a.download = `${filename}.mp4`;
        
        // Trigger download
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        // Clean up
        window.URL.revokeObjectURL(downloadUrl);
        
        showSuccess('Video download started! Check your downloads folder.');
        
    } catch (error) {
        showError(error.message);
    } finally {
        hideLoading();
    }
}

// Event Listeners
getInfoBtn.addEventListener('click', getVideoInfo);
downloadBtn.addEventListener('click', downloadVideo);

// Allow Enter key to trigger get info
videoUrlInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        getVideoInfo();
    }
});

// Clear preview when URL changes
videoUrlInput.addEventListener('input', () => {
    if (currentVideoInfo) {
        hideVideoPreview();
        currentVideoInfo = null;
        hideError();
        hideSuccess();
    }
});

// Log initialization
console.log('YouTube Downloader initialized');
console.log('API URL:', API_URL);
