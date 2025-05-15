import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, MapPin, Percent, Clock, Tag, ArrowLeft, User, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';

import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Mock promotion data
const promotionData = {
  id: 1,
  title: "خصم 40% على كشف طب الأسنان",
  description: "خصم خاص على كشف طب الأسنان والأشعة لمدة محدودة. يشمل العرض الكشف الأولي، وتنظيف الأسنان البسيط، والأشعة التشخيصية لعمل خطة علاجية متكاملة ومناسبة.",
  longDescription: "يقدم الدكتور أحمد الكاظمي، استشاري طب وجراحة الفم والأسنان، عرضاً خاصاً بخصم 40% على الكشف الأولي وتشخيص حالات الأسنان.\n\nيشمل العرض:\n- الكشف السريري الشامل\n- تنظيف الأسنان البسيط\n- الأشعة التشخيصية الأساسية\n- وضع خطة علاجية متكاملة\n\nبعد الاستفادة من العرض، يمكن للمريض الحصول على خصم 10% إضافي على أي علاج يقوم به خلال شهر من تاريخ الكشف.\n\nهذا العرض مناسب لجميع الفئات العمرية ويهدف إلى تشجيع الرعاية الوقائية للأسنان والكشف المبكر عن المشكلات التي قد تتطور إذا تُركت دون علاج.",
  images: [
    "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1588776814546-daab30f310ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1445527815219-ecbfec67492e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
  ],
  provider: {
    id: 101,
    type: "doctor",
    name: "د. أحمد الكاظمي",
    specialty: "طب وجراحة الفم والأسنان",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3",
    location: "عيادة الحياة للأسنان، بغداد، المنصور",
    rating: 4.8,
    reviewCount: 124,
    experience: 15
  },
  category: "عروض الكشوفات",
  subcategory: "طب الأسنان",
  discount: 40,
  originalPrice: 50000,
  discountedPrice: 30000,
  currency: "دينار عراقي",
  startDate: "2023-10-01",
  expiryDate: "2023-12-30",
  termsAndConditions: [
    "العرض ساري حتى 30 ديسمبر 2023",
    "العرض لا يشمل الإجراءات العلاجية الإضافية",
    "يمكن الاستفادة من خصم 10% على العلاجات اللاحقة خلال شهر من تاريخ الكشف",
    "يجب حجز موعد مسبق",
    "العرض لا يسري مع العروض الأخرى"
  ],
  included: [
    "الكشف السريري الشامل",
    "تنظيف الأسنان البسيط",
    "الأشعة التشخيصية الأساسية",
    "وضع خطة علاجية متكاملة"
  ],
  notIncluded: [
    "العلاجات التجميلية",
    "تبييض الأسنان",
    "زراعة الأسنان",
    "تقويم الأسنان"
  ],
  redemptionInstructions: "للاستفادة من ��لعرض، يرجى حجز موعد عبر الموقع أو الاتصال بالعيادة مباشرة. عند الحضور، يرجى الإشارة إلى أنك تريد الاستفادة من العرض الخاص بالكشف والأشعة.",
  highlights: [
    "خصم 40% على سعر الكشف الأصلي",
    "يشمل الأشعة التشخيصية مجاناً",
    "استشارة مع طبيب استشاري مع خبرة 15+ سنة",
    "خصم إضافي 10% على العلاجات اللاحقة"
  ]
};

// Similar promotions
const similarPromotions = [
  {
    id: 2,
    title: "خصم 30% على زراعة الأسنان",
    image: "https://images.unsplash.com/photo-1581585102137-8c4cf05833a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    discount: 30,
    provider: "د. علي الحسيني",
    expiryDate: "2023-12-31"
  },
  {
    id: 3,
    title: "فحص أسنان شامل بسعر مخفض",
    image: "https://images.unsplash.com/photo-1588776814546-daab30f310ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    discount: 25,
    provider: "مركز السنا للأسنان",
    expiryDate: "2023-11-30"
  },
  {
    id: 4,
    title: "باقة تجميل الأسنان الشاملة",
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    discount: 35,
    provider: "مركز الابتسامة الجميلة",
    expiryDate: "2023-12-15"
  }
];

const PromotionDetail = () => {
  const { id } = useParams();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <nav className="flex mb-6" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3 space-x-reverse">
              <li className="inline-flex items-center">
                <Link to="/" className="text-gray-500 hover:text-medical-primary">
                  الرئيسية
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <ArrowLeft className="h-3 w-3 text-gray-400 mx-1 transform rotate-180" />
                  <Link to="/promotions" className="text-gray-500 hover:text-medical-primary">
                    العروض والتخفيضات
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <ArrowLeft className="h-3 w-3 text-gray-400 mx-1 transform rotate-180" />
                  <span className="text-gray-700 truncate max-w-xs">
                    {promotionData.title}
                  </span>
                </div>
              </li>
            </ol>
          </nav>
          
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Image gallery */}
              <div className="lg:w-1/2">
                <div className="relative h-80 md:h-96 w-full rounded-lg overflow-hidden mb-4">
                  <img 
                    src={promotionData.images[activeImageIndex]} 
                    alt={promotionData.title} 
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-4 right-4 bg-red-500 text-white">
                    <Percent className="h-3 w-3 ml-1" />
                    {promotionData.discount}% خصم
                  </Badge>
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {promotionData.images.map((img, index) => (
                    <button 
                      key={index}
                      className={`h-20 w-20 rounded-md overflow-hidden flex-shrink-0 border-2 ${activeImageIndex === index ? 'border-medical-primary' : 'border-transparent'}`}
                      onClick={() => setActiveImageIndex(index)}
                    >
                      <img 
                        src={img} 
                        alt={`${promotionData.title} - ${index + 1}`} 
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Promotion details */}
              <div className="lg:w-1/2">
                <div className="mb-2">
                  <Badge variant="outline" className="bg-gray-50">
                    <Tag className="h-3 w-3 ml-1" />
                    {promotionData.category}
                  </Badge>
                  {promotionData.subcategory && (
                    <Badge variant="outline" className="bg-gray-50 mr-2">
                      {promotionData.subcategory}
                    </Badge>
                  )}
                </div>
                
                <h1 className="text-3xl font-bold mb-4 text-gray-700">{promotionData.title}</h1>
                
                <p className="text-gray-600 mb-6">{promotionData.description}</p>
                
                <div className="flex items-center mb-6">
                  {promotionData.provider.type === "doctor" ? (
                    <User className="h-5 w-5 text-gray-400 ml-2" />
                  ) : (
                    <Home className="h-5 w-5 text-gray-400 ml-2" />
                  )}
                  <div>
                    <Link to={`/${promotionData.provider.type === "doctor" ? "doctors" : "centers"}/${promotionData.provider.id}`} className="text-medical-primary hover:underline font-medium">
                      {promotionData.provider.name}
                    </Link>
                    <p className="text-sm text-gray-500">{promotionData.provider.specialty}</p>
                  </div>
                </div>
                
                <div className="flex items-center mb-4">
                  <MapPin className="h-5 w-5 text-gray-400 ml-2" />
                  <span className="text-gray-600">{promotionData.provider.location}</span>
                </div>
                
                <div className="flex items-center mb-6">
                  <Calendar className="h-5 w-5 text-gray-400 ml-2" />
                  <span className="text-gray-600">
                    العرض ساري حتى {new Date(promotionData.expiryDate).toLocaleDateString("ar-IQ")}
                  </span>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">��لسعر الأصلي</p>
                      <p className="text-gray-400 line-through">{promotionData.originalPrice.toLocaleString()} {promotionData.currency}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">الخصم</p>
                      <p className="text-red-500 font-bold">%{promotionData.discount}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">السعر بعد الخصم</p>
                      <p className="text-medical-primary font-bold text-xl">{promotionData.discountedPrice.toLocaleString()} {promotionData.currency}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4 mb-6">
                  <h3 className="font-semibold text-gray-700">مميزات العرض:</h3>
                  <ul className="space-y-2">
                    {promotionData.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 ml-2 mt-0.5">✓</div>
                        <span className="text-gray-600">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex gap-4">
                  <Button className="flex-1 bg-medical-primary hover:bg-medical-dark">
                    حجز العرض
                  </Button>
                  <Button variant="outline" className="flex-1 border-medical-primary text-medical-primary hover:bg-medical-light">
                    مشاركة العرض
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="details" className="mt-10">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="details">تفاصيل العرض</TabsTrigger>
              <TabsTrigger value="terms">الشروط والأحكام</TabsTrigger>
              <TabsTrigger value="provider">مقدم الخدمة</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="mt-4">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-bold mb-6 text-gray-700">تفاصيل العرض</h2>
                
                <div className="text-gray-600 whitespace-pre-line mb-8">
                  {promotionData.longDescription}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-semibold mb-4 text-gray-700">العرض يشمل:</h3>
                    <ul className="space-y-2">
                      {promotionData.included.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 ml-2 mt-0.5">✓</div>
                          <span className="text-gray-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-4 text-gray-700">العرض لا يشمل:</h3>
                    <ul className="space-y-2">
                      {promotionData.notIncluded.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <div className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center text-red-600 ml-2 mt-0.5">✗</div>
                          <span className="text-gray-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="font-semibold mb-4 text-gray-700">كيفية الاستفادة من العرض:</h3>
                  <div className="bg-gray-50 p-4 rounded-md text-gray-600">
                    {promotionData.redemptionInstructions}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="terms" className="mt-4">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-bold mb-6 text-gray-700">الشروط والأحكام</h2>
                
                <ul className="space-y-3">
                  {promotionData.termsAndConditions.map((term, index) => (
                    <li key={index} className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 ml-2 mt-0.5">•</div>
                      <span className="text-gray-600">{term}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-8 bg-yellow-50 p-4 rounded-md">
                  <p className="text-yellow-800 text-sm">
                    ملاحظة: الأسعار والعروض قابلة للتغيير حسب تقدير مقدم الخدمة. يرجى التأكد من التفاصيل عند الحجز.
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="provider" className="mt-4">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-start">
                  <img 
                    src={promotionData.provider.image} 
                    alt={promotionData.provider.name} 
                    className="w-24 h-24 rounded-full object-cover ml-4"
                  />
                  
                  <div>
                    <h2 className="text-xl font-bold mb-1 text-gray-700">{promotionData.provider.name}</h2>
                    <p className="text-medical-primary mb-2">{promotionData.provider.specialty}</p>
                    
                    <div className="flex items-center mb-4">
                      <svg className="text-yellow-400 fill-yellow-400 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                      <span className="font-semibold ml-1">{promotionData.provider.rating}</span>
                      <span className="text-gray-500 text-sm">({promotionData.provider.reviewCount} تقييم)</span>
                    </div>
                    
                    {promotionData.provider.experience && (
                      <p className="text-gray-600 text-sm">
                        خبرة أكثر من {promotionData.provider.experience} سنة في مجال {promotionData.provider.specialty}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="mt-6">
                  <Link to={`/${promotionData.provider.type === "doctor" ? "doctors" : "centers"}/${promotionData.provider.id}`}>
                    <Button className="bg-medical-primary hover:bg-medical-dark">
                      عرض الملف الكامل
                    </Button>
                  </Link>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          {/* Similar promotions */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-700">عروض مشابهة</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarPromotions.map(promo => (
                <div key={promo.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="relative">
                    <img 
                      src={promo.image} 
                      alt={promo.title} 
                      className="w-full h-48 object-cover"
                    />
                    <Badge className="absolute top-2 right-2 bg-red-500">
                      <Percent className="h-3 w-3 ml-1" />
                      {promo.discount}% خصم
                    </Badge>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2 text-gray-700 line-clamp-1">{promo.title}</h3>
                    
                    <div className="flex items-center mb-3">
                      <User className="h-4 w-4 text-gray-400 ml-1" />
                      <span className="text-sm text-gray-600">{promo.provider}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <Calendar className="h-4 w-4 ml-1" />
                      <span>حتى {new Date(promo.expiryDate).toLocaleDateString("ar-IQ")}</span>
                    </div>
                    
                    <Link to={`/promotions/${promo.id}`}>
                      <Button variant="outline" className="w-full border-medical-primary text-medical-primary hover:bg-medical-light">
                        عرض التفاصيل
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PromotionDetail;
