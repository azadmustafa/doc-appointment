
import { Calendar, Shield, Clock, Award } from "lucide-react";
import SearchBar from "./SearchBar";

const HeroSection = () => {
  return (
    <section className="relative bg-medical-light py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
            احجز موعدك الطبي بسهولة وسرعة
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            ابحث واختر من بين آلاف الأطباء المتخصصين. احصل على موعد في نفس اليوم.
          </p>
          
          <SearchBar />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          <div className="bg-white rounded-lg p-6 shadow-md flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-medical-light flex items-center justify-center mb-4">
              <Calendar className="h-6 w-6 text-medical-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">حجز سريع</h3>
            <p className="text-gray-600 text-sm">احجز موعدك في أقل من دقيقتين</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-md flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-medical-light flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-medical-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">أطباء موثوقين</h3>
            <p className="text-gray-600 text-sm">جميع الأطباء معتمدين ومرخصين</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-md flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-medical-light flex items-center justify-center mb-4">
              <Clock className="h-6 w-6 text-medical-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">مواعيد مرنة</h3>
            <p className="text-gray-600 text-sm">حدد وقتًا يناسب جدولك الزمني</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-md flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-medical-light flex items-center justify-center mb-4">
              <Award className="h-6 w-6 text-medical-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">رعاية متميزة</h3>
            <p className="text-gray-600 text-sm">احصل على أفضل خدمة طبية ممكنة</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
