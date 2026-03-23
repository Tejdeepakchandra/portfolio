import express from 'express'
import cors from 'cors'
import fetch from 'node-fetch'

const app = express()
const PORT = 3005

app.use(cors())
app.use(express.json())

// Cache for LeetCode data (max 1 hour)
const cache = {
  data: null,
  timestamp: 0,
}

const CACHE_DURATION = 60 * 60 * 1000 // 1 hour

// Endpoint to fetch LeetCode user data
app.get('/api/leetcode/:username', async (req, res) => {
  try {
    const { username } = req.params

    // Check cache
    const now = Date.now()
    if (cache.data && now - cache.timestamp < CACHE_DURATION) {
      console.log(`📦 Returning cached data for ${username}`)
      return res.json(cache.data)
    }

    console.log(`🔄 Fetching fresh LeetCode data for ${username}...`)

    // Try multiple API endpoints
    const apiEndpoints = [
      `https://alfa-leetcode-api.onrender.com/${username}/solved`,
      `https://leetcode-api.ziqing.cc/api/${username}`,
    ]

    let response = null
    let calendarResponse = null
    let lastError = null

    for (const endpoint of apiEndpoints) {
      try {
        console.log(`📡 Trying: ${endpoint}`)
        response = await fetch(endpoint, {
          method: 'GET',
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          },
          timeout: 10000,
        })

        if (response.ok) {
          const data = await response.json()
          console.log(`✅ Success from: ${endpoint}`)
          console.log(`📝 Response keys:`, Object.keys(data))

          // Try to fetch calendar data separately
          if (endpoint.includes('alfa-leetcode-api')) {
            try {
              const calendarUrl = endpoint.replace('/solved', '/calendar')
              console.log(`📡 Fetching calendar from: ${calendarUrl}`)
              const calendarResponse = await fetch(calendarUrl, {
                method: 'GET',
                headers: {
                  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                },
                timeout: 10000,
              })
              
              if (calendarResponse.ok) {
                const calendarData = await calendarResponse.json()
                console.log(`✅ Calendar Success, keys:`, Object.keys(calendarData))
                console.log(`📊 Calendar data type:`, typeof calendarData.submissionCalendar)
                
                // Merge calendar into data
                if (calendarData.submissionCalendar) {
                  data.submissionCalendar = calendarData.submissionCalendar
                  console.log(`✅ Calendar merged into response`)
                }
              } else {
                console.warn(`⚠️ Calendar request failed with status ${calendarResponse.status}`)
              }
            } catch (err) {
              console.warn('⚠️ Failed to fetch calendar:', err.message)
            }
          }

          // Normalize data for frontend
          const normalizedData = {
            status: 'success',
            data: {
              username: username,
              totalSolved: data.solvedProblem ?? data.solved ?? 0,
              easySolved: data.easySolved ?? 0,
              mediumSolved: data.mediumSolved ?? 0,
              hardSolved: data.hardSolved ?? 0,
              easyTotal: data.totalEasy ?? 830,
              mediumTotal: data.totalMedium ?? 1750,
              hardTotal: data.totalHard ?? 760,
              ranking: data.ranking ?? 999999,
              contestRating: data.contestRating ?? 0,
              contestGlobalRanking: data.contestGlobalRanking ?? 999999,
              contestAttend: data.contestAttend ?? 0,
              submissionCalendar: data.submissionCalendar ?? null,
            },
          }

          console.log(`📦 Normalized response has calendar:`, !!normalizedData.data.submissionCalendar)

          // Cache the result
          cache.data = normalizedData
          cache.timestamp = now

          return res.json(normalizedData)
        }
      } catch (err) {
        console.warn(`⚠️ Failed with ${endpoint}:`, err.message)
        lastError = err
        continue
      }
    }

    // If all endpoints failed, return structured error
    console.error(`❌ All endpoints failed for ${username}`)
    return res.status(503).json({
      status: 'error',
      message: 'Unable to fetch LeetCode data from any endpoint',
      error: lastError?.message,
    })
  } catch (err) {
    console.error('❌ Server error:', err)
    res.status(500).json({
      status: 'error',
      message: 'Server error',
      error: err.message,
    })
  }
})

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.listen(PORT, () => {
  console.log(`🚀 LeetCode Backend Server running on http://localhost:${PORT}`)
  console.log(`📍 API endpoint: http://localhost:${PORT}/api/leetcode/:username`)
})
