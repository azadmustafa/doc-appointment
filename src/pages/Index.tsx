
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import SpecialtiesSection from "@/components/SpecialtiesSection";
import HospitalsSection from "@/components/HospitalsSection";
import FeaturedDoctorsSection from "@/components/FeaturedDoctorsSection";
import OffersSection from "@/components/OffersSection";
import AppDownload from "@/components/AppDownload";
import FAQSection from "@/components/FAQSection";
import PharmacyOrderSection from "@/components/PharmacyOrderSection";
import MedicalCentersSection from "@/components/MedicalCentersSection";
import PatientActionsSection from "@/components/PatientActionsSection";
import OnlineDoctors from "@/components/OnlineDoctors";
import BeautyCentersSection from "@/components/BeautyCentersSection";
import RemindersWidget from "@/components/RemindersWidget";
import HomeServicesSection from "@/components/HomeServicesSection";

const Index = () => {
  useEffect(() => {
    // Scroll to the top of the page when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Health Reminders Widget - Only shown if there are upcoming reminders */}
        <div className="container mx-auto px-4 py-4">
          <RemindersWidget />
        </div>
        
        {/* Specialties Section */}
        <SpecialtiesSection />
        
        {/* Online Consultations Section */}
        <OnlineDoctors />
        
        {/* Home Services Section */}
        <HomeServicesSection />
        
        {/* Hospitals Section */}
        <HospitalsSection />
        
        {/* Featured Doctors */}
        <FeaturedDoctorsSection />
        
        {/* Beauty Centers Section */}
        <BeautyCentersSection />
        
        {/* Offers Section */}
        <OffersSection />
        
        {/* Top Medical Centers */}
        <MedicalCentersSection />
        
        {/* Patient Actions Section */}
        <PatientActionsSection />
        
        {/* Pharmacy Order Section */}
        <PharmacyOrderSection />
        
        {/* App Download Section */}
        <AppDownload />
        
        {/* FAQ Section */}
        <FAQSection />
        
        {/* CTA Section */}
        <section className="py-16 bg-medical-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">احجز موعدك الطبي الآن</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              لا تؤجل صحتك، احجز موعدًا مع أفضل الأطباء في العراق
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link to="/doctors">
                <Button className="bg-white text-medical-primary hover:bg-gray-100 px-8 py-3 text-lg">
                  ابحث عن طبيب
                </Button>
              </Link>
              <Link to="/consultation">
                <Button className="bg-medical-dark hover:bg-medical-dark/90 px-8 py-3 text-lg">
                  طرح استشارة مجانية
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
