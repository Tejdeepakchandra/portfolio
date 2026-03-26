import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Download, Eye } from "lucide-react"

const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "DSA", href: "#leetcode" },
  { label: "GitHub", href: "#github" },
  { label: "Training", href: "#training" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
]

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const [showResumeModal, setShowResumeModal] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      
      const sections = navItems.map(item => item.href.slice(1))
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && el.getBoundingClientRect().top <= 200) {
          setActiveSection(sections[i])
          break
        }
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/70 backdrop-blur-2xl border-b border-border/30 shadow-2xl shadow-background/80"
            : "bg-transparent"
        }`}
      >
        <div className="section-container flex items-center justify-between h-16">
          <a href="#" className="text-lg font-display font-bold tracking-tight text-foreground group">
            T<span className="text-primary group-hover:text-accent transition-colors duration-300">.</span>DC
          </a>

          <div className="hidden md:flex items-center gap-0.5">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`px-3 py-2 text-sm rounded-lg transition-all duration-300 relative ${
                  activeSection === item.href.slice(1)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
                {activeSection === item.href.slice(1) && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-primary/10 rounded-lg -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </a>
            ))}
            <div className="ml-3 flex items-center gap-1.5">
              <button
                onClick={() => setShowResumeModal(true)}
                className="px-3 py-2 text-sm font-medium bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-all duration-300 flex items-center gap-2"
                title="View resume"
              >
                <Eye size={14} />
              </button>
              <a
                href="/FullStack_CV_Tej.pdf"
                download
                className="px-4 py-2 text-sm font-medium bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-all duration-300 flex items-center gap-2 hover:gap-3"
              >
                <Download size={14} />
                Resume
              </a>
            </div>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-40 bg-background/90 pt-20 md:hidden"
          >
            <div className="flex flex-col items-center gap-6 p-8">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="text-lg text-muted-foreground hover:text-foreground transition-colors font-display"
                >
                  {item.label}
                </motion.a>
              ))}
              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => {
                    setShowResumeModal(true)
                    setMobileOpen(false)
                  }}
                  className="px-4 py-3 bg-primary/10 text-primary rounded-xl font-medium flex items-center gap-2"
                >
                  <Eye size={16} />
                  View
                </button>
                <a
                  href="/FullStack_CV_Tej.pdf"
                  download
                  className="px-6 py-3 bg-primary/10 text-primary rounded-xl font-medium flex items-center gap-2"
                >
                  <Download size={16} />
                  Download
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Resume Modal */}
      {showResumeModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowResumeModal(false)}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-card border border-border/50 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          >
            <div className="sticky top-0 bg-card border-b border-border/30 p-6 flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-display font-semibold text-foreground">My Resume</h2>
                <p className="text-sm text-muted-foreground mt-1">Full Stack Developer - MERN Stack Specialist</p>
              </div>
              <button
                onClick={() => setShowResumeModal(false)}
                className="p-2 hover:bg-primary/10 rounded-lg transition-colors text-muted-foreground hover:text-primary"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              <div className="w-full rounded-lg overflow-hidden border border-border/50 bg-background">
                <embed
                  src="/FullStack_CV_Tej.pdf"
                  type="application/pdf"
                  className="w-full h-[600px]"
                  title="Resume PDF"
                />
              </div>

              <div className="flex gap-3 mt-6">
                <a
                  href="/FullStack_CV_Tej.pdf"
                  download
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium flex items-center gap-2"
                >
                  <Download size={16} />
                  Download
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  )
}

export default Navbar
