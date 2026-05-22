import { Metadata } from "next"
import Link from "next/link"
import { Scale, ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Terms of Service | RKS, Advocate | LawUp™",
  description: "Terms of Service for RKS, Advocate and LawUp™ legal services.",
}

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-gold hover:text-gold-dark transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gold/20 rounded-lg flex items-center justify-center">
              <Scale className="w-6 h-6 text-gold" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary-foreground">Terms of Service</h1>
              <p className="text-primary-foreground/70 text-sm">RKS, Advocate | LawUp™</p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <p className="text-muted-foreground text-sm mb-8">
            Last Updated: {new Date().toLocaleDateString("en-IN", { month: "long", day: "numeric", year: "numeric" })}
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing and using the website www.rks.ad (&quot;Website&quot;), you accept and agree to be bound by these 
              Terms of Service. If you do not agree to these terms, please do not use this Website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">2. Services Description</h2>
            <p className="text-muted-foreground leading-relaxed">
              RKS, Advocate and LawUp™ provide legal services across various practice areas including but not limited to 
              Civil Cases, Criminal Law, Corporate Law, Banking & NBFC, GST, NCLT, Cyber Law, Labour Law, Real Estate & RERA, 
              Consumer Rights, Family Law, and Intellectual Property.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">3. No Attorney-Client Relationship</h2>
            <p className="text-muted-foreground leading-relaxed">
              The use of this Website does not create an attorney-client relationship. An attorney-client relationship 
              is only established when you have signed an engagement letter with our firm. Information provided on this 
              Website is for general informational purposes only and should not be construed as legal advice.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">4. Bar Council of India Compliance</h2>
            <p className="text-muted-foreground leading-relaxed">
              As per the rules of the Bar Council of India, RKS, Advocate & its associates & affiliates (including LawUp™) 
              is prohibited from soliciting work or advertising. This Website is meant solely for the purpose of information 
              and is not meant to be an advertisement or solicitation.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">5. User Responsibilities</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">By using this Website, you agree to:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Provide accurate and complete information when booking consultations</li>
              <li>Use the Website only for lawful purposes</li>
              <li>Not engage in any activity that could harm or impair the Website&apos;s functionality</li>
              <li>Respect intellectual property rights</li>
              <li>Maintain the confidentiality of any account credentials</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">6. Consultation Bookings</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">When booking a consultation through our Website:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Bookings are subject to availability and confirmation</li>
              <li>We reserve the right to reschedule or cancel appointments with reasonable notice</li>
              <li>Consultation fees, if applicable, will be communicated before the appointment</li>
              <li>Promotional offers are subject to terms and conditions and may be modified or withdrawn</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">7. Intellectual Property</h2>
            <p className="text-muted-foreground leading-relaxed">
              All content on this Website, including text, graphics, logos, and images, is the property of RKS, Advocate 
              and LawUp™ or its content suppliers and is protected by intellectual property laws. You may not reproduce, 
              distribute, or create derivative works without prior written consent.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">8. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              To the fullest extent permitted by law, RKS, Advocate and LawUp™ shall not be liable for any indirect, 
              incidental, special, consequential, or punitive damages arising out of your use of or inability to use 
              this Website or any information provided herein.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">9. Disclaimer</h2>
            <p className="text-muted-foreground leading-relaxed">
              The information on this Website is provided &quot;as is&quot; without any warranties, express or implied. We do not 
              warrant that the Website will be uninterrupted, error-free, or free from viruses or other harmful components.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">10. Governing Law</h2>
            <p className="text-muted-foreground leading-relaxed">
              These Terms of Service shall be governed by and construed in accordance with the laws of India. Any disputes 
              arising out of these terms shall be subject to the exclusive jurisdiction of the courts in Jaipur, Rajasthan.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">11. Modifications</h2>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon 
              posting on this Website. Your continued use of the Website after any changes constitutes acceptance of the 
              modified terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">12. Contact Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              For questions about these Terms of Service, please contact us at:
            </p>
            <div className="bg-secondary/50 p-4 rounded-lg mt-4">
              <p className="text-foreground font-medium">RKS, Advocate | LawUp™</p>
              <p className="text-muted-foreground text-sm">
                P. No- 43, 1st Floor, Shiv Kunj,<br />
                Opp. Bagdi Hospital, Joshi Marg Kalwar,<br />
                Jhotwara, Jaipur, Rajasthan 302012<br />
                Email: <a href="mailto:iam@rks.ad" className="text-gold hover:underline">iam@rks.ad</a>
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
