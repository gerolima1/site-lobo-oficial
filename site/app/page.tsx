"use client"

// Removi o import do Header daqui pois ele já está no Layout
import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { Pricing } from "@/components/pricing"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* O Header foi removido daqui para não aparecer duas vezes */}
      <Hero />
      <Features />
      <Pricing />
      <Footer />
    </main>
  )
}
