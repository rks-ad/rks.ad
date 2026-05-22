"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { MapPin, Mail, Linkedin, ExternalLink } from "lucide-react"
import Image from "next/image"

const footerLinks = {
  quickLinks: [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About Us" },
    { href: "#practice", label: "Practice Areas" },
    { href: "#contact", label: "Contact" },
  ],
  legal: [
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/terms-of-service", label: "Terms of Service" },
    { href: "/disclaimer", label: "Disclaimer" },
    { href: "/refund-policy", label: "Refund Policy" },
  ],
}

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <Link href="#home" className="flex items-center gap-3 mb-6">
              <Image
                src="/logo.gif"
                alt="LawUp Logo"
                width={40}
                height={40}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <div className="font-bold text-lg">RKS, Advocate</div>
                <div className="text-gold text-xs font-semibold">LawUp™</div>
              </div>
            </Link>
            <p className="text-primary-foreground/70 text-sm leading-relaxed mb-6">
              Your trusted legal partner with 6+ years of expertise in diverse practice areas. 
              Committed to justice, integrity, and excellence.
            </p>
            <div className="flex gap-3">
              <a
                href="https://linkedin.com/company/lawupin"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gold/20 hover:bg-gold/30 rounded-lg flex items-center justify-center transition-colors"
              >
                <Linkedin className="w-5 h-5 text-gold" />
              </a>
              <a
                href="https://lawup.in"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gold/20 hover:bg-gold/30 rounded-lg flex items-center justify-center transition-colors"
              >
                <ExternalLink className="w-5 h-5 text-gold" />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-semibold text-lg mb-6 text-gold">Quick Links</h4>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-semibold text-lg mb-6 text-gold">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="font-semibold text-lg mb-6 text-gold">Contact</h4>
            <div className="space-y-4">
              <div className="flex gap-3">
                <MapPin className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <p className="text-primary-foreground/70 text-sm">
                  P. No- 43, 1st Floor, Shiv Kunj,<br />
                  Opp. Bagdi Hospital, Joshi Marg Kalwar,<br />
                  Jhotwara, Jaipur 302012
                </p>
              </div>
              <div className="flex gap-3">
                <Mail className="w-5 h-5 text-gold flex-shrink-0" />
                <a 
                  href="mailto:iam@rks.ad"
                  className="text-primary-foreground/70 hover:text-gold transition-colors text-sm"
                >
                  iam@rks.ad
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="border-t border-primary-foreground/10 mt-12 pt-8 text-center"
        >
          <p className="text-primary-foreground/60 text-sm">
            © {currentYear} RKS, Advocate | LawUp™. All rights reserved.
          </p>
          <p className="text-primary-foreground/40 text-xs mt-2">
            Designed & Developed with excellence
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
