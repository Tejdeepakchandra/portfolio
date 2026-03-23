import { motion } from "framer-motion"
import { Github, ExternalLink, ArrowUpRight, Zap, Code2, Layers } from "lucide-react"

const projects = [
  {
    title: "Citizen Road Feedback Management System",
    subtitle: "Civic Infrastructure Platform",
    points: [
      "Real-time issue tracking with multi-role dashboards\nCitizens, municipal staff, and NGOs collaborate seamlessly",
      "Integrated Razorpay payments & SendGrid email notifications\nSocket.IO ensures all stakeholders see updates instantly",
      "Geo-indexed analytics on resolution metrics & civic impact\nDashboard insights on issue categories and resolution times"
    ],
    tech: ["React", "Node.js", "Express", "MongoDB", "Socket.IO", "JWT", "SendGrid", "Razorpay"],
    architecture: [
      "Real-time WebSocket sync",
      "Role-based access control",
      "Payment gateway integration",
      "Email notification system",
    ],
    icon: Code2,
    github: "https://github.com/Tejdeepakchandra/Citizen-Road-Feedback-Management",
    demo: "https://citizen-road-feedback-management.vercel.app/",
    badge: "Production Ready",
    gradient: "from-primary/10 via-glow-cyan/5 to-transparent",
  },
  {
    title: "Job Application Tracker",
    subtitle: "Developer Productivity Tool",
    points: [
      "Centralized dashboard for managing applications across all platforms\nConsolidate job applications in one place with timeline visualization",
      "AI-powered technology matching with customizable status pipelines\nIdentify skill gaps and track from Applied → Screening → Interview → Offer",
      "Success analytics & interview conversion rate tracking\nDetailed metrics on company/role success rates & hiring progression"
    ],
    tech: ["React", "Node.js", "Express", "MongoDB", "Material UI", "JWT", "Multer"],
    architecture: [
      "RESTful API design",
      "JWT authentication",
      "File storage pipeline",
      "Mobile-first responsive UI",
    ],
    icon: Layers,
    github: "https://github.com/Tejdeepakchandra/Job_Application_Tracker",
    demo: "https://job-application-tracker-two-nu.vercel.app/",
    badge: "Production Ready",
    gradient: "from-glow-purple/10 via-primary/5 to-transparent",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.85 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 12,
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

const pointVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.3 + i * 0.1,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
}

const tagVariants = {
  hidden: { opacity: 0, scale: 0.7, y: 10 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: 0.4 + i * 0.08,
      duration: 0.5,
      type: "spring",
      stiffness: 120,
    },
  }),
}

const Projects = () => {

  return (
    <section id="projects" className="py-28 relative overflow-hidden">
      {/* Enhanced animated background with multiple layers */}
      <div className="absolute inset-0 grid-bg opacity-20" />
      
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-20 right-1/4 w-96 h-96 bg-primary/8 rounded-full blur-3xl -z-10"
        animate={{ y: [0, 40, 0], x: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 left-1/4 w-96 h-96 bg-accent/8 rounded-full blur-3xl -z-10"
        animate={{ y: [0, -40, 0], x: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="absolute top-1/2 right-1/3 w-80 h-80 bg-glow-cyan/6 rounded-full blur-3xl -z-10"
        animate={{ y: [0, 60, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <div className="section-container relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="flex items-center gap-3 mb-4">
            <motion.div
              className="h-1 bg-gradient-to-r from-primary via-accent to-transparent rounded-full"
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: 48, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            />
            <motion.h2
              className="text-sm font-mono text-primary uppercase tracking-[0.3em] font-semibold"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Featured Works
            </motion.h2>
          </div>
          <motion.h3
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold bg-gradient-to-r from-foreground via-primary/80 to-foreground bg-clip-text text-transparent mb-6 text-balance"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Production-grade applications
          </motion.h3>
          <motion.div
            className="w-12 h-1.5 bg-gradient-to-r from-accent via-primary to-glow-cyan rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 48 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid md:grid-cols-2 gap-8 mt-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {projects.map((project, i) => {
            const ProjectIcon = project.icon
            return (
              <motion.div
                key={project.title}
                variants={itemVariants}
                className="group relative h-full"
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              >
                {/* Multi-layer background glow effect */}
                <motion.div
                  className="absolute -inset-0.5 rounded-xl bg-gradient-to-br from-primary/20 via-transparent to-glow-cyan/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-20"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                />
                <motion.div
                  className="absolute -inset-0.5 rounded-xl bg-gradient-to-tl from-glow-purple/15 via-transparent to-transparent opacity-0 group-hover:opacity-75 blur-2xl transition-opacity duration-700 -z-20"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.75 }}
                />

                {/* Main Card with enhanced styling */}
                <div className="glass-card p-0 overflow-hidden flex flex-col group hover:shadow-2xl transition-all duration-500 h-full border border-border/30 group-hover:border-primary/40 backdrop-blur-xl">
                  {/* Animated gradient line top */}
                  <motion.div
                    className={`h-1.5 bg-gradient-to-r ${project.gradient}`}
                    initial={{ opacity: 0.4, scaleX: 0 }}
                    whileInView={{ opacity: 1, scaleX: 1 }}
                    whileHover={{ opacity: 1, scaleX: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    style={{ originX: 0 }}
                  />

                  {/* Card Content */}
                  <div className="p-8 space-y-6 flex-1 flex flex-col">
                    {/* Icon + Badge Section with enhanced animations */}
                    <div className="flex items-start justify-between gap-4">
                      <motion.div
                        className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 flex items-center justify-center group-hover:from-primary/30 group-hover:to-primary/10 transition-all duration-500 relative overflow-hidden"
                        whileHover={{ scale: 1.15, rotate: 8 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.div className="relative z-10">
                          <ProjectIcon size={26} className="text-primary" />
                        </motion.div>
                      </motion.div>

                      <motion.span
                        className="text-xs px-4 py-2 rounded-full bg-gradient-to-r from-accent/20 to-accent/10 text-accent font-mono border border-accent/40 whitespace-nowrap flex items-center gap-1.5 group-hover:from-accent/30 group-hover:to-accent/20 transition-all duration-300"
                        whileHover={{ scale: 1.08, y: -2 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        >
                          <Zap size={11} />
                        </motion.div>
                        {project.badge}
                      </motion.span>
                    </div>

                    {/* Title and Subtitle with dynamic colors */}
                    <div className="space-y-2.5">
                      <motion.p
                        className="text-xs font-mono text-primary/70 uppercase tracking-widest"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        {project.subtitle}
                      </motion.p>
                      <motion.h4
                        className="text-2xl font-display font-bold text-foreground group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent group-hover:bg-clip-text transition-all duration-300 flex items-center gap-2.5"
                        whileHover={{ x: 4 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {project.title}
                        <motion.div
                          initial={{ opacity: 0, x: -8, rotate: -45 }}
                          whileHover={{ opacity: 1, x: 4, rotate: 0 }}
                          transition={{ duration: 0.3 }}
                          className="flex-shrink-0"
                        >
                          <ArrowUpRight size={20} className="text-primary" />
                        </motion.div>
                      </motion.h4>
                    </div>

                    {/* Description Points with enhanced animations */}
                    <div className="space-y-3.5">
                      {project.points.map((point, idx) => (
                        <motion.div
                          key={idx}
                          variants={pointVariants}
                          custom={idx}
                          initial="hidden"
                          whileInView="visible"
                          className="flex gap-4 group/point p-3 rounded-lg hover:bg-primary/5 transition-colors duration-300"
                        >
                          <motion.span
                            className="text-primary font-bold text-lg mt-0.5 flex-shrink-0"
                            whileHover={{ scale: 1.4, rotate: 12 }}
                          >
                            •
                          </motion.span>
                          <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap group-hover/point:text-foreground/90 transition-colors duration-300">{point}</p>
                        </motion.div>
                      ))}
                    </div>

                    {/* Architecture Tags with staggered animation */}
                    <div>
                      <motion.p
                        className="text-xs font-mono text-muted-foreground/70 uppercase tracking-wider mb-3.5 flex items-center gap-2"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <motion.span
                          className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-accent to-primary"
                          animate={{ boxShadow: ["0 0 0 0 rgba(var(--accent-rgb), 0.7)", "0 0 0 6px rgba(var(--accent-rgb), 0)"] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        Architecture
                      </motion.p>
                      <motion.div className="flex flex-wrap gap-2.5">
                        {project.architecture.map((arch, idx) => (
                          <motion.span
                            key={arch}
                            custom={idx}
                            variants={tagVariants}
                            initial="hidden"
                            whileInView="visible"
                            className="text-xs px-3.5 py-2 rounded-lg bg-gradient-to-br from-primary/15 to-primary/5 text-primary border border-primary/25 group-hover:border-primary/50 transition-all font-mono font-medium hover:from-primary/25 hover:to-primary/10"
                            whileHover={{ scale: 1.08, y: -2 }}
                          >
                            {arch}
                          </motion.span>
                        ))}
                      </motion.div>
                    </div>

                    {/* Tech Stack with gradient colors */}
                    <div>
                      <motion.p
                        className="text-xs font-mono text-muted-foreground/70 uppercase tracking-wider mb-3.5 flex items-center gap-2"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <motion.span
                          className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-glow-cyan to-primary"
                          animate={{ boxShadow: ["0 0 0 0 rgba(var(--glow-cyan-rgb), 0.7)", "0 0 0 6px rgba(var(--glow-cyan-rgb), 0)"] }}
                          transition={{ duration: 2.5, repeat: Infinity, delay: 0.2 }}
                        />
                        Tech Stack
                      </motion.p>
                      <motion.div className="flex flex-wrap gap-2.5">
                        {project.tech.map((t, idx) => (
                          <motion.span
                            key={t}
                            custom={idx}
                            variants={tagVariants}
                            initial="hidden"
                            whileInView="visible"
                            className="px-3.5 py-2 text-xs font-mono rounded-lg bg-gradient-to-br from-glow-cyan/15 via-secondary/50 to-glow-purple/10 text-foreground border border-border/40 group-hover:border-accent/40 transition-all hover:from-glow-cyan/25 hover:via-secondary/70 hover:to-glow-purple/20 font-medium"
                            whileHover={{ scale: 1.08, y: -2 }}
                          >
                            {t}
                          </motion.span>
                        ))}
                      </motion.div>
                    </div>

                    {/* CTA Buttons with advanced interactions */}
                    <div className="flex gap-3 pt-6 flex-wrap pointer-events-auto z-20 relative">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          window.open(project.github, '_blank');
                        }}
                        className="inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold rounded-lg bg-primary/20 text-primary border border-primary/50 hover:bg-primary/30 hover:border-primary/70 transition-all hover:scale-110 active:scale-95 cursor-pointer pointer-events-auto z-20 relative"
                      >
                        <Github size={18} />
                        <span>GitHub</span>
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          window.open(project.demo, '_blank');
                        }}
                        className="inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold rounded-lg bg-accent/30 text-accent border border-accent/60 hover:bg-accent/40 hover:border-accent/80 transition-all hover:scale-110 active:scale-95 cursor-pointer pointer-events-auto z-20 relative"
                      >
                        <ExternalLink size={18} />
                        <span>Live Demo</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
