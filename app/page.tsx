import { HeroSection } from "@/components/sections/hero-section"
import { PricingSection } from "@/components/sections/pricing-section"

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <PricingSection />
    </div>
  )
}
