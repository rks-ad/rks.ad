import { Metadata } from "next"
import Link from "next/link"
import { Scale, ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Refund Policy | RKS, Advocate | LawUp™",
  description: "Refund Policy for RKS, Advocate and LawUp™ legal services.",
}

export default function RefundPolicyPage() {
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
              <h1 className="text-2xl font-bold text-primary-foreground">Refund Policy</h1>
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
            <h2 className="text-xl font-semibold text-foreground mb-4">1. No Refund Policy</h2>
            <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
              <p className="text-red-800 dark:text-red-200 text-sm font-medium">Important: No Refunds Under Any Circumstances</p>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              RKS, Advocate and LawUp™ operates on a strict &quot;No Refund&quot; policy. Due to the nature of professional 
              legal services rendered, consultation fees, case preparation fees, and any other charges for services provided 
              are non-refundable under any circumstances whatsoever, including but not limited to:
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">2. Non-Refundable Services</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">The following services and charges are absolutely non-refundable:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Consultation fees for legal advice and case evaluation</li>
              <li>Research and case preparation work</li>
              <li>Document drafting and legal opinion services</li>
              <li>Court representation and litigation services</li>
              <li>Advisory and compliance services</li>
              <li>Administrative and processing fees</li>
              <li>Any advance payments or retainers paid to the firm</li>
              <li>Services partially or fully rendered to date</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">3. Reason for No-Refund Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              Professional legal services are intrinsically unique and cannot be &quot;returned&quot; or &quot;undone.&quot; 
              Once a lawyer has been retained and services have been initiated, including consultation, research, drafting, 
              or representation, the work performed has value and cannot be reversed or transferred. This is in accordance 
              with standard practices in the legal profession and applicable Bar Council of India guidelines.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Legal work is intellectual in nature and, once completed, the fruits of that labor cannot be returned to 
              their original state. Therefore, refunds are not possible as per the nature of legal services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">4. Circumstances Covered by No-Refund Policy</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">Refunds will not be issued in the following situations:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Client dissatisfaction with the outcome of the case</li>
              <li>Unfavorable court orders or decisions</li>
              <li>Client decides not to pursue the matter further</li>
              <li>Client wishes to change legal representation</li>
              <li>Matters are settled or withdrawn after engagement</li>
              <li>Services have been partially rendered</li>
              <li>Client requests cancellation after consultation begins</li>
              <li>Any other reason whatsoever</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">5. Payment Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By engaging RKS, Advocate and LawUp™ for legal services, you acknowledge and agree that:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
              <li>All fees paid are non-refundable</li>
              <li>Payment constitutes acceptance of this No-Refund Policy</li>
              <li>You understand the nature and scope of services before engaging</li>
              <li>You accept the outcome, whether favorable or unfavorable</li>
              <li>No claims can be made for refund after services commence</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">6. Complaints and Disputes</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have concerns about the services provided or believe there has been professional misconduct, you may 
              file a complaint with the Bar Council of India rather than seeking a refund. Refund requests based on 
              dissatisfaction or disputes over legal outcomes will not be entertained.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">7. Contact for Clarification</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions or require clarification regarding this Refund Policy, please contact us at:
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
            <h2 className="text-xl font-semibold text-foreground mb-4">8. Policy Changes</h2>
            <p className="text-muted-foreground leading-relaxed">
              This Refund Policy is subject to change at any time. Any updates will be posted on this page with an updated 
              revision date. Continued engagement with our services implies acceptance of the updated policy.
            </p>
          </section>

          <section className="border-t border-secondary pt-8 mt-8">
            <p className="text-muted-foreground text-sm italic">
              By booking a consultation or engaging RKS, Advocate for legal services, you acknowledge that you have read, 
              understood, and agree to be bound by this Refund Policy.
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
