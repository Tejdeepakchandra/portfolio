import { motion } from "framer-motion"
import { GraduationCap, MapPin, Calendar, Award, Eye, X } from "lucide-react"
import { useState } from "react"

const education = [
  {
    institution: "Lovely Professional University",
    degree: "B.Tech — Computer Science and Engineering",
    score: "CGPA: 8.2",
    period: "2023 – Present",
    location: "Punjab, India",
    active: true,
  },
  {
    institution: "Narayana Junior College",
    degree: "Intermediate",
    score: "96%",
    period: "2021 – 2023",
    location: "Andhra Pradesh, India",
    active: false,
  },
  {
    institution: "Narayana Olympiad School",
    degree: "Matriculation",
    score: "99%",
    period: "2020 – 2021",
    location: "Andhra Pradesh, India",
    active: false,
  },
]

const certificates = [
  { 
    name: "Cloud Computing", 
    org: "NPTEL", 
    date: "Oct 2025", 
    icon: "☁️",
    link: "https://drive.google.com/file/d/1CXpOJzuBXl71B3eNh06DWVgu9whClED-/view?usp=sharing",
    embedId: "1CXpOJzuBXl71B3eNh06DWVgu9whClED-"
  },
  { 
    name: "Build Generative AI Apps", 
    org: "Infosys", 
    date: "Aug 2025", 
    icon: "🤖",
    link: "https://drive.google.com/file/d/1_zu4t-KTPJ-vdtwU7m5-Pg5bQfYKaIAI/view?usp=drive_link",
    embedId: "1_zu4t-KTPJ-vdtwU7m5-Pg5bQfYKaIAI"
  },
  { 
    name: "Version Control: Git & GitHub", 
    org: "Cipher Schools", 
    date: "Jul 2025", 
    icon: "🔧",
    link: "https://drive.google.com/file/d/1nNaUk4vaO6jS8uqZWLgmEij7PZo_yBjg/view?usp=drive_link",
    embedId: "1nNaUk4vaO6jS8uqZWLgmEij7PZo_yBjg"
  },
  { 
    name: "Data Structures & Algorithms", 
    org: "CSE Pathshala", 
    date: "Mar 2024", 
    icon: "📊",
    link: "https://drive.google.com/file/d/123pbJt5w2oJaEu89qc3pcw0j07gqzSlq/view?usp=drive_link",
    embedId: "123pbJt5w2oJaEu89qc3pcw0j07gqzSlq"
  },
]

const Education = () => {
  const [selectedCert, setSelectedCert] = useState(null)

  return (
    <section id="education" className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 gradient-mesh" />
      <div className="section-container relative">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-12 bg-primary/50" />
              <h2 className="text-sm font-mono text-primary uppercase tracking-[0.2em]">Education</h2>
            </div>
            <h3 className="text-3xl font-display font-bold text-foreground mb-10">Academic Background</h3>

            <div className="relative">
              <div className="absolute left-5 top-8 bottom-8 w-px bg-gradient-to-b from-primary/50 via-border/30 to-transparent" />

              <div className="space-y-8">
                {education.map((edu, i) => (
                  <motion.div
                    key={edu.institution}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15, duration: 0.5 }}
                    className="relative pl-14"
                  >
                    <div className={`absolute left-3.5 top-5 w-3 h-3 rounded-full border-2 ${
                      edu.active 
                        ? "border-primary bg-primary shadow-lg shadow-primary/30" 
                        : "border-border bg-card"
                    }`} />

                    <div className="glass-card-hover p-6 space-y-3">
                      <div className="flex items-start justify-between gap-4">
                        <h4 className="font-display font-semibold text-foreground text-lg">{edu.institution}</h4>
                        <span className="font-mono text-sm text-accent tabular-nums shrink-0 bg-accent/10 px-2.5 py-1 rounded-md">{edu.score}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{edu.degree}</p>
                      <div className="flex gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5"><Calendar size={12} />{edu.period}</span>
                        <span className="flex items-center gap-1.5"><MapPin size={12} />{edu.location}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Certificates */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-12 bg-glow-purple/50" />
              <h2 className="text-sm font-mono text-glow-purple uppercase tracking-[0.2em]">Certificates</h2>
            </div>
            <h3 className="text-3xl font-display font-bold text-foreground mb-10">Professional Training</h3>

            <div className="space-y-4">
              {certificates.map((cert, i) => (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  whileHover={{ x: 6, transition: { duration: 0.2 } }}
                  className="glass-card-hover p-5 flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-card border border-border/50 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                    {cert.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-display font-semibold text-foreground">{cert.name}</p>
                    <p className="text-xs text-muted-foreground">{cert.org}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs font-mono text-muted-foreground">{cert.date}</span>
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedCert(cert)
                      }}
                      className="p-2 hover:bg-primary/10 rounded-lg transition-colors text-muted-foreground hover:text-primary cursor-pointer z-10"
                      title="View certificate"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Eye size={16} />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Certificate Modal */}
      {selectedCert && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedCert(null)}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-card border border-border/50 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          >
            <div className="sticky top-0 bg-card border-b border-border/30 p-6 flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-display font-semibold text-foreground">{selectedCert.name}</h2>
                <p className="text-sm text-muted-foreground mt-1">Issued by {selectedCert.org} • {selectedCert.date}</p>
              </div>
              <button
                onClick={() => setSelectedCert(null)}
                className="p-2 hover:bg-primary/10 rounded-lg transition-colors text-muted-foreground hover:text-primary"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              <div className="w-full rounded-lg overflow-hidden border border-border/50 bg-background">
                <iframe
                  src={`https://drive.google.com/file/d/${selectedCert.embedId}/preview`}
                  className="w-full h-[600px] border-0"
                  allow="autoplay"
                  title={selectedCert.name}
                />
              </div>

              <div className="flex gap-3 mt-6">
                <a
                  href={selectedCert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
                >
                  Open in Google Drive
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}

export default Education
