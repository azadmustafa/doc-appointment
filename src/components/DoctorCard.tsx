
import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface DoctorCardProps {
  id: number;
  name: string;
  specialty: string;
  image: string;
  rating: number;
  reviewCount: number;
  location: string;
  price: number;
}

const DoctorCard = ({ 
  id, 
  name, 
  specialty, 
  image, 
  rating, 
  reviewCount, 
  location, 
  price 
}: DoctorCardProps) => {
  return (
    <div className="medical-card h-full flex flex-col">
      <div className="relative">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-52 object-cover object-center"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white p-4">
          <h3 className="font-semibold text-lg">{name}</h3>
          <p className="text-sm text-gray-200">{specialty}</p>
        </div>
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
            <span className="text-gray-700 font-medium">{rating}</span>
          </div>
          <span className="text-gray-500 text-sm mx-2">·</span>
          <span className="text-gray-500 text-sm">{reviewCount} تقييم</span>
        </div>
        
        <p className="text-gray-500 text-sm mb-3">
          <span className="font-medium text-gray-700">الموقع:</span> {location}
        </p>
        
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
