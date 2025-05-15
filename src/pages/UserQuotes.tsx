
import React, { useState } from 'react';
import { FileText, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/components/ui/use-toast";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface QuoteRequest {
  id: number;
  service: string;
  specialty: string;
  description: string;
  patientName: string;
  patientId: number;
  date: string;
  status: 'open' | 'pending' | 'completed';
  quotes: QuoteResponse[];
}

interface QuoteResponse {
  id: number;
  doctorId: number;
  doctorName: string;
  doctorImage: string;
  price: number;
  description: string;
  duration: string;
  date: string;
}

const UserQuotes = () => {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<'myRequests' | 'all'>('myRequests');
  
  // Sample quote requests data - In a real app, you would fetch this from an API
  // Here we're filtering quotes that belong to the current user
  const myQuoteRequests: QuoteRequest[] = [
    {
      id: 1,
      service: "استشارة تجميل الأسنان",
      specialty: "طب الأسنان",
      description: "أبحث عن طبيب لعمل ابتسامة هوليود كاملة. أرغب في معرفة التكلفة التقريبية وعدد الجلسات المطلوبة.",
      patientName: user?.name || "مستخدم",
      patientId: user?.id || 1,
      date: "قبل 2 يوم",
      status: 'open',
      quotes: [
        {
          id: 101,
          doctorId: 5,
          doctorName: "د. علي الربيعي",
          doctorImage: "https://images.unsplash.com/photo-1637059824899-a441006a6875?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
          price: 800,
          description: "تشمل الخدمة معاينة كاملة مع أشعة بانورامية، وتركيب ابتسامة هوليود كاملة باستخدام أحدث التقنيات وأفضل المواد.",
          duration: "3-4 جلسات",
          date: "قبل 1 يوم"
        },
        {
          id: 102,
          doctorId: 8,
          doctorName: "د. نور العلي",
          doctorImage: "https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
          price: 950,
          description: "تشمل الخدمة فحص شامل، وتصميم ابتسامة رقمي، وتركيب قشرة زيركون عالية الجودة مع ضمان لمدة 5 سنوات.",
          duration: "4 جلسات",
          date: "قبل 12 ساعة"
        }
      ]
    },
    {
      id: 2,
      service: "عملية إزالة اللوزتين",
      specialty: "أنف وأذن وحنجرة",
      description: "طفلي عمره 8 سنوات يعاني من التهابات متكررة في اللوزتين. أبحث عن تكلفة عملية إزالة اللوزتين مع تقدير وقت التعافي.",
      patientName: user?.name || "مستخدم",
      patientId: user?.id || 1,
      date: "قبل 4 أيام",
      status: 'open',
      quotes: [
        {
          id: 103,
          doctorId: 3,
          doctorName: "د. محمد الكاظمي",
          doctorImage: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
          price: 650,
          description: "تشمل العملية التخدير الكامل، إجراء العملية، والإقامة في المستشفى لمدة يوم واحد، ومتابعة ما بعد العملية.",
          duration: "فترة التعافي 1-2 أسبوع",
          date: "قبل 3 أيام"
        }
      ]
    }
  ];

  // Function to handle selecting a quote
  const handleSelectQuote = (quoteId: number) => {
    toast({
      title: "تم اختيار العرض",
      description: "سيتم التواصل معك قريباً لترتيب الموعد",
    });
  };

  // Function to handle canceling a request
  const handleCancelRequest = (requestId: number) => {
    toast({
      title: "تم إلغاء الطلب",
      description: "تم إلغاء طلب التسعير بنجاح",
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 bg-medical-light">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">طلبات التسعير الخاصة بك</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              تفقد العروض المقدمة من الأطباء على طلبات التسعير الخاصة بك
            </p>
          </div>
        </section>
        
        {/* Content Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            {isAuthenticated ? (
              <div>
                <div className="mb-10">
                  <h2 className="text-2xl font-bold mb-2">طلبات التسعير الخاصة بك</h2>
                  <p className="text-gray-600">عرض جميع طلبات التسعير التي قمت بإنشائها والعروض المقدمة عليها</p>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {myQuoteRequests.map(request => (
                    <Card key={request.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <CardHeader className="bg-gray-50 pb-3">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-xl font-semibold text-medical-primary">
                            {request.service}
                          </CardTitle>
                          <span className="bg-medical-light text-medical-primary text-xs px-2 py-1 rounded-full">
                            {request.specialty}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 mt-2">
                          <span>{request.date}</span>
                          <span className="mx-2 text-medical-primary">•</span>
                          <span className="text-medical-primary font-medium">
                            {request.quotes.length} عروض مقدمة
                          </span>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="p-6">
                        <div className="mb-6">
                          <h4 className="font-medium mb-2">تفاصيل طلبك:</h4>
                          <p className="text-gray-700">{request.description}</p>
                        </div>
                        
                        {request.quotes.length > 0 ? (
                          <div>
                            <h4 className="font-medium mb-3">العروض المقدمة:</h4>
                            <div className="space-y-4">
                              {request.quotes.map(quote => (
                                <div key={quote.id} className="border rounded-lg p-4 bg-gray-50">
                                  <div className="flex items-center mb-3">
                                    <img 
                                      src={quote.doctorImage} 
                                      alt={quote.doctorName} 
                                      className="w-10 h-10 rounded-full object-cover ml-3"
                                    />
                                    <div>
                                      <h5 className="font-medium">{quote.doctorName}</h5>
                                      <p className="text-xs text-gray-500">{quote.date}</p>
                                    </div>
                                    <div className="mr-auto">
                                      <span className="text-medical-primary font-bold text-lg">
                                        {quote.price} دينار
                                      </span>
                                    </div>
                                  </div>
                                  <p className="text-sm mb-2">{quote.description}</p>
                                  <p className="text-sm text-gray-600 mb-4">المدة المقدرة: {quote.duration}</p>
                                  
                                  <Button 
                                    className="bg-medical-primary hover:bg-medical-dark w-full" 
                                    onClick={() => handleSelectQuote(quote.id)}
                                  >
                                    اختيار هذا العرض
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <div className="text-center py-6 text-gray-500">
                            <FileText className="mx-auto h-12 w-12 text-gray-300 mb-2" />
                            <p>لم يتم تقديم أي عروض على طلبك حتى الآن</p>
                            <p className="text-sm mt-1">سيتم إشعارك فور تلقي عروض جديدة</p>
                          </div>
                        )}
                      </CardContent>
                      
                      <CardFooter className="bg-gray-50 flex justify-between">
                        <span className="text-sm text-gray-600">
                          الحالة: <span className="text-medical-primary font-medium">مفتوح</span>
                        </span>
                        <Button 
                          variant="outline" 
                          className="border-red-400 text-red-500 hover:bg-red-50"
                          onClick={() => handleCancelRequest(request.id)}
                        >
                          إلغاء الطلب
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                  
                  {myQuoteRequests.length === 0 && (
                    <div className="col-span-2 text-center py-16 border rounded-lg">
                      <FileText className="mx-auto h-16 w-16 text-gray-300 mb-4" />
                      <h3 className="text-xl font-semibold mb-2">لا توجد طلبات تسعير</h3>
                      <p className="text-gray-600 mb-6">يمكنك إنشاء طلب تسعير جديد للحصول على عروض من الأطباء</p>
                      <Button 
                        className="bg-medical-primary hover:bg-medical-dark px-6"
                        onClick={() => window.location.href = "/service-quote"}
                      >
                        <DollarSign className="ml-1 h-5 w-5" />
                        طلب تسعير جديد
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-16">
                <h2 className="text-2xl font-bold mb-4">يرجى تسجيل الدخول</h2>
                <p className="text-gray-600 mb-6">لعرض طلبات التسعير الخاصة بك، يجب عليك تسجيل الدخول أولاً</p>
                <Button 
                  className="bg-medical-primary hover:bg-medical-dark px-6"
                  onClick={() => window.location.href = "/login"}
                >
                  تسجيل الدخول
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default UserQuotes;
