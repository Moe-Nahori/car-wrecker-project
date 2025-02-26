import React from 'react';
import HeroSection from '../components/home/HeroSection';
import HowItWorksSection from '../components/home/HowItWorksSection';
import TrustBuildingSection from '../components/home/TrustBuildingSection';
import NetworkSection from '../components/home/NetworkSection';
import WhyChooseSection from '../components/home/WhyChooseSection';
import QuickResponseSection from '../components/home/QuickResponseSection';
import ValuationToolSection from '../components/home/ValuationToolSection';
import CoverageMapSection from '../components/home/CoverageMapSection';
import FAQPreviewSection from '../components/home/FAQPreviewSection';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ValuationToolSection />
      <HowItWorksSection />
      <NetworkSection />
      <CoverageMapSection />
      <TrustBuildingSection />
      <FAQPreviewSection />
      <WhyChooseSection />
      <QuickResponseSection />
    </div>
  );
}