
import React, { useState, useEffect } from 'react';
import { FileText, DollarSign, Trash2, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
  status: 'open' | 'pending' | 'confirmed' | 'canceled' | 'deleted';
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
  useEffect(() => {
    // Scroll to the top of the page when component mounts
    window.scrollTo(0, 0);
  }, []);
  
  const { user, isAuthenticated } = useAuth();
  
  // Sample quote requests data - In a real app, you would fetch this from an API
  // Here we're filtering quotes that belong to the current user
  const [myQuoteRequests, setMyQuoteRequests] = useState<QuoteRequest[]>([
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
    },
    {
      id: 3,
      service: "فحص سكر الدم",
      specialty: "طب الباطنة",
      description: "احتاج إلى عمل فحص شامل للسكر في الدم مع استشارة حول النظام الغذائي المناسب.",
      patientName: user?.name || "مستخدم",
      patientId: user?.id || 1,
      date: "قبل 1 أسبوع",
      status: 'confirmed',
      quotes: [
        {
          id: 104,
          doctorId: 10,
          doctorName: "د. هدى العبيدي",
          doctorImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3",
          price: 200,
          description: "فحص شامل للسكر في الدم مع تقرير مفصل واستشارة حول النظام الغذائي.",
          duration: "جلسة واحدة",
          date: "قبل 6 أيام"
        }
      ]
    }
  ]);

  // Function to handle selecting a quote
  const handleSelectQuote = (requestId: number, quoteId: number) => {
    setMyQuoteRequests(prev => prev.map(request => {
      if (request.id === requestId) {
        return { ...request, status: 'confirmed' as const };
      }
      return request;
    }));
    
    toast({
      title: "تم اختيار العرض",
      description: "سيتم التواصل معك قريباً لترتيب الموعد",
    });
  };

  // Function to handle canceling a request
  const handleCancelRequest = (requestId: number) => {
    setMyQuoteRequests(prev => prev.map(request => {
      if (request.id === requestId) {
        return { ...request, status: 'canceled' as const };
      }
      return request;
    }));
    
    toast({
      title: "تم إلغاء الطلب",
      description: "تم إلغاء طلب التسعير بنجاح",
    });
  };

  // Function to handle deleting a request
  const handleDeleteRequest = (requestId: number) => {
    setMyQuoteRequests(prev => prev.map(request => {
      if (request.id === requestId) {
        return { ...request, status: 'deleted' as const };
      }
      return request;
    }));
    
    toast({
      title: "تم حذف الطلب",
      description: "تم حذف طلب التسعير بنجاح",
    });
  };

  // Get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch(status) {
      case 'open': return 'bg-blue-500';
      case 'pending': return 'bg-yellow-500';
      case 'confirmed': return 'bg-green-500';
      case 'canceled': return 'bg-red-500';
      case 'deleted': return 'bg-gray-500';
      default: return 'bg-blue-500';
    }
  };

  // Get translated status
  const getStatusTranslation = (status: string) => {
    switch(status) {
      case 'open': return 'مفتوح';
      case 'pending': return 'قيد المراجعة';
      case 'confirmed': return 'مؤكد';
      case 'canceled': return 'ملغي';
      case 'deleted': return 'محذوف';
      default: return status;
    }
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
                
                <div className="max-w-3xl mx-auto space-y-6">
                  {myQuoteRequests
                    .filter(request => request.status !== 'deleted')
                    .map(request => (
                    <Card key={request.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <CardHeader className="bg-gray-50 pb-3">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-xl font-semibold text-medical-primary">
                            {request.service}
                          </CardTitle>
                          <Badge className={getStatusBadgeColor(request.status)}>
                            {getStatusTranslation(request.status)}
                          </Badge>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 mt-2">
                          <span>{request.date}</span>
                          <span className="mx-2 text-medical-primary">•</span>
                          <span className="text-medical-primary font-medium">
                            {request.specialty}
                          </span>
                          <span className="mx-2 text-medical-primary">•</span>
                          <span>
                            {request.quotes.length} عروض مقدمة
                          </span>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="p-6">
                        <div className="mb-6">
                          <h4 className="font-medium mb-2">تفاصيل طلبك:</h4>
                          <p className="text-gray-700">{request.description}</p>
                        </div>
                        
                        {request.status !== 'canceled' && request.quotes.length > 0 ? (
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
                                  
                                  {request.status === 'open' && (
                                    <Button 
                                      className="bg-medical-primary hover:bg-medical-dark w-full" 
                                      onClick={() => handleSelectQuote(request.id, quote.id)}
                                    >
                                      اختيار هذا العرض
                                    </Button>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : request.status === 'canceled' ? (
                          <div className="text-center py-6 text-gray-500">
                            <X className="mx-auto h-12 w-12 text-red-300 mb-2" />
                            <p>تم إلغاء هذا الطلب</p>
                          </div>
                        ) : (
                          <div className="text-center py-6 text-gray-500">
                            <FileText className="mx-auto h-12 w-12 text-gray-300 mb-2" />
                            <p>لم يتم تقديم أي عروض على طلبك حتى الآن</p>
                            <p className="text-sm mt-1">سيتم إشعارك فور تلقي عروض جديدة</p>
                          </div>
                        )}
                      </CardContent>
                      
                      <CardFooter className="bg-gray-50 flex justify-end gap-2">
                        {request.status === 'open' && (
                          <>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="border-red-400 text-red-500 hover:bg-red-50 flex items-center"
                              onClick={() => handleCancelRequest(request.id)}
                            >
                              <X className="h-4 w-4 mr-1" />
                              إلغاء
                            </Button>
                            <Button 
                              variant="outline"
                              size="sm" 
                              className="border-gray-400 text-gray-500 hover:bg-gray-50 flex items-center"
                              onClick={() => handleDeleteRequest(request.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              حذف
                            </Button>
                          </>
                        )}
                        {request.status === 'confirmed' && (
                          <Badge className="bg-green-500 flex items-center">
                            <Check className="h-4 w-4 mr-1" />
                            مؤكد
                          </Badge>
                        )}
                      </CardFooter>
                    </Card>
                  ))}
                  
                  {myQuoteRequests.filter(req => req.status !== 'deleted').length === 0 && (
                    <div className="text-center py-16 border rounded-lg">
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
