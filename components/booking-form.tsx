"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { 
  Calendar, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  MessageSquare, 
  X, 
  CheckCircle, 
  Loader2,
  Shield,
  Video,
  MapPin,
  ArrowRight,
  Sparkles
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const bookingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  caseType: z.string().min(1, "Please select a case type"),
  message: z.string().optional(),
})

type BookingFormData = z.infer<typeof bookingSchema>

interface BookingFormProps {
  isOpen: boolean
  onClose: () => void
}

const caseTypes = [
  "Civil Cases",
  "Criminal Law",
  "Corporate Law",
  "Banking & NBFC",
  "GST & Taxation",
  "NCLT Matters",
  "Cyber Law",
  "Labour Law",
  "Real Estate & RERA",
  "Consumer Rights",
  "Family Law",
  "Intellectual Property",
  "Other",
]

type Step = "details" | "verify" | "booking-type" | "cal-embed" | "success"

export function BookingForm({ isOpen, onClose }: BookingFormProps) {
  const [step, setStep] = useState<Step>("details")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSendingOtp, setIsSendingOtp] = useState(false)
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false)
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [otpError, setOtpError] = useState("")
  const [resendTimer, setResendTimer] = useState(0)
  const [formData, setFormData] = useState<BookingFormData | null>(null)
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  })

  // Resend timer countdown
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [resendTimer])

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setStep("details")
      setOtp(["", "", "", "", "", ""])
      setOtpError("")
      setFormData(null)
      reset()
    }
  }, [isOpen, reset])

  const sendOtp = async (email: string) => {
    setIsSendingOtp(true)
    setOtpError("")
    
    try {
      const response = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      
      const data = await response.json()
      
      if (data.success) {
        setResendTimer(60) // 60 seconds cooldown
        return true
      } else {
        setOtpError(data.error || "Failed to send OTP")
        return false
      }
    } catch (error) {
      console.error("Send OTP error:", error)
      setOtpError("Network error. Please try again.")
      return false
    } finally {
      setIsSendingOtp(false)
    }
  }

  const verifyOtp = async () => {
    const otpString = otp.join("")
    if (otpString.length !== 6) {
      setOtpError("Please enter complete OTP")
      return
    }

    setIsVerifyingOtp(true)
    setOtpError("")

    try {
      const response = await fetch("/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email: formData?.email, 
          otp: otpString 
        }),
      })
      
      const data = await response.json()
      
      if (data.verified) {
        setStep("booking-type")
      } else {
        setOtpError(data.error || "Invalid OTP")
      }
    } catch (error) {
      console.error("Verify OTP error:", error)
      setOtpError("Network error. Please try again.")
    } finally {
      setIsVerifyingOtp(false)
    }
  }

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return
    
    const newOtp = [...otp]
    newOtp[index] = value.slice(-1)
    setOtp(newOtp)
    setOtpError("")

    // Auto-focus next input
    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus()
    }
  }

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus()
    }
  }

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text").slice(0, 6)
    if (/^\d+$/.test(pastedData)) {
      const newOtp = pastedData.split("").concat(Array(6 - pastedData.length).fill(""))
      setOtp(newOtp.slice(0, 6))
      otpInputRefs.current[Math.min(pastedData.length, 5)]?.focus()
    }
  }

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true)
    setFormData(data)
    
    const success = await sendOtp(data.email)
    if (success) {
      setStep("verify")
    }
    
    setIsSubmitting(false)
  }

  const handleOfflineBooking = async () => {
    if (!formData) return
    
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/submit-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      
      const data = await response.json()
      
      if (data.success) {
        setStep("success")
      } else {
        setOtpError(data.error || "Failed to submit booking")
      }
    } catch (error) {
      console.error("Booking submission error:", error)
      setOtpError("Network error. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleOnlineBooking = () => {
    setStep("cal-embed")
  }

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/80 backdrop-blur-sm p-4 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative w-full max-w-2xl bg-card rounded-2xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 bg-foreground/10 hover:bg-foreground/20 rounded-full flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4 text-foreground" />
        </button>

        {/* Header */}
        <div className="bg-primary p-6 text-center">
          <div className="inline-flex items-center gap-2 bg-gold/20 text-gold px-4 py-1 rounded-full text-sm font-medium mb-3">
            <Sparkles className="w-4 h-4" />
            50% OFF First Consultation
          </div>
          <h3 className="text-2xl font-bold text-primary-foreground">
            {step === "details" && "Book Your Consultation"}
            {step === "verify" && "Verify Your Email"}
            {step === "booking-type" && "Choose Meeting Type"}
            {step === "cal-embed" && "Schedule Online Meeting"}
            {step === "success" && "Booking Confirmed!"}
          </h3>
          <p className="text-primary-foreground/70 text-sm mt-2">
            {step === "details" && "Fill in your details to get started"}
            {step === "verify" && `We've sent a code to ${formData?.email}`}
            {step === "booking-type" && "How would you like to meet?"}
            {step === "cal-embed" && "Select a convenient time slot"}
            {step === "success" && "We'll contact you shortly"}
          </p>
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Details Form */}
          {step === "details" && (
            <motion.form
              key="details"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onSubmit={handleSubmit(onSubmit)}
              className="p-6 space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gold" />
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    {...register("name")}
                    className={errors.name ? "border-destructive" : ""}
                  />
                  {errors.name && (
                    <p className="text-destructive text-xs">{errors.name.message}</p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gold" />
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    {...register("email")}
                    className={errors.email ? "border-destructive" : ""}
                  />
                  {errors.email && (
                    <p className="text-destructive text-xs">{errors.email.message}</p>
                  )}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gold" />
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    placeholder="+91 XXXXX XXXXX"
                    {...register("phone")}
                    className={errors.phone ? "border-destructive" : ""}
                  />
                  {errors.phone && (
                    <p className="text-destructive text-xs">{errors.phone.message}</p>
                  )}
                </div>

                {/* Case Type */}
                <div className="space-y-2">
                  <Label htmlFor="caseType" className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-gold" />
                    Case Type
                  </Label>
                  <select
                    id="caseType"
                    {...register("caseType")}
                    className={`w-full h-10 px-3 rounded-md border bg-background text-foreground ${
                      errors.caseType ? "border-destructive" : "border-input"
                    }`}
                  >
                    <option value="">Select case type</option>
                    {caseTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors.caseType && (
                    <p className="text-destructive text-xs">{errors.caseType.message}</p>
                  )}
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message" className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-gold" />
                  Brief Description (Optional)
                </Label>
                <textarea
                  id="message"
                  rows={3}
                  placeholder="Briefly describe your legal matter..."
                  {...register("message")}
                  className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground resize-none"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gold hover:bg-gold-dark text-foreground font-bold py-6 text-lg"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending Verification...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Continue
                    <ArrowRight className="w-5 h-5" />
                  </span>
                )}
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                By continuing, you agree to our{" "}
                <a href="/terms-of-service" className="text-gold hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="/privacy-policy" className="text-gold hover:underline">
                  Privacy Policy
                </a>
              </p>
            </motion.form>
          )}

          {/* Step 2: OTP Verification */}
          {step === "verify" && (
            <motion.div
              key="verify"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-8 space-y-6"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-gold" />
                </div>
                <p className="text-muted-foreground text-sm">
                  Enter the 6-digit code sent to your email
                </p>
              </div>

              {/* OTP Input */}
              <div className="flex justify-center gap-2" onPaste={handleOtpPaste}>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => { otpInputRefs.current[index] = el }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className={`w-12 h-14 text-center text-2xl font-bold border-2 rounded-lg bg-background transition-colors
                      ${otpError ? "border-destructive" : digit ? "border-gold" : "border-input"}
                      focus:outline-none focus:border-gold`}
                  />
                ))}
              </div>

              {otpError && (
                <p className="text-destructive text-sm text-center">{otpError}</p>
              )}

              {/* Verify Button */}
              <Button
                onClick={verifyOtp}
                disabled={isVerifyingOtp || otp.join("").length !== 6}
                className="w-full bg-gold hover:bg-gold-dark text-foreground font-bold py-6 text-lg"
              >
                {isVerifyingOtp ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Verifying...
                  </span>
                ) : (
                  "Verify Email"
                )}
              </Button>

              {/* Resend OTP */}
              <div className="text-center">
                {resendTimer > 0 ? (
                  <p className="text-muted-foreground text-sm">
                    Resend code in <span className="text-gold font-medium">{resendTimer}s</span>
                  </p>
                ) : (
                  <button
                    onClick={() => formData && sendOtp(formData.email)}
                    disabled={isSendingOtp}
                    className="text-gold hover:underline text-sm font-medium"
                  >
                    {isSendingOtp ? "Sending..." : "Resend Code"}
                  </button>
                )}
              </div>

              {/* Back button */}
              <button
                onClick={() => setStep("details")}
                className="w-full text-muted-foreground hover:text-foreground text-sm"
              >
                ← Back to details
              </button>
            </motion.div>
          )}

          {/* Step 3: Booking Type Selection */}
          {step === "booking-type" && (
            <motion.div
              key="booking-type"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-8 space-y-6"
            >
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <p className="text-green-600 font-medium">Email Verified Successfully!</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {/* Online Meeting */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleOnlineBooking}
                  className="p-6 border-2 border-gold/30 hover:border-gold rounded-xl text-left transition-all bg-gold/5 hover:bg-gold/10 group"
                >
                  <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-gold/30 transition-colors">
                    <Video className="w-6 h-6 text-gold" />
                  </div>
                  <h4 className="font-bold text-lg text-foreground mb-2">Online Meeting</h4>
                  <p className="text-muted-foreground text-sm">
                    Schedule a video consultation via Cal.com
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-gold text-sm font-medium">
                    Schedule Now <ArrowRight className="w-4 h-4" />
                  </div>
                </motion.button>

                {/* Office Visit */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleOfflineBooking}
                  disabled={isSubmitting}
                  className="p-6 border-2 border-input hover:border-gold rounded-xl text-left transition-all hover:bg-muted/50 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                    <MapPin className="w-6 h-6 text-muted-foreground group-hover:text-gold" />
                  </div>
                  <h4 className="font-bold text-lg text-foreground mb-2">Office Visit</h4>
                  <p className="text-muted-foreground text-sm">
                    We&apos;ll call you to schedule an in-person meeting
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-muted-foreground group-hover:text-gold text-sm font-medium">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Request Callback <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </div>
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Step 4: Cal.com Embed */}
          {step === "cal-embed" && (
            <motion.div
              key="cal-embed"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-4"
            >
              <div className="bg-muted rounded-xl overflow-hidden" style={{ minHeight: "500px" }}>
                <iframe
                  src={`https://cal.com/lawup?embed=true&theme=light&name=${encodeURIComponent(formData?.name || "")}&email=${encodeURIComponent(formData?.email || "")}&notes=${encodeURIComponent(`Case Type: ${formData?.caseType}\nPhone: ${formData?.phone}\n\n${formData?.message || ""}`)}`}
                  width="100%"
                  height="500"
                  frameBorder="0"
                  className="rounded-xl"
                  title="Schedule Consultation"
                />
              </div>
              <div className="mt-4 text-center">
                <button
                  onClick={() => setStep("booking-type")}
                  className="text-muted-foreground hover:text-foreground text-sm"
                >
                  ← Back to booking options
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 5: Success */}
          {step === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-12 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle className="w-10 h-10 text-green-600" />
              </motion.div>
              <h4 className="text-xl font-bold text-foreground mb-2">
                Booking Request Received!
              </h4>
              <p className="text-muted-foreground mb-6">
                Our team will contact you at <strong>{formData?.phone}</strong> to confirm your appointment.
              </p>
              
              <div className="bg-muted rounded-xl p-4 text-left space-y-2 mb-6">
                <p className="text-sm"><strong>Name:</strong> {formData?.name}</p>
                <p className="text-sm"><strong>Email:</strong> {formData?.email}</p>
                <p className="text-sm"><strong>Case Type:</strong> {formData?.caseType}</p>
              </div>

              <Button
                onClick={onClose}
                className="bg-gold hover:bg-gold-dark text-foreground font-bold"
              >
                Done
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}
