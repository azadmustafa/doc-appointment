
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, MapPin, Phone, Clock, Check, Calendar, FileText, Image, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Mock beauty center data
const centerData = {
  id: 2,
  name: "روز كلينك للتجميل",
  images: [
    "https://images.unsplash.com/photo-1595475884562-073c30d45670?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1607008829749-c8051e716b63?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1613987549117-13c4d3002d9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1598970434795-0c54fe7c0648?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
  ],
  description: "مركز روز كلينك للتجميل هو مركز متخصص بخدمات التجميل والعناية بالبشرة في بغداد. يقدم المركز مجموعة متكاملة من العلاجات التجميلية الطبية بأحدث التقنيات وبإشراف أطباء متخصصين.\n\nتأسس المركز عام 2015 وأصبح واحداً من أهم مراكز التجميل في العراق. يتميز بتقديم خدمات عالية الجودة تلبي معايير السلامة العالمية وتستخدم أحدث التقنيات.",
  location: "بغداد، زيونة، شارع الربيعي",
  phoneNumbers: ["+964 771 555 7777", "+964 750 888 6666"],
  email: "info@roseclinic.iq",
  website: "www.roseclinic.iq",
  openingHours: "10:00 ص - 8:00 م (طوال أيام الأسبوع)",
  rating: 4.9,
  reviewCount: 203,
  staffCount: 20,
  foundedYear: 2015,
  priceRange: "مرتفعة",
  services: [
    {
      category: "العناية بالبشرة",
      treatments: [
        "تنظيف البشرة العميق",
        "تقشير كيميائي",
        "تقشير بالكريستال",
        "تقنية الميكرونيدلينغ",
        "جلسات التقشير بالليزر",
        "جلسات تنظيف البشرة بالاوكسجين"
      ]
    },
    {
      category: "الحقن التجميلي",
      treatments: [
        "حقن البوتوكس",
        "حقن الفيلر",
        "حقن البلازما",
        "حقن الميزوثيرابي",
        "خيوط الشد"
      ]
    },
    {
      category: "تقنيات الليزر",
      treatments: [
        "إزالة الشعر",
        "إزالة الوشم",
        "علاج التصبغات",
        "شد البشرة بالليزر",
        "تصغير المسام"
      ]
    },
    {
      category: "جراحات التجميل",
      treatments: [
        "تجميل الأنف",
        "شد الوجه",
        "تجميل الجفون",
        "نحت الجسم",
        "شفط الدهون"
      ]
    }
  ],
  specialists: [
    {
      id: 201,
      name: "د. سارة العزاوي",
      position: "استشارية الجلدية والتجميل",
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3",
      specialties: ["الحقن التجميلي", "تقنيات الليزر"]
    },
    {
      id: 202,
      name: "د. علي الخالدي",
      position: "أخصائي جراحة التجميل",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3",
      specialties: ["جراحات التجميل", "نحت الجسم"]
    },
    {
      id: 203,
      name: "رنا محمد",
      position: "أخصائية العناية بالبشرة",
      image: "https://images.unsplash.com/photo-1571772996211-2f02974a304d?ixlib=rb-4.0.3",
      specialties: ["العناية بالبشرة", "التقشير الكيميائي"]
    }
  ],
  galleries: [
    {
      category: "العيادة",
      images: [
        "https://images.unsplash.com/photo-1629776334948-c97c5fac7d22?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1613987549117-13c4d3002d9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1598970434795-0c54fe7c0648?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
      ]
    },
    {
      category: "نتائج العلاجات",
      images: [
        "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1598970434795-0c54fe7c0648?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1630048421292-401b6f7cac35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
      ]
    }
  ],
  promotions: [
    {
      id: 301,
      title: "خصم 35% على تنظيف البشرة والتقشير",
      description: "عرض لفترة محدودة يشمل جلسة تنظيف عميقة وتقشير كيميائي خفيف",
      discount: 35,
      expiryDate: "2023-11-15"
    },
    {
      id: 302,
      title: "باقة البشرة المشرقة",
      description: "3 جلسات ميزوثيرابي + 1 جلسة بلازما مجاناً",
      discount: 25,
      expiryDate: "2023-12-01"
    }
  ]
};

const BeautyCenterDetail = () => {
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
                    src={centerData.images[activeImageIndex]} 
                    alt={centerData.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {centerData.images.map((img, index) => (
                    <button 
                      key={index}
                      className={`h-20 w-20 rounded-md overflow-hidden flex-shrink-0 border-2 ${activeImageIndex === index ? 'border-medical-primary' : 'border-transparent'}`}
                      onClick={() => setActiveImageIndex(index)}
                    >
                      <img 
                        src={img} 
                        alt={`${centerData.name} - ${index + 1}`} 
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
                    <h1 className="text-3xl font-bold mb-2 text-gray-700">{centerData.name}</h1>
                    <div className="flex items-center gap-1 mb-4">
                      <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                      <span className="font-semibold ml-1">{centerData.rating}</span>
                      <span className="text-gray-500 text-sm">({centerData.reviewCount} تقييم)</span>
                    </div>
                  </div>
                  
                  <div>
                    <Badge className={`
                      ${centerData.priceRange === "مرتفعة" 
                        ? "bg-red-50 text-red-600" 
                        : centerData.priceRange === "متوسطة" 
                          ? "bg-yellow-50 text-yellow-600" 
                          : "bg-green-50 text-green-600"
                      }
                    `}>
                      مستوى الأسعار: {centerData.priceRange}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex flex-col gap-3 mb-6">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-gray-400 ml-2 mt-0.5" />
                    <div>
                      <span className="text-gray-700">{centerData.location}</span>
                      <Button variant="link" className="text-medical-primary p-0 mr-2 h-auto">عرض على الخريطة</Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-gray-400 ml-2" />
                    <div className="flex flex-col">
                      {centerData.phoneNumbers.map((phone, index) => (
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
                    <span className="text-gray-700">{centerData.openingHours}</span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-semibold mb-2 text-gray-700">الخدمات الرئيسية:</h3>
                  <div className="flex flex-wrap gap-2">
                    {centerData.services.map((service, index) => (
                      <Badge key={index} variant="outline" className="bg-gray-50">
                        {service.category}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {centerData.promotions.length > 0 && (
                  <div className="mb-6 bg-medical-light p-4 rounded-lg">
                    <h3 className="font-semibold mb-3 text-gray-700">العروض الحالية:</h3>
                    <div className="space-y-2">
                      {centerData.promotions.map((promo, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <div>
                            <p className="font-medium text-gray-700">{promo.title}</p>
                            <p className="text-sm text-gray-500">ينتهي في {new Date(promo.expiryDate).toLocaleDateString("ar-IQ")}</p>
                          </div>
                          <Badge className="bg-red-500">
                            {promo.discount}% خصم
                          </Badge>
                        </div>
                      ))}
                    </div>
                    
                    <Button variant="link" className="text-medical-primary p-0 mt-2">
                      عرض كل العروض
                    </Button>
                  </div>
                )}
                
                <Button className="w-full bg-medical-primary hover:bg-medical-dark">
                  <Calendar className="ml-2 h-5 w-5" />
                  حجز موعد
                </Button>
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="about" className="mt-8">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="about">عن المركز</TabsTrigger>
              <TabsTrigger value="services">الخدمات والعلاجات</TabsTrigger>
              <TabsTrigger value="team">فريق العمل</TabsTrigger>
              <TabsTrigger value="gallery">معرض الصور</TabsTrigger>
            </TabsList>
            
            <TabsContent value="about" className="mt-4">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-bold mb-4 text-gray-700">نبذة عن المركز</h2>
                <div className="text-gray-600 whitespace-pre-line">
                  {centerData.description}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h3 className="font-semibold mb-3 text-gray-700">معلومات عامة:</h3>
                    <ul className="space-y-2">
                      <li className="flex justify-between">
                        <span className="text-gray-600">تأسس عام:</span>
                        <span className="font-medium text-gray-700">{centerData.foundedYear}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-600">عدد الموظفين:</span>
                        <span className="font-medium text-gray-700">{centerData.staffCount}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-600">الموقع الإلكتروني:</span>
                        <a href={`https://${centerData.website}`} target="_blank" rel="noopener noreferrer" className="text-medical-primary hover:underline">
                          {centerData.website}
                        </a>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-600">البريد الإلكتروني:</span>
                        <a href={`mailto:${centerData.email}`} className="text-medical-primary hover:underline">
                          {centerData.email}
                        </a>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h3 className="font-semibold mb-3 text-gray-700">مميزات المركز:</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 ml-2" />
                        <span className="text-gray-600">أحدث التقنيات العالمية</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 ml-2" />
                        <span className="text-gray-600">طاقم طبي متخصص ومؤهل</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 ml-2" />
                        <span className="text-gray-600">منتجات وأجهزة معتمدة عالمياً</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 ml-2" />
                        <span className="text-gray-600">بيئة معقمة وآمنة</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 ml-2" />
                        <span className="text-gray-600">استشارات مجانية</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="services" className="mt-4">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-bold mb-6 text-gray-700">الخدمات والعلاجات</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {centerData.services.map((service, index) => (
                    <div key={index} className="border rounded-md p-4">
                      <h3 className="font-semibold text-lg mb-4 text-gray-700">{service.category}</h3>
                      <ul className="space-y-2">
                        {service.treatments.map((treatment, idx) => (
                          <li key={idx} className="flex items-center">
                            <div className="h-2 w-2 rounded-full bg-medical-primary ml-2"></div>
                            <span className="text-gray-600">{treatment}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 bg-medical-light p-4 rounded-md">
                  <p className="text-gray-700">
                    للاستفسار عن تفاصيل العلاجات والأسعار، يرجى الاتصال بالمركز أو حجز موعد للاستشارة.
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="team" className="mt-4">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-bold mb-6 text-gray-700">الفريق الطبي</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {centerData.specialists.map((specialist, index) => (
                    <div key={index} className="text-center">
                      <div className="relative mb-4">
                        <div className="w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-medical-light">
                          <img 
                            src={specialist.image} 
                            alt={specialist.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      
                      <h3 className="font-semibold text-lg mb-1 text-gray-700">{specialist.name}</h3>
                      <p className="text-medical-primary mb-2">{specialist.position}</p>
                      
                      <div className="flex flex-wrap justify-center gap-2 mb-4">
                        {specialist.specialties.map((specialty, idx) => (
                          <Badge key={idx} variant="outline" className="bg-gray-50">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                      
                      <Button variant="outline" className="border-medical-primary text-medical-primary hover:bg-medical-light">
                        عرض الملف الكامل
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="gallery" className="mt-4">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-bold mb-6 text-gray-700">معرض الصور</h2>
                
                <Tabs defaultValue={centerData.galleries[0].category} className="mb-6">
                  <TabsList>
                    {centerData.galleries.map((gallery, index) => (
                      <TabsTrigger key={index} value={gallery.category}>
                        {gallery.category}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  
                  {centerData.galleries.map((gallery, index) => (
                    <TabsContent key={index} value={gallery.category} className="mt-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {gallery.images.map((image, idx) => (
                          <div key={idx} className="aspect-square rounded-md overflow-hidden shadow-sm">
                            <img 
                              src={image} 
                              alt={`${gallery.category} - ${idx + 1}`} 
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </div>
            </TabsContent>
          </Tabs>
          
          {/* Related promotions */}
          {centerData.promotions.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6 text-gray-700">عروض {centerData.name} الحالية</h2>
              
              <Carousel className="w-full">
                <CarouselContent>
                  {centerData.promotions.map((promo, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow m-1 h-full flex flex-col">
                        <div className="relative">
                          <img 
                            src={centerData.images[index % centerData.images.length]} 
                            alt={promo.title} 
                            className="w-full h-48 object-cover"
                          />
                          <Badge className="absolute top-2 right-2 bg-red-500">
                            {promo.discount}% خصم
                          </Badge>
                        </div>
                        
                        <div className="p-4 flex flex-col flex-grow">
                          <div className="mb-1">
                            <Badge variant="outline" className="bg-gray-50">
                              <Tag className="h-3 w-3 ml-1" />
                              العناية بالبشرة
                            </Badge>
                          </div>
                          
                          <h3 className="font-semibold text-lg mb-2 text-gray-700">{promo.title}</h3>
                          
                          <p className="text-gray-500 text-sm mb-4 flex-grow">{promo.description}</p>
                          
                          <div className="flex items-center text-sm text-gray-600 mb-4">
                            <Calendar className="h-4 w-4 ml-1" />
                            <span>ينتهي في {new Date(promo.expiryDate).toLocaleDateString("ar-IQ")}</span>
                          </div>
                          
                          <Link to={`/promotions/${promo.id}`}>
                            <Button className="w-full bg-medical-primary hover:bg-medical-dark">
                              عرض التفاصيل
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-0" />
                <CarouselNext className="right-0" />
              </Carousel>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BeautyCenterDetail;
