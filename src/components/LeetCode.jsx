import { motion } from "framer-motion"
import { ExternalLink, Trophy, Target, BarChart3, TrendingUp, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState, useMemo } from "react"

const LEETCODE_USERNAME = "IIFXj53axV"
const BACKEND_API = "http://localhost:3005/api/leetcode"

const FALLBACK_PROFILE = {
  totalSolved: 300,
  easySolved: 120,
  mediumSolved: 140,
  hardSolved: 40,
  totalEasy: 830,
  totalMedium: 1750,
  totalHard: 760,
  ranking: 150000,
}

const FALLBACK_CONTEST = {
  contestRating: 1500,
  contestGlobalRanking: 80000,
  contestAttend: 12,
}

const topics = [
  "Arrays", "Sliding Window", "Two Pointers", "Binary Search",
  "Dynamic Programming", "Graphs", "Trees", "Stacks & Queues",
  "Linked Lists", "Greedy", "Backtracking",
]

function buildHeatmapFromCalendar(calendar) {
  if (!calendar || Object.keys(calendar).length === 0) {
    return Array.from({ length: 52 }, () =>
      Array.from({ length: 7 }, () => Math.floor(Math.random() * 4))
    )
  }

  // Get all timestamps from calendar, sorted
  const timestamps = Object.keys(calendar)
    .map(ts => parseInt(ts))
    .sort((a, b) => b - a)

  if (timestamps.length === 0) {
    return Array.from({ length: 52 }, () =>
      Array.from({ length: 7 }, () => 0)
    )
  }

  // Use the latest timestamp as end date
  const endDate = new Date(timestamps[0] * 1000)
  
  // Calculate start date (52 weeks back from end date)
  const startDate = new Date(endDate)
  startDate.setDate(startDate.getDate() - 364)

  // Align start to beginning of week (Sunday)
  startDate.setDate(startDate.getDate() - startDate.getDay())

  const weeks = []
  const current = new Date(startDate)

  while (current <= endDate) {
    const week = []
    for (let d = 0; d < 7; d++) {
      if (current > endDate) {
        week.push(-1)
      } else {
        const ts = Math.floor(current.getTime() / 1000).toString()
        const count = calendar[ts] ?? 0
        week.push(count === 0 ? 0 : count <= 2 ? 1 : count <= 5 ? 2 : 3)
      }
      current.setDate(current.getDate() + 1)
    }
    weeks.push(week)
  }
  return weeks
}

const FALLBACK_HEATMAP = Array.from({ length: 52 }, () =>
  Array.from({ length: 7 }, () => Math.floor(Math.random() * 4))
)

const LeetCode = () => {
  const [profile, setProfile] = useState(FALLBACK_PROFILE)
  const [contest, setContest] = useState(FALLBACK_CONTEST)
  const [calendarData, setCalendarData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isLive, setIsLive] = useState(false)

  useEffect(() => {
    const controller = new AbortController()
    
    const fetchData = async () => {
      try {
        console.log("🔄 Fetching LeetCode data for:", LEETCODE_USERNAME)
        
        // Call our local Node.js backend server
        const endpoint = `${BACKEND_API}/${LEETCODE_USERNAME}`
        console.log("📡 Querying backend:", endpoint)
        
        const response = await fetch(endpoint, {
          method: "GET",
          headers: {
            "Accept": "application/json",
          },
          signal: controller.signal,
        })

        console.log(`📊 Backend Response Status: ${response.status}`)

        if (!response.ok) {
          throw new Error(`Backend returned ${response.status}`)
        }

        const result = await response.json()
        
        if (result.status !== "success" || !result.data) {
          console.error("❌ Unexpected backend response:", result)
          throw new Error(result.message || "Invalid backend response")
        }

        const data = result.data
        console.log("✅ User Data Received:", data.username)

        // Update profile stats
        setProfile({
          totalSolved: data.totalSolved ?? FALLBACK_PROFILE.totalSolved,
          easySolved: data.easySolved ?? FALLBACK_PROFILE.easySolved,
          mediumSolved: data.mediumSolved ?? FALLBACK_PROFILE.mediumSolved,
          hardSolved: data.hardSolved ?? FALLBACK_PROFILE.hardSolved,
          totalEasy: data.easyTotal ?? FALLBACK_PROFILE.totalEasy,
          totalMedium: data.mediumTotal ?? FALLBACK_PROFILE.totalMedium,
          totalHard: data.hardTotal ?? FALLBACK_PROFILE.totalHard,
          ranking: data.ranking ?? FALLBACK_PROFILE.ranking,
        })

        console.log(`✅ Profile Updated: ${data.totalSolved} problems solved`)

        // Update contest data if available
        if (data.contestRating) {
          setContest({
            contestRating: Math.round(data.contestRating ?? FALLBACK_CONTEST.contestRating),
            contestGlobalRanking: data.contestGlobalRanking ?? FALLBACK_CONTEST.contestGlobalRanking,
            contestAttend: data.contestAttend ?? FALLBACK_CONTEST.contestAttend,
          })
          console.log(`✅ Contest Data: Rating ${data.contestRating}`)
        }

        // Update calendar heatmap if available
        if (data.submissionCalendar) {
          console.log("📅 Calendar data present, parsing...")
          const parsed = typeof data.submissionCalendar === "string"
            ? JSON.parse(data.submissionCalendar)
            : data.submissionCalendar
          console.log(`📊 Parsed calendar entries: ${Object.keys(parsed).length}`)
          setCalendarData(parsed)
          console.log("✅ Calendar Data Loaded")
        } else {
          console.warn("⚠️ No calendar data in response")
        }

        setIsLive(true)
        console.log("🎉 LeetCode data loaded successfully!")
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("❌ LeetCode Fetch Error:", err.message)
          console.log("📦 Using fallback data...")
        }
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
    return () => controller.abort()
  }, [])

  const heatmap = useMemo(() => {
    if (calendarData) return buildHeatmapFromCalendar(calendarData)
    return FALLBACK_HEATMAP
  }, [calendarData])

  const stats = [
    { label: "Problems Solved", value: `${profile.totalSolved}`, icon: Trophy, color: "text-accent" },
    { label: "Contest Rating", value: `${contest.contestRating}`, icon: TrendingUp, color: "text-primary" },
    { label: "Language", value: "C++", icon: Target, color: "text-glow-cyan" },
  ]

  const difficultyBars = [
    { label: "Easy", solved: profile.easySolved, total: profile.totalEasy, color: "bg-accent", percentage: Math.round((profile.easySolved / profile.totalEasy) * 100) },
    { label: "Medium", solved: profile.mediumSolved, total: profile.totalMedium, color: "bg-primary", percentage: Math.round((profile.mediumSolved / profile.totalMedium) * 100) },
    { label: "Hard", solved: profile.hardSolved, total: profile.totalHard, color: "bg-destructive", percentage: Math.round((profile.hardSolved / profile.totalHard) * 100) },
  ]

  return (
    <section id="leetcode" className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 gradient-mesh" />
      <div className="section-container relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-12 bg-accent/50" />
            <h2 className="text-sm font-mono text-accent uppercase tracking-[0.2em]">Problem Solving</h2>
          </div>
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4 text-balance">
            Data Structures & Algorithms
          </h3>
          <div className="flex items-center gap-2 mb-14">
            {loading ? (
              <span className="flex items-center gap-2 text-muted-foreground text-xs font-mono">
                <Loader2 size={14} className="animate-spin" /> Fetching live stats…
              </span>
            ) : (
              <span className={`text-xs font-mono px-2 py-0.5 rounded-full ${isLive ? "bg-accent/10 text-accent" : "bg-secondary text-muted-foreground"}`}>
                {isLive ? "● Live from LeetCode" : "Cached stats"}
              </span>
            )}
          </div>
        </motion.div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="glass-card p-6 text-center group"
            >
              <stat.icon size={24} className={`${stat.color} mx-auto mb-3 group-hover:scale-110 transition-transform`} />
              <p className={`text-3xl font-display font-bold ${stat.color} tabular-nums`}>{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-card p-7 space-y-5"
          >
            <div className="flex items-center gap-2 text-primary">
              <BarChart3 size={20} />
              <h4 className="text-sm font-mono uppercase tracking-[0.15em]">Problem Distribution</h4>
            </div>
            <div className="space-y-5">
              {difficultyBars.map((bar) => (
                <div key={bar.label} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{bar.label}</span>
                    <span className="text-foreground font-mono tabular-nums text-xs">{bar.solved}/{bar.total}</span>
                  </div>
                  <div className="h-2.5 bg-secondary/60 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${bar.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
                      className={`h-full ${bar.color} rounded-full relative`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10 rounded-full" />
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass-card p-7 space-y-4"
            >
              <div className="flex items-center gap-2 text-primary">
                <Target size={20} />
                <h4 className="text-sm font-mono uppercase tracking-[0.15em]">Focus Areas</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {topics.map((topic, i) => (
                  <motion.span
                    key={topic}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.03 }}
                    whileHover={{ scale: 1.1 }}
                    className="px-3 py-1.5 text-xs rounded-lg bg-secondary/50 text-muted-foreground border border-border/30 hover:border-accent/30 hover:text-accent transition-all cursor-default"
                  >
                    {topic}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="glass-card p-7 overflow-x-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-[0.15em]">
                  {calendarData ? "Submission Calendar" : "Activity Graph"}
                </p>
                {calendarData && (
                  <p className="text-xs font-mono text-accent">
                    {Object.values(calendarData).reduce((a, b) => a + b, 0)} submissions
                  </p>
                )}
              </div>
              <div className="flex gap-[3px] overflow-x-auto pb-2">
                {heatmap.map((week, wi) => (
                  <div key={wi} className="flex flex-col gap-[3px]">
                    {week.map((level, di) => (
                      <motion.div
                        key={di}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: wi * 0.01 }}
                        className={`w-[12px] h-[12px] rounded-sm ${
                          level === -1
                            ? "bg-transparent"
                            : level === 0
                            ? "bg-secondary/40"
                            : level === 1
                            ? "bg-accent/20"
                            : level === 2
                            ? "bg-accent/50"
                            : "bg-accent/80"
                        }`}
                      />
                    ))}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-1.5 mt-3 justify-end">
                <span className="text-[10px] text-muted-foreground mr-1">Less</span>
                {[0, 1, 2, 3].map((l) => (
                  <div
                    key={l}
                    className={`w-[12px] h-[12px] rounded-sm ${
                      l === 0 ? "bg-secondary/40" : l === 1 ? "bg-accent/20" : l === 2 ? "bg-accent/50" : "bg-accent/80"
                    }`}
                  />
                ))}
                <span className="text-[10px] text-muted-foreground ml-1">More</span>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 flex justify-center"
        >
          <Button variant="heroOutline" size="lg" asChild>
            <a href={`https://leetcode.com/u/${LEETCODE_USERNAME}/`} target="_blank" rel="noopener noreferrer">
              <ExternalLink size={16} />
              View LeetCode Profile
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

export default LeetCode
