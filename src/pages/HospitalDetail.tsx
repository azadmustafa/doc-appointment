
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, MapPin, Phone, Clock, Check, CalendarDays, FileText, PanelTop } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DoctorCard from "@/components/DoctorCard";

// Mock hospital data
const hospitalData = {
  id: 1,
  name: "مستشفى مدينة الطب",
  images: [
    "https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1516549655169-df83a0774514?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
  ],
  description: "مستشفى مدينة الطب هو مركز طبي رائد في بغداد يقدم خدمات طبية متكاملة على مدار الساعة. يضم المستشفى نخبة من أفضل الأطباء والكوادر الطبية المؤهلة، ويوفر أحدث التقنيات والمعدات الطبية لتقديم رعاية صحية متميزة.\n\nتأسس المستشفى عام 1992 وتطور على مر السنين ليصبح من أهم المراكز الطبية في العراق. يلتزم المستشفى بتوفير بيئة آمنة ومريحة للمرضى وعائلاتهم.",
  location: "بغداد، الكرخ، شارع الرشيد",
  phoneNumbers: ["+964 771 234 5678", "+964 750 987 6543"],
  email: "info@medicinecity.iq",
  website: "www.medicinecity.iq",
  openingHours: "24 ساعة طوال أيام الأسبوع",
  rating: 4.7,
  reviewCount: 324,
  doctorsCount: 120,
  bedsCount: 250,
  specialties: [
    "قلب وأوعية دموية", "جراحة عامة", "أطفال", "نساء وتوليد", 
    "أعصاب", "عظام", "مسالك بولية", "أنف وأذن وحنجرة",
    "عيون", "جلدية", "باطنية", "أشعة تشخيصية"
  ],
  services: [
    "طوارئ 24 ساعة", "عمليات جراحية", "عناية مركزة",
    "مختبرات متطورة", "أشعة متقدمة", "صيدلية",
    "عيادات خارجية", "قسم داخلي"
  ],
  facilities: [
    "موقف سيارات", "كافتيريا", "مصلى",
    "واي فاي مجاني", "خدمة الغرف", "غرف انتظار مكيفة"
  ],
  acceptsInsurance: true,
  insuranceProviders: [
    "شركة التأمين الوطنية", "آسيا للتأمين", "الخليج للتأمين", 
    "المجموعة العربية للتأمين", "التأمين الصحي الحكومي"
  ],
  hasEmergency: true
};

// Mock doctors data
const doctors = [
  {
    id: 101,
    name: "د. علي الحسيني",
    specialty: "قلب وأوعية دموية",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3",
    rating: 4.9,
    reviewCount: 124,
    location: "مستشفى مدينة الطب، بغداد",
    price: 75000,
    experience: 15,
    insuranceAccepted: true
  },
  {
    id: 102,
    name: "د. سعاد العبيدي",
    specialty: "طب الأطفال",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3",
    rating: 4.7,
    reviewCount: 86,
    location: "مستشفى مدينة الطب، بغداد",
    price: 60000,
    experience: 12,
    insuranceAccepted: true
  },
  {
    id: 103,
    name: "د. محمد الكاظمي",
    specialty: "جراحة عامة",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3",
    rating: 4.8,
    reviewCount: 92,
    location: "مستشفى مدينة الطب، بغداد",
    price: 85000,
    experience: 20,
    insuranceAccepted: true
  },
  {
    id: 104,
    name: "د. زينب العلوي",
    specialty: "نساء وتوليد",
    image: "https://images.unsplash.com/photo-1571772996211-2f02974a304d?ixlib=rb-4.0.3",
    rating: 4.6,
    reviewCount: 78,
    location: "مستشفى مدينة الطب، بغداد",
    price: 70000,
    experience: 10,
    insuranceAccepted: true
  }
];

const HospitalDetail = () => {
  const { id } = useParams();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Image gallery */}
              <div className="md:w-1/2">
                <div className="relative h-80 md:h-96 w-full rounded-lg overflow-hidden mb-4">
                  <img 
                    src={hospitalData.images[activeImageIndex]} 
                    alt={hospitalData.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {hospitalData.images.map((img, index) => (
                    <button 
                      key={index}
                      className={`h-20 w-20 rounded-md overflow-hidden flex-shrink-0 border-2 ${activeImageIndex === index ? 'border-medical-primary' : 'border-transparent'}`}
                      onClick={() => setActiveImageIndex(index)}
                    >
                      <img 
                        src={img} 
                        alt={`${hospitalData.name} -${index + 1}`} 
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Basic info */}
              <div className="md:w-1/2">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-3xl font-bold mb-2 text-gray-700">{hospitalData.name}</h1>
                    <div className="flex items-center gap-1 mb-4">
                      <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                      <span className="font-semibold ml-1">{hospitalData.rating}</span>
                      <span className="text-gray-500 text-sm">({hospitalData.reviewCount} تقييم)</span>
                    </div>
                  </div>
                  
                  <div>
                    {hospitalData.hasEmergency && (
                      <Badge className="bg-red-100 text-red-700 hover:bg-red-200">
                        طوارئ 24 ساعة
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-col gap-3 mb-6">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-gray-400 ml-2 mt-0.5" />
                    <div>
                      <span className="text-gray-700">{hospitalData.location}</span>
                      <Button variant="link" className="text-medical-primary p-0 mr-2 h-auto">عرض على الخريطة</Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-gray-400 ml-2" />
                    <div className="flex flex-col">
                      {hospitalData.phoneNumbers.map((phone, index) => (
                        <a 
                          key={index}
                          href={`tel:${phone}`} 
                          className="text-gray-700 hover:text-medical-primary"
                        >
                          {phone}
                        </a>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-gray-400 ml-2" />
                    <span className="text-gray-700">{hospitalData.openingHours}</span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-semibold mb-2 text-gray-700">التخصصات:</h3>
                  <div className="flex flex-wrap gap-2">
                    {hospitalData.specialties.map((specialty, index) => (
                      <Badge key={index} variant="outline" className="bg-gray-50">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex flex-col items-center">
                    <div className="h-12 w-12 rounded-full bg-medical-light flex items-center justify-center mb-1">
                      <User className="h-6 w-6 text-medical-primary" />
                    </div>
                    <span className="text-sm text-gray-500">الأطباء</span>
                    <span className="font-semibold text-gray-700">{hospitalData.doctorsCount}+</span>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="h-12 w-12 rounded-full bg-medical-light flex items-center justify-center mb-1">
                      <PanelTop className="h-6 w-6 text-medical-primary" />
                    </div>
                    <span className="text-sm text-gray-500">الأسرّة</span>
                    <span className="font-semibold text-gray-700">{hospitalData.bedsCount}</span>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="h-12 w-12 rounded-full bg-medical-light flex items-center justify-center mb-1">
                      <FileText className="h-6 w-6 text-medical-primary" />
                    </div>
                    <span className="text-sm text-gray-500">التقييمات</span>
                    <span className="font-semibold text-gray-700">{hospitalData.reviewCount}</span>
                  </div>
                </div>
                
                <Button className="w-full bg-medical-primary hover:bg-medical-dark">
                  <CalendarDays className="ml-2 h-5 w-5" />
                  حجز موعد
                </Button>
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="about" className="mt-8">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="about">نبذة عن المستشفى</TabsTrigger>
              <TabsTrigger value="doctors">الأطباء</TabsTrigger>
              <TabsTrigger value="services">الخدمات والمرافق</TabsTrigger>
              <TabsTrigger value="insurance">التأمين</TabsTrigger>
            </TabsList>
            
            <TabsContent value="about" className="mt-4">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-bold mb-4 text-gray-700">نبذة عن المستشفى</h2>
                <div className="text-gray-600 whitespace-pre-line">
                  {hospitalData.description}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="doctors" className="mt-4">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-700">الأطباء ({hospitalData.doctorsCount})</h2>
                  <Button variant="outline" className="border-medical-primary text-medical-primary hover:bg-medical-light">
                    عرض جميع الأطباء
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {doctors.map(doctor => (
                    <DoctorCard 
                      key={doctor.id}
                      id={doctor.id}
                      name={doctor.name}
                      specialty={doctor.specialty}
                      image={doctor.image}
                      rating={doctor.rating}
                      reviewCount={doctor.reviewCount}
                      location={doctor.location}
                      price={doctor.price}
                      experience={doctor.experience}
                      insuranceAccepted={doctor.insuranceAccepted}
                    />
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="services" className="mt-4">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-bold mb-6 text-gray-700">الخدمات والمرافق</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-semibold mb-4 text-gray-700">الخدمات الطبية</h3>
                    <ul className="space-y-3">
                      {hospitalData.services.map((service, index) => (
                        <li key={index} className="flex items-center">
                          <Check className="h-5 w-5 text-green-500 ml-2" />
                          <span className="text-gray-600">{service}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-4 text-gray-700">المرافق</h3>
                    <ul className="space-y-3">
                      {hospitalData.facilities.map((facility, index) => (
                        <li key={index} className="flex items-center">
                          <Check className="h-5 w-5 text-green-500 ml-2" />
                          <span className="text-gray-600">{facility}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="insurance" className="mt-4">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-bold mb-6 text-gray-700">التأمين الصحي</h2>
                
                {hospitalData.acceptsInsurance ? (
                  <>
                    <div className="flex items-center mb-4">
                      <Check className="h-6 w-6 text-green-500 ml-2" />
                      <span className="text-gray-700 font-medium">يقبل المستشفى التأمين الصحي</span>
                    </div>
                    
                    <h3 className="font-semibold mb-3 text-gray-700">شركات التأمين المعتمدة:</h3>
                    <ul className="space-y-2">
                      {hospitalData.insuranceProviders.map((provider, index) => (
                        <li key={index} className="flex items-center">
                          <Check className="h-5 w-5 text-green-500 ml-2" />
                          <span className="text-gray-600">{provider}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="mt-6 bg-blue-50 p-4 rounded-md">
                      <p className="text-blue-700 text-sm">
                        للاستفسار عن تفاصيل التغطية التأمينية، يرجى الاتصال بالمستشفى أو شركة التأمين الخاصة بك.
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="text-gray-600">
                    عذراً، هذا المستشفى لا يقبل التأمين الصحي حالياً.
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HospitalDetail;
