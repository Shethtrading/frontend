import TopBar from "@/components/top-bar";
import Header from "@/components/header";
import Hero from "@/components/hero";
import StepsGuide from "@/components/steps";
import AboutCompany from "@/components/about";
import WhyChooseUs from "@/components/why-us";
import CustomIndustryCarousel from "@/components/industry";
import MetricsSection from "@/components/merics";
import OurClientsSection from "@/components/client";
import CertificatesSection from "@/components/cert";
import Footer from "@/components/footer";
import AnimatedContainer from "@/components/animated-title";

export default function Home() {
  return (
    <main>
      <TopBar />
      <Header />

      <Hero />
      <AnimatedContainer
        className="text-center"
        animationProps={{
          initial: { opacity: 0, y: 50 }, // Animate from bottom
          transition: { duration: 1, ease: "easeInOut", delay: 0.5 },
        }}
      >
        <StepsGuide />
      </AnimatedContainer>
      <AnimatedContainer
        className="text-center"
        animationProps={{
          initial: { opacity: 0, y: 50 }, // Animate from bottom
          transition: { duration: 1, ease: "easeInOut", delay: 0.5 },
        }}
      >
        <AboutCompany />
      </AnimatedContainer>
      <AnimatedContainer
        className="text-center"
        animationProps={{
          initial: { opacity: 0, y: 50 }, // Animate from bottom
          transition: { duration: 1, ease: "easeInOut" },
        }}
      >
        <WhyChooseUs />
      </AnimatedContainer>
      <AnimatedContainer
        className="text-center"
        animationProps={{
          initial: { opacity: 0, y: 50 }, // Animate from bottom
          transition: { duration: 1, ease: "easeInOut" },
        }}
      >
        <CustomIndustryCarousel />
      </AnimatedContainer>

      <AnimatedContainer
        className="text-center"
        animationProps={{
          initial: { opacity: 0, y: 50 }, // Animate from bottom
          transition: { duration: 1, ease: "easeInOut", delay: 0.5 },
        }}
      >
        <MetricsSection />
      </AnimatedContainer>

      <AnimatedContainer
        className="text-center"
        animationProps={{
          initial: { opacity: 0, y: 50 }, // Animate from bottom
          transition: { duration: 1, ease: "easeInOut", delay: 0.5 },
        }}
      >
        <OurClientsSection />
      </AnimatedContainer>

      <AnimatedContainer
        className="text-center"
        animationProps={{
          initial: { opacity: 0, y: 50 }, // Animate from bottom
          transition: { duration: 1, ease: "easeInOut", delay: 0.5 },
        }}
      >
        <CertificatesSection />
      </AnimatedContainer>
      <Footer />
    </main>
  );
}
