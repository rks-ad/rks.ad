"use client"

import { motion } from "framer-motion"
import { Shield, Clock, Award, Users, CheckCircle, HeadphonesIcon } from "lucide-react"

const reasons = [
  {
    icon: Award,
    title: "6+ Years Experience",
    description: "Extensive experience across diverse legal practice areas with a proven track record of success.",
  },
  {
    icon: Shield,
    title: "Client Confidentiality",
    description: "Strict adherence to professional ethics and absolute confidentiality of all client matters.",
  },
  {
    icon: Clock,
    title: "Timely Resolution",
    description: "Committed to efficient case handling and timely resolution of legal matters.",
  },
  {
    icon: Users,
    title: "Personalized Approach",
    description: "Every case is unique. We provide tailored legal strategies to meet your specific needs.",
  },
  {
    icon: CheckCircle,
    title: "Transparent Fees",
    description: "Clear and upfront fee structure with no hidden charges. Know your costs from the start.",
  },
  {
    icon: HeadphonesIcon,
    title: "Always Accessible",
    description: "Easy communication and regular updates on your case progress throughout the engagement.",
  },
]

export function WhyChooseUsSection() {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-gold font-semibold text-sm uppercase tracking-wider">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4 mb-6">
              Your Trusted Legal Partner for{" "}
              <span className="text-gold">Every Challenge</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              At RKS, Advocate (LawUp™), we combine legal expertise with a client-first approach. 
              Our commitment to excellence, integrity, and results has made us a trusted name in 
              legal services across Jaipur and beyond.
            </p>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gold">500+</div>
                <div className="text-sm text-muted-foreground">Cases Handled</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gold">95%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gold">10+</div>
                <div className="text-sm text-muted-foreground">Practice Areas</div>
              </div>
            </div>
          </motion.div>

          {/* Right - Features grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid sm:grid-cols-2 gap-6"
          >
            {reasons.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card p-5 rounded-xl border border-border hover:border-gold/30 transition-colors"
              >
                <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center mb-3">
                  <reason.icon className="w-5 h-5 text-gold" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{reason.title}</h3>
                <p className="text-sm text-muted-foreground">{reason.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
