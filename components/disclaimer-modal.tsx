"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Scale, X, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DisclaimerModalProps {
  onAccept: () => void
}

export function DisclaimerModal({ onAccept }: DisclaimerModalProps) {
  const [isVisible, setIsVisible] = useState(true)

  const handleDecline = () => {
    if (typeof window !== "undefined") {
      window.close()
      // Fallback for browsers that don't allow window.close()
      window.location.href = "about:blank"
    }
  }

  const handleAccept = () => {
    setIsVisible(false)
    onAccept()
  }

  useEffect(() => {
    document.body.style.overflow = isVisible ? "hidden" : "auto"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isVisible])

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/90 backdrop-blur-sm p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl bg-card rounded-lg shadow-2xl border border-gold/30 overflow-hidden"
        >
          {/* Header */}
          <div className="bg-primary p-6 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center justify-center w-16 h-16 bg-gold/20 rounded-full mb-4"
            >
              <Scale className="w-8 h-8 text-gold" />
            </motion.div>
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground">
              Important Legal Disclaimer
            </h2>
            <p className="text-primary-foreground/80 mt-2 text-sm">
              Please read carefully before proceeding
            </p>
          </div>

          {/* Content */}
          <div className="p-6 max-h-[50vh] overflow-y-auto">
            <div className="prose prose-sm max-w-none text-muted-foreground">
              <p className="mb-4 leading-relaxed">
                As per the rules of the <strong className="text-foreground">Bar Council of India</strong>, 
                RKS, Advocate & its associates & affiliates (including <strong className="text-foreground">LawUp™</strong>) 
                (the &apos;Group/Firm/Associationship&apos;) is prohibited from soliciting work or advertising.
              </p>
              
              <p className="mb-4 leading-relaxed">
                By clicking on the &apos;I Agree&apos; button below and accessing this website 
                (<strong className="text-foreground">www.rks.ad</strong>), the User acknowledges the following:
              </p>

              <ul className="space-y-4 list-none pl-0">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-gold/20 rounded-full flex items-center justify-center text-gold text-xs font-bold">1</span>
                  <span>The User is seeking information relating to RKS, Advocate & its associates & affiliates (including LawUp™) of his/her/its own accord and that there has been no form of solicitation, advertisement or inducement by RKS, Advocate & its associates & affiliates or any of its members;</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-gold/20 rounded-full flex items-center justify-center text-gold text-xs font-bold">2</span>
                  <span>This website does not seek to create or invite any lawyer–client relationship;</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-gold/20 rounded-full flex items-center justify-center text-gold text-xs font-bold">3</span>
                  <span>No material/information provided on this website should be construed as legal advice;</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-gold/20 rounded-full flex items-center justify-center text-gold text-xs font-bold">4</span>
                  <span>LawUp™ & its associates & affiliates shall not be liable for consequences arising out of any action taken by the User relying on material/information provided on this website; and</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-gold/20 rounded-full flex items-center justify-center text-gold text-xs font-bold">5</span>
                  <span>In cases where the User has any legal issues, he/she/it must in all cases seek independent legal advice.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-muted/50 p-6 flex flex-col sm:flex-row gap-3 justify-center border-t border-border">
            <Button
              variant="outline"
              onClick={handleDecline}
              className="flex-1 sm:flex-none sm:min-w-[140px] border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground transition-all duration-300"
            >
              <X className="w-4 h-4 mr-2" />
              Decline
            </Button>
            <Button
              onClick={handleAccept}
              className="flex-1 sm:flex-none sm:min-w-[140px] bg-gold hover:bg-gold-dark text-foreground font-semibold transition-all duration-300 animate-pulse-gold"
            >
              <Check className="w-4 h-4 mr-2" />
              I Agree
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
