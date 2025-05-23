
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { 
  Filter, 
  Heart, 
  Brain, 
  Stethoscope, 
  Eye, 
  Bone, 
  Activity, 
  Scissors, 
  Pill, 
  Star,
  ChevronDown,
  X
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DoctorCard from "@/components/DoctorCard";
import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/use-toast";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

// بيانات الأطباء في العراق
const allDoctorsData = [
  {
    id: 1,
    name: "د. أحمد الشمري",
    specialty: "قلب وأوعية دموية",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    rating: 4.9,
    reviewCount: 124,
    location: "بغداد، الكرخ",
    price: 35000
  },
  {
    id: 2,
    name: "د. سارة العبيدي",
    specialty: "طب الأطفال",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    rating: 4.8,
    reviewCount: 98,
    location: "بغداد، الرصافة",
    price: 30000
  },
  {
    id: 3,
    name: "د. محمد الكاظمي",
    specialty: "جراحة العظام",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    rating: 4.7,
    reviewCount: 87,
    location: "بغداد، المنصور",
    price: 40000
  },
  {
    id: 4,
    name: "د. فاطمة الموسوي",
    specialty: "طب الأسنان",
    image: "https://images.unsplash.com/photo-1571772996211-2f02974a304d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    rating: 4.9,
    reviewCount: 112,
    location: "البصرة، العشار",
    price: 28000
  },
  {
    id: 5,
    name: "د. عبدالله الجبوري",
    specialty: "المخ والأعصاب",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    rating: 4.6,
    reviewCount: 76,
    location: "الموصل، الدواسة",
    price: 45000
  },
  {
    id: 6,
    name: "د. نورة الزيدي",
    specialty: "طب الباطنة",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    rating: 4.8,
    reviewCount: 92,
    location: "النجف، حي السلام",
    price: 32000
  },
  {
    id: 7,
    name: "د. خالد العامري",
    specialty: "طب العيون",
    image: "https://images.unsplash.com/photo-1622902046580-2b47f47f5471?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    rating: 4.9,
    reviewCount: 103,
    location: "كربلاء، حي المعلمين",
    price: 38000
  },
  {
    id: 8,
    name: "د. ريم الحسيني",
    specialty: "أمراض جلدية",
    image: "https://images.unsplash.com/photo-1614608682850-e0d6ed316d22?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    rating: 4.7,
    reviewCount: 85,
    location: "ديالى، بعقوبة",
    price: 30000
  },
  {
    id: 9,
    name: "د. حسين العلوي",
    specialty: "قلب وأوعية دموية",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    rating: 4.5,
    reviewCount: 79,
    location: "الأنبار، الرمادي",
    price: 33000
  },
  {
    id: 10,
    name: "د. زينب الربيعي",
    specialty: "طب الأطفال",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    rating: 4.6,
    reviewCount: 82,
    location: "بغداد، الكاظمية",
    price: 28000
  }
];

// التخصصات
const specialties = [
  { name: "قلب وأوعية دموية", icon: Heart, color: "#e74c3c" },
  { name: "المخ والأعصاب", icon: Brain, color: "#9b59b6" },
  { name: "طب عام", icon: Stethoscope, color: "#3498db" },
  { name: "طب العيون", icon: Eye, color: "#2ecc71" },
  { name: "عظام", icon: Bone, color: "#f39c12" },
  { name: "طب الباطنة", icon: Activity, color: "#1abc9c" },
  { name: "جراحة", icon: Scissors, color: "#e67e22" },
  { name: "أمراض جلدية", icon: Pill, color: "#8e44ad" },
  { name: "طب الأطفال", icon: Stethoscope, color: "#3498db" },
  { name: "طب الأسنان", icon: Scissors, color: "#e67e22" },
];

// المدن العراقية
const cities = ["بغداد", "البصرة", "الموصل", "أربيل", "النجف", "كربلاء", "السليمانية", "الأنبار", "ديالى", "ذي قار", "كركوك"];

const DoctorsList = () => {
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    specialty: searchParams.get("specialty") || "",
    location: searchParams.get("governorate") || "",
    rating: 0,
    price: [0, 50000],
    availability: false,
  });
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState("recommended");
  const [filteredDoctors, setFilteredDoctors] = useState(allDoctorsData);

  // تحميل الفلاتر من URL عند تحميل الصفحة
  useEffect(() => {
    const specialty = searchParams.get("specialty") || "";
    const governorate = searchParams.get("governorate") || "";
    const region = searchParams.get("region") || "";
    const search = searchParams.get("search") || "";

    const newFilters = { ...filters };
    const newActiveFilters: string[] = [];

    if (specialty) {
      newFilters.specialty = specialty;
      newActiveFilters.push(specialty);
    }

    if (governorate) {
      newFilters.location = governorate;
      newActiveFilters.push(governorate);
    }

    setFilters(newFilters);
    setActiveFilters(newActiveFilters);

    // تطبيق الفلتر الأولي
    applyFilters(newFilters);
  }, [searchParams]);

  // تطبيق الفلاتر على بيانات الأطباء
  const applyFilters = (currentFilters: typeof filters) => {
    let results = [...allDoctorsData];
    
    // تصفية حسب التخصص
    if (currentFilters.specialty) {
      results = results.filter(doctor => doctor.specialty === currentFilters.specialty);
    }
    
    // تصفية حسب الموقع
    if (currentFilters.location) {
      results = results.filter(doctor => doctor.location.includes(currentFilters.location));
    }
    
    // تصفية حسب التقييم
    if (currentFilters.rating > 0) {
      results = results.filter(doctor => doctor.rating >= currentFilters.rating);
    }
    
    // تصفية حسب نطاق السعر
    results = results.filter(
      doctor => doctor.price >= currentFilters.price[0] && doctor.price <= currentFilters.price[1]
    );
    
    // تطبيق الترتيب
    switch(sortOption) {
      case "rating":
        results.sort((a, b) => b.rating - a.rating);
        break;
      case "price_low":
        results.sort((a, b) => a.price - b.price);
        break;
      case "price_high":
        results.sort((a, b) => b.price - a.price);
        break;
      case "availability":
        // نفترض أن الأطباء المتاحين هم ذوي المعرفات الفردية كمثال
        results.sort((a, b) => a.id % 2 - b.id % 2);
        break;
      default: // recommended
        // الإبقاء على الترتيب الافتراضي
        break;
    }
    
    setFilteredDoctors(results);
  };

  // معالج تغيير الفلاتر
  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    // إضافة إلى الفلاتر النشطة (إذا لم تكن فارغة)
    if ((key === "specialty" || key === "location") && value) {
      if (!activeFilters.includes(value)) {
        setActiveFilters(prev => [...prev, value]);
      }
    }
    
    // تطبيق الفلاتر المحدثة
    applyFilters(newFilters);
    
    // عرض إشعار لتأكيد تطبيق الفلتر
    toast({
      title: "تم تطبيق الفلتر",
      description: `تم تحديث النتائج وفقًا للفلاتر المحددة.`,
    });
  };
  
  // إزالة فلتر معين
  const removeFilter = (filter: string) => {
    setActiveFilters(prev => prev.filter(f => f !== filter));
    
    const newFilters = { ...filters };
    
    if (filters.specialty === filter) {
      newFilters.specialty = "";
    }
    
    if (filters.location === filter) {
      newFilters.location = "";
    }
    
    setFilters(newFilters);
    applyFilters(newFilters);
  };
  
  // تطبيق الفلتر عند تغيير خيار الترتيب
  useEffect(() => {
    applyFilters(filters);
  }, [sortOption]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Search Section */}
        <section className="bg-medical-light py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">ابحث عن أفضل الأطباء</h1>
            <SearchBar />
          </div>
        </section>
        
        {/* Filters and Results */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            {/* عرض الفلاتر النشطة */}
            <div className="flex flex-wrap gap-3 mb-4">
              {activeFilters.map(filter => (
                <Badge 
                  key={filter} 
                  variant="secondary"
                  className="px-3 py-1 text-sm flex items-center gap-1"
                >
                  {filter}
                  <button 
                    onClick={() => removeFilter(filter)}
                    className="ml-1 rounded-full hover:bg-gray-200 p-1"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              
              {activeFilters.length > 0 && (
                <button 
                  onClick={() => {
                    setActiveFilters([]);
                    const newFilters = { ...filters, specialty: "", location: "" };
                    setFilters(newFilters);
                    applyFilters(newFilters);
                  }}
                  className="text-sm text-gray-500 hover:text-medical-primary"
                >
                  مسح الكل
                </button>
              )}
            </div>
            
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <span className="font-medium">الترتيب حسب: </span>
                <div className="relative ml-2">
                  <select
                    className="appearance-none bg-white border rounded-md px-3 py-1 pr-8 focus:outline-none focus:ring-1 focus:ring-medical-primary text-sm"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                  >
                    <option value="recommended">الأنسب</option>
                    <option value="rating">التقييم (الأعلى)</option>
                    <option value="price_low">السعر (الأقل)</option>
                    <option value="price_high">السعر (الأعلى)</option>
                    <option value="availability">المتاح اليوم</option>
                  </select>
                  <ChevronDown className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                </div>
              </div>
              
              {/* Mobile Filter Button */}
              <div className="block md:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="flex items-center">
                      <Filter className="h-4 w-4 mr-2" />
                      تصفية
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="overflow-y-auto">
                    <SheetHeader>
                      <SheetTitle>خيارات التصفية</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <Accordion type="single" collapsible defaultValue="specialty">
                        <AccordionItem value="specialty">
                          <AccordionTrigger>التخصص</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-2">
                              {specialties.map((specialty) => (
                                <div key={specialty.name} className="flex items-center">
                                  <input
                                    type="radio"
                                    id={`specialty-${specialty.name}`}
                                    name="specialty"
                                    checked={filters.specialty === specialty.name}
                                    onChange={() => handleFilterChange("specialty", specialty.name)}
                                    className="h-4 w-4 rounded-full text-medical-primary focus:ring-medical-primary"
                                  />
                                  <label htmlFor={`specialty-${specialty.name}`} className="ml-2 flex items-center">
                                    <specialty.icon className="h-4 w-4 mr-1" style={{ color: specialty.color }} />
                                    {specialty.name}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                        
                        <AccordionItem value="location">
                          <AccordionTrigger>المدينة</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-2">
                              {cities.map((city) => (
                                <div key={city} className="flex items-center">
                                  <input
                                    type="radio"
                                    id={`city-${city}`}
                                    name="city"
                                    checked={filters.location === city}
                                    onChange={() => handleFilterChange("location", city)}
                                    className="h-4 w-4 rounded-full text-medical-primary focus:ring-medical-primary"
                                  />
                                  <label htmlFor={`city-${city}`} className="ml-2">
                                    {city}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                        
                        <AccordionItem value="rating">
                          <AccordionTrigger>التقييم</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-2">
                              {[4, 3, 2, 1].map((rating) => (
                                <div key={rating} className="flex items-center">
                                  <input
                                    type="radio"
                                    id={`rating-${rating}`}
                                    name="rating"
                                    checked={filters.rating === rating}
                                    onChange={() => handleFilterChange("rating", rating)}
                                    className="h-4 w-4 rounded-full text-medical-primary focus:ring-medical-primary"
                                  />
                                  <label htmlFor={`rating-${rating}`} className="ml-2 flex items-center">
                                    {rating}+ <Star className="h-4 w-4 ml-1 fill-yellow-400 text-yellow-400" />
                                  </label>
                                </div>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                        
                        <AccordionItem value="price">
                          <AccordionTrigger>السعر</AccordionTrigger>
                          <AccordionContent>
                            <div className="px-2">
                              <Slider
                                defaultValue={[0, 50000]}
                                max={50000}
                                step={5000}
                                value={filters.price}
                                onValueChange={(value) => handleFilterChange("price", value)}
                                className="my-6"
                              />
                              <div className="flex justify-between text-sm">
                                <span>{filters.price[0]} دينار</span>
                                <span>{filters.price[1]} دينار</span>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                        
                        <AccordionItem value="availability">
                          <AccordionTrigger>التوفر</AccordionTrigger>
                          <AccordionContent>
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                id="available-today-mobile"
                                checked={filters.availability}
                                onChange={(e) => handleFilterChange("availability", e.target.checked)}
                                className="h-4 w-4 rounded text-medical-primary focus:ring-medical-primary"
                              />
                              <label htmlFor="available-today-mobile" className="ml-2">
                                متاح اليوم
                              </label>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Desktop Sidebar Filters */}
              <div className="hidden md:block">
                <div className="bg-white rounded-lg shadow-sm border p-4 sticky top-20">
                  <h3 className="font-semibold text-lg mb-4">خيارات التصفية</h3>
                  
                  <Accordion type="single" collapsible defaultValue="specialty" className="w-full">
                    <AccordionItem value="specialty">
                      <AccordionTrigger>التخصص</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          {specialties.map((specialty) => (
                            <div key={specialty.name} className="flex items-center">
                              <input
                                type="radio"
                                id={`desktop-specialty-${specialty.name}`}
                                name="desktop-specialty"
                                checked={filters.specialty === specialty.name}
                                onChange={() => handleFilterChange("specialty", specialty.name)}
                                className="h-4 w-4 rounded-full text-medical-primary focus:ring-medical-primary"
                              />
                              <label htmlFor={`desktop-specialty-${specialty.name}`} className="ml-2 flex items-center">
                                <specialty.icon className="h-4 w-4 mr-1" style={{ color: specialty.color }} />
                                {specialty.name}
                              </label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="location">
                      <AccordionTrigger>المدينة</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          {cities.map((city) => (
                            <div key={city} className="flex items-center">
                              <input
                                type="radio"
                                id={`desktop-city-${city}`}
                                name="desktop-city"
                                checked={filters.location === city}
                                onChange={() => handleFilterChange("location", city)}
                                className="h-4 w-4 rounded-full text-medical-primary focus:ring-medical-primary"
                              />
                              <label htmlFor={`desktop-city-${city}`} className="ml-2">
                                {city}
                              </label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="rating">
                      <AccordionTrigger>التقييم</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          {[4, 3, 2, 1].map((rating) => (
                            <div key={rating} className="flex items-center">
                              <input
                                type="radio"
                                id={`desktop-rating-${rating}`}
                                name="desktop-rating"
                                checked={filters.rating === rating}
                                onChange={() => handleFilterChange("rating", rating)}
                                className="h-4 w-4 rounded-full text-medical-primary focus:ring-medical-primary"
                              />
                              <label htmlFor={`desktop-rating-${rating}`} className="ml-2 flex items-center">
                                {rating}+ <Star className="h-4 w-4 ml-1 fill-yellow-400 text-yellow-400" />
                              </label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="price">
                      <AccordionTrigger>السعر</AccordionTrigger>
                      <AccordionContent>
                        <div className="px-2">
                          <Slider
                            defaultValue={[0, 50000]}
                            max={50000}
                            step={5000}
                            value={filters.price}
                            onValueChange={(value) => handleFilterChange("price", value)}
                            className="my-6"
                          />
                          <div className="flex justify-between text-sm">
                            <span>{filters.price[0]} دينار</span>
                            <span>{filters.price[1]} دينار</span>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="availability">
                      <AccordionTrigger>التوفر</AccordionTrigger>
                      <AccordionContent>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="available-today-desktop"
                            checked={filters.availability}
                            onChange={(e) => handleFilterChange("availability", e.target.checked)}
                            className="h-4 w-4 rounded text-medical-primary focus:ring-medical-primary"
                          />
                          <label htmlFor="available-today-desktop" className="ml-2">
                            متاح اليوم
                          </label>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  
                  <div className="mt-6 grid grid-cols-2 gap-2">
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => {
                        setActiveFilters([]);
                        const resetFilters = {
                          specialty: "",
                          location: "",
                          rating: 0,
                          price: [0, 50000],
                          availability: false,
                        };
                        setFilters(resetFilters);
                        applyFilters(resetFilters);
                      }}
                    >
                      إعادة ضبط
                    </Button>
                    <Button 
                      className="w-full bg-medical-primary hover:bg-medical-dark"
                      onClick={() => {
                        applyFilters(filters);
                        toast({
                          title: "تم تطبيق الفلاتر",
                          description: "تم تحديث النتائج بناءً على اختياراتك.",
                        });
                      }}
                    >
                      تطبيق
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Doctors Grid */}
              <div className="lg:col-span-3">
                {filteredDoctors.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredDoctors.map((doctor) => (
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
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <h3 className="text-xl font-semibold mb-2">لا يوجد أطباء مطابقين</h3>
                    <p className="text-gray-600">
                      لا يوجد أطباء مطابقين للفلاتر المحددة. يرجى تعديل معايير البحث الخاصة بك وحاول مرة أخرى.
                    </p>
                  </div>
                )}
                
                {/* Pagination */}
                {filteredDoctors.length > 0 && (
                  <div className="mt-8 flex justify-center">
                    <nav className="flex items-center space-x-1">
                      <Button variant="outline" size="sm" disabled>
                        السابق
                      </Button>
                      <Button variant="outline" size="sm" className="bg-medical-primary text-white hover:bg-medical-dark">
                        1
                      </Button>
                      <Button variant="outline" size="sm">
                        2
                      </Button>
                      <Button variant="outline" size="sm">
                        3
                      </Button>
                      <Button variant="outline" size="sm">
                        التالي
                      </Button>
                    </nav>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default DoctorsList;
