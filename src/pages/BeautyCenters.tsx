
import React from 'react';
import { Star, MapPin, Phone, Calendar, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';

const beautyCenters = [
  {
    id: 1,
    name: "مركز الجمال الحديث",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    rating: 4.8,
    reviewCount: 156,
    location: "بغداد، المنصور",
    services: ["تجميل الوجه", "العناية بالبشرة", "تقنيات التنحيف"],
    price: "متوسطة"
  },
  {
    id: 2,
    name: "روز كلينك للتجميل",
    image: "https://images.unsplash.com/photo-1595475884562-073c30d45670?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    rating: 4.9,
    reviewCount: 203,
    location: "بغداد، زيونة",
    services: ["جراحات التجميل", "فيلر", "بوتكس", "نحت الجسم"],
    price: "مرتفعة"
  },
  {
    id: 3,
    name: "دار الجمال",
    image: "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    rating: 4.7,
    reviewCount: 118,
    location: "البصرة، العشار",
    services: ["ليزر", "تجميل الشعر", "العناية المتكاملة"],
    price: "متوسطة"
  },
  {
    id: 4,
    name: "سكاي بيوتي سنتر",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    rating: 4.6,
    reviewCount: 92,
    location: "أربيل، عينكاوا",
    services: ["الليزر الكربوني", "تقشير البشرة", "حقن البلازما"],
    price: "مرتفعة"
  },
  {
    id: 5,
    name: "بيوتي لاين",
    image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    rating: 4.5,
    reviewCount: 87,
    location: "كربلاء المقدسة، حي الحسين",
    services: ["تجميل الأسنان", "علاجات طبية للبشرة", "تجميل الأنف"],
    price: "متوسطة"
  },
  {
    id: 6,
    name: "جوهرة الجمال",
    image: "https://images.unsplash.com/photo-1607008829749-c8051e716b63?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    rating: 4.4,
    reviewCount: 76,
    location: "النجف، حي السلام",
    services: ["العناية بالشعر", "المكياج الدائم", "إزالة الوشم"],
    price: "اقتصادية"
  },
  {
    id: 7,
    name: "مركز اللؤلؤة للجمال",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    rating: 4.8,
    reviewCount: 142,
    location: "بغداد، الكرادة",
    services: ["تكبير الشفاه", "نحت الخدود", "شد الوجه"],
    price: "مرتفعة"
  },
  {
    id: 8,
    name: "لمسات الجمال",
    image: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    rating: 4.3,
    reviewCount: 68,
    location: "الموصل، الجديدة",
    services: ["تطويل الرموش", "زراعة الشعر", "العناية الشاملة"],
    price: "اقتصادية"
  },
  {
    id: 9,
    name: "مركز ليلى للتجميل",
    image: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    rating: 4.7,
    reviewCount: 109,
    location: "البصرة، المعقل",
    services: ["تقشير كيميائي", "تبييض البشرة", "علاج حب الشباب"],
    price: "متوسطة"
  },
  {
    id: 10,
    name: "سمارت بيوتي سنتر",
    image: "https://images.unsplash.com/photo-1613987549117-13c4d3002d9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    rating: 4.9,
    reviewCount: 187,
    location: "بغداد، الجادرية",
    services: ["إزالة التجاعيد", "تجميل الجفون", "نحت الجسم بالفيزر"],
    price: "مرتفعة"
  }
];

const BeautyCenters = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 bg-medical-light">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">مراكز التجميل</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              اكتشف أفضل مراكز التجميل وصالونات العناية بالبشرة واحجز موعدك بسهولة
            </p>
          </div>
        </section>
        
        {/* Beauty Centers Grid */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-2">أفضل مراكز التجميل</h2>
              <p className="text-gray-600">مرتبة حسب تقييمات العملاء والمراجعات</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {beautyCenters.map((center) => (
                <Card key={center.id} className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                  <div className="relative">
                    <img 
                      src={center.image} 
                      alt={center.name} 
                      className="w-full h-52 object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-white rounded-full px-2 py-1 text-sm flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 ml-1 fill-yellow-500" />
                      <span>{center.rating}</span>
                      <span className="text-xs text-gray-500 mr-1">({center.reviewCount})</span>
                    </div>
                  </div>
                  
                  <CardContent className="p-4 flex-grow">
                    <h3 className="font-bold text-lg mb-2">{center.name}</h3>
                    
                    <div className="flex items-center mb-3">
                      <MapPin className="h-4 w-4 text-gray-500 ml-1 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{center.location}</span>
                    </div>
                    
                    <div className="mb-3">
                      <p className="text-sm font-medium mb-1">الخدمات:</p>
                      <div className="flex flex-wrap gap-1">
                        {center.services.map((service, index) => (
                          <span 
                            key={index} 
                            className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-auto pt-3">
                      <div className="flex items-center">
                        <span className="text-xs text-gray-500">الأسعار:</span>
                        <span className={`text-xs ml-1 px-2 py-0.5 rounded-full ${
                          center.price === "مرتفعة" 
                            ? "bg-red-50 text-red-600" 
                            : center.price === "متوسطة" 
                              ? "bg-yellow-50 text-yellow-600" 
                              : "bg-green-50 text-green-600"
                        }`}>
                          {center.price}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="p-4 pt-0 mt-auto">
                    <div className="flex w-full gap-2">
                      <Button variant="outline" className="flex-1">
                        <Phone className="h-4 w-4 ml-1" />
                        اتصال
                      </Button>
                      <Button className="flex-1 bg-medical-primary hover:bg-medical-dark">
                        <Calendar className="h-4 w-4 ml-1" />
                        حجز
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Services Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">خدمات مميزة</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                تعرف على أحدث خدمات التجميل والعناية بالبشرة المتوفرة في مراكزنا
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "تقنيات الليزر المتطورة",
                  description: "أحدث أجهزة الليزر لإزالة الشعر، تجديد البشرة، وعلاج المشاكل الجلدية بدون ألم.",
                  icon: "https://images.unsplash.com/photo-1629776334948-c97c5fac7d22?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
                },
                {
                  title: "حقن التجميل والفيلر",
                  description: "تقنيات آمنة لتعزيز نضارة البشرة ومعالجة علامات التقدم في السن بأيدي خبراء متخصصين.",
                  icon: "https://images.unsplash.com/photo-1598970434795-0c54fe7c0648?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
                },
                {
                  title: "تقنيات نحت الجسم",
                  description: "أحدث التقنيات غير الجراحية لنحت الجسم وإزالة الدهون العنيدة بدون فترات نقاهة طويلة.",
                  icon: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
                }
              ].map((service, index) => (
                <Card key={index} className="overflow-hidden">
                  <img 
                    src={service.icon} 
                    alt={service.title}
                    className="w-full h-48 object-cover"
                  />
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <Button variant="outline" className="w-full">
                      <ExternalLink className="h-4 w-4 ml-1" />
                      تفاصيل أكثر
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-12 bg-medical-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-6">احصل على استشارة مجانية</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              تحدث مع خبراء التجميل لدينا للحصول على نصائح شخصية حول العناية ببشرتك وتحسين إطلالتك
            </p>
            <Link to="/consultation">
              <Button className="bg-white text-medical-primary hover:bg-gray-100 px-8 py-3 text-lg">
                طلب استشارة
              </Button>
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default BeautyCenters;
