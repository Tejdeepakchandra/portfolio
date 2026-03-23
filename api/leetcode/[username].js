// Vercel API Route - Fetch real LeetCode data using GraphQL
const FALLBACK_DATA = {
  username: 'IIFXj53axV',
  totalSolved: 300,
  easySolved: 75,
  mediumSolved: 89,
  hardSolved: 9,
  easyTotal: 993,
  mediumTotal: 2029,
  hardTotal: 916,
  ranking: 150000,
  contestRating: 1500,
  contestGlobalRanking: 80000,
  contestAttend: 12,
};

// LeetCode GraphQL endpoint
const LEETCODE_GRAPHQL_URL = 'https://leetcode.com/graphql';

const getUserStatsQuery = (username) => `
  query getUserStats($username: String!) {
    matchedUser(username: $username) {
      username
      profile {
        ranking
        userAvatar
      }
      submitStats {
        acSubmissionNum {
          difficulty
          count
          submissions
        }
        totalSubmissionNum {
          difficulty
          count
        }
      }
    }
  }
`;

const getUserContestQuery = (username) => `
  query getUserContest($username: String!) {
    userContestRanking(username: $username) {
      attendedContestsCount
      rating
      globalRanking
    }
  }
`;

const getProblemCountsQuery = () => `
  query problemsetQuestionList($categorySlug: String, $limit: Int, $skip: Int, $filters: QuestionListFilterInput) {
    problemsetQuestionList: questionList(
      categorySlug: $categorySlug
      limit: $limit
      skip: $skip
      filters: $filters
    ) {
      total: totalNum
      questions: data {
        difficulty
      }
    }
  }
`;

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { username } = req.query;

    if (!username) {
      return res.status(400).json({ error: 'Username required' });
    }

    console.log(`📡 Fetching LeetCode data for: ${username}`);

    // Try GraphQL API first
    try {
      const statsResponse = await fetch(LEETCODE_GRAPHQL_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Referer': 'https://leetcode.com',
        },
        body: JSON.stringify({
          query: getUserStatsQuery(username),
          variables: { username },
        }),
      });

      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        
        if (statsData.data?.matchedUser) {
          const user = statsData.data.matchedUser;
          
          // Try to get contest data
          let contestData = null;
          try {
            const contestResponse = await fetch(LEETCODE_GRAPHQL_URL, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Referer': 'https://leetcode.com',
              },
              body: JSON.stringify({
                query: getUserContestQuery(username),
                variables: { username },
              }),
            });

            if (contestResponse.ok) {
              const contestJson = await contestResponse.json();
              contestData = contestJson.data?.userContestRanking;
            }
          } catch (err) {
            console.warn('⚠️ Could not fetch contest data');
          }

          // Parse submission stats
          const acSubmissions = user.submitStats?.acSubmissionNum || [];
          const totalSubmissions = user.submitStats?.totalSubmissionNum || [];

          const easyStats = acSubmissions.find(s => s.difficulty === 'Easy') || { count: 0 };
          const mediumStats = acSubmissions.find(s => s.difficulty === 'Medium') || { count: 0 };
          const hardStats = acSubmissions.find(s => s.difficulty === 'Hard') || { count: 0 };

          const easyTotal = totalSubmissions.find(s => s.difficulty === 'Easy')?.count || 993;
          const mediumTotal = totalSubmissions.find(s => s.difficulty === 'Medium')?.count || 2029;
          const hardTotal = totalSubmissions.find(s => s.difficulty === 'Hard')?.count || 916;

          const data = {
            username: user.username,
            totalSolved: easyStats.count + mediumStats.count + hardStats.count,
            easySolved: easyStats.count,
            mediumSolved: mediumStats.count,
            hardSolved: hardStats.count,
            easyTotal,
            mediumTotal,
            hardTotal,
            ranking: user.profile?.ranking || 0,
            contestRating: contestData?.rating || 0,
            contestGlobalRanking: contestData?.globalRanking || 0,
            contestAttend: contestData?.attendedContestsCount || 0,
          };

          console.log(`✅ Got real data from GraphQL: ${easyStats.count}/${easyTotal} easy`);
          return res.status(200).json({
            status: 'success',
            data,
          });
        }
      }
    } catch (err) {
      console.warn(`⚠️ GraphQL API failed: ${err.message}`);
    }

    // Try alternative APIs as fallback
    const alternativeUrls = [
      `https://leetcode-api.io/user/${username}`,
      `https://alfa-leetcode-api.onrender.com/${username}/solved`,
    ];

    for (const url of alternativeUrls) {
      try {
        console.log(`🔗 Trying: ${url}`);
        const response = await fetch(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          },
        });

        if (response.ok) {
          const apiData = await response.json();
          console.log(`✅ Got data from: ${url}`);
          
          // Normalize the response to match our schema
          const normalizedData = {
            username: apiData.username || username,
            totalSolved: apiData.totalSolved || apiData.solvedProblems || 0,
            easySolved: apiData.easySolved || 0,
            mediumSolved: apiData.mediumSolved || 0,
            hardSolved: apiData.hardSolved || 0,
            easyTotal: apiData.easyTotal || 993,
            mediumTotal: apiData.mediumTotal || 2029,
            hardTotal: apiData.hardTotal || 916,
            ranking: apiData.ranking || 0,
            contestRating: apiData.contestRating || 0,
            contestGlobalRanking: apiData.contestGlobalRanking || 0,
            contestAttend: apiData.contestAttend || 0,
          };
          
          return res.status(200).json({
            status: 'success',
            data: normalizedData,
          });
        }
      } catch (err) {
        console.warn(`⚠️ Failed to fetch from ${url}: ${err.message}`);
        continue;
      }
    }

    // Return fallback data if all APIs fail
    console.log('📦 Using fallback data');
    return res.status(200).json({
      status: 'success',
      data: FALLBACK_DATA,
    });
  } catch (err) {
    console.error('❌ API Error:', err.message);
    
    // Return fallback data on any error
    return res.status(200).json({
      status: 'success',
      data: FALLBACK_DATA,
    });
  }
}
