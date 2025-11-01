"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Mail, Phone, User } from "lucide-react"

export default function AboutMe() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section ref={ref} className="py-10 relative">
      <div className="container px-4">
        <div className="space-y-2 text-center mb-6">
          <div className="inline-block bg-black/50 border border-[#00ff00]/30 rounded-md px-3 py-1 mb-1">
            <h2 className="text-xl font-mono font-bold tracking-tighter">
              <span className="text-[#00ff00]/70">&gt;</span> About Me
            </h2>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="grid gap-6 md:grid-cols-2"
        >
          {/* Image Card */}
          <Card className="bg-black/50 border border-[#00ff00]/30 overflow-hidden h-full flex">
            <CardContent className="p-0 flex-1 flex">
              <div className="relative w-full h-full">
                <img
                  src="/images/IMG_1384.jpg"
                  alt="Ishitha Isukapalli"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-50"></div>

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
                  }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Info Card */}
          <Card className="bg-black/50 border border-[#00ff00]/30 h-full flex">
            <CardContent className="p-6 flex-1 flex flex-col justify-between">
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl md:text-3xl font-mono font-semibold text-[#00ff00] mb-4">
                    Computer Science Engineer
                  </h3>
                  <div className="space-y-4">
                    <p className="font-mono text-[#00ff00] leading-relaxed">
  Hi! I'm <strong>Ishitha Isukapalli</strong>, a Computer Science graduate based in Hyderabad, India, with a strong focus
  on Artificial Intelligence, Natural Language Processing, and Data Analytics. I enjoy designing and developing
  intelligent full-stack web and machine learning systems that bring real-world impact through automation and
  analytical insights.
</p>

<p className="font-mono text-[#00ff00] leading-relaxed">
  I’ve built and deployed production-level applications such as a Restaurant Management System that automated
  billing and order management for a local restaurant — improving operational accuracy by 30%, and a Fraud Detection
  model that achieved a 91% ROC-AUC using CatBoost, XGBoost, and LightGBM on large banking datasets. My latest
  NLP-based project leverages BERT, NER, and T5 Transformers to extract keywords and summarize over 500,000 corporate
  emails, reducing manual reading time and enhancing workflow efficiency.
</p>

<p className="font-mono text-[#00ff00] leading-relaxed">
  I’m proficient in languages like Python, Java, JavaScript, and SQL, and skilled in tools like React.js, Power BI,
  and MongoDB. Certified as an Aviatrix Multicloud Network Associate and an Automation Anywhere RPA Professional,
  I bring both technical expertise and analytical precision to every project I work on.
</p>

<p className="font-mono text-[#00ff00] leading-relaxed">
  Beyond tech, I’ve served as the Secretary of MGIT’s Dance Club, organizing 15+ cultural events and managing
  communications for over 100 members — experiences that strengthened my leadership, adaptability, and teamwork
  abilities. I’m passionate about continuous learning and eager to contribute to AI-driven solutions that combine
  innovation, scalability, and social impact.
</p>

                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-black border border-[#00ff00]/30 flex items-center justify-center">
                      <User className="h-4 w-4 text-[#00ff00]" />
                    </div>
                    <div>
                      <p className="font-mono font-medium text-[#00ff00]">Name</p>
                      <p className="font-mono text-[#00ff00]/70">Ishitha Isukapalli</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-black border border-[#00ff00]/30 flex items-center justify-center">
                      <MapPin className="h-4 w-4 text-[#00ff00]" />
                    </div>
                    <div>
                      <p className="font-mono font-medium text-[#00ff00]">Location</p>
                      <p className="font-mono text-[#00ff00]/70">Hyderabad, India</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-black border border-[#00ff00]/30 flex items-center justify-center">
                      <Mail className="h-4 w-4 text-[#00ff00]" />
                    </div>
                    <div>
                      <p className="font-mono font-medium text-[#00ff00]">Email</p>
                      <p className="font-mono text-[#00ff00]/70">ishithaisukapalli@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-black border border-[#00ff00]/30 flex items-center justify-center">
                      <Phone className="h-4 w-4 text-[#00ff00]" />
                    </div>
                    <div>
                      <p className="font-mono font-medium text-[#00ff00]">Phone</p>
                      <p className="font-mono text-[#00ff00]/70">+91 8886844944 </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
