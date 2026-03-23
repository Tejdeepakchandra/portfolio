import fetch from 'node-fetch';

// Cache for LeetCode data (max 1 hour)
const cache = {
  data: null,
  timestamp: 0,
};

const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { username } = req.query;

    if (!username) {
      return res.status(400).json({ error: 'Username required' });
    }

    // Check cache
    const now = Date.now();
    if (cache.data && now - cache.timestamp < CACHE_DURATION) {
      console.log(`📦 Returning cached data for ${username}`);
      return res.json(cache.data);
    }

    console.log(`🔄 Fetching fresh LeetCode data for ${username}...`);

    // Try multiple API endpoints
    const apiEndpoints = [
      `https://alfa-leetcode-api.onrender.com/${username}/solved`,
      `https://leetcode-api.ziqing.cc/api/${username}`,
    ];

    let response = null;
    let calendarResponse = null;
    let lastError = null;

    for (const endpoint of apiEndpoints) {
      try {
        console.log(`📡 Trying: ${endpoint}`);
        response = await fetch(endpoint, {
          method: 'GET',
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          },
          timeout: 10000,
        });

        if (response.ok) {
          const data = await response.json();
          console.log(`✅ Success from: ${endpoint}`);
          console.log(`📝 Response keys:`, Object.keys(data));

          // Try to fetch calendar data separately
          if (endpoint.includes('alfa-leetcode-api')) {
            try {
              const calendarUrl = endpoint.replace('/solved', '/calendar');
              console.log(`📡 Fetching calendar from: ${calendarUrl}`);
              const calendarResponse = await fetch(calendarUrl, {
                method: 'GET',
                headers: {
                  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                },
                timeout: 10000,
              });

              if (calendarResponse.ok) {
                const calendarData = await calendarResponse.json();
                console.log(`✅ Calendar data received:`, Object.keys(calendarData).length, 'entries');
                data.submissionCalendar = calendarData;
              }
            } catch (err) {
              console.warn('⚠️ Calendar fetch failed, continuing without it');
            }
          }

          // Cache the successful response
          cache.data = { status: 'success', data };
          cache.timestamp = Date.now();

          return res.status(200).json({ status: 'success', data });
        }
      } catch (err) {
        lastError = err;
        console.warn(`⚠️ Endpoint failed: ${err.message}`);
        continue;
      }
    }

    // If all endpoints failed, return error
    console.error('❌ All endpoints failed');
    return res.status(500).json({
      status: 'error',
      message: 'Failed to fetch LeetCode data',
      error: lastError?.message,
    });
  } catch (err) {
    console.error('❌ API Error:', err);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      error: err.message,
    });
  }
}
