// Simple test script for YouTube Downloader API
const http = require('http');

console.log('🧪 Testing YouTube Downloader API...\n');

// Test 1: Health Check
console.log('Test 1: Health Check');
http.get('http://localhost:3000', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        if (res.statusCode === 200) {
            console.log('✅ Health check passed');
            console.log('   Response:', data);
        } else {
            console.log('❌ Health check failed');
        }
        console.log('');
    });
}).on('error', (err) => {
    console.log('❌ Server is not running');
    console.log('   Error:', err.message);
    console.log('   Please start the server with: npm start\n');
});

// Test 2: Video Info Endpoint
console.log('Test 2: Video Info Endpoint');
const testUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
const postData = JSON.stringify({ url: testUrl });

const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/info',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
    }
};

setTimeout(() => {
    const req = http.request(options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
            if (res.statusCode === 200) {
                console.log('✅ Video info endpoint working');
                const info = JSON.parse(data);
                console.log('   Title:', info.title);
                console.log('   Author:', info.author);
                console.log('   Duration:', info.duration, 'seconds');
            } else {
                console.log('❌ Video info endpoint failed');
                console.log('   Status:', res.statusCode);
            }
            console.log('\n📊 Tests completed!');
        });
    });

    req.on('error', (err) => {
        console.log('❌ Request failed:', err.message);
    });

    req.write(postData);
    req.end();
}, 1000);
