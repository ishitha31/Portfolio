import type React from "react"
import "@/app/globals.css"
import { JetBrains_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { cn } from "@/lib/utils"
import type { Metadata } from "next"

const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Ishitha Isukapalli | Computer Science Engineer Portfolio",
  description:
    "Computer Science graduate focused on Artificial Intelligence, Natural Language Processing, and Data Analytics — building full‑stack web applications and production-ready machine learning systems.",
    //generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Favicon / tab icon */}
        <link rel="icon" href="/images/logo.png" />
      </head>
      <body className={cn("min-h-screen bg-[#050505] text-[#9333ff] font-mono antialiased", jetbrainsMono.className)}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}


