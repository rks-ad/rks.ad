'use client'

import { useState } from 'react'

export function ContactSection() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [otp, setOtp] = useState('')
  
  const [otpSent, setOtpSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [statusMessage, setStatusMessage] = useState('')

  // 1. Request OTP Code from our API
  const handleRequestOtp = async () => {
    if (!email) return alert('Please enter your email address first.')
    setLoading(true)
    setStatusMessage('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'request-otp', email })
      })
      const data = await res.json()
      if (data.success) {
        setOtpSent(true)
        setStatusMessage('Verification code dispatched to your email!')
      } else {
        setStatusMessage(data.error || 'Failed to dispatch code.')
      }
    } catch {
      setStatusMessage('Network communication failure.')
    } finally {
      setLoading(false)
    }
  }

  // 2. Validate OTP and Submit Form Data
  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!otp) return alert('Please input the verification code sent to your email.')
    setLoading(true)
    setStatusMessage('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'submit-form', email, name, message, otp })
      })
      const data = await res.json()
      if (data.success) {
        setStatusMessage('Inquiry validated and processed successfully!')
        setName('')
        setEmail('')
        setMessage('')
        setOtp('')
        setOtpSent(false)
      } else {
        setStatusMessage(data.error || 'Validation checkpoint failed.')
      }
    } catch {
      setStatusMessage('Submission network error.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="py-20 bg-slate-50">
      <div className="max-w-md mx-auto px-4">
        <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900 mb-2">Secure Legal Intake</h3>
          <p className="text-sm text-slate-500 mb-6">Verify your identity via email OTP to lock in your inquiry.</p>
          
          <form onSubmit={handleSubmitForm} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Full Name</label>
              <input type="text" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required className="w-full p-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-slate-500" />
            </div>
            
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Email Address</label>
              <div className="flex gap-2">
                <input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="flex-1 p-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-slate-500" />
                <button type="button" onClick={handleRequestOtp} disabled={loading} className="px-4 py-2.5 bg-slate-900 text-white rounded-lg text-xs font-medium hover:bg-slate-800 transition dynamic-disabled">
                  {otpSent ? 'Resend' : 'Send OTP'}
                </button>
              </div>
            </div>

            {otpSent && (
              <div className="animate-fade-in">
                <label className="block text-xs font-semibold text-amber-700 mb-1">Enter 6-Digit OTP Code</label>
                <input type="text" placeholder="123456" value={otp} onChange={(e) => setOtp(e.target.value)} required className="w-full p-2.5 rounded-lg border border-amber-300 bg-amber-50/50 text-center font-mono text-lg tracking-widest focus:outline-none focus:border-amber-500" />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Inquiry Case Details</label>
              <textarea placeholder="Describe your legal matter..." value={message} onChange={(e) => setMessage(e.target.value)} required rows={4} className="w-full p-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-slate-500" />
            </div>

            <button type="submit" disabled={loading || !otpSent} className={`w-full py-3 rounded-lg text-sm font-bold text-white transition mt-2 ${otpSent ? 'bg-emerald-600 hover:bg-emerald-500 cursor-pointer' : 'bg-slate-300 cursor-not-allowed'}`}>
              {loading ? 'Processing...' : 'Verify & Submit Inquiry'}
            </button>

            {statusMessage && (
              <p className={`text-xs text-center font-medium mt-2 ${statusMessage.includes('successfully') || statusMessage.includes('dispatched') ? 'text-emerald-600' : 'text-rose-600'}`}>
                {statusMessage}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
