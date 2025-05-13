
import { Link } from "react-router-dom";
import { MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// بيانات وهمية للمشافي المتميزة
const topHospitals = [
  {
    id: 501,
    name: "مستشفى بغداد التعليمي",
    location: "بغداد، المنصور",
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3",
    rating: 4.8,
    reviewCount: 234,
    specialties: ["جراحة عامة", "قلب", "أعصاب"]
  },
  {
    id: 502,
    name: "المركز الطبي التخصصي",
    location: "بغداد، الكرادة",
    image: "https://images.unsplash.com/photo-1626315869431-ec01ccdd9d5c?ixlib=rb-4.0.3",
    rating: 4.7,
    reviewCount: 186,
    specialties: ["عيون", "أطفال", "نساء وتوليد"]
  },
  {
    id: 503,
    name: "مستشفى البصرة العام",
    location: "البصرة، المركز",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?ixlib=rb-4.0.3",
    rating: 4.5,
    reviewCount: 157,
    specialties: ["عظام", "قلب", "أمراض باطنية"]
  },
  {
    id: 504,
    name: "مركز الموصل الطبي",
    location: "الموصل، الجديدة",
    image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?ixlib=rb-4.0.3",
    rating: 4.6,
    reviewCount: 143,
    specialties: ["جراحة تجميلية", "أسنان", "جلدية"]
  },
  {
    id: 505,
    name: "مستشفى أربيل التخصصي",
    location: "أربيل، المركز",
    image: "https://images.unsplash.com/photo-1587351021759-3e566b3db4f1?ixlib=rb-4.0.3",
    rating: 4.9,
    reviewCount: 210,
    specialties: ["قلب", "أعصاب", "أورام"]
  }
];

const TopHospitals = () => {
  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">المشافي المتميزة</h2>
        <Link to="/hospitals">
          <Button variant="ghost" className="text-medical-primary hover:text-medical-dark">
            عرض الكل
          </Button>
        </Link>
      </div>
      
      <Carousel className="w-full">
        <CarouselContent>
          {topHospitals.map((hospital) => (
            <CarouselItem key={hospital.id} className="md:basis-1/3">
              <Link to={`/hospitals/${hospital.id}`}>
                <div className="medical-card h-full flex flex-col m-1 hover:shadow-md transition-shadow">
                  <div className="relative">
                    <img 
                      src={hospital.image} 
                      alt={hospital.name} 
                      className="w-full h-48 object-cover object-center"
                    />
                  </div>
                  
                  <div className="p-4 flex-grow flex flex-col">
                    <h3 className="font-semibold text-lg">{hospital.name}</h3>
                    
                    <div className="flex items-center my-2">
                      <MapPin className="h-4 w-4 text-gray-400 ml-1" />
                      <span className="text-gray-600 text-sm">{hospital.location}</span>
                    </div>
                    
                    <div className="flex items-center mb-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 ml-1" />
                      <span className="text-gray-700 font-medium">{hospital.rating}</span>
                      <span className="text-gray-500 text-sm mx-2">·</span>
                      <span className="text-gray-500 text-sm">{hospital.reviewCount} تقييم</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mt-2">
                      {hospital.specialties.map((specialty, idx) => (
                        <span 
                          key={idx}
                          className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0" />
        <CarouselNext className="right-0" />
      </Carousel>
    </div>
  );
};

export default TopHospitals;
