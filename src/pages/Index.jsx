import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import About from "@/components/About"
import Skills from "@/components/Skills"
import FeaturedProject from "@/components/FeaturedProject"
import Projects from "@/components/Projects"
import LeetCode from "@/components/LeetCode"
import GitHubActivity from "@/components/GitHubActivity"
import Training from "@/components/Training"
import Education from "@/components/Education"
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"

const Index = () => {
  return (
    <div className="min-h-screen bg-background noise-bg">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <FeaturedProject />
      <Projects />
      <LeetCode />
      <GitHubActivity />
      <Training />
      <Education />
      <Contact />
      <Footer />
    </div>
  )
}

export default Index
