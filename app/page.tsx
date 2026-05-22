"use client"

import { useState, useEffect } from "react"
import { DisclaimerModal } from "@/components/disclaimer-modal"
import { ConsultationPopup } from "@/components/consultation-popup"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { PracticeAreasSection } from "@/components/practice-areas-section"
import { WhyChooseUsSection } from "@/components/why-choose-us-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { FloatingButtons } from "@/components/floating-buttons"

export default function HomePage() {
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false)
  const [showConsultationPopup, setShowConsultationPopup] = useState(false)

  // Check if disclaimer was already accepted (session storage)
  useEffect(() => {
    const accepted = sessionStorage.getItem("disclaimerAccepted")
    if (accepted === "true") {
      setDisclaimerAccepted(true)
    }
  }, [])

  const handleDisclaimerAccept = () => {
    setDisclaimerAccepted(true)
    sessionStorage.setItem("disclaimerAccepted", "true")
    // Show consultation popup after accepting disclaimer
    setTimeout(() => {
      setShowConsultationPopup(true)
    }, 500)
  }

  // If disclaimer not accepted, show only the disclaimer modal
  if (!disclaimerAccepted) {
    return <DisclaimerModal onAccept={handleDisclaimerAccept} />
  }

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <PracticeAreasSection />
        <WhyChooseUsSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />

      {/* Consultation Popup */}
      <ConsultationPopup
        isOpen={showConsultationPopup}
        onClose={() => setShowConsultationPopup(false)}
      />

      {/* Floating Buttons */}
      <FloatingButtons />
    </>
  )
}
