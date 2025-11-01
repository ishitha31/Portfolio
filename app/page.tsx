import type { Metadata } from "next"
import CyberPortfolio from "@/components/cyber-portfolio"

export const metadata: Metadata = {
  title: "Ishitha Isukapalli | Computer Science Engineer Portfolio",
  description:
    "Computer Science graduate focused on Artificial Intelligence, Natural Language Processing, and Data Analytics — building full‑stack web applications and production-ready machine learning systems.",
}

export default function Home() {
  return <CyberPortfolio />
}
