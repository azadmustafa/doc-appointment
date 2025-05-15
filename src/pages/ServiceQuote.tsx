
import React, { useState } from 'react';
import { FileText, DollarSign, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface QuoteRequest {
  id: number;
  service: string;
  specialty: string;
  description: string;
  patientName: string;
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

const ServiceQuote = () => {
  const [activeTab, setActiveTab] = useState<'request' | 'browse'>('browse');
  
  // Sample quote requests data
  const quoteRequests: QuoteRequest[] = [
    {
      id: 1,
      service: "استشارة تجميل الأسنان",
      specialty: "طب الأسنان",
      description: "أبحث عن طبيب لعمل ابتسامة هوليود كاملة. أرغب في معرفة التكلفة التقريبية وعدد الجلسات المطلوبة.",
      patientName: "سمير محمد",
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
      patientName: "هدى علي",
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
      service: "تقويم الأسنان للبالغين",
      specialty: "طب الأسنان",
      description: "أبحث عن أسعار تقويم الأسنان للبالغين. أفضل التقويم الشفاف إذا كان متاحًا ضمن ميزانيتي.",
      patientName: "أحمد حسن",
      date: "قبل أسبوع",
      status: 'open',
      quotes: []
    }
  ];
  
  // Form state for new quote request
  const [formData, setFormData] = useState({
    service: '',
    specialty: '',
    description: '',
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
    // Reset form
    setFormData({ service: '', specialty: '', description: '' });
    // Show success message or redirect
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 bg-medical-light">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">طلب تسعير خدمة طبية</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              احصل على عروض أسعار تنافسية من أفضل الأطباء والمراكز الطبية لأي خدمة تحتاجها
            </p>
            
            <div className="flex justify-center gap-4">
              <Button
                className={`px-6 py-2 ${activeTab === 'request' ? 'bg-medical-primary' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                onClick={() => setActiveTab('request')}
              >
                طلب تسعير جديد
              </Button>
              <Button
                className={`px-6 py-2 ${activeTab === 'browse' ? 'bg-medical-primary' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                onClick={() => setActiveTab('browse')}
              >
                تصفح الطلبات
              </Button>
            </div>
          </div>
        </section>
        
        {/* Content Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            {activeTab === 'request' ? (
              <div className="max-w-3xl mx-auto">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center">
                      <FileText className="ml-2 h-6 w-6 text-medical-primary" />
                      طلب تسعير جديد
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmitRequest} className="space-y-6">
                      <div>
                        <label htmlFor="service" className="block text-sm font-medium mb-2">
                          الخدمة المطلوبة
                        </label>
                        <Input 
                          id="service" 
                          name="service"
                          value={formData.service}
                          onChange={handleInputChange}
                          placeholder="مثال: عملية تجميل الأنف، استشارة جلدية، الخ"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="specialty" className="block text-sm font-medium mb-2">
                          التخصص
                        </label>
                        <select 
                          id="specialty"
                          name="specialty" 
                          value={formData.specialty}
                          onChange={handleInputChange}
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                          required
                        >
                          <option value="" disabled>اختر التخصص</option>
                          <option value="general">طب عام</option>
                          <option value="cardiology">قلب وأوعية دموية</option>
                          <option value="dermatology">أمراض جلدية</option>
                          <option value="neurology">المخ والأعصاب</option>
                          <option value="pediatrics">طب الأطفال</option>
                          <option value="dental">طب الأسنان</option>
                          <option value="orthopedics">عظام</option>
                          <option value="ent">أنف وأذن وحنجرة</option>
                          <option value="ophthalmology">طب العيون</option>
                          <option value="plastic">جراحة تجميلية</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="description" className="block text-sm font-medium mb-2">
                          تفاصيل الطلب
                        </label>
                        <Textarea 
                          id="description"
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          placeholder="اشرح المزيد عن الخدمة التي تبحث عنها. كلما كانت التفاصيل أكثر، كلما كانت العروض أكثر دقة."
                          rows={5}
                          required
                        />
                      </div>
                      
                      <div className="pt-4 text-center">
                        <Button type="submit" className="bg-medical-primary hover:bg-medical-dark px-8 py-3">
                          <Send className="ml-2 h-5 w-5" />
                          إرسال الطلب
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div>
                <div className="mb-10">
                  <h2 className="text-2xl font-bold mb-2">طلبات التسعير المتاحة</h2>
                  <p className="text-gray-600">تصفح طلبات التسعير المفتوحة وقدم عرض سعر (للأطباء فقط)</p>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {quoteRequests.map(request => (
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
                          <span>{request.patientName}</span>
                          <span className="mx-2">•</span>
                          <span>{request.date}</span>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="p-6">
                        <div className="mb-6">
                          <h4 className="font-medium mb-2">تفاصيل الطلب:</h4>
                          <p className="text-gray-700">{request.description}</p>
                        </div>
                        
                        {request.quotes.length > 0 && (
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
                                  <p className="text-sm text-gray-600">المدة المقدرة: {quote.duration}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </CardContent>
                      
                      <CardFooter className="bg-gray-50 flex justify-between">
                        <span className="text-sm text-gray-600">
                          {request.quotes.length} عروض مقدمة
                        </span>
                        <Button variant="outline" className="border-medical-primary text-medical-primary hover:bg-medical-light">
                          <DollarSign className="h-4 w-4 ml-1" />
                          تقديم عرض سعر
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ServiceQuote;
