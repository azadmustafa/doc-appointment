
import { useState } from "react";
import { Link } from "react-router-dom";
import { Video, Phone, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// بيانات وهمية للأطباء المتاحين للاستشارات
const onlineDoctors = [
  {
    id: 101,
    name: "د. علي الحسيني",
    specialty: "طب الباطنة",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3",
    rating: 4.9,
    reviewCount: 124,
    isVideoEnabled: true,
    price: 75,
    status: "متاح الآن",
    homeVisit: false
  },
  {
    id: 102,
    name: "د. سعاد العبيدي",
    specialty: "طب الأطفال",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3",
    rating: 4.7,
    reviewCount: 86,
    isVideoEnabled: true,
    price: 60,
    status: "متاح الآن",
    homeVisit: true
  },
  {
    id: 103,
    name: "د. محمد الكاظمي",
    specialty: "أمراض جلدية",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3",
    rating: 4.8,
    reviewCount: 92,
    isVideoEnabled: false,
    price: 50,
    status: "متاح الآن",
    homeVisit: false
  },
  {
    id: 104,
    name: "د. زينب العلوي",
    specialty: "طب نفسي",
    image: "https://images.unsplash.com/photo-1571772996211-2f02974a304d?ixlib=rb-4.0.3",
    rating: 4.6,
    reviewCount: 78,
    isVideoEnabled: true,
    price: 85,
    status: "متاح الآن",
    homeVisit: true
  }
];

const OnlineDoctors = () => {
  const [consultType, setConsultType] = useState<'all' | 'video' | 'phone'>('all');
  
  const filteredDoctors = consultType === 'all' 
    ? onlineDoctors
    : consultType === 'video'
      ? onlineDoctors.filter(doc => doc.isVideoEnabled)
      : onlineDoctors.filter(doc => !doc.isVideoEnabled);

  return (
    <div className="py-10 bg-medical-light">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-700">الاستشارات الطبية المباشرة</h2>
          
          <div className="flex flex-wrap items-center gap-2">
            <Button 
              variant={consultType === 'all' ? "default" : "outline"} 
              size="sm" 
              onClick={() => setConsultType('all')}
              className={consultType === 'all' ? 'bg-medical-primary' : 'border-medical-primary text-medical-primary'}
            >
              الكل
            </Button>
            <Link to="/doctors?consultation=video">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center border-medical-primary text-medical-primary"
              >
                <Video className="w-4 h-4 ml-1" />
                استشارة فيديو
              </Button>
            </Link>
            <Link to="/doctors?consultation=phone">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center border-medical-primary text-medical-primary"
              >
                <Phone className="w-4 h-4 ml-1" />
                استشارة صوتية
              </Button>
            </Link>
            <Link to="/doctors?homeVisit=true">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center border-medical-primary text-medical-primary"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 ml-1">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                زيارة منزلية
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredDoctors.map((doctor) => (
            <div key={doctor.id} className="medical-card h-full flex flex-col bg-white shadow-md hover:shadow-lg transition-all duration-300">
              <div className="relative">
                <img 
                  src={doctor.image} 
                  alt={doctor.name} 
                  className="w-full h-40 object-cover object-center"
                />
                <Badge className="absolute top-2 right-2 bg-green-500">
                  {doctor.status}
                </Badge>
                {doctor.isVideoEnabled ? (
                  <Badge variant="outline" className="absolute top-2 left-2 bg-white">
                    <Video className="w-3 h-3 ml-1" />
                    فيديو
                  </Badge>
                ) : (
                  <Badge variant="outline" className="absolute top-2 left-2 bg-white">
                    <Phone className="w-3 h-3 ml-1" />
                    صوت
                  </Badge>
                )}
              </div>
              
              <div className="p-4 flex-grow flex flex-col">
                <h3 className="font-semibold text-lg text-gray-700">{doctor.name}</h3>
                <p className="text-sm text-medical-primary">{doctor.specialty}</p>
                
                <div className="flex items-center my-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 ml-1" />
                  <span className="text-gray-700 font-medium">{doctor.rating}</span>
                  <span className="text-gray-500 text-sm mx-2">·</span>
                  <span className="text-gray-500 text-sm">{doctor.reviewCount} تقييم</span>
                </div>
                
                <div className="mt-auto">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-gray-500 text-sm">سعر الاستشارة</span>
                    <span className="text-medical-primary font-semibold">{doctor.price} دولار</span>
                  </div>
                  
                  <Link to={`/doctors/${doctor.id}?consultation=true`}>
                    <Button className="w-full bg-medical-primary hover:bg-medical-dark">
                      استشارة الآن
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OnlineDoctors;
