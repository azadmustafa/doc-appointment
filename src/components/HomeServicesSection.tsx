
import { useState } from "react";
import { Link } from "react-router-dom";
import { MoveRight, Home, Syringe, Heart, Stethoscope, Clipboard, Thermometer } from "lucide-react";
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
}

// Mock home services data
const homeServices: HomeService[] = [
  {
    id: "1",
    name: "زيارة طبيب للمنزل",
    description: "كشف طبي شامل من قبل طبيب متخصص في منزلك",
    icon: Stethoscope,
    requestCount: 2584,
    price: 55000,
    slug: "home-doctor-visit"
  },
  {
    id: "2",
    name: "تمريض منزلي",
    description: "رعاية تمريضية احترافية من قبل ممرضين متخصصين",
    icon: Heart,
    requestCount: 1893,
    price: 30000,
    slug: "home-nursing"
  },
  {
    id: "3",
    name: "تحاليل طبية منزلية",
    description: "سحب عينات للتحاليل الطبية في منزلك",
    icon: Syringe,
    requestCount: 3412,
    price: 15000,
    slug: "home-lab-tests"
  },
  {
    id: "4",
    name: "العلاج الطبيعي المنزلي",
    description: "جلسات علاج طبيعي في منزلك من قبل متخصصين",
    icon: Clipboard,
    requestCount: 1257,
    price: 45000,
    slug: "home-physiotherapy"
  },
  {
    id: "5",
    name: "رعاية المسنين",
    description: "خدمات متخصصة للرعاية الصحية للمسنين في منازلهم",
    icon: Thermometer,
    requestCount: 986,
    price: 40000,
    slug: "elderly-care"
  },
];

const HomeServicesSection = () => {
  const [displayCount, setDisplayCount] = useState(4);
  const visibleServices = homeServices.slice(0, displayCount);
  
  const showMore = () => {
    setDisplayCount(homeServices.length);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-3">الخدمات المنزلية</h2>
            <p className="text-gray-600 max-w-2xl">
              رعاية طبية عالية الجودة في راحة منزلك. فريقنا من المتخصصين جاهز لتقديم مجموعة واسعة من الخدمات الطبية المنزلية.
            </p>
          </div>
          <Link to="/home-services" className="hidden md:flex items-center text-medical-primary hover:underline mt-2">
            <span className="ml-1">عرض جميع الخدمات المنزلية</span>
            <MoveRight className="h-5 w-5" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleServices.map((service) => (
            <Card key={service.id} className="border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-medical-light flex items-center justify-center mb-4">
                  <service.icon className="h-6 w-6 text-medical-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{service.name}</h3>
                <p className="text-gray-600 mb-4 text-sm h-12">{service.description}</p>
                <div className="flex items-center text-gray-500 mb-4 text-sm">
                  <span className="ml-2">تم طلبها</span>
                  <span className="font-bold text-gray-700">{service.requestCount.toLocaleString()}</span>
                  <span>مرة</span>
                </div>
                <Link to={`/home-services/${service.slug}`}>
                  <Button variant="outline" className="w-full border-medical-primary text-medical-primary hover:bg-medical-light">
                    عرض التفاصيل
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {displayCount < homeServices.length && (
          <div className="text-center mt-8">
            <Button 
              onClick={showMore}
              variant="outline" 
              className="border-medical-primary text-medical-primary hover:bg-medical-light"
            >
              عرض المزيد
            </Button>
          </div>
        )}
        
        <div className="mt-8 flex justify-center md:hidden">
          <Link to="/home-services">
            <Button className="bg-medical-primary hover:bg-medical-dark">
              <Home className="ml-2 h-4 w-4" />
              جميع الخدمات المنزلية
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeServicesSection;
