
import { useState } from "react";
import { Link } from "react-router-dom";
import { Star, MapPin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// بيانات وهمية لمراكز التجميل
const beautyCenters = [
  {
    id: 1,
    name: "مركز الجمال الحديث",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    rating: 4.8,
    reviewCount: 156,
    location: "بغداد، المنصور",
    services: ["تجميل الوجه", "العناية بالبشرة", "تقنيات التنحيف"],
    price: "متوسطة"
  },
  {
    id: 2,
    name: "روز كلينك للتجميل",
    image: "https://images.unsplash.com/photo-1595475884562-073c30d45670?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    rating: 4.9,
    reviewCount: 203,
    location: "بغداد، زيونة",
    services: ["جراحات التجميل", "فيلر", "بوتكس", "نحت الجسم"],
    price: "مرتفعة"
  },
  {
    id: 3,
    name: "دار الجمال",
    image: "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    rating: 4.7,
    reviewCount: 118,
    location: "البصرة، العشار",
    services: ["ليزر", "تجميل الشعر", "العناية المتكاملة"],
    price: "متوسطة"
  },
  {
    id: 4,
    name: "سكاي بيوتي سنتر",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    rating: 4.6,
    reviewCount: 92,
    location: "أربيل، عينكاوا",
    services: ["الليزر الكربوني", "تقشير البشرة", "حقن البلازما"],
    price: "مرتفعة"
  }
];

const BeautyCentersSection = () => {
  return (
    <div className="py-10 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-700">مراكز التجميل المميزة</h2>
          
          <Link to="/beauty-centers">
            <Button variant="outline" className="border-medical-primary text-medical-primary hover:bg-medical-light">
              عرض المزيد
              <ExternalLink className="w-4 h-4 mr-1" />
            </Button>
          </Link>
        </div>
        
        <Carousel className="w-full">
          <CarouselContent>
            {beautyCenters.map((center) => (
              <CarouselItem key={center.id} className="md:basis-1/3 lg:basis-1/4">
                <div className="medical-card h-full flex flex-col m-1 bg-white shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="relative">
                    <img 
                      src={center.image} 
                      alt={center.name} 
                      className="w-full h-40 object-cover object-center"
                    />
                    <Badge className="absolute top-2 right-2 bg-yellow-500">
                      <Star className="h-3 w-3 fill-white text-white ml-1" />
                      <span>{center.rating}</span>
                    </Badge>
                  </div>
                  
                  <div className="p-4 flex-grow flex flex-col">
                    <h3 className="font-semibold text-lg text-gray-700">{center.name}</h3>
                    
                    <div className="flex items-center mt-1 mb-2">
                      <MapPin className="h-4 w-4 text-gray-400 ml-1" />
                      <span className="text-sm text-gray-600">{center.location}</span>
                    </div>
                    
                    <div className="mb-3">
                      <p className="text-xs font-medium mb-1 text-gray-500">الخدمات:</p>
                      <div className="flex flex-wrap gap-1">
                        {center.services.slice(0, 2).map((service, index) => (
                          <span 
                            key={index} 
                            className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                          >
                            {service}
                          </span>
                        ))}
                        {center.services.length > 2 && (
                          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                            +{center.services.length - 2}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-auto">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-gray-500 text-sm">مستوى الأسعار</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          center.price === "مرتفعة" 
                            ? "bg-red-50 text-red-600" 
                            : center.price === "متوسطة" 
                              ? "bg-yellow-50 text-yellow-600" 
                              : "bg-green-50 text-green-600"
                        }`}>
                          {center.price}
                        </span>
                      </div>
                      
                      <Link to={`/beauty-centers/${center.id}`}>
                        <Button className="w-full bg-medical-primary hover:bg-medical-dark">
                          عرض التفاصيل
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
    </div>
  );
};

export default BeautyCentersSection;
