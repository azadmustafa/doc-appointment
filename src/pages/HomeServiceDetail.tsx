import { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import { 
  Home, Syringe, Heart, Stethoscope, Clipboard, Thermometer, Calendar, MapPin, 
  DollarSign, CheckCircle, Clock, Shield, Award, AlertCircle, ArrowLeft
} from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

// Service type definition with detailed info
interface HomeService {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  requestCount: number;
  price: number;
  slug: string;
  availability: string;
  coverage: string[];
  requirements?: string[];
  faqs?: { question: string; answer: string }[];
  benefits?: string[];
  longDescription?: string;
  priceDetails?: { service: string; price: number }[];
}

// Mock home services data with expanded information
const homeServices: HomeService[] = [
  {
    id: "1",
    name: "زيارة طبيب للمنزل",
    description: "كشف طبي شامل من قبل طبيب متخصص في منزلك",
    longDescription: "خدمة زيارة الطبيب المنزلية توفر لك رعاية طبية متكاملة في راحة منزلك. يقوم أطباؤنا المتخصصون بإجراء الفحص السريري الشامل وتشخيص الحالة وتقديم العلاج المناسب. هذه الخدمة مثالية للمرضى الذين يصعب عليهم التنقل، أو في الحالات الطارئة البسيطة، أو عندما تحتاج إلى رأي طبي سريع دون الانتظار في العيادات المزدحمة.",
    icon: Stethoscope,
    requestCount: 2584,
    price: 55000,
    slug: "home-doctor-visit",
    availability: "متوفرة على مدار الساعة، 7 أيام في الأسبوع",
    coverage: ["بغداد", "البصرة", "أربيل", "النجف", "كربلاء", "الموصل"],
    requirements: [
      "توفير مكان هادئ ونظيف للفحص",
      "تجهيز قائمة بالأعراض والأدوية الحالية",
      "إتاحة السجلات الطبية السابقة إن وجدت",
      "وجود شخص بالغ مع المريض إذا كان المريض طفلاً أو كبير السن"
    ],
    benefits: [
      "توفير الوقت والجهد في التنقل إلى المستشفيات والعيادات",
      "تجنب التعرض للعدوى في أماكن الانتظار المزدحمة",
      "رعاية شخصية في بيئة مريحة للمريض",
      "متابعة مباشرة للحالات المزمنة التي تتطلب مراقبة منتظمة",
      "إمكانية الحصول على استشارة طبية في أوقات الطوارئ"
    ],
    priceDetails: [
      { service: "زيارة طبيب عام", price: 55000 },
      { service: "زيارة طبيب متخصص", price: 75000 },
      { service: "زيارة طبيب استشاري", price: 100000 },
      { service: "زيارة متابعة خلال أسبوع", price: 40000 },
    ],
    faqs: [
      {
        question: "ما هي المدة المتوقعة لوصول الطبيب؟",
        answer: "عادة ما يصل الطبيب خلال 30-60 دقيقة من وقت تأكيد الطلب، اعتماداً على المنطقة والحالة المرضية."
      },
      {
        question: "هل يمكن للطبيب كتابة وصفة طبية؟",
        answer: "نعم، يمكن للطبيب تشخيص الحالة وكتابة وصفة طبية وتقديم التوجيهات العلاجية اللازمة."
      },
      {
        question: "هل يمكن للطبيب إجراء إجراءات بسيطة مثل الغرز أو إزالة الغرز؟",
        answer: "نعم، يمكن للطبيب إجراء بعض الإجراءات البسيطة مثل الغرز البسيطة، إزالة الغرز، تضميد الجروح، وغيرها من الإجراءات غير المعقدة."
      },
      {
        question: "هل هناك رسوم إضافية للزيارات الليلية؟",
        answer: "نعم، هناك رسوم إضافية بنسبة 20% للزيارات بين الساعة 10 مساءً و6 صباحاً."
      },
      {
        question: "هل أحتاج إلى تحضير أي شيء قبل وصول الطبيب؟",
        answer: "يفضل تجهيز قائمة بالأعراض، والأدوية التي تتناولها حالياً، وأي تقارير طبية سابقة إن وجدت."
      }
    ]
  },
  {
    id: "2",
    name: "تمريض منزلي",
    description: "رعاية تمريضية احترافية من قبل ممرضين متخصصين",
    longDescription: "خدمة التمريض المنزلي توفر رعاية تمريضية احترافية ومتكاملة في منزل المريض. يقوم فريقنا من الممرضين المؤهلين بتقديم مجموعة واسعة من الخدمات التمريضية التي تشمل: تغيير الضمادات، حقن الأدوية، قياس المؤشرات الحيوية، تركيب وإزالة القسطرة البولية، العناية بالجروح، والإشراف على تناول الأدوية وغيرها من الخدمات التي تساعد المريض على التعافي في بيئة منزله المريحة.",
    icon: Heart,
    requestCount: 1893,
    price: 30000,
    slug: "home-nursing",
    availability: "متوفرة من 8 صباحاً - 10 مساءً، 7 أيام في الأسبوع",
    coverage: ["بغداد", "البصرة", "الموصل", "أربيل"],
    requirements: [
      "توفير الأدوات الطبية اللازمة (يمكننا توفيرها برسوم إضافية)",
      "مكان نظيف ومناسب لإجراء الخدمات التمريضية",
      "توفير وصفة طبية أو تعليمات من الطبيب المعالج"
    ],
    benefits: [
      "الرعاية المستمرة للمرضى بعد الخروج من المستشفى",
      "تقليل فترة البقاء في المستشفى والتعافي في بيئة المنزل",
      "تقديم التدريب والدعم لمقدمي الرعاية من العائلة",
      "إدارة الأمراض المزمنة وتحسين جودة الحياة",
      "خفض خطر الإصابة بالعدوى المكتسبة في المستشفيات"
    ],
    priceDetails: [
      { service: "زيارة تمريضية (ساعة)", price: 30000 },
      { service: "تركيب محلول وريدي", price: 20000 },
      { service: "تغيير ضمادات", price: 15000 },
      { service: "تركيب قسطرة بولية", price: 25000 },
      { service: "خدمة تمريضية 12 ساعة", price: 150000 },
      { service: "خدمة تمريضية 24 ساعة", price: 250000 },
    ],
    faqs: [
      {
        question: "هل الممرضون مرخصون ومؤهلون؟",
        answer: "نعم، جميع الممرضين في فريقنا حاصلون على شهادات مهنية معتمدة ولديهم خبرة لا تقل عن 3 سنوات في المجال الطبي."
      },
      {
        question: "هل يمكن طلب ممرض/ممرضة لإقامة طويلة الأمد؟",
        answer: "نعم، نوفر خدمات التمريض المنزلي للإقامة الطويلة (24 ساعة) أو الجزئية (8-12 ساعة) حسب احتياج المريض."
      },
      {
        question: "ما هي الحالات التي تستدعي خدمة التمريض المنزلي؟",
        answer: "تشمل الحالات: المرضى بعد العمليات الجراحية، المصابين بأمراض مزمنة، كبار السن، المرضى الذين يحتاجون لرعاية تنفسية أو تغذية وريدية، والمرضى الذين يحتاجون لمتابعة مستمرة."
      }
    ]
  },
  // ... other services
];

const HomeServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { toast } = useToast();
  const [service, setService] = useState<HomeService | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  
  // Find the service based on slug
  useEffect(() => {
    const foundService = homeServices.find(s => s.slug === slug);
    
    if (foundService) {
      setService(foundService);
      // Set default service type if available
      if (foundService.priceDetails && foundService.priceDetails.length > 0) {
        setServiceType(foundService.priceDetails[0].service);
      }
    }
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [slug]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !phone || !address || !appointmentDate || !appointmentTime) {
      toast({
        title: "بيانات مفقودة",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }
    
    setSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "تم تقديم الطلب بنجاح",
        description: "سنتواصل معك قريباً لتأكيد موعد الزيارة المنزلية",
      });
      setSubmitting(false);
      // Reset form
      setName('');
      setPhone('');
      setAddress('');
      setAppointmentDate('');
      setAppointmentTime('');
      setNotes('');
    }, 1500);
  };
  
  // Get the current service price based on selection
  const getCurrentPrice = () => {
    if (!service || !serviceType) return service?.price;
    
    const priceDetail = service.priceDetails?.find(p => p.service === serviceType);
    return priceDetail ? priceDetail.price : service.price;
  };

  // Return to services list if service not found
  if (!service) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="container mx-auto py-16 text-center">
          <div className="text-6xl mb-6">😕</div>
          <h1 className="text-3xl font-bold mb-4">لم يتم العثور على الخدمة</h1>
          <p className="text-gray-600 mb-8">
            عذراً، لا يمكن العثور على الخدمة التي تبحث عنها.
          </p>
          <Link to="/home-services">
            <Button className="bg-medical-primary hover:bg-medical-dark text-white">
              العودة إلى قائمة الخدمات المنزلية
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const ServiceIcon = service.icon;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Service Header */}
        <section className="bg-medical-light py-8 px-4">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center mb-4">
              <Link to="/home-services" className="flex items-center text-medical-primary mb-4 md:mb-0">
                <ArrowLeft className="h-5 w-5 ml-1" />
                <span>العودة إلى الخدمات المنزلية</span>
              </Link>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-md">
                <ServiceIcon className="h-10 w-10 text-medical-primary" />
              </div>
              
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-1">{service.name}</h1>
                <p className="text-gray-600 md:text-lg mb-3">{service.description}</p>
                
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center text-gray-600">
                    <DollarSign className="h-4 w-4 ml-1 text-medical-primary" />
                    <span className="font-semibold">
                      يبدأ من {service.price.toLocaleString()} د.ع
                    </span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-4 w-4 ml-1 text-medical-primary" />
                    <span>{service.availability}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 ml-1 text-medical-primary" />
                    <span>متوفرة في {service.coverage.join('، ')}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 md:mt-0">
                <Button 
                  className="bg-medical-primary hover:bg-medical-dark"
                  onClick={() => document.getElementById('booking-section')?.scrollIntoView({behavior: 'smooth'})}
                >
                  <Calendar className="h-5 w-5 ml-2" />
                  احجز الآن
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Service Details */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <Tabs defaultValue="details" className="w-full">
                  <TabsList className="w-full border-b">
                    <TabsTrigger value="details" className="flex-1">تفاصيل الخدمة</TabsTrigger>
                    <TabsTrigger value="requirements" className="flex-1">متطلبات الخدمة</TabsTrigger>
                    <TabsTrigger value="prices" className="flex-1">الأسعار</TabsTrigger>
                    <TabsTrigger value="faq" className="flex-1">الأسئلة الشائعة</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="details" className="pt-6">
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-2xl font-bold mb-4">حول الخدمة</h2>
                        <p className="text-gray-700 leading-relaxed mb-6">
                          {service.longDescription}
                        </p>
                      </div>
                      
                      {service.benefits && (
                        <div>
                          <h3 className="text-xl font-bold mb-4">فوائد الخدمة</h3>
                          <ul className="space-y-2">
                            {service.benefits.map((benefit, index) => (
                              <li key={index} className="flex items-start">
                                <CheckCircle className="h-5 w-5 text-green-500 mt-1 ml-2 flex-shrink-0" />
                                <span>{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="requirements" className="pt-6">
                    <div>
                      <h2 className="text-2xl font-bold mb-4">متطلبات الخدمة</h2>
                      <p className="text-gray-700 mb-6">
                        لضمان تقديم الخدمة بشكل فعال ومريح، يرجى التأكد من توفر المتطلبات التالية:
                      </p>
                      
                      {service.requirements && service.requirements.length > 0 ? (
                        <ul className="space-y-3">
                          {service.requirements.map((req, index) => (
                            <li key={index} className="flex items-start">
                              <CheckCircle className="h-5 w-5 text-medical-primary mt-0.5 ml-2 flex-shrink-0" />
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-600">لا توجد متطلبات خاصة لهذه الخدمة.</p>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="prices" className="pt-6">
                    <div>
                      <h2 className="text-2xl font-bold mb-4">تفاصيل الأسعار</h2>
                      
                      {service.priceDetails && service.priceDetails.length > 0 ? (
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="bg-gray-100">
                                <th className="border py-3 px-4 text-right">الخدمة</th>
                                <th className="border py-3 px-4 text-right">السعر (د.ع)</th>
                              </tr>
                            </thead>
                            <tbody>
                              {service.priceDetails.map((detail, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                  <td className="border py-3 px-4">{detail.service}</td>
                                  <td className="border py-3 px-4">
                                    {detail.price.toLocaleString()}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <div className="flex justify-between items-center">
                            <span className="text-lg">سعر الخدمة الأساسي:</span>
                            <span className="font-bold text-xl">{service.price.toLocaleString()} د.ع</span>
                          </div>
                        </div>
                      )}
                      
                      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                        <div className="flex items-start">
                          <AlertCircle className="h-5 w-5 text-blue-500 mt-1 ml-2 flex-shrink-0" />
                          <div>
                            <p className="text-blue-700">ملاحظة حول الأسعار:</p>
                            <p className="text-blue-600 text-sm">
                              الأسعار قد تختلف حسب المنطقة، المسافة، ووقت الخدمة. قد تطبق رسوم إضافية للخدمات الطارئة أو خارج ساعات العمل.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="faq" className="pt-6">
                    <div>
                      <h2 className="text-2xl font-bold mb-4">الأسئلة الشائعة</h2>
                      
                      {service.faqs && service.faqs.length > 0 ? (
                        <div className="space-y-6">
                          {service.faqs.map((faq, index) => (
                            <div key={index} className="border-b pb-4">
                              <h3 className="font-bold text-lg mb-2 flex items-center">
                                <span className="h-6 w-6 rounded-full bg-medical-light text-medical-primary text-sm flex items-center justify-center mr-2">؟</span>
                                {faq.question}
                              </h3>
                              <p className="text-gray-700 pr-8">{faq.answer}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-600">لا توجد أسئلة شائعة لهذه الخدمة.</p>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
                
                {/* Booking Section */}
                <div id="booking-section" className="mt-12 pt-8 border-t">
                  <h2 className="text-2xl font-bold mb-6">حجز خدمة {service.name}</h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">الاسم الكامل *</Label>
                        <Input
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="أدخل اسمك الكامل"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">رقم الهاتف *</Label>
                        <Input
                          id="phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="أدخل رقم هاتفك"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="address">العنوان بالتفصيل *</Label>
                      <Textarea
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="أدخل عنوانك بالتفصيل"
                        required
                        rows={2}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="date">التاريخ المفضل *</Label>
                        <Input
                          id="date"
                          type="date"
                          value={appointmentDate}
                          onChange={(e) => setAppointmentDate(e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="time">الوقت المفضل *</Label>
                        <Input
                          id="time"
                          type="time"
                          value={appointmentTime}
                          onChange={(e) => setAppointmentTime(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    {service.priceDetails && service.priceDetails.length > 0 && (
                      <div className="space-y-2">
                        <Label>نوع الخدمة *</Label>
                        <RadioGroup value={serviceType} onValueChange={setServiceType}>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {service.priceDetails.map((detail, index) => (
                              <div key={index} className="flex items-center space-x-2 rtl:space-x-reverse">
                                <RadioGroupItem value={detail.service} id={`service-${index}`} />
                                <Label htmlFor={`service-${index}`} className="flex justify-between w-full">
                                  <span>{detail.service}</span>
                                  <span className="font-medium">{detail.price.toLocaleString()} د.ع</span>
                                </Label>
                              </div>
                            ))}
                          </div>
                        </RadioGroup>
                      </div>
                    )}
                    
                    <div className="space-y-2">
                      <Label htmlFor="notes">ملاحظات إضافية</Label>
                      <Textarea
                        id="notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="أي معلومات إضافية تود إخبارنا بها"
                        rows={3}
                      />
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-lg">السعر التقديري:</span>
                        <span className="font-bold text-xl text-medical-primary">
                          {getCurrentPrice()?.toLocaleString()} د.ع
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">
                        قد يتغير السعر النهائي بناءً على تفاصيل الخدمة وتقييم الحالة.
                      </p>
                    </div>
                    
                    <div className="pt-2">
                      <Button
                        type="submit"
                        className="w-full bg-medical-primary hover:bg-medical-dark"
                        disabled={submitting}
                      >
                        {submitting ? 'جاري تقديم الطلب...' : 'تقديم طلب الحجز'}
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
              
              {/* Sidebar */}
              <div>
                <Card className="sticky top-24">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-4">لماذا تختار خدماتنا المنزلية؟</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mr-3 flex-shrink-0">
                          <Shield className="h-5 w-5 text-medical-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">كادر طبي مؤهل</h4>
                          <p className="text-gray-600 text-sm">جميع الكوادر الطبية مرخصة ومعتمدة من وزارة الصحة</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mr-3 flex-shrink-0">
                          <Clock className="h-5 w-5 text-medical-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">خدمة سريعة</h4>
                          <p className="text-gray-600 text-sm">نصلك في أسرع وقت ممكن وبمواعيد مرنة تناسبك</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mr-3 flex-shrink-0">
                          <Award className="h-5 w-5 text-medical-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">أعلى معايير الجودة</h4>
                          <p className="text-gray-600 text-sm">نلتزم بتطبيق أعلى معايير الجودة والسلامة في جميع خدماتنا</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mr-3 flex-shrink-0">
                          <DollarSign className="h-5 w-5 text-medical-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">أسعار تنافسية</h4>
                          <p className="text-gray-600 text-sm">أسعارنا مناسبة وشفافة بدون أي رسوم خفية</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 pt-6 border-t">
                      <Button
                        className="w-full bg-medical-primary hover:bg-medical-dark"
                        onClick={() => document.getElementById('booking-section')?.scrollIntoView({behavior: 'smooth'})}
                      >
                        احجز الآن
                      </Button>
                      
                      <div className="text-center mt-4 text-gray-600">
                        <p className="mb-1">بحاجة لمساعدة؟</p>
                        <a href="tel:+9647712345678" className="font-medium text-medical-primary hover:underline">
                          +964 771 234 5678
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default HomeServiceDetail;
