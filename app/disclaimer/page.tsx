import { Metadata } from "next"
import Link from "next/link"
import { Scale, ArrowLeft, AlertTriangle } from "lucide-react"

export const metadata: Metadata = {
  title: "Disclaimer | RKS, Advocate | LawUp™",
  description: "Legal Disclaimer for RKS, Advocate and LawUp™.",
}

export default function DisclaimerPage() {
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
              <h1 className="text-2xl font-bold text-primary-foreground">Legal Disclaimer</h1>
              <p className="text-primary-foreground/70 text-sm">RKS, Advocate | LawUp™</p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Important Notice */}
        <div className="bg-gold/10 border border-gold/30 rounded-lg p-6 mb-8 flex gap-4">
          <AlertTriangle className="w-6 h-6 text-gold flex-shrink-0 mt-0.5" />
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">Important Notice</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              This disclaimer is in accordance with the rules of the Bar Council of India. Please read this 
              disclaimer carefully before using our website or services.
            </p>
          </div>
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="text-muted-foreground text-sm mb-8">
            Last Updated: {new Date().toLocaleDateString("en-IN", { month: "long", day: "numeric", year: "numeric" })}
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">Bar Council of India Rules</h2>
            <p className="text-muted-foreground leading-relaxed">
              As per the rules of the Bar Council of India, RKS, Advocate & its associates & affiliates 
              (including <strong className="text-foreground">LawUp™</strong>) (the &apos;Group/Firm/Associationship&apos;) 
              is prohibited from soliciting work or advertising.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">User Acknowledgments</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              By accessing and using this website (www.rks.ad), the User acknowledges and agrees to the following:
            </p>
            
            <div className="space-y-4">
              <div className="bg-card p-4 rounded-lg border border-border">
                <div className="flex gap-3">
                  <span className="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center text-gold text-sm font-bold flex-shrink-0">1</span>
                  <p className="text-muted-foreground">
                    The User is seeking information relating to RKS, Advocate & its associates & affiliates (including LawUp™) 
                    of his/her/its own accord and that there has been no form of solicitation, advertisement or inducement 
                    by RKS, Advocate & its associates & affiliates or any of its members.
                  </p>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-border">
                <div className="flex gap-3">
                  <span className="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center text-gold text-sm font-bold flex-shrink-0">2</span>
                  <p className="text-muted-foreground">
                    This website does not seek to create or invite any lawyer–client relationship.
                  </p>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-border">
                <div className="flex gap-3">
                  <span className="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center text-gold text-sm font-bold flex-shrink-0">3</span>
                  <p className="text-muted-foreground">
                    No material/information provided on this website should be construed as legal advice.
                  </p>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-border">
                <div className="flex gap-3">
                  <span className="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center text-gold text-sm font-bold flex-shrink-0">4</span>
                  <p className="text-muted-foreground">
                    LawUp™ & its associates & affiliates shall not be liable for consequences arising out of any 
                    action taken by the User relying on material/information provided on this website.
                  </p>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-border">
                <div className="flex gap-3">
                  <span className="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center text-gold text-sm font-bold flex-shrink-0">5</span>
                  <p className="text-muted-foreground">
                    In cases where the User has any legal issues, he/she/it must in all cases seek independent legal advice.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">No Warranty</h2>
            <p className="text-muted-foreground leading-relaxed">
              The information contained on this website is provided for informational purposes only and without any 
              warranty of any kind, either express or implied, including but not limited to the implied warranties 
              of merchantability, fitness for a particular purpose, or non-infringement.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">Information Accuracy</h2>
            <p className="text-muted-foreground leading-relaxed">
              While we endeavor to keep the information on this website accurate and up-to-date, we make no representations 
              or warranties of any kind about the completeness, accuracy, reliability, suitability, or availability of 
              the information, products, services, or related graphics contained on the website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">External Links</h2>
            <p className="text-muted-foreground leading-relaxed">
              This website may contain links to external websites that are not provided or maintained by us. We do not 
              guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">Professional Advice</h2>
            <p className="text-muted-foreground leading-relaxed">
              The information on this website is not intended to be a substitute for professional legal advice. 
              You should always seek the advice of a qualified legal professional for any legal matters. Never 
              disregard professional legal advice or delay in seeking it because of something you have read on this website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              In no event will RKS, Advocate, LawUp™, or any of its associates or affiliates be liable for any loss 
              or damage including without limitation, indirect or consequential loss or damage, or any loss or damage 
              whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">Jurisdiction</h2>
            <p className="text-muted-foreground leading-relaxed">
              This disclaimer shall be governed by and construed in accordance with the laws of India, and any disputes 
              relating to this disclaimer shall be subject to the exclusive jurisdiction of the courts at Jaipur, Rajasthan.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">Contact</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about this disclaimer, please contact us:
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
