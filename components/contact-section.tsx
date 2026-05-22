"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MapPin, Mail, Clock, Linkedin, ExternalLink, Send, Loader2, CheckCircle, Upload, X, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  
  const [otp, setOtp] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const [isRequestingOtp, setIsRequestingOtp] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [infoMessage, setInfoMessage] = useState("")

  // 1. Trigger the verification OTP email
  const handleRequestOtp = async () => {
    if (!formData.email) {
      setError("Please input a valid email address first.")
      return
    }
    setIsRequestingOtp(true)
    setError("")
    setInfoMessage("")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "request-otp", email: formData.email }),
      })
      const data = await res.json()
      if (data.success) {
        setOtpSent(true)
        setInfoMessage("Verification code sent to your inbox.")
      } else {
        setError(data.error || "Failed to deliver validation code.")
      }
    } catch {
      setError("Network connectivity problem. Try again.")
    } finally {
      setIsRequestingOtp(false)
    }
  }

  // 2. Final Submit (Verifies OTP + delivers lead payload)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!otp) {
      setError("Please input the 6-digit verification code.")
      return
    }
    setIsSubmitting(true)
    setError("")
    setInfoMessage("")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "submit-form",
          email: formData.email,
          name: formData.name,
          otp: otp,
          message: `Phone: ${formData.phone || "N/A"}\nSubject: ${formData.subject || "N/A"}\n\nMessage:\n${formData.message}`,
        }),
      })

      const data = await res.json()

      if (data.success) {
        setIsSubmitted(true)
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
        setOtp("")
        setOtpSent(false)
      } else {
        setError(data.error || "Verification checkpoint failed.")
      }
    } catch {
      setError("Network error. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-gold font-semibold text-sm uppercase tracking-wider">
            Get in Touch
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4 mb-4">
            Contact Us
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ready to discuss your legal needs? Reach out to us and schedule a consultation 
            with our experienced legal team.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Office Address */}
            <div className="bg-card p-6 rounded-2xl border border-border">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Office Address</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    P. No- 43, 1st Floor, Shiv Kunj,<br />
                    Opp. Bagdi Hospital, Joshi Marg Kalwar,<br />
                    Jhotwara, Jaipur, Rajasthan 302012
                  </p>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="bg-card p-6 rounded-2xl border border-border">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Email Us</h3>
                  <a 
                    href="mailto:iam@rks.ad" 
                    className="text-gold hover:text-gold-dark transition-colors"
                  >
                    iam@rks.ad
                  </a>
                  <p className="text-muted-foreground text-sm mt-1">
                    We respond within 24 hours
                  </p>
                </div>
              </div>
            </div>

            {/* Working Hours */}
            <div className="bg-card p-6 rounded-2xl border border-border">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Working Hours</h3>
                  <p className="text-muted-foreground text-sm">
                    Monday - Saturday: 10:00 AM - 7:00 PM<br />
                    Sunday: By Appointment Only
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              <a
                href="https://linkedin.com/company/lawupin"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-card p-4 rounded-xl border border-border hover:border-gold/50 transition-colors group flex items-center justify-center gap-3"
              >
                <Linkedin className="w-5 h-5 text-gold" />
                <span className="font-medium text-foreground">LinkedIn</span>
                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-gold transition-colors" />
              </a>
              <a
                href="https://lawup.in"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-card p-4 rounded-xl border border-border hover:border-gold/50 transition-colors group flex items-center justify-center gap-3"
              >
                <ExternalLink className="w-5 h-5 text-gold" />
                <span className="font-medium text-foreground">lawup.in</span>
              </a>
            </div>

            {/* Book Now CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-primary p-6 rounded-2xl text-center"
            >
              <h3 className="text-xl font-bold text-primary-foreground mb-2">
                Schedule Your Consultation
              </h3>
              <p className="text-primary-foreground/80 text-sm mb-4">
                First consultation at 50% off for new clients
              </p>
              <a
                href="https://cal.id/lawup"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  className="bg-gold hover:bg-gold-dark text-foreground font-bold px-8"
                >
                  Book Now
                </Button>
              </a>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card p-8 rounded-2xl border border-border"
          >
            {isSubmitted ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Inquiry Confirmed!</h3>
                <p className="text-muted-foreground mb-6 text-sm">
                  Your verification was successful. A branded confirmation copy has been generated and dropped into your inbox via mails.rks.ad.
                </p>
                <Button
                  variant="outline"
                  onClick={() => setIsSubmitted(false)}
                >
                  Send Another Message
                </Button>
              </motion.div>
            ) : (
              <>
                <h3 className="text-xl font-bold text-foreground mb-6">Send us a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
