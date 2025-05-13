
import { useEffect } from "react";
import { Heart, Brain, Stethoscope, Eye, Bone, Activity, Scissors, Pill } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import SpecialtyCard from "@/components/SpecialtyCard";
import DoctorCard from "@/components/DoctorCard";
import OnlineDoctors from "@/components/OnlineDoctors";
import TopHospitals from "@/components/TopHospitals";
import PromotionsSection from "@/components/PromotionsSection";
import BeautyCenters from "@/components/BeautyCenters";
import AppDownload from "@/components/AppDownload";
import FAQSection from "@/components/FAQSection";

const specialties = [
  { icon: Heart, title: "قلب وأوعية دموية", count: 28, color: "#e74c3c" },
  { icon: Brain, title: "المخ والأعصاب", count: 16, color: "#9b59b6" },
  { icon: Stethoscope, title: "طب عام", count: 42, color: "#3498db" },
  { icon: Eye, title: "طب العيون", count: 20, color: "#2ecc71" },
  { icon: Bone, title: "عظام", count: 15, color: "#f39c12" },
  { icon: Activity, title: "باطنة", count: 31, color: "#1abc9c" },
  { icon: Scissors, title: "جراحة", count: 25, color: "#e67e22" },
  { icon: Pill, title: "أمراض جلدية", count: 18, color: "#8e44ad" },
];

// بيانات الأطباء المميزين
const featuredDoctors = [
  {
    id: 1,
    name: "د. أحمد الشمري",
    specialty: "قلب وأوعية دموية",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    rating: 4.9,
    reviewCount: 124,
    location: "بغداد، الكرخ",
    price: 35000
  },
  {
    id: 2,
    name: "د. سارة العبيدي",
    specialty: "طب الأطفال",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    rating: 4.8,
    reviewCount: 98,
    location: "بغداد، الرصافة",
    price: 30000
  },
  {
    id: 3,
    name: "د. محمد الكاظمي",
    specialty: "جراحة العظام",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    rating: 4.7,
    reviewCount: 87,
    location: "بغداد، المنصور",
    price: 40000
  },
  {
    id: 4,
    name: "د. فاطمة الموسوي",
    specialty: "طب الأسنان",
    image: "https://images.unsplash.com/photo-1571772996211-2f02974a304d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    rating: 4.9,
    reviewCount: 112,
    location: "البصرة، العشار",
    price: 28000
  }
];

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <HeroSection />
        
        {/* Specialties Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">تصفح حسب التخصص</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                اختر التخصص المناسب لحالتك الصحية واحجز موعدًا مع أفضل الأطباء المتخصصين
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {specialties.map((specialty, index) => (
                <SpecialtyCard 
                  key={index}
                  icon={specialty.icon}
                  title={specialty.title}
                  count={specialty.count}
                  color={specialty.color}
                />
              ))}
            </div>
            
            <div className="text-center mt-10">
              <Link to="/specialties">
                <Button variant="outline" className="border-medical-primary text-medical-primary hover:bg-medical-light">
                  عرض جميع التخصصات
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Featured Doctors */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">أطباء مميزون</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                تعرف على أفضل الأطباء المميزين في مختلف التخصصات واحجز موعدك معهم الآن
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredDoctors.map((doctor) => (
                <DoctorCard 
                  key={doctor.id}
                  id={doctor.id}
                  name={doctor.name}
                  specialty={doctor.specialty}
                  image={doctor.image}
                  rating={doctor.rating}
                  reviewCount={doctor.reviewCount}
                  location={doctor.location}
                  price={doctor.price}
                />
              ))}
            </div>
            
            <div className="text-center mt-10">
              <Link to="/doctors">
                <Button className="bg-medical-primary hover:bg-medical-dark">
                  عرض جميع الأطباء
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Online Consultations Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <OnlineDoctors />
          </div>
        </section>
        
        {/* Top Hospitals Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <TopHospitals />
          </div>
        </section>
        
        {/* Promotions Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <PromotionsSection />
          </div>
        </section>
        
        {/* Beauty Centers Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <BeautyCenters />
          </div>
        </section>
        
        {/* App Download Section */}
        <AppDownload />
        
        {/* How It Works */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">كيف يعمل طبيبي؟</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                عملية حجز موعد طبي من خلال منصتنا بسيطة وسريعة
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 rounded-full bg-medical-light flex items-center justify-center mx-auto mb-6">
                  <span className="text-medical-primary text-2xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">ابحث عن طبيب</h3>
                <p className="text-gray-600">
                  ابحث عن طبيب حسب التخصص، الموقع، أو التقييم لتجد الطبيب المناسب لاحتياجاتك
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 rounded-full bg-medical-light flex items-center justify-center mx-auto mb-6">
                  <span className="text-medical-primary text-2xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">اختر موعدًا مناسبًا</h3>
                <p className="text-gray-600">
                  استعرض المواعيد المتاحة واختر الوقت والتاريخ الذي يناسبك
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 rounded-full bg-medical-light flex items-center justify-center mx-auto mb-6">
                  <span className="text-medical-primary text-2xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">قم بتأكيد حجزك</h3>
                <p className="text-gray-600">
                  أدخل بياناتك وقم بتأكيد الحجز. ستتلقى تأكيدًا فوريًا عبر البريد الإلكتروني والرسائل النصية
                </p>
              </div>
            </div>
          </div>
        </section>
        
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
