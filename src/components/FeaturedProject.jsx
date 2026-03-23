import { motion } from "framer-motion"
import { Github, ExternalLink, Wifi, Users, MessageSquare, Monitor, Zap, Layers } from "lucide-react"

const FeaturedProject = () => {

  const features = [
    { icon: Wifi, text: "Real-time playback synchronization (<100ms)" },
    { icon: Zap, text: "NTP-style sync engine with drift correction" },
    { icon: Users, text: "Multi-user room collaboration system" },
    { icon: MessageSquare, text: "Real-time chat & reaction detection" },
    { icon: Monitor, text: "Distributed moment capture system" },
    { icon: Layers, text: "Multi-client state consistency (Redis)" },
  ]

  const techStack = [
    // Frontend
    { name: "React 18", icon: "⚛️" },
    { name: "Vite", icon: "⚡" },
    { name: "TailwindCSS", icon: "🎨" },
    { name: "Framer Motion", icon: "✨" },
    { name: "Zustand", icon: "📦" },
    // Backend
    { name: "Node.js", icon: "💚" },
    { name: "Express", icon: "🚂" },
    { name: "Socket.IO", icon: "🔌" },
    // Realtime & Streaming
    { name: "WebRTC", icon: "🌐" },
    { name: "Redis", icon: "🟥" },
    // Databases
    { name: "MongoDB", icon: "🍃" },
    { name: "PostgreSQL", icon: "🐘" },
    // Media Processing
    { name: "FFmpeg", icon: "🎬" },
    { name: "Cloudinary", icon: "☁️" },
    // Security & Auth
    { name: "JWT", icon: "🔐" },
    { name: "Clerk", icon: "🛡️" },
  ]

  const demoSteps = [
    { label: "User Creates Room", time: "0ms", icon: "🏠" },
    { label: "Friend Joins Party", time: "+150ms", icon: "👥" },
    { label: "Playback Synced", time: "+250ms", icon: "▶️" },
    { label: "Moment Detected", time: "+300ms", icon: "✨" },
  ]

  return (
    <section id="syncplay" className="py-28 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full blur-[200px] bg-primary/5" />

      <div className="section-container relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-12 bg-accent/50" />
            <h2 className="text-sm font-mono text-accent uppercase tracking-[0.2em]">
              Featured Project
            </h2>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
              key="project"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="glass-card overflow-hidden glow-border"
            >
              <div className="grid lg:grid-cols-5 gap-0">
            {/* Left - Showcase */}
            <div className="lg:col-span-2 relative p-8 lg:p-10 flex flex-col justify-center items-center text-center border-b lg:border-b-0 lg:border-r border-border/30 overflow-hidden">
              {/* Gradient bg */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-accent/5 to-glow-cyan/5" />
              <div className="absolute inset-0 grid-bg opacity-30" />

              <div className="relative space-y-8">
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 3 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/30 flex items-center justify-center glow-accent"
                >
                  <Wifi size={40} className="text-accent" />
                </motion.div>

                {/* Title */}
                <div>
                  <h3 className="text-4xl font-display font-bold text-foreground mb-2">SyncPlay</h3>
                  <p className="text-sm text-muted-foreground">Real-Time Collaborative Media Platform</p>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="glass-card p-4 group hover:glow-border transition-all duration-500">
                    <p className="font-mono text-accent text-xl tabular-nums">&lt;100ms</p>
                    <p className="text-xs text-muted-foreground mt-1">Sync Latency</p>
                  </div>
                  <div className="glass-card p-4 group hover:glow-border transition-all duration-500">
                    <p className="font-mono text-primary text-xl">&lt;5ms</p>
                    <p className="text-xs text-muted-foreground mt-1">Drift Correction</p>
                  </div>
                </div>

                {/* Demo Timeline */}
                <div className="glass-card p-4 space-y-3">
                  <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider flex items-center justify-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    Live Demo Flow
                  </p>
                  {demoSteps.map((step, i) => (
                    <motion.div
                      key={step.label}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + i * 0.15 }}
                      className="flex items-center gap-2"
                    >
                      <span className="text-xl">{step.icon}</span>
                      <span className="text-xs text-foreground/80 flex-1 text-left">{step.label}</span>
                      <span className="text-xs font-mono text-muted-foreground tabular-nums">{step.time}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right - Details */}
            <div className="lg:col-span-3 p-8 lg:p-10 space-y-7">
              {/* Description */}
              <div className="space-y-3">
                <p className="text-muted-foreground leading-relaxed text-base">
                  <span className="font-semibold text-foreground">SyncPlay</span> is a distributed real-time media synchronization platform that enables multiple users to watch movies/listen to music together with perfect timing synchronization across all connected clients.
                </p>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  The system uses <span className="text-accent font-mono">NTP-style clock synchronization</span> to detect and correct network drift (120ms → &lt;5ms), <span className="text-accent font-mono">WebRTC</span> for P2P streaming, and <span className="text-accent font-mono">FFmpeg</span> for automatic highlight detection.
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid sm:grid-cols-2 gap-3">
                {features.map((f, i) => (
                  <motion.div
                    key={f.text}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ x: 4 }}
                    className="flex items-start gap-3 text-sm text-muted-foreground group cursor-default"
                  >
                    <div className="p-1.5 rounded-md bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors mt-0.5 flex-shrink-0">
                      <f.icon size={14} />
                    </div>
                    <span>{f.text}</span>
                  </motion.div>
                ))}
              </div>

              {/* Tech Stack Section */}
              <div>
                <p className="text-xs font-mono text-muted-foreground mb-3 uppercase tracking-[0.2em]">🛠 Complete Tech Stack (16 Technologies)</p>
                <div className="flex flex-wrap gap-2">
                  {techStack.map((t, i) => (
                    <motion.span
                      key={t.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.03 }}
                      whileHover={{ scale: 1.1 }}
                      className="px-3 py-1.5 text-xs font-mono rounded-lg bg-accent/8 text-accent border border-accent/20 hover:border-accent/40 transition-all cursor-default"
                    >
                      {t.icon} {t.name}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-3 pt-3 pointer-events-auto z-20 relative">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    window.open('https://github.com/Tejdeepakchandra/SyncPlay', '_blank');
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg bg-gradient-to-r from-primary/30 to-primary/10 text-primary border border-primary/50 hover:border-primary/70 hover:from-primary/40 hover:to-primary/20 transition-all hover:scale-105 active:scale-95 cursor-pointer pointer-events-auto z-20 relative"
                >
                  <Github size={16} />
                  <span>View Source</span>
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    window.open('https://sync-play.vercel.app', '_blank');
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg bg-accent/20 text-accent border border-accent/50 hover:border-accent/70 hover:bg-accent/30 transition-all hover:scale-105 active:scale-95 cursor-pointer pointer-events-auto z-20 relative"
                >
                  <ExternalLink size={16} />
                  <span>Live Demo</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturedProject

