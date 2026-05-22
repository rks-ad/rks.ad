"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MapPin, Mail, Clock, Linkedin, ExternalLink, Send, Loader2, CheckCircle, Upload, X } from "lucide-react"
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
  const [files, setFiles] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    const newFiles = [...files, ...selectedFiles].slice(0, 5)
    setFiles(newFiles)
  }

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      const formDataToSend = new FormData()
      formDataToSend.append("name", formData.name)
      formDataToSend.append("email", formData.email)
      formDataToSend.append("phone", formData.phone)
      formDataToSend.append("subject", formData.subject)
      formDataToSend.append("message", formData.message)
      
      files.forEach((file) => {
        formDataToSend.append("files", file)
      })

      const response = await fetch("/api/contact", {
        method: "POST",
        body: formDataToSend,
      })

      const data = await response.json()

      if (data.success) {
        setIsSubmitted(true)
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
        setFiles([])
      } else {
        setError(data.error || "Failed to submit form")
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
                <h3 className="text-xl font-bold text-foreground mb-2">Message Sent!</h3>
                <p className="text-muted-foreground mb-6">
                  We will get back to you within 24-48 hours.
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
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="How can we help?"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe your legal matter..."
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 resize-none"
                    />
                  </div>

                  {/* File Upload */}
                  <div className="space-y-2">
                    <Label htmlFor="files">Attach Documents (Optional) - Max 5 files</Label>
                    <div className="relative">
                      <input
                        id="files"
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        className="hidden"
                        accept="*"
                      />
                      <label
                        htmlFor="files"
                        className="flex items-center justify-center gap-2 w-full px-4 py-6 border-2 border-dashed border-input hover:border-gold/50 rounded-lg cursor-pointer transition-colors bg-muted/30 hover:bg-muted/50"
                      >
                        <Upload className="w-5 h-5 text-gold" />
                        <div>
                          <p className="text-sm font-medium text-foreground">Drop files here or click to upload</p>
                          <p className="text-xs text-muted-foreground">Any format, up to 5 files</p>
                        </div>
                      </label>
                    </div>

                    {/* File List */}
                    {files.length > 0 && (
                      <div className="space-y-2 mt-4">
                        <p className="text-sm font-medium text-foreground">Attached Files ({files.length}/5)</p>
                        <div className="space-y-2">
                          {files.map((file, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border border-input"
                            >
                              <div className="flex items-center gap-2 flex-1 min-w-0">
                                <Upload className="w-4 h-4 text-gold flex-shrink-0" />
                                <div className="min-w-0">
                                  <p className="text-sm text-foreground truncate">{file.name}</p>
                                  <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeFile(index)}
                                className="p-1 hover:bg-red-500/10 rounded text-red-500 transition-colors flex-shrink-0"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {error && (
                    <p className="text-red-500 text-sm">{error}</p>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gold hover:bg-gold-dark text-foreground font-semibold py-6"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    By submitting this form, you agree to our{" "}
                    <a href="/privacy-policy" className="text-gold hover:underline">Privacy Policy</a>
                  </p>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
