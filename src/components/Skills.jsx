import { motion } from "framer-motion"

const skillGroups = [
  {
    title: "Languages",
    icon: "{ }",
    skills: ["C", "C++", "Java", "JavaScript", "TypeScript"],
    gradient: "from-primary/10 to-glow-cyan/5",
    borderGradient: "from-primary to-primary/20",
  },
  {
    title: "Frontend",
    icon: "◈",
    skills: ["HTML", "CSS", "Tailwind CSS", "React.js", "Material UI", "Bootstrap"],
    gradient: "from-glow-cyan/10 to-primary/5",
    borderGradient: "from-glow-cyan to-glow-cyan/20",
  },
  {
    title: "Backend",
    icon: "⬡",
    skills: ["Node.js", "Express.js", "REST APIs", "JWT Auth", "Socket.IO"],
    gradient: "from-accent/10 to-primary/5",
    borderGradient: "from-accent to-accent/20",
  },
  {
    title: "Databases",
    icon: "◉",
    skills: ["MongoDB", "MySQL", "PostgreSQL", "Redis"],
    gradient: "from-glow-purple/10 to-primary/5",
    borderGradient: "from-glow-purple to-glow-purple/20",
  },
  {
    title: "Real-Time",
    icon: "◎",
    skills: ["WebSockets", "Socket.IO", "WebRTC", "Event-Driven"],
    gradient: "from-primary/10 to-accent/5",
    borderGradient: "from-primary to-accent/20",
  },
  {
    title: "Tools",
    icon: "⚙",
    skills: ["Git", "GitHub", "VS Code", "Postman", "Docker", "Vercel"],
    gradient: "from-muted/20 to-primary/5",
    borderGradient: "from-accent to-primary/20",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 12,
      duration: 0.6,
    },
  },
}

const skillVariants = {
  hidden: { opacity: 0, scale: 0.7, y: 10 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: 0.2 + i * 0.05,
      duration: 0.4,
      type: "spring",
      stiffness: 120,
    },
  }),
}

const Skills = () => {
  return (
    <section id="skills" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      
      {/* Animated background orbs */}
      <motion.div
        className="absolute top-1/3 left-1/4 w-96 h-96 bg-glow-cyan/6 rounded-full blur-3xl -z-10"
        animate={{ y: [0, 50, 0], x: [0, -30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-1/4 w-80 h-80 bg-glow-purple/6 rounded-full blur-3xl -z-10"
        animate={{ y: [0, -40, 0], x: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <div className="section-container relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <motion.div
              className="h-1.5 bg-gradient-to-r from-primary via-glow-cyan to-transparent rounded-full"
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
              Tech Stack
            </motion.h2>
          </div>

          <motion.h3
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-foreground mb-8 text-balance"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Technologies I work with
          </motion.h3>

          <motion.div
            className="w-12 h-1.5 bg-gradient-to-r from-accent via-primary to-glow-cyan rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 48 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          />
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.title}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="glass-card-hover p-7 space-y-6 group relative overflow-hidden"
            >
              {/* Multi-layer glow background */}
              <motion.div
                className={`absolute -inset-1 rounded-xl bg-gradient-to-br ${group.gradient} opacity-0 group-hover:opacity-100 blur-xl -z-20`}
                transition={{ duration: 0.4 }}
              />
              <motion.div
                className="absolute -inset-1 rounded-xl bg-gradient-to-tl from-glow-purple/10 via-transparent to-transparent opacity-0 group-hover:opacity-50 blur-2xl -z-20"
                transition={{ duration: 0.6 }}
              />

              {/* Header with icon */}
              <div className="flex items-center gap-4 relative z-10">
                <motion.div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${group.gradient} flex items-center justify-center text-lg font-mono text-foreground/90 border border-border/40 group-hover:border-primary/60 transition-all duration-500 relative overflow-hidden`}
                  whileHover={{ scale: 1.1, rotate: 8 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  />
                  <div className="relative z-10">{group.icon}</div>
                </motion.div>
                <motion.h4
                  className="text-base font-display font-bold text-foreground group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent group-hover:bg-clip-text transition-all duration-300"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: gi * 0.05 + 0.2 }}
                >
                  {group.title}
                </motion.h4>
              </div>

              {/* Skills */}
              <motion.div
                className="flex flex-wrap gap-2.5 relative z-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: gi * 0.05 + 0.3 }}
              >
                {group.skills.map((skill, si) => (
                  <motion.span
                    key={skill}
                    custom={si}
                    variants={skillVariants}
                    initial="hidden"
                    whileInView="visible"
                    whileHover={{
                      scale: 1.1,
                      y: -4,
                      boxShadow: "0 0 20px rgba(6, 182, 212, 0.3)",
                    }}
                    className="px-3.5 py-2 text-sm rounded-lg bg-gradient-to-br from-secondary/70 to-secondary/40 text-foreground border border-border/50 group-hover:border-accent/40 hover:from-glow-cyan/20 hover:to-glow-cyan/10 hover:text-accent transition-all duration-300 cursor-default font-medium"
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
