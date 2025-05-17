
import React from 'react';
import { Link } from "react-router-dom";
import { Home, Syringe, Heart, Stethoscope, Clipboard, Thermometer, Calendar, MapPin, DollarSign } from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Service type definition
interface HomeService {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  requestCount: number;
  price: number;
  slug: string;
  availability: string;
  coverage: string[];
}

// Mock home services data with expanded information
const homeServices: HomeService[] = [
  {
    id: "1",
    name: "زيارة طبيب للمنزل",
    description: "كشف طبي شامل من قبل طبيب متخصص في منزلك لتشخيص الحالات المرضية وتقديم العلاج المناسب دون الحاجة لزيارة المستشفى أو العيادة.",
    icon: Stethoscope,
    requestCount: 2584,
    price: 55000,
    slug: "home-doctor-visit",
    availability: "متوفرة على مدار الساعة، 7 أيام في الأسبوع",
    coverage: ["بغداد", "البصرة", "أربيل", "النجف", "كربلاء", "الموصل"],
  },
  {
    id: "2",
    name: "تمريض منزلي",
    description: "رعاية تمريضية احترافية من قبل ممرضين متخصصين. تشمل الخدمات: تغيير الضمادات، إعطاء الحقن، قياس المؤشرات الحيوية، والإشراف على تناول الأدوية.",
    icon: Heart,
    requestCount: 1893,
    price: 30000,
    slug: "home-nursing",
    availability: "متوفرة من 8 صباحاً - 10 مساءً، 7 أيام في الأسبوع",
    coverage: ["بغداد", "البصرة", "الموصل", "أربيل"],
  },
  {
    id: "3",
    name: "تحاليل طبية منزلية",
    description: "سحب عينات للتحاليل الطبية في منزلك وتوصيل النتائج إلكترونياً. تشمل التحاليل: تحاليل الدم الشاملة، وظائف الكلى والكبد، السكر التراكمي وغيرها.",
    icon: Syringe,
    requestCount: 3412,
    price: 15000,
    slug: "home-lab-tests",
    availability: "متوفرة من 7 صباحاً - 7 مساءً، 7 أيام في الأسبوع",
    coverage: ["بغداد", "البصرة", "النجف", "كربلاء", "الموصل", "السليمانية", "ديالى"],
  },
  {
    id: "4",
    name: "العلاج الطبيعي المنزلي",
    description: "جلسات علاج طبيعي في منزلك من قبل متخصصين لعلاج مشاكل العضلات والعظام والمفاصل، وإعادة التأهيل بعد العمليات الجراحية أو السكتات الدماغية.",
    icon: Clipboard,
    requestCount: 1257,
    price: 45000,
    slug: "home-physiotherapy",
    availability: "متوفرة من 9 صباحاً - 8 مساءً، 6 أيام في الأسبوع (عدا الجمعة)",
    coverage: ["بغداد", "البصرة", "أربيل"],
  },
  {
    id: "5",
    name: "رعاية المسنين",
    description: "خدمات متخصصة للرعاية الصحية للمسنين في منازلهم تشمل المتابعة الدورية، المساعدة في الأنشطة اليومية، الرعاية الشخصية، والإشراف على تناول الأدوية.",
    icon: Thermometer,
    requestCount: 986,
    price: 40000,
    slug: "elderly-care",
    availability: "خدمة مستمرة بنظام الساعات أو بنظام الإقامة المؤقتة",
    coverage: ["بغداد", "البصرة", "أربيل", "النجف"],
  },
];

const HomeServices = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-medical-light py-12 px-4">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1 text-center md:text-right">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">الخدمات الطبية المنزلية</h1>
                <p className="text-lg text-gray-700 mb-6">
                  نوفر لك رعاية صحية عالية الجودة في منزلك من قبل كادر طبي مؤهل ومدرب.
                </p>
                <Link to="/service-quote">
                  <Button className="bg-medical-primary hover:bg-medical-dark">
                    احصل على تسعيرة خدمة
                  </Button>
                </Link>
              </div>
              <div className="flex-1 flex justify-center">
                <div className="w-64 h-64 rounded-full bg-white flex items-center justify-center shadow-lg">
                  <Home className="h-24 w-24 text-medical-primary" />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Services List */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">خدماتنا المتوفرة</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {homeServices.map((service) => (
                <Card key={service.id} className="border border-gray-200 hover:border-medical-primary hover:shadow-md transition-all duration-200">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-16 h-16 rounded-full bg-medical-light flex items-center justify-center">
                        <service.icon className="h-8 w-8 text-medical-primary" />
                      </div>
                      <div className="text-left">
                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                          {service.requestCount.toLocaleString()} طلب
                        </span>
                      </div>
                    </div>
                    
                    <h3 className="font-bold text-xl mb-2">{service.name}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{service.description}</p>
                    
                    <div className="flex items-center mb-3 text-gray-600">
                      <DollarSign className="h-4 w-4 ml-2 text-medical-primary" />
                      <span>{service.price.toLocaleString()} د.ع</span>
                    </div>
                    
                    <div className="flex items-center text-gray-600 mb-4">
                      <Calendar className="h-4 w-4 ml-2 text-medical-primary" />
                      <span className="text-sm line-clamp-1">{service.availability}</span>
                    </div>
                    
                    <Link to={`/home-services/${service.slug}`}>
                      <Button className="w-full bg-medical-primary hover:bg-medical-dark">
                        عرض التفاصيل والحجز
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* How It Works */}
        <section className="py-12 px-4 bg-gray-50">
          <div className="container mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">كيف تعمل خدماتنا المنزلية؟</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-medical-light flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-medical-primary">1</span>
                </div>
                <h3 className="font-bold text-lg mb-2">تقديم الطلب</h3>
                <p className="text-gray-600">
                  اختر الخدمة المطلوبة وقم بملء نموذج الطلب أو اتصل بنا مباشرة
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-medical-light flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-medical-primary">2</span>
                </div>
                <h3 className="font-bold text-lg mb-2">التأكيد والجدولة</h3>
                <p className="text-gray-600">
                  سنتصل بك لتأكيد التفاصيل وتحديد الموعد المناسب
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-medical-light flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-medical-primary">3</span>
                </div>
                <h3 className="font-bold text-lg mb-2">زيارة منزلية</h3>
                <p className="text-gray-600">
                  يصل فريقنا الطبي إلى منزلك لتقديم الخدمة المطلوبة في الموعد المحدد
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 px-4 bg-medical-primary text-white">
          <div className="container mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">هل تريد خدمة طبية منزلية؟</h2>
            <p className="text-lg mb-6 max-w-2xl mx-auto">
              فريقنا الطبي جاهز لخدمتك في راحة منزلك. احجز الآن واحصل على رعاية صحية متميزة.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/service-quote">
                <Button className="bg-white text-medical-primary hover:bg-gray-100">
                  طلب تسعيرة خدمة
                </Button>
              </Link>
              <Button variant="outline" className="border-white text-white hover:bg-medical-dark">
                اتصل بنا للاستفسار
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default HomeServices;
