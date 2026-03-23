import { motion, useMotionValue, useTransform, useSpring } from "framer-motion"
import { Github, ExternalLink, Download, Code2, ArrowDown, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import profileImg from "@/assets/me.jpeg"
import { useEffect, useRef } from "react"

const techIcons = []

const textRevealVariants = {
  hidden: { opacity: 0, y: 50, filter: "blur(10px)" },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
}

const Hero = () => {
  const containerRef = useRef(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 40, damping: 25 })
  const springY = useSpring(mouseY, { stiffness: 40, damping: 25 })

  const orbX = useTransform(springX, [0, 1], [-30, 30])
  const orbY = useTransform(springY, [0, 1], [-30, 30])

  useEffect(() => {
    const handleMouse = (e) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      mouseX.set((e.clientX - rect.left) / rect.width)
      mouseY.set((e.clientY - rect.top) / rect.height)
    }
    window.addEventListener("mousemove", handleMouse)
    return () => window.removeEventListener("mousemove", handleMouse)
  }, [mouseX, mouseY])

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated background orbs with parallax */}
      <motion.div
        style={{ x: orbX, y: orbY }}
        className="absolute top-1/4 -left-40 w-[500px] h-[500px] rounded-full blur-[120px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <div className="w-full h-full bg-gradient-to-br from-primary/12 to-transparent rounded-full animate-glow-pulse" />
      </motion.div>
      <motion.div
        style={{ x: useTransform(orbX, v => -v * 0.8), y: useTransform(orbY, v => -v * 0.8) }}
        className="absolute bottom-1/4 -right-40 w-[450px] h-[450px] rounded-full blur-[110px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
      >
        <div className="w-full h-full bg-gradient-to-br from-glow-cyan/10 via-glow-purple/5 to-transparent rounded-full animate-glow-pulse" style={{ animationDelay: "1s" }} />
      </motion.div>
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px]"
        animate={{ y: [0, 40, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-full h-full bg-gradient-to-br from-glow-purple/8 via-primary/5 to-transparent rounded-full" />
      </motion.div>

      <div className="absolute inset-0 grid-bg opacity-30" />

      {techIcons.map((tech) => (
        <motion.div
          key={tech.label}
          className="absolute hidden lg:block px-3 py-1.5 rounded-full border border-border/30 bg-card/30 backdrop-blur-sm text-xs font-mono text-muted-foreground/60"
          style={{ left: tech.x, top: tech.y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5 + tech.delay * 0.2, duration: 0.5 }}
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4 + tech.delay, repeat: Infinity, ease: "easeInOut" }}
          >
            {tech.label}
          </motion.div>
        </motion.div>
      ))}

      <div className="section-container w-full py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            {/* Status Badge */}
            <motion.div
              custom={0}
              initial="hidden"
              animate="visible"
              variants={textRevealVariants}
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-accent/30 bg-gradient-to-r from-accent/15 to-accent/5 text-accent text-sm font-medium group hover:border-accent/60 hover:from-accent/25 hover:to-accent/10 transition-all duration-300 cursor-default"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent" />
              </span>
              <span>Available for SDE Roles</span>
            </motion.div>

            {/* Name and Title */}
            <div className="space-y-4">
              <motion.h1
                custom={1}
                initial="hidden"
                animate="visible"
                variants={textRevealVariants}
                className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold tracking-tighter leading-[1.05]"
              >
                <span className="text-foreground">Tej Deepak</span>
                <br />
                <span className="gradient-text-premium">Chandra</span>
              </motion.h1>

              <motion.p
                custom={2}
                initial="hidden"
                animate="visible"
                variants={textRevealVariants}
                className="text-lg sm:text-xl font-semibold text-primary/85 font-display"
              >
                Full Stack Developer · Real-Time Systems Engineer
              </motion.p>
            </div>

            {/* Description */}
            <motion.p
              custom={3}
              initial="hidden"
              animate="visible"
              variants={textRevealVariants}
              className="text-muted-foreground text-base sm:text-lg max-w-lg leading-relaxed"
            >
              Building scalable web platforms and real-time collaborative experiences. 
              Computer Science undergraduate crafting production-ready MERN applications.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              custom={4}
              initial="hidden"
              animate="visible"
              variants={textRevealVariants}
              className="flex flex-wrap gap-4 pt-4"
            >
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-wrap gap-4"
              >
                <motion.div variants={itemVariants} whileHover={{ scale: 1.08, y: -2 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="hero" size="lg" asChild className="group relative overflow-hidden">
                    <a href="#projects">
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        animate={{ x: [-100, 100] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <Code2 size={18} className="relative z-10" />
                      <span className="relative z-10">View Projects</span>
                    </a>
                  </Button>
                </motion.div>

                <motion.div variants={itemVariants} whileHover={{ scale: 1.08, y: -2 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="heroOutline" size="lg" asChild>
                    <a href="https://github.com/Tejdeepakchandra" target="_blank" rel="noopener noreferrer" className="group">
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="group-hover:block hidden"
                      >
                        <Github size={18} />
                      </motion.div>
                      <Github size={18} className="group-hover:hidden" />
                      GitHub
                    </a>
                  </Button>
                </motion.div>

                <motion.div variants={itemVariants} whileHover={{ scale: 1.08, y: -2 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="heroOutline" size="lg" asChild>
                    <a href="https://leetcode.com/u/Tejdeepakchandra/" target="_blank" rel="noopener noreferrer" className="group">
                      <motion.div
                        animate={{ rotate: [0, -360] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="group-hover:block hidden"
                      >
                        <ExternalLink size={18} />
                      </motion.div>
                      <ExternalLink size={18} className="group-hover:hidden" />
                      LeetCode
                    </a>
                  </Button>
                </motion.div>

                <motion.div variants={itemVariants} whileHover={{ scale: 1.08, y: -2 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="ghost" size="lg" asChild className="group">
                    <a href="/FullStack_CV_Tej.pdf" download>
                      <motion.div
                        animate={{ y: [0, 4, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Download size={18} />
                      </motion.div>
                      Resume
                    </a>
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column - Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative group">
              {/* Multi-layer glow background */}
              <motion.div
                className="absolute -inset-4 bg-gradient-to-br from-primary/25 via-glow-cyan/15 to-glow-purple/10 rounded-3xl blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 6, repeat: Infinity }}
              />
              <motion.div
                className="absolute -inset-2 bg-gradient-to-tl from-glow-purple/15 via-transparent to-primary/10 rounded-3xl blur-2xl opacity-50 group-hover:opacity-100"
                transition={{ duration: 0.5 }}
              />
              
              {/* Profile Image */}
              <motion.div 
                className="relative w-72 h-80 sm:w-80 sm:h-96 rounded-2xl overflow-hidden border border-border/40 group-hover:border-primary/60 transition-all duration-500"
                whileHover={{ scale: 1.02 }}
              >
                <img
                  src={profileImg}
                  alt="Tej Deepak Chandra"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/20 to-transparent" />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-glow-cyan/20 via-transparent to-glow-purple/20 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.5 }}
                />
              </motion.div>

              {/* Tech Badges */}
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, 2, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-8 px-5 py-3 glass-card glow-border text-sm font-mono text-accent font-semibold flex items-center gap-2"
              >
                <Sparkles size={16} />
                &lt;MERN Stack /&gt;
              </motion.div>
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, -2, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
                className="absolute -top-4 -right-8 px-5 py-3 glass-card glow-border text-sm font-mono text-primary font-semibold flex items-center gap-2"
              >
                <Sparkles size={16} />
                C++ DSA
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5"
        >
          <span className="text-xs text-muted-foreground/60 font-mono tracking-widest uppercase font-semibold">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="p-2 rounded-full border border-border/30 hover:border-primary/60 transition-colors"
          >
            <ArrowDown size={18} className="text-muted-foreground/50 hover:text-primary/70 transition-colors" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
