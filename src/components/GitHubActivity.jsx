import { motion } from "framer-motion"
import { Github, GitCommit, GitBranch, Star, Code2, Users, Loader2, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState, useMemo } from "react"

const GITHUB_USERNAME = "Tejdeepakchandra"
const GITHUB_API = "https://api.github.com"

const LANG_COLORS = {
  JavaScript: "bg-yellow-400",
  TypeScript: "bg-primary",
  "C++": "bg-glow-cyan",
  CSS: "bg-glow-purple",
  HTML: "bg-destructive",
  Python: "bg-accent",
  Java: "bg-orange-500",
  C: "bg-blue-400",
  Shell: "bg-green-500",
  Other: "bg-muted-foreground",
}

const FALLBACK_STATS = {
  publicRepos: 15,
  followers: 10,
  following: 20,
  totalStars: 5,
  topLanguages: [
    { name: "JavaScript", percentage: 40, color: "bg-yellow-400" },
    { name: "TypeScript", percentage: 25, color: "bg-primary" },
    { name: "C++", percentage: 20, color: "bg-glow-cyan" },
    { name: "CSS", percentage: 10, color: "bg-glow-purple" },
    { name: "Other", percentage: 5, color: "bg-muted-foreground" },
  ],
}

const FALLBACK_REPOS = []

const GitHubActivity = () => {
  const [stats, setStats] = useState(FALLBACK_STATS)
  const [repos, setRepos] = useState(FALLBACK_REPOS)
  const [loading, setLoading] = useState(true)
  const [isLive, setIsLive] = useState(false)

  useEffect(() => {
    const controller = new AbortController()
    const fetchGitHub = async () => {
      try {
        const headers = {
          "Accept": "application/vnd.github.v3+json",
          "User-Agent": "Portfolio-App",
        }
        
        // Add GitHub token if available from environment
        const githubToken = import.meta.env.VITE_GITHUB_TOKEN
        if (githubToken) {
          headers["Authorization"] = `token ${githubToken}`
        }

        const [userRes, reposRes] = await Promise.all([
          fetch(`${GITHUB_API}/users/${GITHUB_USERNAME}`, { 
            signal: controller.signal,
            headers,
          }),
          fetch(`${GITHUB_API}/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`, { 
            signal: controller.signal,
            headers,
          }),
        ])

        if (userRes.ok && reposRes.ok) {
          const userData = await userRes.json()
          const reposData = await reposRes.json()

          const langCount = {}
          let totalLangs = 0
          const nonForkRepos = reposData.filter((r) => !r.fork)

          nonForkRepos.forEach((repo) => {
            if (repo.language) {
              langCount[repo.language] = (langCount[repo.language] || 0) + 1
              totalLangs++
            }
          })

          const sortedLangs = Object.entries(langCount)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 5)
            .map(([name, count]) => ({
              name,
              percentage: Math.round((count / totalLangs) * 100),
              color: LANG_COLORS[name] || LANG_COLORS.Other,
            }))

          const totalPct = sortedLangs.reduce((s, l) => s + l.percentage, 0)
          if (sortedLangs.length > 0 && totalPct !== 100) {
            sortedLangs[0].percentage += 100 - totalPct
          }

          const totalStars = nonForkRepos.reduce((s, r) => s + r.stargazers_count, 0)

          setStats({
            publicRepos: userData.public_repos,
            followers: userData.followers,
            following: userData.following,
            totalStars,
            topLanguages: sortedLangs.length > 0 ? sortedLangs : FALLBACK_STATS.topLanguages,
          })

          const topRepos = nonForkRepos
            .sort((a, b) => b.stargazers_count - a.stargazers_count || new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
            .slice(0, 6)
          setRepos(topRepos)
          setIsLive(true)
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Failed to fetch GitHub data:", err)
        }
      } finally {
        setLoading(false)
      }
    }
    fetchGitHub()
    return () => controller.abort()
  }, [])

  const statCards = [
    { icon: GitBranch, label: "Repositories", value: stats.publicRepos, color: "text-primary" },
    { icon: Star, label: "Total Stars", value: stats.totalStars, color: "text-glow-cyan" },
    { icon: Users, label: "Followers", value: stats.followers, color: "text-accent" },
    { icon: Code2, label: "Languages", value: stats.topLanguages.length, color: "text-glow-purple" },
  ]

  return (
    <section id="github" className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="section-container relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-12 bg-primary/50" />
            <h2 className="text-sm font-mono text-primary uppercase tracking-[0.2em]">Open Source</h2>
          </div>
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4 text-balance">
            GitHub Activity
          </h3>
          <div className="flex items-center gap-2 mb-14">
            {loading ? (
              <span className="flex items-center gap-2 text-muted-foreground text-xs font-mono">
                <Loader2 size={14} className="animate-spin" /> Fetching live stats…
              </span>
            ) : (
              <span className={`text-xs font-mono px-2 py-0.5 rounded-full ${isLive ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground"}`}>
                {isLive ? "● Live from GitHub" : "Cached stats"}
              </span>
            )}
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {statCards.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="glass-card p-5 text-center group"
            >
              <stat.icon size={22} className={`${stat.color} mx-auto mb-2 group-hover:scale-110 transition-transform`} />
              <p className={`text-2xl font-display font-bold ${stat.color} tabular-nums`}>{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-7"
          >
            <h4 className="text-sm font-mono text-muted-foreground uppercase tracking-[0.15em] mb-6">Top Languages</h4>
            
            <div className="flex h-3 rounded-full overflow-hidden mb-6 gap-0.5">
              {stats.topLanguages.map((lang) => (
                <motion.div
                  key={lang.name}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${lang.percentage}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: [0.25, 0.4, 0.25, 1] }}
                  className={`${lang.color} rounded-full first:rounded-l-full last:rounded-r-full`}
                />
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              {stats.topLanguages.map((lang) => (
                <div key={lang.name} className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${lang.color}`} />
                  <span className="text-sm text-muted-foreground">{lang.name}</span>
                  <span className="text-xs font-mono text-foreground/60 tabular-nums">{lang.percentage}%</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-card p-7"
          >
            <h4 className="text-sm font-mono text-muted-foreground uppercase tracking-[0.15em] mb-6">Top Repositories</h4>
            
            {repos.length > 0 ? (
              <div className="space-y-3">
                {repos.map((repo, i) => (
                  <motion.a
                    key={repo.name}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ x: 4 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 hover:bg-secondary/60 border border-border/20 hover:border-primary/30 transition-all group"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <GitBranch size={14} className="text-primary shrink-0" />
                        <span className="text-sm font-mono text-foreground truncate group-hover:text-primary transition-colors">{repo.name}</span>
                      </div>
                      {repo.description && (
                        <p className="text-xs text-muted-foreground mt-1 truncate pl-6">{repo.description}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-3 shrink-0 ml-3">
                      {repo.language && (
                        <span className="text-[10px] font-mono text-muted-foreground px-1.5 py-0.5 rounded bg-secondary/50">{repo.language}</span>
                      )}
                      {repo.stargazers_count > 0 && (
                        <span className="flex items-center gap-1 text-xs text-glow-cyan">
                          <Star size={12} />
                          {repo.stargazers_count}
                        </span>
                      )}
                      <ExternalLink size={12} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </motion.a>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Loading repositories…</p>
            )}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="glass-card p-7 mt-6"
        >
          <h4 className="text-sm font-mono text-muted-foreground uppercase tracking-[0.15em] mb-4">Contribution Graph</h4>
          <div className="overflow-hidden rounded-lg">
            <img
              src={`https://ghchart.rshah.org/6366f1/${GITHUB_USERNAME}`}
              alt={`${GITHUB_USERNAME}'s GitHub contribution graph`}
              className="w-full h-auto opacity-90 hover:opacity-100 transition-opacity"
              loading="lazy"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 flex justify-center"
        >
          <Button variant="heroOutline" size="lg" asChild>
            <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noopener noreferrer">
              <Github size={16} />
              View GitHub Profile
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

export default GitHubActivity
