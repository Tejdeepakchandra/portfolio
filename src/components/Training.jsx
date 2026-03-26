import { motion } from "framer-motion"
import { BookOpen, MapPin, Calendar } from "lucide-react"

const trainings = [
  {
    organization: "Cipher Schools",
    title: "MERN Stack Development",
    period: "Jul 2025",
    location: "Online",
    proficiency: "95%+",
    highlights: [
      "Completed an intensive, project-based training program, achieving a 95%+ proficiency score in building end-to-end web applications.",
      "Mastered component-based architecture in React.js and developed scalable backend services using Node.js and Express.js.",
      "Engineered and managed MongoDB databases, implementing RESTful APIs with JWT authentication that improved data security.",
      "Successfully deployed multiple full-stack modules, including CRUD applications and user authentication systems"
    ]
  },
]

const Training = () => {
  return (
    <section id="training" className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 gradient-mesh" />
      <div className="section-container relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-12 bg-glow-cyan/50" />
            <h2 className="text-sm font-mono text-glow-cyan uppercase tracking-[0.2em]">Training</h2>
          </div>
          <h3 className="text-3xl font-display font-bold text-foreground mb-10">Professional Development</h3>

          <div className="space-y-8">
            {trainings.map((training, i) => (
              <motion.div
                key={training.organization}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="glass-card-hover p-8 space-y-6 group hover:border-glow-cyan/30 transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="font-display font-semibold text-foreground text-lg">{training.organization}</h4>
                      <p className="text-primary font-medium mt-1">{training.title}</p>
                    </div>
                    <span className="font-mono text-sm text-accent tabular-nums shrink-0 bg-accent/10 px-3 py-1 rounded-md">{training.proficiency}</span>
                  </div>
                  
                  <div className="flex gap-4 text-xs text-muted-foreground flex-wrap">
                    <span className="flex items-center gap-1.5"><Calendar size={12} />{training.period}</span>
                    <span className="flex items-center gap-1.5"><MapPin size={12} />{training.location}</span>
                  </div>
                </div>

                <div className="space-y-3 border-t border-border/30 pt-6">
                  {training.highlights.map((highlight, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + idx * 0.05, duration: 0.4 }}
                      className="flex gap-3"
                    >
                      <BookOpen size={16} className="text-glow-cyan/60 mt-1 flex-shrink-0" />
                      <p className="text-sm text-muted-foreground leading-relaxed">{highlight}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Training
