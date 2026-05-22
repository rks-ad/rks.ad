"use client"

import { motion } from "framer-motion"
import { 
  Scale, 
  Gavel, 
  Building2, 
  Landmark, 
  FileText, 
  Shield, 
  Briefcase, 
  Home, 
  Users, 
  Heart,
  Lightbulb,
  Globe,
  ArrowRight,
  CheckCircle
} from "lucide-react"
import { useState } from "react"

const practiceAreas = [
  {
    icon: Scale,
    title: "Civil Cases",
    description: "Property disputes, contract enforcement, injunctions, and civil litigation matters.",
    caseTypes: ["Contract Disputes", "Property Rights", "Injunctions", "Specific Performance", "Damages Claims"],
  },
  {
    icon: Gavel,
    title: "Criminal Law",
    description: "Criminal defense, bail applications, trial representation, and appeals.",
    caseTypes: ["Bail Applications", "Criminal Defense", "Appellate Matters", "Quashing Petitions", "Criminal Trials"],
  },
  {
    icon: Building2,
    title: "Corporate Law",
    description: "Company formation, compliance, mergers & acquisitions, and corporate governance.",
    caseTypes: ["M&A Advisory", "Company Formation", "Corporate Compliance", "Board Matters", "Shareholder Disputes"],
  },
  {
    icon: Landmark,
    title: "Banking & NBFC",
    description: "Banking regulations, loan recovery, NBFC compliance, and financial disputes.",
    caseTypes: ["Loan Recovery", "NPA Matters", "NBFC Compliance", "Banking Disputes", "Regulatory Compliance"],
  },
  {
    icon: FileText,
    title: "GST & Taxation",
    description: "GST registration, compliance, appeals, and tax dispute resolution.",
    caseTypes: ["GST Registration", "Tax Compliance", "GST Appeals", "Audit Defense", "Tax Planning"],
  },
  {
    icon: Shield,
    title: "NCLT Matters",
    description: "Insolvency proceedings, company disputes, and tribunal representations.",
    caseTypes: ["Insolvency Petitions", "Company Disputes", "IBC Proceedings", "Corporate Restructuring", "Tribunal Appeals"],
  },
  {
    icon: Globe,
    title: "Cyber Law",
    description: "Cybercrime, data protection, IT Act compliance, and digital disputes.",
    caseTypes: ["Data Protection", "Cybercrime Investigation", "IT Act Violations", "Digital Fraud", "IP Protection"],
  },
  {
    icon: Briefcase,
    title: "Labour Law",
    description: "Employment contracts, disputes, compliance, and workplace regulations.",
    caseTypes: ["Employment Disputes", "Wrongful Termination", "Wage Recovery", "Industrial Disputes", "Labor Compliance"],
  },
  {
    icon: Home,
    title: "Real Estate & RERA",
    description: "Property transactions, RERA compliance, and real estate disputes.",
    caseTypes: ["RERA Complaints", "Property Disputes", "Construction Delays", "Possession Claims", "Buyer Protection"],
  },
  {
    icon: Users,
    title: "Consumer Rights",
    description: "Consumer complaints, product liability, and consumer protection matters.",
    caseTypes: ["Product Liability", "Defective Services", "Consumer Complaints", "Refund Claims", "Compensation Disputes"],
  },
  {
    icon: Heart,
    title: "Family Law",
    description: "Divorce, custody, maintenance, and matrimonial disputes.",
    caseTypes: ["Divorce Proceedings", "Custody Matters", "Maintenance Claims", "Alimony Disputes", "Inheritance Issues"],
  },
  {
    icon: Lightbulb,
    title: "Intellectual Property",
    description: "Trademarks, copyrights, patents, and IP litigation.",
    caseTypes: ["Trademark Registration", "Copyright Protection", "Patent Disputes", "IP Infringement", "Brand Protection"],
  },
]

export function PracticeAreasSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  return (
    <section id="practice" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-gold font-semibold text-sm uppercase tracking-wider">
            Our Expertise
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4 mb-4">
            Practice Areas
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprehensive legal services across diverse practice areas, backed by 6+ years of 
            expertise and a commitment to excellence.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {practiceAreas.map((area, index) => (
            <motion.div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="h-80 cursor-pointer perspective"
            >
              <motion.div
                className="relative w-full h-full"
                initial={{ rotateY: 0 }}
                animate={{ rotateY: hoveredIndex === index ? 180 : 0 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Front Side */}
                <motion.div
                  className="absolute w-full h-full bg-card p-6 rounded-2xl shadow-sm border border-border hover:border-gold/50 hover:shadow-xl transition-all duration-300 flex flex-col"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <div className="w-12 h-12 bg-gold/10 group-hover:bg-gold/20 rounded-xl flex items-center justify-center mb-4 transition-colors">
                    <area.icon className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-gold transition-colors">
                    {area.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-grow">
                    {area.description}
                  </p>
                  <div className="flex items-center gap-2 text-gold text-sm font-medium">
                    <span>Learn more</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>

                {/* Back Side */}
                <motion.div
                  className="absolute w-full h-full bg-gradient-to-br from-gold/10 to-gold/5 p-6 rounded-2xl shadow-sm border border-gold/50 flex flex-col justify-center"
                  style={{ backfaceVisibility: "hidden", rotateY: 180 }}
                >
                  <h4 className="text-sm font-bold text-gold mb-4 uppercase tracking-wide">
                    Case Types
                  </h4>
                  <div className="flex flex-col gap-2">
                    {area.caseTypes.map((caseType, i) => (
                      <motion.div
                        key={i}
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-center gap-2 text-foreground text-xs"
                      >
                        <CheckCircle className="w-3 h-3 text-gold flex-shrink-0" />
                        <span>{caseType}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom text */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-muted-foreground mt-12 text-sm"
        >
          * Our practice areas are not limited to the above. Contact us for any legal matter.
        </motion.p>
      </div>
    </section>
  )
}
