import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20 py-18">
      

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="space-y-8">
          {/* Title */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-foreground">Terms of Service</h1>
            <p className="text-muted-foreground">
              Last updated: November 2, 2024
            </p>
          </div>

          {/* Content */}
          <Card className="bg-card/50 backdrop-blur-sm border-2 border-border/50 shadow-2xl">
            <CardContent className="p-8 space-y-8">
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">Agreement to Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  These Terms of Service ("Terms") govern your use of LoopCast's testimonial collection and management platform (the "Service") operated by LoopCast, Inc. ("we," "us," or "our"). By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of these terms, then you may not access the Service.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">Description of Service</h2>
                <p className="text-muted-foreground leading-relaxed">
                  LoopCast provides a platform that enables businesses to collect, manage, and display customer testimonials through customizable forms, video recording capabilities, and embeddable widgets. Our Service includes features for testimonial collection, processing, analytics, and integration with third-party platforms.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">User Accounts</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-2">Account Creation</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      To use certain features of our Service, you must create an account. You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate, current, and complete.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-2">Account Security</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      You are responsible for safeguarding your account credentials and for all activities that occur under your account. You agree to immediately notify us of any unauthorized use of your account or any other breach of security.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-2">Account Termination</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      We may terminate or suspend your account and access to the Service immediately, without prior notice or liability, for any reason, including if you breach these Terms.
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">Acceptable Use</h2>
                <p className="text-muted-foreground leading-relaxed mb-2">
                  You agree not to use the Service:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                  <li>For any unlawful purpose or to solicit others to take unlawful actions</li>
                  <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                  <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                  <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                  <li>To submit false, inaccurate, or misleading information</li>
                  <li>To upload or transmit viruses or any other type of malicious code</li>
                  <li>To spam, phish, farm, pretext, spider, crawl, or scrape</li>
                  <li>For any obscene or immoral purpose</li>
                  <li>To interfere with or circumvent the security features of the Service</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">Content and Intellectual Property</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-2">Your Content</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      You retain ownership of any content you submit, post, or display on or through the Service ("Your Content"). By submitting Your Content, you grant us a worldwide, non-exclusive, royalty-free license to use, copy, reproduce, process, adapt, modify, publish, transmit, display, and distribute Your Content in connection with the Service.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-2">Our Content</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      The Service and its original content, features, and functionality are and will remain the exclusive property of LoopCast and its licensors. The Service is protected by copyright, trademark, and other laws.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-2">Content Responsibility</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      You are solely responsible for Your Content and the consequences of posting or publishing it. We do not endorse, support, represent, or guarantee the completeness, truthfulness, accuracy, or reliability of any Content.
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">Testimonials and Public Display</h2>
                <p className="text-muted-foreground leading-relaxed">
                  By submitting testimonials through our Service, you understand and agree that such testimonials may be publicly displayed on websites, social media, marketing materials, and other platforms as intended by the Service. You warrant that you have the right to grant such permissions and that your testimonials are truthful and accurate.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">Payment Terms</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-2">Billing</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Certain aspects of the Service are provided for a fee. You agree to pay all fees associated with your use of the Service. Fees are billed in advance on a recurring basis and are non-refundable except as expressly stated in these Terms.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-2">Price Changes</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      We reserve the right to change our prices at any time. If we change prices for your subscription, we will provide you with reasonable notice of such changes.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-2">Refunds</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      All payments are non-refundable except as required by law or as expressly provided in these Terms. We may, at our sole discretion, offer refunds on a case-by-case basis.
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">Privacy Policy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your information when you use our Service. By using our Service, you agree to the collection and use of information in accordance with our Privacy Policy.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">Disclaimers</h2>
                <p className="text-muted-foreground leading-relaxed mb-2">
                  THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. WE MAKE NO WARRANTIES, EXPRESS OR IMPLIED, INCLUDING:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                  <li>That the Service will meet your specific requirements</li>
                  <li>That the Service will be uninterrupted, timely, secure, or error-free</li>
                  <li>That any errors in the Service will be corrected</li>
                  <li>That the Service is free of viruses or other harmful components</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">Limitation of Liability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  IN NO EVENT SHALL LOOPCAST, ITS DIRECTORS, EMPLOYEES, PARTNERS, AGENTS, SUPPLIERS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR USE OF THE SERVICE.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">Indemnification</h2>
                <p className="text-muted-foreground leading-relaxed">
                  You agree to defend, indemnify, and hold harmless LoopCast and its affiliates, officers, directors, employees, and agents from and against any and all claims, damages, obligations, losses, liabilities, costs, or debt, and expenses (including but not limited to attorney's fees) arising from your use of the Service or violation of these Terms.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">Governing Law</h2>
                <p className="text-muted-foreground leading-relaxed">
                  These Terms shall be interpreted and governed by the laws of the State of California, United States, without regard to its conflict of law provisions. Any disputes arising from these Terms or your use of the Service shall be resolved in the courts of California.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">Severability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If any provision of these Terms is held to be unenforceable or invalid, such provision will be changed and interpreted to accomplish the objectives of such provision to the greatest extent possible under applicable law, and the remaining provisions will continue in full force and effect.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">Changes to Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. Your continued use of the Service after such changes constitutes acceptance of the new Terms.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">Contact Information</h2>
                <p className="text-muted-foreground leading-relaxed mb-2">
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="bg-muted/20 rounded-lg p-4 space-y-2">
                  <p className="text-sm text-muted-foreground">
                    <strong>Email:</strong> legal@loopcast.com
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Address:</strong> LoopCast, Inc.<br />
                    123 Legal Street<br />
                    San Francisco, CA 94105<br />
                    United States
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">Effective Date</h2>
                <p className="text-muted-foreground leading-relaxed">
                  These Terms of Service are effective as of November 2, 2024, and will remain in effect except with respect to any changes in provisions, which will take effect immediately after being posted on this page.
                </p>
              </section>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center">
            <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
              <Link href="/privacy" className="hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <span>•</span>
              <Link href="/" className="hover:text-foreground transition-colors">
                Back to LoopCast
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
