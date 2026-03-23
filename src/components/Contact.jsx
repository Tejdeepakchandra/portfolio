import { motion } from "framer-motion"
import { Mail, Phone, Github, Linkedin, ExternalLink, Send, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

const links = [
  {
    icon: Mail,
    label: "Email",
    value: "tejdeepak2005@gmail.com",
    href: "mailto:tejdeepak2005@gmail.com",
    color: "group-hover:text-accent",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "tej-deepak-chandra",
    href: "https://linkedin.com/in/tej-deepak-chandra",
    color: "group-hover:text-primary",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "Tejdeepakchandra",
    href: "https://github.com/Tejdeepakchandra",
    color: "group-hover:text-foreground",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 8309464414",
    href: "tel:+918309464414",
    color: "group-hover:text-glow-cyan",
  },
]

const Contact = () => {
  const handleResumeDownload = () => {
    // Direct download from public folder
    const link = document.createElement('a');
    link.href = '/FullStack_CV_Tej.pdf';
    link.setAttribute('download', 'Tej_Deepak_Resume.pdf');
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="contact" className="py-28 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-[200px] bg-primary/5" />
      
      <div className="section-container relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-12 bg-primary/50" />
            <h2 className="text-sm font-mono text-primary uppercase tracking-[0.2em]">Contact</h2>
            <div className="h-px w-12 bg-primary/50" />
          </div>
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-5 text-balance">
            Let's build something
            <br />
            <span className="gradient-text">together.</span>
          </h3>
          <p className="text-muted-foreground max-w-md mx-auto text-lg">
            Open to SDE roles, freelance projects, and collaboration opportunities.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {links.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.label !== "Phone" ? "_blank" : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="glass-card-hover p-6 flex items-center gap-4 group"
            >
              <div className={`p-3 rounded-xl bg-card border border-border/50 text-muted-foreground ${link.color} transition-colors duration-300`}>
                <link.icon size={22} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-mono">{link.label}</p>
                <p className="text-sm font-medium text-foreground truncate">{link.value}</p>
              </div>
              <ExternalLink size={14} className="text-muted-foreground/40 group-hover:text-primary transition-colors shrink-0" />
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center gap-4 mt-10 flex-wrap"
        >
          <Button variant="hero" size="lg" asChild>
            <a href="mailto:tejdeepak2005@gmail.com">
              <Send size={18} />
              Get In Touch
            </a>
          </Button>
          <Button variant="heroOutline" size="lg" onClick={handleResumeDownload} className="cursor-pointer">
            <Download size={18} />
            Download Resume
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
