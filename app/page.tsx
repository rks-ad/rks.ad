import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ContactSection } from "@/components/contact-section"

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <ContactSection />
    </main>
  )
}
