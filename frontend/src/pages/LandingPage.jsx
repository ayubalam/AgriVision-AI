import Hero from '../components/landing/Hero'
import Features from '../components/landing/Features'
import HowItWorks from '../components/landing/HowItWorks'
import SupportedCrops from '../components/landing/SupportedCrops'
import CTA from '../components/landing/CTA'

export default function LandingPage() {
  return (
    <main>
      <Hero />
      <Features />
      <HowItWorks />
      <SupportedCrops />
      <CTA />
    </main>
  )
}