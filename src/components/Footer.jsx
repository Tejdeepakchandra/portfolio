import { Github, Linkedin, Mail } from "lucide-react"
import { motion } from "framer-motion"

const Footer = () => {
  return (
    <footer className="py-10 border-t border-border/20 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/[0.02] to-transparent" />
      <div className="section-container relative flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <p className="text-sm text-muted-foreground">
            © 2026 <span className="text-foreground font-medium">Tej Deepak Chandra</span>
          </p>
          <p className="text-xs text-muted-foreground/60 mt-1">Built with React + Tailwind + Framer Motion</p>
        </div>
        <div className="flex items-center gap-3">
          {[
            { icon: Github, href: "https://github.com/Tejdeepakchandra" },
            { icon: Linkedin, href: "https://linkedin.com/in/tej-deepak-chandra" },
            { icon: Mail, href: "mailto:tejdeepak2005@gmail.com" },
          ].map(({ icon: Icon, href }) => (
            <motion.a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2, scale: 1.1 }}
              className="p-2.5 rounded-xl bg-card/50 border border-border/30 text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors duration-300"
            >
              <Icon size={16} />
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer
