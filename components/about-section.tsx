"use client"

import { motion } from "framer-motion"
import { Award, Users, Target, Globe } from "lucide-react"
import Link from "next/link"

const stats = [
  { icon: Award, value: "6+", label: "Years of Experience" },
  { icon: Users, value: "500+", label: "Clients Served" },
  { icon: Target, value: "95%", label: "Success Rate" },
  { icon: Globe, value: "10+", label: "Practice Areas" },
]

export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-gold font-semibold text-sm uppercase tracking-wider"
            >
              About Us
            </motion.span>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold text-foreground mt-4 mb-6"
            >
              Your Trusted Legal Partner in{" "}
              <span className="text-gold">Jaipur</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-4 text-muted-foreground leading-relaxed"
            >
              <p>
                <strong className="text-foreground">Raavi K Sharma</strong>, the founding advocate of 
                <strong className="text-gold"> LawUp™</strong>, brings over 6 years of dedicated legal 
                expertise to help individuals and businesses navigate complex legal challenges.
              </p>
              <p>
                Our practice spans across Civil, Criminal, Corporate, Banking & Finance, GST, NCLT, 
                Cyber Law, Labour Law, Real Estate & RERA, Consumer Rights, Family Law, and 
                Intellectual Property matters.
              </p>
              <p>
                Based in Jaipur, Rajasthan, we are committed to providing personalized legal solutions 
                with integrity, professionalism, and a results-driven approach.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-8"
            >
              <Link
                href="https://lawup.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gold hover:text-gold-dark font-semibold transition-colors"
              >
                Learn more at lawup.in
                <span className="text-xl">→</span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right - Stats Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -5 }}
                className="bg-card p-6 rounded-2xl shadow-lg border border-border hover:border-gold/30 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center mb-4">
                  <stat.icon className="w-6 h-6 text-gold" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
