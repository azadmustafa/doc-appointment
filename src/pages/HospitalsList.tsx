import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Phone, Search, Filter, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Mock hospitals data
const hospitals = [
  {
    id: 1,
    name: "مستشفى مدينة الطب",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    location: "بغداد، الكرخ",
    openingHours: "24 ساعة",
    rating: 4.7,
    reviewCount: 324,
    phoneNumber: "+964 771 234 5678",
    doctorsCount: 120,
    specialties: ["قلب", "جراحة عامة", "أطفال", "أعصاب", "عظام"],
    hasEmergency: true,
    acceptsInsurance: true
  },
  {
    id: 2,
    name: "مستشفى ابن سينا التخصصي",
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    location: "بغداد، الرصافة",
    openingHours: "24 ساعة",
    rating: 4.5,
    reviewCount: 256,
    phoneNumber: "+964 771 987 6543",
    doctorsCount: 85,
    specialties: ["أمراض نساء", "ولادة", "أطفال", "باطنية"],
    hasEmergency: true,
    acceptsInsurance: true
  },
  {
    id: 3,
    name: "مستشفى الخيرات الأهلي",
    image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    location: "البصرة، العشار",
    openingHours: "8:00 ص - 10:00 م",
    rating: 4.6,
    reviewCount: 189,
    phoneNumber: "+964 780 123 4567",
    doctorsCount: 64,
    specialties: ["عيون", "أنف وأذن وحنجرة", "جراحة تجميلية"],
    hasEmergency: false,
    acceptsInsurance: true
  },
  {
    id: 4,
    name: "المركز التخصصي للعلاج الطبيعي",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    location: "أربيل، عينكاوا",
    openingHours: "9:00 ص - 9:00 م",
    rating: 4.8,
    reviewCount: 145,
    phoneNumber: "+964 750 765 4321",
    doctorsCount: 28,
    specialties: ["علاج طبيعي", "عظام", "روماتيزم"],
    hasEmergency: false,
    acceptsInsurance: false
  },
  {
    id: 5,
    name: "مستشفى الكفيل التخصصي",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    location: "كربلاء المقدسة",
    openingHours: "24 ساعة",
    rating: 4.9,
    reviewCount: 287,
    phoneNumber: "+964 770 111 2222",
    doctorsCount: 110,
    specialties: ["قلب", "جراحة عامة", "أعصاب", "أطفال", "عظام", "أسنان"],
    hasEmergency: true,
    acceptsInsurance: true
  },
  {
    id: 6,
    name: "مستشفى الحياة",
    image: "https://images.unsplash.com/photo-1630048421292-401b6f7cac35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    location: "النجف الأشرف",
    openingHours: "24 ساعة",
    rating: 4.4,
    reviewCount: 176,
    phoneNumber: "+964 770 333 4444",
    doctorsCount: 72,
    specialties: ["جلدية", "باطنية", "أطفال", "قلب", "أشعة"],
    hasEmergency: true,
    acceptsInsurance: true
  }
];

const specialties = [
  "قلب", "جراحة عامة", "أطفال", "أعصاب", "عظام", "أمراض نساء",
  "ولادة", "باطنية", "عيون", "أنف وأذن وحنجرة", "جراحة تجميلية",
  "علاج طبيعي", "روماتيزم", "جلدية", "أسنان", "أشعة"
];

const HospitalsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    hasEmergency: false,
    acceptsInsurance: false,
    openAllHours: false,
  });

  const filteredHospitals = hospitals.filter(hospital => {
    // Search filter
    if (searchTerm && !hospital.name.includes(searchTerm) && !hospital.location.includes(searchTerm)) {
      return false;
    }
    
    // Specialties filter
    if (selectedSpecialties.length > 0 && 
        !selectedSpecialties.some(specialty => hospital.specialties.includes(specialty))) {
      return false;
    }
    
    // Other filters
    if (filters.hasEmergency && !hospital.hasEmergency) return false;
    if (filters.acceptsInsurance && !hospital.acceptsInsurance) return false;
    if (filters.openAllHours && hospital.openingHours !== "24 ساعة") return false;
    
    return true;
  });

  const toggleSpecialty = (specialty: string) => {
    setSelectedSpecialties(prev => 
      prev.includes(specialty) 
        ? prev.filter(s => s !== specialty) 
        : [...prev, specialty]
    );
  };

  const handleFilterChange = (key: keyof typeof filters) => {
    setFilters(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2 text-gray-700">المشافي والمراكز الطبية</h1>
          <p className="text-gray-500 mb-8">ابحث عن أفضل المشافي والمراكز الطبية المتخصصة</p>
          
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Filters for desktop */}
            <div className="hidden lg:block w-64 bg-white p-4 rounded-lg shadow-sm">
              <h2 className="font-semibold text-lg mb-4 text-gray-700">تصفية النتائج</h2>
              
              <div className="mb-6">
                <h3 className="font-medium mb-2 text-gray-600">التخصص</h3>
                <div className="space-y-2">
                  {specialties.slice(0, 8).map(specialty => (
                    <div key={specialty} className="flex items-center">
                      <Checkbox 
                        id={`specialty-${specialty}`} 
                        checked={selectedSpecialties.includes(specialty)}
                        onCheckedChange={() => toggleSpecialty(specialty)}
                      />
                      <label 
                        htmlFor={`specialty-${specialty}`} 
                        className="text-gray-600 text-sm mr-2 cursor-pointer"
                      >
                        {specialty}
                      </label>
                    </div>
                  ))}
                </div>
                {specialties.length > 8 && (
                  <Button variant="link" className="text-medical-primary p-0 mt-1">
                    عرض المزيد
                  </Button>
                )}
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium mb-2 text-gray-600">خيارات أخرى</h3>
                
                <div className="flex items-center">
                  <Checkbox 
                    id="emergency" 
                    checked={filters.hasEmergency}
                    onCheckedChange={() => handleFilterChange('hasEmergency')}
                  />
                  <label 
                    htmlFor="emergency" 
                    className="text-gray-600 text-sm mr-2 cursor-pointer"
                  >
                    طوارئ 24 ساعة
                  </label>
                </div>
                
                <div className="flex items-center">
                  <Checkbox 
                    id="insurance" 
                    checked={filters.acceptsInsurance}
                    onCheckedChange={() => handleFilterChange('acceptsInsurance')}
                  />
                  <label 
                    htmlFor="insurance" 
                    className="text-gray-600 text-sm mr-2 cursor-pointer"
                  >
                    يقبل التأمين
                  </label>
                </div>
                
                <div className="flex items-center">
                  <Checkbox 
                    id="allHours" 
                    checked={filters.openAllHours}
                    onCheckedChange={() => handleFilterChange('openAllHours')}
                  />
                  <label 
                    htmlFor="allHours" 
                    className="text-gray-600 text-sm mr-2 cursor-pointer"
                  >
                    مفتوح 24 ساعة
                  </label>
                </div>
              </div>
            </div>
            
            {/* Main content */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="ابحث عن مشفى أو مركز طبي"
                    className="pr-10 search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                {/* Mobile filter button */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden">
                      <Filter className="ml-2 h-4 w-4" />
                      تصفية
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right">
                    <SheetHeader>
                      <SheetTitle>تصفية النتائج</SheetTitle>
                      <SheetDescription>
                        اختر الفلاتر المناسبة للبحث
                      </SheetDescription>
                    </SheetHeader>
                    <div className="mt-6">
                      <div className="mb-6">
                        <h3 className="font-medium mb-2 text-gray-600">التخصص</h3>
                        <div className="space-y-2">
                          {specialties.map(specialty => (
                            <div key={specialty} className="flex items-center">
                              <Checkbox 
                                id={`specialty-mobile-${specialty}`} 
                                checked={selectedSpecialties.includes(specialty)}
                                onCheckedChange={() => toggleSpecialty(specialty)}
                              />
                              <label 
                                htmlFor={`specialty-mobile-${specialty}`} 
                                className="text-gray-600 text-sm mr-2 cursor-pointer"
                              >
                                {specialty}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="font-medium mb-2 text-gray-600">خيارات أخرى</h3>
                        
                        <div className="flex items-center">
                          <Checkbox 
                            id="emergency-mobile" 
                            checked={filters.hasEmergency}
                            onCheckedChange={() => handleFilterChange('hasEmergency')}
                          />
                          <label 
                            htmlFor="emergency-mobile" 
                            className="text-gray-600 text-sm mr-2 cursor-pointer"
                          >
                            طوارئ 24 ساعة
                          </label>
                        </div>
                        
                        <div className="flex items-center">
                          <Checkbox 
                            id="insurance-mobile" 
                            checked={filters.acceptsInsurance}
                            onCheckedChange={() => handleFilterChange('acceptsInsurance')}
                          />
                          <label 
                            htmlFor="insurance-mobile" 
                            className="text-gray-600 text-sm mr-2 cursor-pointer"
                          >
                            يقبل التأمين
                          </label>
                        </div>
                        
                        <div className="flex items-center">
                          <Checkbox 
                            id="allHours-mobile" 
                            checked={filters.openAllHours}
                            onCheckedChange={() => handleFilterChange('openAllHours')}
                          />
                          <label 
                            htmlFor="allHours-mobile" 
                            className="text-gray-600 text-sm mr-2 cursor-pointer"
                          >
                            مفتوح 24 ساعة
                          </label>
                        </div>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
              
              {/* Applied filters */}
              {(selectedSpecialties.length > 0 || Object.values(filters).some(v => v)) && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedSpecialties.map(specialty => (
                    <Badge key={specialty} variant="outline" className="flex items-center gap-1 bg-gray-50">
                      {specialty}
                      <button 
                        onClick={() => toggleSpecialty(specialty)}
                        className="ml-1 h-4 w-4 rounded-full bg-gray-200 text-gray-500 hover:bg-gray-300 flex items-center justify-center"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                  
                  {filters.hasEmergency && (
                    <Badge variant="outline" className="flex items-center gap-1 bg-gray-50">
                      طوارئ 24 ساعة
                      <button 
                        onClick={() => handleFilterChange('hasEmergency')}
                        className="ml-1 h-4 w-4 rounded-full bg-gray-200 text-gray-500 hover:bg-gray-300 flex items-center justify-center"
                      >
                        ×
                      </button>
                    </Badge>
                  )}
                  
                  {filters.acceptsInsurance && (
                    <Badge variant="outline" className="flex items-center gap-1 bg-gray-50">
                      يقبل التأمين
                      <button 
                        onClick={() => handleFilterChange('acceptsInsurance')}
                        className="ml-1 h-4 w-4 rounded-full bg-gray-200 text-gray-500 hover:bg-gray-300 flex items-center justify-center"
                      >
                        ×
                      </button>
                    </Badge>
                  )}
                  
                  {filters.openAllHours && (
                    <Badge variant="outline" className="flex items-center gap-1 bg-gray-50">
                      مفتوح 24 ساعة
                      <button 
                        onClick={() => handleFilterChange('openAllHours')}
                        className="ml-1 h-4 w-4 rounded-full bg-gray-200 text-gray-500 hover:bg-gray-300 flex items-center justify-center"
                      >
                        ×
                      </button>
                    </Badge>
                  )}
                  
                  <Button 
                    variant="ghost" 
                    className="text-sm h-8 px-2 text-medical-primary hover:text-medical-dark"
                    onClick={() => {
                      setSelectedSpecialties([]);
                      setFilters({
                        hasEmergency: false,
                        acceptsInsurance: false,
                        openAllHours: false,
                      });
                    }}
                  >
                    مسح الكل
                  </Button>
                </div>
              )}
              
              {/* Results */}
              <div className="space-y-6">
                {filteredHospitals.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500">لا توجد نتائج تطابق معايير البحث.</p>
                  </div>
                ) : (
                  filteredHospitals.map(hospital => (
                    <Card key={hospital.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                          <div className="w-full md:w-48 h-48 flex-shrink-0">
                            <img 
                              src={hospital.image} 
                              alt={hospital.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          
                          <div className="p-6 flex-1">
                            <div className="flex flex-wrap justify-between items-start gap-2">
                              <div>
                                <h2 className="text-xl font-semibold text-gray-700 mb-1">{hospital.name}</h2>
                                <div className="flex items-center mb-2">
                                  <MapPin className="h-4 w-4 text-gray-400 ml-1" />
                                  <span className="text-gray-600 text-sm">{hospital.location}</span>
                                </div>
                              </div>
                              
                              <div className="flex items-center">
                                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400 ml-1" />
                                <span className="font-semibold">{hospital.rating}</span>
                                <span className="text-gray-500 text-sm mr-1">({hospital.reviewCount})</span>
                              </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-1 mb-4">
                              {hospital.specialties.slice(0, 5).map((specialty, index) => (
                                <Badge key={index} variant="outline" className="bg-gray-50">
                                  {specialty}
                                </Badge>
                              ))}
                              {hospital.specialties.length > 5 && (
                                <Badge variant="outline" className="bg-gray-50">
                                  +{hospital.specialties.length - 5}
                                </Badge>
                              )}
                            </div>
                            
                            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                              <div>
                                <span className="font-medium text-gray-700">ساعات العمل:</span> {hospital.openingHours}
                              </div>
                              <div>
                                <span className="font-medium text-gray-700">عدد الأطباء:</span> {hospital.doctorsCount} طبيب
                              </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-2 text-sm">
                              {hospital.hasEmergency && (
                                <Badge className="bg-red-100 text-red-700 hover:bg-red-200">
                                  طوارئ 24 ساعة
                                </Badge>
                              )}
                              
                              {hospital.acceptsInsurance && (
                                <Badge className="bg-green-100 text-green-700 hover:bg-green-200">
                                  <Check className="h-3 w-3 ml-1" />
                                  يقبل التأمين
                                </Badge>
                              )}
                            </div>
                            
                            <div className="flex flex-wrap justify-between items-center mt-4 gap-4">
                              <a 
                                href={`tel:${hospital.phoneNumber}`} 
                                className="flex items-center text-medical-primary hover:text-medical-dark"
                              >
                                <Phone className="h-4 w-4 ml-1" />
                                <span className="text-sm font-medium">{hospital.phoneNumber}</span>
                              </a>
                              
                              <div className="flex gap-2">
                                <Button variant="outline" className="border-medical-primary text-medical-primary hover:bg-medical-light">
                                  الأطباء
                                </Button>
                                <Link to={`/hospitals/${hospital.id}`}>
                                  <Button className="bg-medical-primary hover:bg-medical-dark">
                                    عرض التفاصيل
                                  </Button>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HospitalsList;
