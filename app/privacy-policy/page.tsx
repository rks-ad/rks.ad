import { Metadata } from "next"
import Link from "next/link"
import { Scale, ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Privacy Policy | RKS, Advocate | LawUp™",
  description: "Privacy Policy for RKS, Advocate and LawUp™ legal services.",
}

export default function PrivacyPolicyPage() {
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
              <h1 className="text-2xl font-bold text-primary-foreground">Privacy Policy</h1>
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
            <h2 className="text-xl font-semibold text-foreground mb-4">1. Data Storage & Third-Party Platforms</h2>
            <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4">
              <p className="text-yellow-800 dark:text-yellow-200 text-sm font-medium">Important Notice: We Do Not Store Personal Data</p>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-4">
              RKS, Advocate and LawUp™ does <strong>NOT store any personal data</strong> on our servers. All information 
              collected through our website is transmitted directly to third-party service platforms and is governed by 
              their respective privacy policies.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              When you interact with our website, your data is processed by the following platforms:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li><strong className="text-foreground">Cal.com:</strong> For scheduling consultations and meeting bookings. Review their privacy policy at <a href="https://cal.com/privacy" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">cal.com/privacy</a></li>
              <li><strong className="text-foreground">Resend:</strong> For sending emails and notifications. Review their privacy policy at <a href="https://resend.com/privacy" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">resend.com/privacy</a></li>
              <li><strong className="text-foreground">Oracle Cloud:</strong> For temporary contact form submissions. Review their privacy policy at <a href="https://www.oracle.com/legal/privacy/" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">oracle.com/legal/privacy</a></li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              For clarity on how your personal information is handled by these platforms, please review their respective 
              privacy policies. We are not responsible for the privacy practices of third-party service providers.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">2. What Information We Collect</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">We may collect the following types of information:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li><strong className="text-foreground">Personal Information:</strong> Name, email address, phone number, and other contact details you provide when booking a consultation or contacting us.</li>
              <li><strong className="text-foreground">Case Information:</strong> Details about your legal matter that you voluntarily share with us.</li>
              <li><strong className="text-foreground">Usage Data:</strong> Information about how you interact with our website, including IP address, browser type, pages visited, and time spent on pages.</li>
              <li><strong className="text-foreground">Cookies:</strong> Small data files stored on your device to enhance your browsing experience.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">3. How Your Information is Used</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">Since we do not store data, your information is used by third-party platforms for:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Scheduling and managing consultation bookings (Cal.com)</li>
              <li>Sending email notifications and confirmations (Resend)</li>
              <li>Temporarily processing contact form submissions</li>
              <li>Communicating with you about your legal consultation</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">4. Confidentiality & Attorney-Client Privilege</h2>
            <p className="text-muted-foreground leading-relaxed">
              As a legal practice registered with the Bar Council of India, we are bound by attorney-client privilege 
              and professional confidentiality obligations. Information shared with us in the context of seeking legal 
              advice is protected under applicable laws and professional ethics rules, regardless of where it is stored 
              or processed.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">5. Data Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              While we do not store data on our servers, the third-party platforms we use implement standard security 
              measures to protect your information. However, no method of transmission over the Internet is 100% secure. 
              For specific information about the security measures implemented by third-party providers, please refer to 
              their privacy and security policies.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">6. Third-Party Services</h2>
            <p className="text-muted-foreground leading-relaxed">
              We do not control the privacy practices of third-party platforms. We encourage you to review the privacy 
              policies of Cal.com, Resend, and Oracle Cloud directly to understand how they collect, use, and protect 
              your data. We are not liable for their privacy practices.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">7. Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">You have the right to:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal information</li>
              <li>Withdraw consent for data processing</li>
              <li>Lodge a complaint with relevant authorities</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">8. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              For questions about this Privacy Policy or clarification regarding third-party data handling, please contact us at:
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

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">9. Changes to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with an 
              updated revision date. We encourage you to review this policy periodically.
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
