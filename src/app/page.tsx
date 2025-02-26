import TopBar from "@/components/top-bar"
import Header from "@/components/header"
import Navigation from "@/components/nav"
import Hero from "@/components/hero"
import StepsGuide from "@/components/steps"
import AboutCompany from "@/components/about"
import WhyChooseUs from "@/components/why-us"
import CustomIndustryCarousel from "@/components/industry"
import MetricsSection from "@/components/merics"
import OurClientsSection from "@/components/client"

export default function Home() {
  return (
    <main>
      <TopBar />
      <Header />
      
      <Hero />
      <StepsGuide />
      <AboutCompany />
      <WhyChooseUs />
      <CustomIndustryCarousel />
      <MetricsSection />
      <OurClientsSection />
    </main>
  )
}

