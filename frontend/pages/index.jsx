import React from 'react';
import HeroSection from '../components/home/HeroSection';
import HowItWorksSection from '../components/home/HowItWorksSection';
import TrustBuildingSection from '../components/home/TrustBuildingSection';
import NetworkSection from '../components/home/NetworkSection';
import WhyChooseSection from '../components/home/WhyChooseSection';
import QuickResponseSection from '../components/home/QuickResponseSection';
import EducationalFooter from '../components/home/EducationalFooter';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <HowItWorksSection />
      <TrustBuildingSection />
      <NetworkSection />
      <WhyChooseSection />
      <QuickResponseSection />
      <EducationalFooter />
    </div>
  );
}