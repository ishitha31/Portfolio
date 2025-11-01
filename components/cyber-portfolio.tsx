"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"
import {
  ArrowUp,
  ChevronDown,
  ChevronUp,
  Code,
  Github,
  Linkedin,
  Lock,
  Mail,
  Shield,
  MenuIcon,
  XIcon,
  Play,
  ExternalLink,
} from "lucide-react"
import Link from "next/link"
import { useMediaQuery } from "@/hooks/use-media-query"
import AboutMe from "@/components/about-me"
import Skills from "@/components/skills"
import Education from "@/components/education"
import Experience from "@/components/experience"
import ProjectFilter from "@/components/project-filter"
import Contact from "@/components/contact"
import Certifications from "@/components/certifications"
import TerminalSimulation from "@/components/terminal-simulation"
import TypewriterComponent from "typewriter-effect"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"

export default function CyberPortfolio() {
  const [activeSection, setActiveSection] = useState("hero")
  const [scrolled, setScrolled] = useState(false)
  const [scanComplete, setScanComplete] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const [scanText, setScanText] = useState("Initializing security scan...")
  const [expandedProject, setExpandedProject] = useState<number | null>(null)
  const [activeFilter, setActiveFilter] = useState("all")
  const [modalOpen, setModalOpen] = useState(false)
  const [modalTitle, setModalTitle] = useState("")
  const [modalMessage, setModalMessage] = useState("")

  const isMobile = useMediaQuery("(max-width: 768px)")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  // Resume download link (Google Drive direct download)
  const resumeLink = "https://drive.google.com/uc?export=download&id=1R5_tOugy7a09Cq3ZFAunM5U_FTW06-H5"

  const sectionRefs = {
    hero: useRef<HTMLDivElement>(null),
    about: useRef<HTMLDivElement>(null),
    skills: useRef<HTMLDivElement>(null),
    education: useRef<HTMLDivElement>(null),
    experience: useRef<HTMLDivElement>(null),
    projects: useRef<HTMLDivElement>(null),
    certifications: useRef<HTMLDivElement>(null),
    achievements: useRef<HTMLDivElement>(null),
    contact: useRef<HTMLDivElement>(null),
  }

  // Security scanner effect
  useEffect(() => {
    // mark component as mounted to avoid SSR/CSR content mismatch
    setMounted(true)
    const scanMessages = [
      "Initializing security scan...",
      "Checking for vulnerabilities...",
      "Scanning network ports...",
      "Analyzing system integrity...",
      "Verifying encryption protocols...",
      "Securing communication channels...",
      "Establishing secure connection...",
      "Security scan complete. Welcome.",
    ]

    let currentIndex = 0

    const interval = setInterval(() => {
      if (currentIndex < scanMessages.length - 1) {
        currentIndex++
        setScanText(scanMessages[currentIndex])
        setScanProgress((currentIndex / (scanMessages.length - 1)) * 100)
      } else {
        setScanComplete(true)
        clearInterval(interval)
      }
    }, 600)

    return () => clearInterval(interval)
  }, [])

  // Scroll handling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }

      // Determine active section based on scroll position
      const scrollPosition = window.scrollY + 100

      if (sectionRefs.contact.current && scrollPosition >= sectionRefs.contact.current.offsetTop) {
        setActiveSection("contact")
      } else if (
        document.getElementById("achievements")?.offsetTop &&
        scrollPosition >= document.getElementById("achievements")?.offsetTop!
      ) {
        setActiveSection("achievements")
      } else if (sectionRefs.certifications.current && scrollPosition >= sectionRefs.certifications.current.offsetTop) {
        setActiveSection("certifications")
      } else if (sectionRefs.projects.current && scrollPosition >= sectionRefs.projects.current.offsetTop) {
        setActiveSection("projects")
      } else if (sectionRefs.experience.current && scrollPosition >= sectionRefs.experience.current.offsetTop) {
        setActiveSection("experience")
      } else if (sectionRefs.education.current && scrollPosition >= sectionRefs.education.current.offsetTop) {
        setActiveSection("education")
      } else if (sectionRefs.skills.current && scrollPosition >= sectionRefs.skills.current.offsetTop) {
        setActiveSection("skills")
      } else if (sectionRefs.about.current && scrollPosition >= sectionRefs.about.current.offsetTop) {
        setActiveSection("about")
      } else {
        setActiveSection("hero")
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Mobile menu handling
  useEffect(() => {
    if (!isMobile && isMenuOpen) {
      setIsMenuOpen(false)
    }
  }, [isMobile, isMenuOpen])

  // Scroll to section
  const scrollToSection = (sectionId: keyof typeof sectionRefs) => {
    setIsMenuOpen(false) // Close the menu first

    // Add a small delay to ensure the menu closes first
    setTimeout(() => {
      if (sectionId === "achievements") {
        // Special handling for achievements section
        const achievementsSection = document.getElementById("achievements")
        if (achievementsSection) {
          achievementsSection.scrollIntoView({ behavior: "smooth" })
        }
      } else {
        const sectionElement = sectionRefs[sectionId]?.current
        if (sectionElement) {
          sectionElement.scrollIntoView({ behavior: "smooth" })
        }
      }
    }, 100)
  }

  // Project expansion toggle
  const toggleProject = (index: number) => {
    if (expandedProject === index) {
      setExpandedProject(null)
    } else {
      setExpandedProject(index)
    }
  }

  // Handle demo button click
  const handleDemoClick = (projectTitle: string) => {
    setModalTitle("Demo not available")
    setModalMessage(`The demo for "${projectTitle}" is not deployed yet.`)
    setModalOpen(true)
  }

  // Handle view code button click
  const handleViewCodeClick = (projectTitle: string) => {
    setModalTitle("Source code not available")
    setModalMessage(`The code for "${projectTitle}" is not uploaded to GitHub yet.`)
    setModalOpen(true)
  }

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  // Data
  const projects = [
    {
      title: "Restaurant Management System",
      period: "Summer 2024",
      description: "Independently established a custom web-based system for a local restaurant to digitize daily operations",
      details: "Built a full-stack web app using React.js, Node.js, and MongoDB to automate billing, orders, and table bookings for a local restaurant, enabling live menu access and cloud updates that improved accuracy and cut manual work by 30%.",
      tags: ["React.js", "Node.js", "MongoDB", "Full-Stack", "Web Development"],
      categories: ["Web Development"],
      securityLevel: "High",
      demoLink: "https://srifriendsandflavours.vercel.app/",
      githubLink: "https://github.com/ishitha31/Restaurant-Management"
    },
    {
      title: "Fraud Detection in Banking Data",
      period: "Winter 2024",
      description: "Ensemble machine learning model for detecting banking fraud in imbalanced datasets",
      details: "Developed an ensemble fraud detection model using CatBoost, XGBoost, LightGBM, and Logistic Regression on 10,000+ transactions, achieving 91% ROC-AUC, while ensuring clean data, accurate labels, and interactive Power BI dashboards for easy fraud trend visualization.",
      tags: ["Machine Learning", "CatBoost", "XGBoost", "LightGBM", "Power BI"],
      categories: ["Machine Learning"],
      securityLevel: "Critical",
    },
    {
      title: "Keyword Extraction and Text Summarization in Emails",
      period: "Summer 2025",
      description: "Automated corporate email reading by generating concise summaries and keywords",
      details: "Built an NLP system using BERT, NER, TextRank, and T5 Transformer on the ENRON dataset of 500,000+ emails to extract keywords and generate summaries, reducing manual reading time and streamlining email processing through an integrated end-to-end pipeline.",
      tags: ["NLP", "BERT", "NER", "TextRank", "T5 Transformer"],
      categories: ["Machine Learning"],
      securityLevel: "High",
      githubLink: "https://github.com/ishitha31/Keyword-Extraction-and-Text-Summarisation-in-Emails"
    }
  ]

  // Extract unique categories from projects
  const allCategories = Array.from(new Set(projects.flatMap((project) => project.categories))).sort()

  // Filter projects based on active filter
  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) =>
          project.categories.some((category) => category.toLowerCase() === activeFilter.toLowerCase()),
        )

  const getSecurityLevelColor = (level: string) => {
    switch (level) {
      case "Critical":
        return "text-red-500 border-red-500/50"
      case "High":
        return "text-orange-500 border-orange-500/50"
      case "Medium":
        return "text-yellow-500 border-yellow-500/50"
      case "Low":
        return "text-blue-500 border-blue-500/50"
      default:
        return "text-[#00ff00] border-[#00ff00]/50"
    }
  }

  if (!scanComplete) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center">
        <div className="w-full max-w-md px-4">
          <div className="flex items-center justify-center mb-8">
            <motion.div
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 3,
                ease: "linear",
              }}
              className="w-16 h-16 border-2 border-[#00ff00] border-t-transparent rounded-full"
            />
          </div>

          <div className="space-y-4">
            <div className="h-2 w-full bg-[#00ff00]/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#00ff00]"
                animate={{ width: `${scanProgress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <div className="font-mono text-[#00ff00] text-center">
              <p>{scanText}</p>
              <p className="text-sm text-[#00ff00]/70 mt-1">{Math.round(scanProgress)}% complete</p>
            </div>
          </div>
        </div>

        {/* Matrix rain effect */}
        {mounted && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute top-0 text-[#00ff00] font-mono text-sm"
                style={{
                  left: `${i * 5}%`,
                }}
                initial={{ y: -100 }}
                animate={{
                  y: ["0%", "100%"],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 3 + Math.random() * 5,
                  delay: Math.random() * 2,
                  ease: "linear",
                }}
              >
                {Array.from({ length: 15 }).map((_, j) => (
                  <div key={j} className="my-1">
                    {Math.random() > 0.5 ? "1" : "0"}
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#050505] text-[#00ff00] relative">
      {/* Background patterns - removed grid background */}
      <div className="fixed inset-0 opacity-5 pointer-events-none z-0"></div>

      {/* Navigation */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-black/80 backdrop-blur-md border-b border-[#00ff00]/20" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <div className="font-bold text-sm flex items-center gap-2 text-[#00ff00]">
              <Shield className="h-4 w-4" />
              <span className="font-mono">Ishitha@security:~$</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-4">
              {Object.keys(sectionRefs).map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section as keyof typeof sectionRefs)}
                  className={`text-xs font-mono ${
                    activeSection === section ? "text-[#00ff00]" : "text-[#00ff00]/70 hover:text-[#00ff00]"
                  } transition-colors cursor-pointer`}
                >
                  ./{section}
                </button>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
                className="text-[#00ff00] hover:bg-[#00ff00]/10"
              >
                {isMenuOpen ? <XIcon className="h-4 w-4" /> : <MenuIcon className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden bg-black/95 backdrop-blur-md border-b border-[#00ff00]/20"
            >
              <nav className="container mx-auto px-4 py-2 flex flex-col space-y-2">
                {Object.keys(sectionRefs).map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section as keyof typeof sectionRefs)}
                    className="text-xs font-mono py-1 text-[#00ff00]/70 hover:text-[#00ff00] transition-colors text-left cursor-pointer"
                  >
                    ./{section}
                  </button>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="pt-14">
        {/* Hero Section */}
        <section
          id="hero"
          ref={sectionRefs.hero}
          className="relative min-h-[80vh] flex items-center justify-center overflow-hidden py-10"
        >
          {/* Removed background patterns and grid */}

          {/* Animated scan line */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00ff00]/10 to-transparent h-[10px] pointer-events-none"
            animate={{
              y: ["0%", "100%", "0%"],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 8,
              ease: "linear",
            }}
          />

          <div className="container px-4 z-10">
            <div className="flex flex-col items-center text-center space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-3"
              >
                <Shield className="h-8 w-8 text-[#00ff00]" />
                <h1 className="text-4xl md:text-6xl font-mono font-bold tracking-tighter">Ishitha Isukapalli</h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="font-mono text-xl md:text-2xl text-[#00ff00]/80 h-[40px] flex items-center"
              >
                <span className="mr-2">&gt;</span>
                <TypewriterComponent
                  options={{
                    strings: [
                      "Full Stack Developer",
                      "Machine Learning Engineer",
                      "NLP Specialist",
                      "Python Developer",
                      "Data Scientist",
                      "AI Researcher",
                      "Deep Learning Engineer",
                      "Backend Developer",
                      "Data Analytics Expert",
                      "System Architecture Designer"
                    ],
                    autoStart: true,
                    loop: true,
                    delay: 50,
                    deleteSpeed: 30,
                  }}
                />
                <span className="animate-pulse">_</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="w-full max-w-[700px]"
              >
                <TerminalSimulation
                  commands={[
                    "Full Stack Developer with expertise in React.js, Node.js, and MongoDB for scalable web applications.",
                    "Machine Learning Engineer specializing in NLP, BERT, and transformer architectures.",
                    "Experienced in building fraud detection systems using ensemble methods like XGBoost and CatBoost.",
                    "Proficient in Python, JavaScript, TypeScript, and data visualization with Power BI.",
                    "Expert in deep learning frameworks including TensorFlow and PyTorch.",
                    "Developed custom NLP pipelines for text summarization and keyword extraction.",
                    "Built end-to-end ML systems with automated deployment pipelines.",
                    "Skilled in system architecture design and microservices implementation.",
                    "Passionate about solving complex problems with data-driven solutions and AI.",
                    "Experienced in building secure and scalable backend systems."
                  ]}
                  typingSpeed={40}
                  deletingSpeed={20}
                  delayBetweenCommands={2000}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button asChild className="bg-[#00ff00] hover:bg-[#00ff00]/80 text-black font-mono">
                  <a href={resumeLink} target="_blank" rel="noopener noreferrer">
                    ./download_resume <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="flex space-x-4"
              >
                <Link href="https://github.com/ishitha31" target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full border border-[#00ff00]/30 hover:bg-[#00ff00]/10 text-[#00ff00]"
                  >
                    <Github className="h-5 w-5" />
                    <span className="sr-only">GitHub</span>
                  </Button>
                </Link>
                <Link
                  href="http://www.linkedin.com/in/ishithaisukapalli"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full border border-[#00ff00]/30 hover:bg-[#00ff00]/10 text-[#00ff00]"
                  >
                    <Linkedin className="h-5 w-5" />
                    <span className="sr-only">LinkedIn</span>
                  </Button>
                </Link>
                <Link href="mailto:ishithaisukapalli@gmail.com">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full border border-[#00ff00]/30 hover:bg-[#00ff00]/10 text-[#00ff00]"
                  >
                    <Mail className="h-5 w-5" />
                    <span className="sr-only">Email</span>
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <div id="about" ref={sectionRefs.about}>
          <AboutMe />
        </div>
        <div id="skills" ref={sectionRefs.skills}>
          <Skills />
        </div>
        <div id="education" ref={sectionRefs.education}>
          <Education />
        </div>

        {/* Experience Section */}
        <div id="experience" ref={sectionRefs.experience}>
          <Experience />
        </div>

        {/* Projects Section */}
        <section id="projects" ref={sectionRefs.projects} className="py-10 relative">
          <div className="container px-4">
            <div className="space-y-2 text-center mb-6">
              <div className="inline-block bg-black/50 border border-[#00ff00]/30 rounded-md px-3 py-1 mb-1">
                <h2 className="text-xl font-mono font-bold tracking-tighter">
                  <span className="text-[#00ff00]/70">&gt;</span> cat projects.json
                </h2>
              </div>
            </div>

            {/* Project Filter */}
            <ProjectFilter categories={allCategories} activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

            {/* Projects Grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFilter}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
              >
                {filteredProjects.map((project, index) => (
                  <Card key={index} className="bg-black/50 border border-[#00ff00]/30 h-full flex flex-col">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-sm font-mono text-[#00ff00]">{project.title}</CardTitle>
                        <Badge
                          variant="outline"
                          className={`text-xs font-mono bg-black/70 ${getSecurityLevelColor(project.securityLevel)}`}
                        >
                          <Lock className="h-3 w-3 mr-1" />
                          {project.securityLevel}
                        </Badge>
                      </div>
                      <CardDescription className="text-xs font-mono text-[#00ff00]/50">
                        {project.period}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="pb-2 pt-0 flex-grow">
                      <p className="text-xs font-mono text-[#00ff00]/80">{project.description}</p>

                      {expandedProject === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-2"
                        >
                          <p className="text-xs font-mono text-[#00ff00]/70">{project.details}</p>
                        </motion.div>
                      )}
                    </CardContent>

                    <div className="px-4 pb-4">
                      <div className="flex flex-wrap gap-1 mb-2">
                        {project.tags.slice(0, 3).map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="text-xs font-mono bg-black border-[#00ff00]/30 text-[#00ff00]"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex justify-between w-full">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleProject(index)}
                          className="text-xs flex items-center font-mono text-[#00ff00] hover:bg-[#00ff00]/10 h-7 px-2"
                        >
                          {expandedProject === index ? (
                            <>
                              <ChevronUp className="h-3 w-3 mr-1" />
                              collapse
                            </>
                          ) : (
                            <>
                              <ChevronDown className="h-3 w-3 mr-1" />
                              expand
                            </>
                          )}
                        </Button>

                        <div className="flex space-x-1">
                          {project.demoLink ? (
                            <Link href={project.demoLink} target="_blank" rel="noopener noreferrer">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-xs flex items-center font-mono text-[#00ff00] hover:text-black hover:bg-[#00ff00] transition-colors h-7 px-2"
                              >
                                <Play className="h-3 w-3 mr-1" />
                                demo
                              </Button>
                            </Link>
                          ) : (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDemoClick(project.title)}
                              className="text-xs flex items-center font-mono text-[#00ff00] hover:text-black hover:bg-[#00ff00] transition-colors h-7 px-2"
                            >
                              <Play className="h-3 w-3 mr-1" />
                              demo
                            </Button>
                          )}

                          {project.githubLink ? (
                            <Link href={project.githubLink} target="_blank" rel="noopener noreferrer">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-xs flex items-center font-mono text-[#00ff00] hover:text-black hover:bg-[#00ff00] transition-colors h-7 px-2"
                              >
                                <Code className="h-3 w-3 mr-1" />
                                view_code
                              </Button>
                            </Link>
                          ) : (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewCodeClick(project.title)}
                              className="text-xs flex items-center font-mono text-[#00ff00] hover:text-black hover:bg-[#00ff00] transition-colors h-7 px-2"
                            >
                              <Code className="h-3 w-3 mr-1" />
                              view_code
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* No results message */}
            {filteredProjects.length === 0 && (
              <div className="text-center py-10">
                <p className="text-[#00ff00]/70 font-mono">No projects found for this category.</p>
              </div>
            )}
          </div>
        </section>

        {/* Certifications Section */}
        <div id="certifications" ref={sectionRefs.certifications}>
          <Certifications />
        </div>

        {/* Contact Section */}
        <div id="contact" ref={sectionRefs.contact}>
          <Contact />
        </div>
      </main>

      {/* Scroll to top button */}
      <AnimatePresence>
        {scrolled && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-4 right-4 z-50"
          >
            <Button
              onClick={scrollToTop}
              size="sm"
              className="rounded-full shadow-lg bg-black border border-[#00ff00] text-[#00ff00] hover:bg-[#00ff00]/10 h-8 w-8 p-0"
              aria-label="Scroll to top"
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Modal for unavailable links */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-mono text-[#00ff00]">{modalTitle}</DialogTitle>
            <DialogDescription className="font-mono text-[#00ff00]/80 mt-2">{modalMessage}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <div className="w-full flex justify-end">
              <DialogClose>
                <Button className="font-mono">OK</Button>
              </DialogClose>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
