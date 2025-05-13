
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

// بيانات وهمية لمراكز التجميل
const beautyCenters = [
  {
    id: 601,
    name: "مركز الياسمين للتجميل",
    location: "بغداد، زيونة",
    image: "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?ixlib=rb-4.0.3",
    rating: 4.9,
    reviewCount: 156,
    services: ["تجميل الوجه", "تجميل الأنف", "شد البشرة"]
  },
  {
    id: 602,
    name: "مركز النخبة للعناية بالبشرة",
    location: "بغداد، المنصور",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3",
    rating: 4.7,
    reviewCount: 128,
    services: ["علاج البشرة", "حقن البوتوكس", "الفيلر"]
  },
  {
    id: 603,
    name: "عيادة الجمال الطبية",
    location: "البصرة، العشار",
    image: "https://images.unsplash.com/photo-1595867818082-083862f3d630?ixlib=rb-4.0.3",
    rating: 4.8,
    reviewCount: 102,
    services: ["تجميل الأسنان", "ابتسامة هوليوود", "تبييض"]
  },
  {
    id: 604,
    name: "مركز الوفاء لجراحة التجميل",
    location: "أربيل، عينكاوا",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3",
    rating: 4.8,
    reviewCount: 87,
    services: ["شفط الدهون", "تكبير الثدي", "شد البطن"]
  }
];

const BeautyCenters = () => {
  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">أفضل مراكز التجميل</h2>
        <Link to="/beauty-centers">
          <Button variant="ghost" className="text-medical-primary hover:text-medical-dark">
            عرض الكل
          </Button>
        </Link>
      </div>
      
      <Carousel className="w-full">
        <CarouselContent>
          {beautyCenters.map((center) => (
            <CarouselItem key={center.id} className="md:basis-1/3 lg:basis-1/4">
              <Link to={`/beauty-centers/${center.id}`}>
                <div className="medical-card h-full flex flex-col m-1 hover:shadow-md transition-shadow">
                  <div className="relative">
                    <img 
                      src={center.image} 
                      alt={center.name} 
                      className="w-full h-48 object-cover object-center"
                    />
                  </div>
                  
                  <div className="p-4 flex-grow flex flex-col">
                    <h3 className="font-semibold text-lg">{center.name}</h3>
                    
                    <div className="flex items-center my-2">
                      <MapPin className="h-4 w-4 text-gray-400 ml-1" />
                      <span className="text-gray-600 text-sm">{center.location}</span>
                    </div>
                    
                    <div className="flex items-center mb-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 ml-1" />
                      <span className="text-gray-700 font-medium">{center.rating}</span>
                      <span className="text-gray-500 text-sm mx-2">·</span>
                      <span className="text-gray-500 text-sm">{center.reviewCount} تقييم</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mt-2">
                      {center.services.map((service, idx) => (
                        <span 
                          key={idx}
                          className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                        >
                          {service}
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

export default BeautyCenters;
