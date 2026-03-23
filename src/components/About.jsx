import { motion } from "framer-motion"
import { Terminal, Server, Cpu, Zap } from "lucide-react"

const highlights = [
  { icon: Terminal, label: "Full Stack", desc: "End-to-end MERN applications with secure auth & APIs", color: "text-primary", gradient: "from-primary/20 to-primary/5" },
  { icon: Server, label: "Real-Time", desc: "WebSocket & Socket.IO powered collaborative systems", color: "text-glow-cyan", gradient: "from-glow-cyan/20 to-glow-cyan/5" },
  { icon: Cpu, label: "DSA / C++", desc: "Active competitive programmer on LeetCode", color: "text-accent", gradient: "from-accent/20 to-accent/5" },
  { icon: Zap, label: "System Design", desc: "Scalable architectures and synchronization engines", color: "text-glow-purple", gradient: "from-glow-purple/20 to-glow-purple/5" },
]

const About = () => {
  return (
    <section id="about" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 gradient-mesh" />
      
      {/* Animated background orbs */}
      <motion.div
        className="absolute top-40 right-1/3 w-96 h-96 bg-primary/8 rounded-full blur-3xl -z-10"
        animate={{ y: [0, 30, 0], x: [0, -15, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-20 left-1/2 w-80 h-80 bg-glow-purple/6 rounded-full blur-3xl -z-10"
        animate={{ y: [0, -40, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <div className="section-container relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Header with animated underline */}
          <div className="flex items-center gap-4 mb-6">
            <motion.div
              className="h-1.5 bg-gradient-to-r from-primary via-accent to-transparent rounded-full"
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: 56, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            />
            <motion.h2
              className="text-sm font-mono text-primary uppercase tracking-[0.3em] font-semibold"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              About Me
            </motion.h2>
          </div>

          <motion.h3
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-foreground mb-8 text-balance leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Building synchronization engines
            <br />
            <span className="gradient-text-premium">and scalable backends.</span>
          </motion.h3>

          <div className="grid lg:grid-cols-5 gap-12 mt-12">
            {/* Text Content */}
            <div className="lg:col-span-3 space-y-6 text-muted-foreground leading-relaxed text-lg">
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="hover:text-foreground/80 transition-colors duration-300"
              >
                I am a full-stack developer focused on building scalable web applications and real-time collaborative systems. I specialize in the MERN stack and have built multiple end-to-end applications including civic management platforms, job tracking tools, and real-time synchronization systems.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="hover:text-foreground/80 transition-colors duration-300"
              >
                I actively practice Data Structures and Algorithms in C++ to strengthen problem-solving skills for system design and backend engineering. Currently, I am developing <span className="text-accent font-semibold">SyncPlay</span> — a real-time synchronized media streaming and collaboration platform.
              </motion.p>
            </div>

            {/* Highlight Cards */}
            <div className="lg:col-span-2 grid grid-cols-2 gap-5">
              {highlights.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.5, type: "spring", stiffness: 100 }}
                  whileHover={{ scale: 1.08, y: -6 }}
                  className="glass-card-hover p-6 flex flex-col items-center text-center gap-3 group cursor-default relative"
                >
                  {/* Glow background on hover */}
                  <motion.div
                    className={`absolute inset-0 rounded-xl bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 blur-xl -z-10`}
                    transition={{ duration: 0.4 }}
                  />

                  <div className={`p-3.5 rounded-xl bg-gradient-to-br ${item.gradient} border border-border/50 group-hover:border-primary/60 transition-all duration-500`}>
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 8 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <item.icon size={24} className={`${item.color} group-hover:brightness-125`} />
                    </motion.div>
                  </div>
                  <p className="text-sm font-semibold text-foreground group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent group-hover:bg-clip-text transition-all duration-300">{item.label}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed group-hover:text-muted-foreground/60 transition-colors duration-300">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
