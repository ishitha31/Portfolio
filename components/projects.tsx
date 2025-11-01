"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Code, Lock, Play } from "lucide-react"
import Link from "next/link"
import { toast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [expandedProject, setExpandedProject] = useState<number | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalTitle, setModalTitle] = useState("")
  const [modalMessage, setModalMessage] = useState("")

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

  const projects = [
    {
      title: "Restaurant Management System",
      period: "Summer 2024",
      description: "Independently established a custom web-based system for a local restaurant to digitize daily operations.",
      details: [
        "Built a full-stack web app using React.js, Node.js, and MongoDB to automate billing, orders, and table bookings.",
        "Enabled live menu access and cloud updates, improving operational accuracy and reducing manual work by 30%.",
        "Deployed as a responsive web app with real-time order updates for staff and customers.",
      ],
      tags: ["React.js", "Node.js", "MongoDB", "Full-Stack", "Web Development"],
      image: "/placeholder.svg",
      securityLevel: "High",
      demoLink: "https://srifriendsandflavours.vercel.app/",
      githubLink: "https://github.com/ishitha31/Restaurant-Management",
    },
    {
      title: "Machine Learning Projects",
      period: "Winter 2024 - Summer 2025",
      description: "Collection of ML projects: Fraud Detection in Banking Data and Keyword Extraction & Text Summarization in Emails.",
      details: [
        "Fraud Detection: Developed ensemble models (CatBoost, XGBoost, LightGBM, Logistic Regression) on 10,000+ transactions, achieving 91% ROC-AUC; built Power BI dashboards for visualization.",
        "Keyword Extraction & Summarization: Built NLP pipeline using BERT, NER, TextRank and T5 on ENRON (500k+ emails) to produce concise summaries and extract keywords, reducing manual review time.",
        "End-to-end pipelines include data cleaning, feature engineering, model training, evaluation, and deployment-ready artifacts.",
      ],
      tags: ["Machine Learning", "NLP", "CatBoost", "XGBoost", "BERT"],
      image: "/placeholder.svg",
      securityLevel: "Critical",
    },
  ]

  const toggleProject = (index: number) => {
    if (expandedProject === index) {
      setExpandedProject(null)
    } else {
      setExpandedProject(index)
    }
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

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

  return (
    <section id="projects" className="py-20 relative">
      <div className="absolute inset-0 bg-[url('/hex-bg.png')] opacity-5 pointer-events-none"></div>
      <div className="container px-4 md:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="space-y-10"
        >
          <div className="space-y-2 text-center">
            <div className="inline-block bg-black/50 border border-[#00ff00]/30 rounded-md px-4 py-1 mb-2">
              <h2 className="text-3xl font-mono font-bold tracking-tighter sm:text-4xl md:text-5xl">
                <span className="text-[#00ff00]/70">&gt;</span> cat projects.json
              </h2>
            </div>
            <p className="mx-auto max-w-[700px] text-[#00ff00]/70 font-mono">
              A showcase of my technical projects and research work.
            </p>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {projects.map((project, index) => (
              <motion.div key={index} variants={item} className="h-full">
                <Card className="h-full flex flex-col overflow-hidden group hover:shadow-lg transition-shadow duration-300 bg-black/50 border border-[#00ff00]/30">
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70" />

                    {/* Security level badge */}
                    <div className="absolute top-2 right-2">
                      <Badge
                        variant="outline"
                        className={`text-xs font-mono bg-black/70 ${getSecurityLevelColor(project.securityLevel)}`}
                      >
                        <Lock className="h-3 w-3 mr-1" />
                        {project.securityLevel} Security
                      </Badge>
                    </div>

                    {/* Scan effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-b from-[#00ff00]/5 to-transparent h-[5px] pointer-events-none"
                      animate={{
                        y: ["0%", "100%", "0%"],
                      }}
                      transition={{
                        repeat: Number.POSITIVE_INFINITY,
                        duration: 3,
                        ease: "linear",
                        delay: index * 0.2,
                      }}
                    />
                  </div>

                  <CardHeader>
                    <CardTitle className="font-mono text-[#00ff00]">{project.title}</CardTitle>
                    <CardDescription className="font-mono text-[#00ff00]/70">{project.period}</CardDescription>
                  </CardHeader>

                  <CardContent className="flex-grow">
                    <p className="text-sm font-mono text-[#00ff00]/80">{project.description}</p>

                    {expandedProject === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4"
                      >
                        <ul className="list-disc pl-5 space-y-1 text-sm font-mono text-[#00ff00]/80">
                          {project.details.map((detail, i) => (
                            <li key={i}>{detail}</li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </CardContent>

                  <CardFooter className="flex flex-col space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
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
                        className="text-xs flex items-center font-mono text-[#00ff00] hover:bg-[#00ff00]/10"
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
                              className="text-xs flex items-center font-mono text-[#00ff00] hover:bg-[#00ff00]/10"
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
                            className="text-xs flex items-center font-mono text-[#00ff00] hover:bg-[#00ff00]/10"
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
                              className="text-xs flex items-center font-mono text-[#00ff00] hover:bg-[#00ff00]/10"
                            >
                              <Code className="h-3 w-3 mr-1" />
                              view_source
                            </Button>
                          </Link>
                        ) : (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewCodeClick(project.title)}
                            className="text-xs flex items-center font-mono text-[#00ff00] hover:bg-[#00ff00]/10"
                          >
                            <Code className="h-3 w-3 mr-1" />
                            view_source
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
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
        </motion.div>
      </div>
    </section>
  )
}
