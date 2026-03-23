// Use native fetch available in Node.js 18+
// No need to import node-fetch

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
    // Get username from dynamic route parameter
    const { username } = req.query;

    if (!username) {
      return res.status(400).json({ error: 'Username required' });
    }

    // Check cache
    const now = Date.now();
    if (cache.data && now - cache.timestamp < CACHE_DURATION) {
      return res.status(200).json(cache.data);
    }

    // Try multiple API endpoints
    const apiEndpoints = [
      `https://leetcode-api.ziqing.cc/api/${username}`,
      `https://alfa-leetcode-api.onrender.com/${username}/solved`,
    ];

    let lastError = null;

    for (const endpoint of apiEndpoints) {
      try {
        const response = await fetch(endpoint, {
          method: 'GET',
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          },
        });

        if (response.ok) {
          const data = await response.json();

          // Try to fetch calendar data separately if using alfa API
          if (endpoint.includes('alfa-leetcode-api')) {
            try {
              const calendarUrl = endpoint.replace('/solved', '/calendar');
              const calendarResponse = await fetch(calendarUrl, {
                headers: {
                  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                },
              });

              if (calendarResponse.ok) {
                const calendarData = await calendarResponse.json();
                data.submissionCalendar = calendarData;
              }
            } catch (err) {
              // Continue without calendar data
            }
          }

          // Cache the successful response
          cache.data = { status: 'success', data };
          cache.timestamp = Date.now();

          return res.status(200).json({ status: 'success', data });
        }
      } catch (err) {
        lastError = err;
        continue;
      }
    }

    // If all endpoints failed
    return res.status(500).json({
      status: 'error',
      message: 'Failed to fetch LeetCode data',
      error: lastError?.message,
    });
  } catch (err) {
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      error: err.message,
    });
  }
}
