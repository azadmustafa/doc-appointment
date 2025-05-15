
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Building, Star, Users, CheckCircle } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

// Medical centers data
const medicalCenters = [
  {
    id: 1,
    name: "مركز النور الطبي",
    visits: 1243,
    rating: 4.8,
    services: ["طب عام", "أشعة", "تحاليل طبية", "طب أسنان"],
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 2,
    name: "المركز التخصصي للعيون",
    visits: 987,
    rating: 4.9,
    services: ["طب عيون", "جراحة عيون", "فحص نظر", "تجميل عيون"],
    image: "https://images.unsplash.com/photo-1616879672490-c6d3a23d926f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 3,
    name: "مركز القلب التخصصي",
    visits: 1105,
    rating: 4.7,
    services: ["قلب وأوعية دموية", "قسطرة", "تخطيط قلب", "موجات صوتية"],
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 4,
    name: "مركز الشفاء الطبي",
    visits: 875,
    rating: 4.6,
    services: ["طب عام", "نسائية", "أطفال", "باطنية"],
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 5,
    name: "مركز الأمل للعلاج الطبيعي",
    visits: 743,
    rating: 4.8,
    services: ["علاج طبيعي", "تأهيل", "علاج إصابات", "كهرباء عضلات"],
    image: "https://images.unsplash.com/photo-1629909615184-74f495363b67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 6,
    name: "مركز السلام لطب الأسنان",
    visits: 892,
    rating: 4.9,
    services: ["تركيبات", "تقويم", "زراعة", "تجميل أسنان"],
    image: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
  },
];

const MedicalCentersSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">المراكز الطبية الأكثر زيارة</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            تعرف على أفضل المراكز الطبية استنادًا إلى زيارات وتقييمات المرضى
          </p>
        </div>
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full mx-auto"
        >
          <CarouselContent className="-ml-4">
            {medicalCenters.map((center) => (
              <CarouselItem key={center.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <Link to={`/medical-centers/${center.id}`}>
                  <Card className="hover:shadow-lg transition-shadow duration-200 h-full">
                    <CardContent className="p-0">
                      <div className="aspect-video w-full overflow-hidden">
                        <img 
                          src={center.image} 
                          alt={center.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-lg mb-2">{center.name}</h3>
                        <div className="flex items-center mb-2">
                          <Users className="h-4 w-4 ml-1 text-gray-500" />
                          <span className="text-sm text-gray-600">{center.visits.toLocaleString('ar-IQ')} زيارة</span>
                          <div className="flex items-center mr-3">
                            <Star className="h-4 w-4 text-yellow-500 ml-1" />
                            <span className="text-sm">{center.rating}</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {center.services.map((service, idx) => (
                            <span 
                              key={idx} 
                              className="text-xs px-2 py-1 bg-medical-light text-medical-primary rounded-full"
                            >
                              {service}
                            </span>
                          ))}
                        </div>
                        <Button variant="outline" className="w-full border-medical-primary text-medical-primary hover:bg-medical-light">
                          عرض التفاصيل
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:flex justify-end gap-2 mt-4">
            <CarouselPrevious className="static translate-y-0 ml-auto" />
            <CarouselNext className="static translate-y-0" />
          </div>
        </Carousel>
        
        <div className="text-center mt-10">
          <Link to="/medical-centers">
            <Button variant="outline" className="border-medical-primary text-medical-primary hover:bg-medical-light">
              عرض جميع المراكز الطبية
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MedicalCentersSection;
