
import React, { useState } from 'react';
import { MapPin, Navigation, Clock, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DoctorCard from '@/components/DoctorCard';

const GeoSearch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  // Mock doctors data for the demo
  const nearbyDoctors = [
    {
      id: 1,
      name: "د. أحمد الشمري",
      specialty: "قلب وأوعية دموية",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      rating: 4.9,
      reviewCount: 124,
      location: "بغداد، الكرخ",
      price: 35000,
      distance: 1.2,
      estimatedTime: "10 دقائق"
    },
    {
      id: 7,
      name: "د. حسين الجبوري",
      specialty: "طب العيون",
      image: "https://images.unsplash.com/photo-1618498082410-b4aa22193b38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      rating: 4.9,
      reviewCount: 103,
      location: "بغداد، الكرخ",
      price: 38000,
      distance: 1.5,
      estimatedTime: "12 دقائق"
    },
    {
      id: 2,
      name: "د. سارة العبيدي",
      specialty: "طب الأطفال",
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      rating: 4.8,
      reviewCount: 98,
      location: "بغداد، الرصافة",
      price: 30000,
      distance: 2.3,
      estimatedTime: "15 دقائق"
    },
    {
      id: 5,
      name: "د. علي الربيعي",
      specialty: "المخ والأعصاب",
      image: "https://images.unsplash.com/photo-1637059824899-a441006a6875?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      rating: 4.8,
      reviewCount: 75,
      location: "بغداد، المنصور",
      price: 45000,
      distance: 2.8,
      estimatedTime: "18 دقائق"
    },
    {
      id: 10,
      name: "د. رنا الخفاجي",
      specialty: "طب الأطفال",
      image: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      rating: 4.9,
      reviewCount: 114,
      location: "بغداد، زيونة",
      price: 33000,
      distance: 3.1,
      estimatedTime: "20 دقائق"
    }
  ];

  const detectUserLocation = () => {
    setIsLoading(true);
    setLocationError(null);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setIsLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setLocationError("حدث خطأ في تحديد موقعك. يرجى التأكد من تفعيل خدمة تحديد الموقع.");
          setIsLoading(false);
        }
      );
    } else {
      setLocationError("متصفحك لا يدعم خدمة تحديد الموقع.");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 bg-medical-light">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">البحث حسب الموقع الجغرافي</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              اكتشف الأطباء والمراكز الطبية القريبة منك وتعرف على المسافة والوقت المقدر للوصول
            </p>
            
            <Button 
              onClick={detectUserLocation}
              disabled={isLoading} 
              className="bg-medical-primary hover:bg-medical-dark text-lg py-6 px-8"
            >
              <MapPin className="ml-2 h-5 w-5" />
              حدد موقعي الحالي
            </Button>
            
            {locationError && (
              <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg border border-red-200">
                <p>{locationError}</p>
              </div>
            )}
          </div>
        </section>
        
        {/* Map & Results Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="text-center py-12">
                <Skeleton className="h-8 w-56 mx-auto mb-4" />
                <Skeleton className="h-6 w-96 mx-auto mb-12" />
                <Skeleton className="h-[400px] w-full max-w-5xl mx-auto rounded-lg" />
              </div>
            ) : userLocation ? (
              <div>
                <div className="mb-8 text-center">
                  <h2 className="text-2xl font-bold">الأطباء والمراكز الطبية القريبة منك</h2>
                  <p className="text-gray-600">تم العثور على 5 أطباء في نطاق 5 كيلومترات من موقعك</p>
                </div>
                
                <div className="mb-12">
                  {/* This would be replaced with an actual map component in production */}
                  <div className="h-[400px] bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Navigation className="h-16 w-16 text-medical-primary mx-auto mb-4" />
                      <p className="text-lg font-medium">هنا ستظهر خريطة تفاعلية</p>
                      <p className="text-gray-600 max-w-md mx-auto">
                        في التطبيق الفعلي، ستظهر هنا خريطة تعرض موقعك ومواقع الأطباء والمراكز الطبية القريبة منك
                      </p>
                    </div>
                  </div>
                </div>
                
                <Tabs defaultValue="doctors" className="w-full">
                  <TabsList className="mb-8 flex justify-center">
                    <TabsTrigger value="doctors" className="px-6 py-3">الأطباء</TabsTrigger>
                    <TabsTrigger value="centers" className="px-6 py-3">المراكز الطبية</TabsTrigger>
                    <TabsTrigger value="hospitals" className="px-6 py-3">المستشفيات</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="doctors">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {nearbyDoctors.map(doctor => (
                        <Card key={doctor.id} className="h-full flex flex-col">
                          <div className="relative">
                            <img 
                              src={doctor.image} 
                              alt={doctor.name} 
                              className="w-full h-52 object-cover object-center"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white p-4">
                              <h3 className="font-semibold text-lg">{doctor.name}</h3>
                              <p className="text-sm text-gray-200">{doctor.specialty}</p>
                            </div>
                          </div>
                          
                          <CardContent className="flex-grow p-4">
                            <div className="flex items-center mb-3">
                              <MapPin className="h-4 w-4 text-medical-primary ml-1" />
                              <span className="text-sm">{doctor.location}</span>
                              <span className="text-xs text-gray-500 mr-auto">
                                {doctor.distance} كم
                              </span>
                            </div>
                            
                            <div className="flex items-center mb-3">
                              <Clock className="h-4 w-4 text-medical-primary ml-1" />
                              <span className="text-sm">وقت الوصول: {doctor.estimatedTime}</span>
                            </div>
                            
                            <div className="flex justify-between items-center mt-auto pt-2">
                              <span className="text-gray-500 text-sm">سعر الكشف</span>
                              <span className="text-medical-primary font-semibold">{doctor.price} ريال</span>
                            </div>
                          </CardContent>
                          
                          <CardFooter className="p-4 pt-0">
                            <Button className="w-full bg-medical-primary hover:bg-medical-dark">
                              عرض التفاصيل وحجز موعد
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="centers">
                    <div className="text-center py-12">
                      <Info className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-medium mb-2">لا توجد مراكز طبية في محيطك</h3>
                      <p className="text-gray-600 max-w-md mx-auto">
                        لم نتمكن من العثور على مراكز طبية ضمن المسافة المحددة. يمكنك توسيع نطاق البحث أو تجربة موقع آخر.
                      </p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="hospitals">
                    <div className="text-center py-12">
                      <Info className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-medium mb-2">لا توجد مستشفيات في محيطك</h3>
                      <p className="text-gray-600 max-w-md mx-auto">
                        لم نتمكن من العثور على مستشفيات ضمن المسافة المحددة. يمكنك توسيع نطاق البحث أو تجربة موقع آخر.
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            ) : (
              <div className="text-center py-12">
                <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">حدد موقعك للبدء</h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  اضغط على زر "حدد موقعي الحالي" لنتمكن من عرض الأطباء والمراكز الطبية الأقرب إليك
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default GeoSearch;
