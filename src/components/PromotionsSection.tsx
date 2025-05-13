
import { Link } from "react-router-dom";
import { Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// بيانات وهمية للعروض المتاحة
const promotions = [
  {
    id: 201,
    title: "خصم 30% على فحوصات القلب",
    doctor: "د. ياسر المالكي",
    doctorId: 5,
    hospital: "مستشفى بغداد التعليمي",
    hospitalId: 501,
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-4.0.3",
    discount: 30,
    originalPrice: 150,
    currentPrice: 105,
    validUntil: "2025-06-30"
  },
  {
    id: 202,
    title: "عرض خاص على تقويم الأسنان",
    doctor: "د. نور الحسيني",
    doctorId: 8,
    hospital: "مركز الابتسامة",
    hospitalId: null,
    image: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?ixlib=rb-4.0.3",
    discount: 25,
    originalPrice: 800,
    currentPrice: 600,
    validUntil: "2025-07-15"
  },
  {
    id: 203,
    title: "فحص شامل للعيون بسعر مخفض",
    doctor: "د. محمد العبيدي",
    doctorId: 12,
    hospital: "مركز النور للعيون",
    hospitalId: null,
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3",
    discount: 40,
    originalPrice: 120,
    currentPrice: 72,
    validUntil: "2025-06-15"
  },
  {
    id: 204,
    title: "حزمة فحوصات طبية شاملة",
    doctor: null,
    doctorId: null,
    hospital: "المركز الطبي التخصصي",
    hospitalId: 502,
    image: "https://images.unsplash.com/photo-1504439468489-c8920d796a29?ixlib=rb-4.0.3",
    discount: 35,
    originalPrice: 250,
    currentPrice: 162.5,
    validUntil: "2025-07-30"
  }
];

const PromotionsSection = () => {
  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">عروض وخصومات طبية</h2>
        <Link to="/promotions">
          <Button variant="ghost" className="text-medical-primary hover:text-medical-dark">
            جميع العروض
          </Button>
        </Link>
      </div>
      
      <Carousel className="w-full">
        <CarouselContent>
          {promotions.map((promo) => (
            <CarouselItem key={promo.id} className="md:basis-1/2 lg:basis-1/3">
              <div className="medical-card h-full flex flex-col m-1 overflow-hidden">
                <div className="relative">
                  <img 
                    src={promo.image} 
                    alt={promo.title} 
                    className="w-full h-48 object-cover object-center"
                  />
                  <div className="absolute top-0 right-0 bg-medical-primary text-white font-bold px-3 py-2 rounded-bl-lg">
                    خصم {promo.discount}%
                  </div>
                </div>
                
                <div className="p-4 flex-grow flex flex-col">
                  <h3 className="font-semibold text-lg mb-2">{promo.title}</h3>
                  
                  {promo.doctor && (
                    <p className="text-gray-700 text-sm">الطبيب: {promo.doctor}</p>
                  )}
                  
                  <p className="text-gray-700 text-sm">
                    المستشفى: {promo.hospital}
                  </p>
                  
                  <div className="flex items-center mt-3 mb-1">
                    <Clock className="h-4 w-4 text-gray-400 ml-1" />
                    <span className="text-gray-600 text-sm">
                      ساري حتى: {new Date(promo.validUntil).toLocaleDateString('ar-IQ')}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between mt-3">
                    <div>
                      <span className="text-gray-500 line-through text-sm">
                        ${promo.originalPrice}
                      </span>
                      <span className="text-medical-primary font-bold text-xl mr-2">
                        ${promo.currentPrice}
                      </span>
                    </div>
                    
                    <Link to={promo.doctorId ? `/doctors/${promo.doctorId}?promo=${promo.id}` : `/hospitals/${promo.hospitalId}?promo=${promo.id}`}>
                      <Button size="sm" className="bg-medical-primary hover:bg-medical-dark">
                        احجز الآن
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0" />
        <CarouselNext className="right-0" />
      </Carousel>
    </div>
  );
};

export default PromotionsSection;
