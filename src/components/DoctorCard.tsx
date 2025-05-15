
import { Star, MapPin, Clock, Shield, ThumbsUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface DoctorCardProps {
  id: number;
  name: string;
  specialty: string;
  image: string;
  rating: number;
  reviewCount: number;
  location: string;
  price: number;
  availability?: string;
  insuranceAccepted?: boolean;
  experience?: number;
}

const DoctorCard = ({ 
  id, 
  name, 
  specialty, 
  image, 
  rating, 
  reviewCount, 
  location, 
  price,
  availability,
  insuranceAccepted,
  experience
}: DoctorCardProps) => {
  return (
    <div className="medical-card h-full flex flex-col border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="relative">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-52 object-cover object-center"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <Badge className="bg-yellow-500 hover:bg-yellow-600">
            <Star className="h-3 w-3 fill-white text-white ml-1" />
            <span>{rating}</span>
          </Badge>
          
          {availability && (
            <Badge className="bg-green-500 hover:bg-green-600">
              <Clock className="h-3 w-3 text-white ml-1" />
              <span>{availability}</span>
            </Badge>
          )}
          
          {insuranceAccepted && (
            <Badge className="bg-blue-500 hover:bg-blue-600">
              <Shield className="h-3 w-3 text-white ml-1" />
              <span>يقبل التأمين</span>
            </Badge>
          )}
        </div>
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="font-semibold text-lg text-gray-700">{name}</h3>
        <p className="text-sm text-medical-primary mb-2">{specialty}</p>
        
        <div className="flex flex-col gap-2 mb-4">
          <div className="flex items-center text-gray-600 text-sm">
            <MapPin className="h-4 w-4 ml-1 text-gray-400" />
            <span>{location}</span>
          </div>
          
          {experience && (
            <div className="flex items-center text-gray-600 text-sm">
              <ThumbsUp className="h-4 w-4 ml-1 text-gray-400" />
              <span>خبرة {experience} سنة</span>
            </div>
          )}
          
          <div className="flex items-center text-gray-600 text-sm">
            <Star className="h-4 w-4 ml-1 text-gray-400" />
            <span>{reviewCount} تقييم</span>
          </div>
        </div>
        
        <div className="mt-auto">
          <div className="flex justify-between items-center mb-3">
            <span className="text-gray-500 text-sm">سعر الكشف</span>
            <span className="text-medical-primary font-semibold">{price} ريال</span>
          </div>
          
          <Link to={`/doctors/${id}`}>
            <Button className="w-full bg-medical-primary hover:bg-medical-dark">
              عرض التفاصيل وحجز موعد
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
