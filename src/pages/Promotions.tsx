
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Tag, Calendar, User, Home, Percent } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';

import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Mock promotions data
const promotions = [
  {
    id: 1,
    title: "خصم 40% على كشف طب الأسنان",
    description: "خصم خاص على كشف طب الأسنان والأشعة لمدة محدودة",
    image: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    provider: {
      type: "doctor",
      name: "د. أحمد الكاظمي",
      specialty: "طب وجراحة الفم والأسنان"
    },
    category: "عروض الكشوفات",
    discount: 40,
    originalPrice: 50000,
    discountedPrice: 30000,
    expiryDate: "2023-12-30",
    location: "بغداد، المنصور"
  },
  {
    id: 2,
    title: "عرض الجمال المتكامل",
    description: "باقة متكاملة تشمل تنظيف البشرة وتقشير كيميائي خفيف مع ماسك ترطيب عميق",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    provider: {
      type: "center",
      name: "مركز روز للتجميل",
      specialty: "عناية بالبشرة"
    },
    category: "عروض التجميل",
    discount: 35,
    originalPrice: 120000,
    discountedPrice: 78000,
    expiryDate: "2023-11-15",
    location: "بغداد، زيونة"
  },
  {
    id: 3,
    title: "فحص شامل بسعر مخفض",
    description: "فحص طبي شامل يتضمن تحاليل الدم والبول وفحص القلب والرئتين وضغط الدم",
    image: "https://images.unsplash.com/photo-1579154392429-0e6b4e850ad2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    provider: {
      type: "hospital",
      name: "مستشفى دار السلام",
      specialty: "مركز طبي متكامل"
    },
    category: "عروض الفحوصات",
    discount: 25,
    originalPrice: 200000,
    discountedPrice: 150000,
    expiryDate: "2023-12-15",
    location: "النجف الأشرف"
  },
  {
    id: 4,
    title: "جلسات ليزر بسعر موحد",
    description: "جلسات ليزر لإزالة الشعر بسعر موحد لكافة المناطق",
    image: "https://images.unsplash.com/photo-1629776334948-c97c5fac7d22?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    provider: {
      type: "center",
      name: "مركز الجمال الحديث",
      specialty: "تقنيات الليزر"
    },
    category: "عروض الليزر",
    discount: 50,
    originalPrice: 40000,
    discountedPrice: 20000,
    expiryDate: "2023-10-30",
    location: "بغداد، الكرادة"
  },
  {
    id: 5,
    title: "عرض زراعة الأسنان",
    description: "عرض خاص على زراعة الأسنان مع ضمان لمدة 10 سنوات",
    image: "https://images.unsplash.com/photo-1581585102137-8c4cf05833a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    provider: {
      type: "doctor",
      name: "د. علي الحسيني",
      specialty: "جراحة وزراعة الأسنان"
    },
    category: "عروض الأسنان",
    discount: 30,
    originalPrice: 500000,
    discountedPrice: 350000,
    expiryDate: "2023-12-31",
    location: "البصرة، العشار"
  },
  {
    id: 6,
    title: "كشف عيون مع فحص نظر مجاني",
    description: "كشف عيون كامل مع فحص نظر وقياس ضغط العين",
    image: "https://images.unsplash.com/photo-1551601651-124f7a3f6c43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    provider: {
      type: "center",
      name: "مركز العيون التخصصي",
      specialty: "طب وجراحة العيون"
    },
    category: "عروض الكشوفات",
    discount: 20,
    originalPrice: 40000,
    discountedPrice: 32000,
    expiryDate: "2023-11-30",
    location: "بغداد، الأعظمية"
  }
];

// Categories
const categories = [
  "عروض الكشوفات", "عروض التجميل", "عروض الأسنان", 
  "عروض الفحوصات", "عروض الليزر", "عروض الجراحة"
];

// Provider types
const providerTypes = [
  { id: "doctor", label: "الأطباء" },
  { id: "center", label: "المراكز الطبية" },
  { id: "hospital", label: "المستشفيات" }
];

const Promotions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedProviderTypes, setSelectedProviderTypes] = useState<string[]>([]);
  
  const filteredPromotions = promotions.filter(promo => {
    // Search filter
    if (searchTerm && !promo.title.includes(searchTerm) && !promo.description.includes(searchTerm) && !promo.provider.name.includes(searchTerm)) {
      return false;
    }
    
    // Category filter
    if (selectedCategories.length > 0 && !selectedCategories.includes(promo.category)) {
      return false;
    }
    
    // Provider type filter
    if (selectedProviderTypes.length > 0 && !selectedProviderTypes.includes(promo.provider.type)) {
      return false;
    }
    
    return true;
  });

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  const toggleProviderType = (type: string) => {
    setSelectedProviderTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type) 
        : [...prev, type]
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2 text-gray-700">العروض والتخفيضات</h1>
          <p className="text-gray-500 mb-8">اكتشف أفضل العروض والتخفيضات من الأطباء والمراكز الطبية</p>
          
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Filters */}
            <div className="w-full lg:w-64 bg-white p-4 rounded-lg shadow-sm">
              <h2 className="font-semibold text-lg mb-4 text-gray-700">تصفية النتائج</h2>
              
              <div className="mb-6">
                <h3 className="font-medium mb-2 text-gray-600">فئة العرض</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <div key={category} className="flex items-center">
                      <Checkbox 
                        id={`category-${category}`} 
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => toggleCategory(category)}
                      />
                      <label 
                        htmlFor={`category-${category}`} 
                        className="text-gray-600 text-sm mr-2 cursor-pointer"
                      >
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2 mb-6">
                <h3 className="font-medium mb-2 text-gray-600">مقدم الخدمة</h3>
                
                {providerTypes.map(type => (
                  <div key={type.id} className="flex items-center">
                    <Checkbox 
                      id={`provider-${type.id}`} 
                      checked={selectedProviderTypes.includes(type.id)}
                      onCheckedChange={() => toggleProviderType(type.id)}
                    />
                    <label 
                      htmlFor={`provider-${type.id}`} 
                      className="text-gray-600 text-sm mr-2 cursor-pointer"
                    >
                      {type.label}
                    </label>
                  </div>
                ))}
              </div>
              
              {(selectedCategories.length > 0 || selectedProviderTypes.length > 0) && (
                <Button 
                  variant="ghost" 
                  className="w-full text-medical-primary hover:text-medical-dark"
                  onClick={() => {
                    setSelectedCategories([]);
                    setSelectedProviderTypes([]);
                  }}
                >
                  مسح الفلاتر
                </Button>
              )}
            </div>
            
            {/* Main content */}
            <div className="flex-1">
              <div className="relative mb-6">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="ابحث عن عروض وتخفيضات..."
                  className="pr-10 search-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              {/* Applied filters */}
              {(selectedCategories.length > 0 || selectedProviderTypes.length > 0) && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedCategories.map(category => (
                    <Badge key={category} variant="outline" className="flex items-center gap-1 bg-gray-50">
                      <Tag className="h-3 w-3 ml-1" />
                      {category}
                      <button 
                        onClick={() => toggleCategory(category)}
                        className="ml-1 h-4 w-4 rounded-full bg-gray-200 text-gray-500 hover:bg-gray-300 flex items-center justify-center"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                  
                  {selectedProviderTypes.map(type => {
                    const label = providerTypes.find(t => t.id === type)?.label || "";
                    return (
                      <Badge key={type} variant="outline" className="flex items-center gap-1 bg-gray-50">
                        {type === "doctor" ? (
                          <User className="h-3 w-3 ml-1" />
                        ) : type === "center" ? (
                          <Home className="h-3 w-3 ml-1" />
                        ) : (
                          <Home className="h-3 w-3 ml-1" />
                        )}
                        {label}
                        <button 
                          onClick={() => toggleProviderType(type)}
                          className="ml-1 h-4 w-4 rounded-full bg-gray-200 text-gray-500 hover:bg-gray-300 flex items-center justify-center"
                        >
                          ×
                        </button>
                      </Badge>
                    );
                  })}
                </div>
              )}
              
              {/* Results */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPromotions.length === 0 ? (
                  <div className="text-center py-12 col-span-full">
                    <p className="text-gray-500">لا توجد عروض تطابق معايير البحث.</p>
                  </div>
                ) : (
                  filteredPromotions.map(promotion => (
                    <Card key={promotion.id} className="overflow-hidden h-full flex flex-col hover:shadow-md transition-shadow">
                      <div className="relative">
                        <img 
                          src={promotion.image} 
                          alt={promotion.title} 
                          className="w-full h-48 object-cover"
                        />
                        <Badge className="absolute top-2 right-2 bg-red-500">
                          <Percent className="h-3 w-3 ml-1" />
                          {promotion.discount}% خصم
                        </Badge>
                      </div>
                      
                      <CardContent className="p-4 flex-grow flex flex-col">
                        <div className="mb-1">
                          <Badge variant="outline" className="bg-gray-50">
                            <Tag className="h-3 w-3 ml-1" />
                            {promotion.category}
                          </Badge>
                        </div>
                        
                        <h3 className="font-semibold text-lg mb-2 text-gray-700">{promotion.title}</h3>
                        
                        <p className="text-gray-500 text-sm mb-3 line-clamp-2">{promotion.description}</p>
                        
                        <div className="flex items-center mb-2">
                          {promotion.provider.type === "doctor" ? (
                            <User className="h-4 w-4 text-gray-400 ml-1" />
                          ) : promotion.provider.type === "center" ? (
                            <Home className="h-4 w-4 text-gray-400 ml-1" />
                          ) : (
                            <Home className="h-4 w-4 text-gray-400 ml-1" />
                          )}
                          <div>
                            <p className="text-sm text-gray-700">{promotion.provider.name}</p>
                            <p className="text-xs text-gray-500">{promotion.provider.specialty}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-600 mb-3">
                          <Calendar className="h-4 w-4 text-gray-400 ml-1" />
                          <span>ينتهي في {new Date(promotion.expiryDate).toLocaleDateString("ar-IQ")}</span>
                        </div>
                        
                        <div className="mt-auto">
                          <div className="flex justify-between items-center mb-3">
                            <div className="flex items-center">
                              <span className="text-gray-400 line-through text-sm ml-2">{promotion.originalPrice.toLocaleString()} د.ع</span>
                              <span className="text-medical-primary font-semibold">{promotion.discountedPrice.toLocaleString()} د.ع</span>
                            </div>
                          </div>
                          
                          <Link to={`/promotions/${promotion.id}`}>
                            <Button className="w-full bg-medical-primary hover:bg-medical-dark">
                              عرض التفاصيل
                            </Button>
                          </Link>
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

export default Promotions;
