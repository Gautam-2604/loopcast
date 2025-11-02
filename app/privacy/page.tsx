import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20 py-18">
      

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="space-y-8">
          {/* Title */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-foreground">Privacy Policy</h1>
            <p className="text-muted-foreground">
              Last updated: November 2, 2024
            </p>
          </div>

          {/* Content */}
          <Card className="bg-card/50 backdrop-blur-sm border-2 border-border/50 shadow-2xl">
            <CardContent className="p-8 space-y-8">
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">Introduction</h2>
                <p className="text-muted-foreground leading-relaxed">
                  LoopCast ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our testimonial collection and management platform (the "Service"). Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the Service.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">Information We Collect</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-2">Personal Information</h3>
                    <p className="text-muted-foreground leading-relaxed mb-2">
                      We may collect personal information that you voluntarily provide to us when you:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                      <li>Register for an account</li>
                      <li>Submit a testimonial through our forms</li>
                      <li>Contact us for support</li>
                      <li>Subscribe to our newsletter</li>
                      <li>Use our services</li>
                    </ul>
                    <p className="text-muted-foreground leading-relaxed mt-2">
                      This information may include: name, email address, company information, profile pictures, video testimonials, written testimonials, and any other information you choose to provide.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-2">Automatically Collected Information</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      When you access our Service, we may automatically collect certain information about your device and usage patterns, including: IP address, browser type, operating system, referring URLs, device identifiers, and usage data such as pages viewed and time spent on our Service.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-2">Cookies and Tracking Technologies</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      We use cookies, web beacons, and similar tracking technologies to collect information about your browsing activities and to provide you with a personalized experience. You can control cookies through your browser settings.
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">How We Use Your Information</h2>
                <p className="text-muted-foreground leading-relaxed mb-2">
                  We use the information we collect for various purposes, including:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                  <li>Providing and maintaining our Service</li>
                  <li>Processing and displaying testimonials</li>
                  <li>Managing user accounts and authentication</li>
                  <li>Sending administrative communications</li>
                  <li>Responding to customer support requests</li>
                  <li>Improving our Service and developing new features</li>
                  <li>Analyzing usage patterns and trends</li>
                  <li>Complying with legal obligations</li>
                  <li>Protecting against fraud and security threats</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">Information Sharing and Disclosure</h2>
                <p className="text-muted-foreground leading-relaxed mb-2">
                  We do not sell, trade, or otherwise transfer your personal information to third parties except in the following circumstances:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                  <li><strong>Service Providers:</strong> We may share information with trusted third-party service providers who assist us in operating our Service</li>
                  <li><strong>Legal Requirements:</strong> We may disclose information if required by law or in response to valid legal requests</li>
                  <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred</li>
                  <li><strong>Public Testimonials:</strong> Testimonials submitted through our forms may be publicly displayed as intended by the Service</li>
                  <li><strong>Consent:</strong> With your explicit consent for specific purposes</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">Data Security</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include encryption, secure data transmission, access controls, and regular security assessments. However, no method of transmission over the internet or electronic storage is 100% secure.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">Data Retention</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When we no longer need your information, we will securely delete or anonymize it.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">Your Privacy Rights</h2>
                <p className="text-muted-foreground leading-relaxed mb-2">
                  Depending on your location, you may have the following rights regarding your personal information:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                  <li><strong>Access:</strong> Request access to your personal information</li>
                  <li><strong>Correction:</strong> Request correction of inaccurate information</li>
                  <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                  <li><strong>Portability:</strong> Request a copy of your information in a portable format</li>
                  <li><strong>Objection:</strong> Object to certain processing of your information</li>
                  <li><strong>Restriction:</strong> Request restriction of processing</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-2">
                  To exercise these rights, please contact us using the information provided below.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">International Data Transfers</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Your information may be transferred to and processed in countries other than your country of residence. We ensure that such transfers comply with applicable data protection laws and implement appropriate safeguards to protect your information.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">Children's Privacy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our Service is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information promptly.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">Changes to This Privacy Policy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last updated" date. Your continued use of the Service after such changes constitutes acceptance of the new Privacy Policy.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed mb-2">
                  If you have any questions about this Privacy Policy or our privacy practices, please contact us:
                </p>
                <div className="bg-muted/20 rounded-lg p-4 space-y-2">
                  <p className="text-sm text-muted-foreground">
                    <strong>Email:</strong> privacy@loopcast.com
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Address:</strong> LoopCast, Inc.<br />
                    123 Privacy Street<br />
                    San Francisco, CA 94105<br />
                    United States
                  </p>
                </div>
              </section>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center">
            <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
              <Link href="/terms" className="hover:text-foreground transition-colors">
                Terms of Service
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
