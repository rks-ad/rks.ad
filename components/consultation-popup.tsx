"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Sparkles, Calendar, Clock, Percent, Video } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ConsultationPopupProps {
  isOpen: boolean
  onClose: () => void
}

export function ConsultationPopup({ isOpen, onClose }: ConsultationPopupProps) {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/80 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="relative w-full max-w-md bg-card rounded-2xl shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-8 h-8 bg-foreground/10 hover:bg-foreground/20 rounded-full flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-foreground" />
          </button>

          {/* Decorative top */}
          <div className="relative bg-primary h-32 overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gold/20"
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute w-40 h-40 border border-gold/20 rounded-full"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute w-32 h-32 border border-gold/30 rounded-full"
              />
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="relative z-10"
              >
                <Sparkles className="w-12 h-12 text-gold" />
              </motion.div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 text-center">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Exclusive Offer!
              </h3>
              <p className="text-muted-foreground mb-4">
                Schedule your consultation today
              </p>
            </motion.div>

            {/* Discount badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 bg-gold/20 text-gold px-6 py-3 rounded-full mb-6"
            >
              <Percent className="w-5 h-5" />
              <span className="text-2xl font-bold">50% OFF</span>
              <span className="text-sm">on First Consultation</span>
            </motion.div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <Video className="w-4 h-4 text-gold" />
                <span>Online Meeting</span>
              </motion.div>
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <Calendar className="w-4 h-4 text-gold" />
                <span>Cal.id Scheduling</span>
              </motion.div>
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <a
                href="https://cal.id/lawup"
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
              >
                <Button
                  className="w-full bg-gold hover:bg-gold-dark text-foreground font-bold py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Sparkles className="w-5 h-5 group-hover:animate-bounce" />
                    Book Now
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gold-dark"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </Button>
              </a>
            </motion.div>

            <p className="text-xs text-muted-foreground mt-4">
              Limited time offer • No hidden charges
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
