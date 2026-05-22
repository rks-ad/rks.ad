"use client"

import { motion } from "framer-motion"
import { Quote, Star } from "lucide-react"

const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "Business Owner",
    content: "Exceptional legal representation in our corporate matter. The team at RKS, Advocate provided clear guidance throughout the process and achieved the best outcome for our business.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "Property Owner",
    content: "Dealt with a complex property dispute that had been pending for years. Their expertise in civil matters and dedicated approach helped resolve it efficiently.",
    rating: 5,
  },
  {
    name: "Amit Singh",
    role: "Startup Founder",
    content: "LawUp handled all our GST compliance and corporate structuring. Professional, knowledgeable, and always available when needed. Highly recommended!",
    rating: 5,
  },
  {
    name: "Sneha Agarwal",
    role: "HR Manager",
    content: "Their labour law expertise helped us navigate complex employment issues. The team is thorough, responsive, and genuinely cares about client outcomes.",
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-gold font-semibold text-sm uppercase tracking-wider">
            Client Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We take pride in our client relationships and the trust they place in us 
            for their legal matters.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card p-8 rounded-2xl shadow-lg border border-border relative"
            >
              {/* Quote icon */}
              <div className="absolute top-6 right-6 text-gold/20">
                <Quote className="w-10 h-10" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>

              {/* Content */}
              <p className="text-muted-foreground leading-relaxed mb-6">
                &quot;{testimonial.content}&quot;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center">
                  <span className="text-gold font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
