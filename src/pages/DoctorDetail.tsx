
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { 
  MapPin, 
  Star, 
  Calendar, 
  Clock, 
  Shield, 
  Award, 
  ThumbsUp,
  User,
  CreditCard,
  CheckCircle,
  Language,
  Image as ImageIcon,
  X
} from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger
} from "@/components/ui/dialog";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Mock doctor data
const doctorData = {
  id: 1,
  name: "د. أحمد الشمري",
  specialty: "قلب وأوعية دموية",
  image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
  cover: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
  rating: 4.9,
  reviewCount: 124,
  location: "الرياض، العليا",
  address: "شارع العليا، مجمع الطبي، الطابق الثالث، عيادة رقم 305",
  price: 350,
  experience: 15,
  consultationDuration: "30 دقيقة",
  languages: ["العربية", "الإنجليزية", "الفرنسية"],
  about: "استشاري أمراض القلب والأوعية الدموية مع خبرة أكثر من 15 عامًا في تشخيص وعلاج أمراض القلب. حاصل على البورد الأمريكي في طب القلب وزمالة جامعة هارفارد في قسطرة القلب التداخلية. متخصص في علاج مشاكل القلب المختلفة مثل الذبحة الصدرية، اعتلال عضلة القلب، وارتفاع ضغط الدم.",
  education: [
    {
      degree: "دكتوراه في طب القلب",
      university: "جامعة هارفارد",
      year: "2008"
    },
    {
      degree: "ماجستير في الطب الباطني",
      university: "جامعة الملك سعود",
      year: "2003"
    },
    {
      degree: "بكالوريوس الطب والجراحة",
      university: "جامعة الملك سعود",
      year: "1998"
    }
  ],
  services: [
    "تشخيص وعلاج أمراض القلب والشرايين",
    "تخطيط القلب الكهربائي",
    "الموجات فوق الصوتية للقلب",
    "تقييم مخاطر القلب",
    "رسم القلب بالمجهود",
    "استشارات ما قبل العمليات الجراحية"
  ],
  clinics: [
    {
      id: 1,
      name: "عيادة الدكتور أحمد - المجمع الطبي الحديث",
      address: "شارع العليا، مجمع الطبي، الطابق الثالث، عيادة رقم 305",
      phone: "+966 11 234 5678",
      workHours: "السبت - الخميس: 9 صباحًا - 5 مساءًا",
      price: 350,
      images: [
        "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1504439468489-c8920d796a29?ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3"
      ]
    },
    {
      id: 2,
      name: "مركز القلب التخصصي",
      address: "طريق الملك فهد، برج الفيصلية الطبي، الطابق السابع، جناح 712",
      phone: "+966 11 987 6543",
      workHours: "الأحد - الخميس: 10 صباحًا - 6 مساءًا",
      price: 450,
      images: [
        "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1580281780460-82d277b0e3f8?ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1631815588090-d4bfec5b7784?ixlib=rb-4.0.3"
      ]
    }
  ],
  ratings: {
    overall: 4.9,
    count: 124,
    distribution: {
      5: 92,
      4: 27,
      3: 3,
      2: 1,
      1: 1
    }
  },
  reviews: [
    {
      id: 1,
      name: "خالد العنزي",
      date: "2023-10-05",
      rating: 5,
      comment: "أفضل دكتور قلب زرته. شرح لي حالتي بالتفصيل وكان صبوراً جداً في الإجابة على جميع أسئلتي."
    },
    {
      id: 2,
      name: "نورة المطيري",
      date: "2023-09-22",
      rating: 5,
      comment: "الدكتور أحمد من أفضل أطباء القلب. ساعدني كثيراً في السيطرة على ضغط الدم المرتفع."
    },
    {
      id: 3,
      name: "فهد السبيعي",
      date: "2023-08-15",
      rating: 4,
      comment: "طبيب متميز ولكن وقت الانتظار كان طويلاً بعض الشيء. غير ذلك، التشخيص كان دقيقاً والعلاج فعال."
    }
  ]
};

// Available time slots
const timeSlots = [
  { time: "09:00", available: true },
  { time: "09:30", available: true },
  { time: "10:00", available: false },
  { time: "10:30", available: true },
  { time: "11:00", available: true },
  { time: "11:30", available: false },
  { time: "12:00", available: true },
  { time: "12:30", available: false },
  { time: "14:00", available: true },
  { time: "14:30", available: true },
  { time: "15:00", available: true },
  { time: "15:30", available: false },
  { time: "16:00", available: true },
  { time: "16:30", available: true },
];

const DoctorDetail = () => {
  useEffect(() => {
    // Scroll to the top of the page when component mounts
    window.scrollTo(0, 0);
  }, []);
  
  const { id } = useParams();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedClinic, setSelectedClinic] = useState<number>(doctorData.clinics[0].id);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [bookingInfo, setBookingInfo] = useState({
    name: "",
    phone: "",
    email: "",
    reason: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBookingInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleBookAppointment = () => {
    setBookingModalOpen(false);
    setConfirmationModalOpen(true);
  };

  // Calculate rating percentages
  const getRatingPercentage = (rating: number) => {
    return (doctorData.ratings.distribution[rating as keyof typeof doctorData.ratings.distribution] / doctorData.ratings.count) * 100;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Cover & Profile Section */}
        <div className="relative">
          <div className="h-64 bg-medical-light overflow-hidden">
            <img 
              src={doctorData.cover} 
              alt="Cover" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="container mx-auto px-4 relative -mt-20">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/4 flex justify-center">
                  <img 
                    src={doctorData.image} 
                    alt={doctorData.name} 
                    className="w-40 h-40 rounded-full border-4 border-white shadow"
                  />
                </div>
                
                <div className="md:w-3/4 mt-6 md:mt-0">
                  <div className="flex flex-col md:flex-row justify-between">
                    <div>
                      <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{doctorData.name}</h1>
                      <p className="text-medical-primary font-medium">{doctorData.specialty}</p>
                      
                      <div className="flex items-center mt-2">
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        <span className="ml-1 font-medium">{doctorData.rating}</span>
                        <span className="text-gray-500 mx-1">•</span>
                        <span className="text-gray-500">{doctorData.reviewCount} تقييم</span>
                      </div>
                      
                      <div className="flex items-center mt-2">
                        <MapPin className="h-5 w-5 text-gray-500 mr-1" />
                        <span className="text-gray-700">{doctorData.address}</span>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-2 mt-3">
                        <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                          <Clock className="h-4 w-4 text-gray-600 ml-1" />
                          <span className="text-sm">{doctorData.consultationDuration}</span>
                        </div>
                        <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                          <Language className="h-4 w-4 text-gray-600 ml-1" />
                          <span className="text-sm">{doctorData.languages.join(', ')}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 md:mt-0 flex flex-col items-start md:items-end">
                      <div className="mb-3">
                        <span className="text-gray-500">سعر الكشف</span>
                        <div className="text-2xl font-bold text-medical-primary">{doctorData.price} ريال</div>
                      </div>
                      
                      <Button 
                        onClick={() => setBookingModalOpen(true)}
                        className="bg-medical-primary hover:bg-medical-dark"
                      >
                        حجز موعد
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Doctor Info Tabs */}
        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="mb-8 flex flex-wrap justify-center">
              <TabsTrigger value="about" className="text-lg">نبذة عن الطبيب</TabsTrigger>
              <TabsTrigger value="education" className="text-lg">المؤهلات العلمية</TabsTrigger>
              <TabsTrigger value="services" className="text-lg">الخدمات الطبية</TabsTrigger>
              <TabsTrigger value="clinics" className="text-lg">العيادات</TabsTrigger>
              <TabsTrigger value="reviews" className="text-lg">التقييمات</TabsTrigger>
            </TabsList>
            
            <TabsContent value="about" className="mt-4">
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="md:col-span-3">
                      <h2 className="text-xl font-semibold mb-4">نبذة عن الطبيب</h2>
                      <p className="text-gray-700 leading-relaxed">{doctorData.about}</p>
                    </div>
                    
                    <div className="md:col-span-1">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="font-medium text-lg mb-4">معلومات إضافية</h3>
                        
                        <div className="space-y-4">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-medical-light flex items-center justify-center">
                              <Calendar className="h-5 w-5 text-medical-primary" />
                            </div>
                            <div className="ml-3">
                              <div className="text-sm text-gray-500">سنوات الخبرة</div>
                              <div className="font-medium">{doctorData.experience} سنة</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-medical-light flex items-center justify-center">
                              <Clock className="h-5 w-5 text-medical-primary" />
                            </div>
                            <div className="ml-3">
                              <div className="text-sm text-gray-500">مدة الكشف</div>
                              <div className="font-medium">{doctorData.consultationDuration}</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-medical-light flex items-center justify-center">
                              <Shield className="h-5 w-5 text-medical-primary" />
                            </div>
                            <div className="ml-3">
                              <div className="text-sm text-gray-500">الترخيص</div>
                              <div className="font-medium">مرخص من الهيئة السعودية للتخصصات الصحية</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-medical-light flex items-center justify-center">
                              <Award className="h-5 w-5 text-medical-primary" />
                            </div>
                            <div className="ml-3">
                              <div className="text-sm text-gray-500">التصنيف</div>
                              <div className="font-medium">استشاري</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-medical-light flex items-center justify-center">
                              <Language className="h-5 w-5 text-medical-primary" />
                            </div>
                            <div className="ml-3">
                              <div className="text-sm text-gray-500">اللغات</div>
                              <div className="font-medium">{doctorData.languages.join(', ')}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="education">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-6">المؤهلات العلمية</h2>
                  
                  <div className="space-y-6">
                    {doctorData.education.map((edu, index) => (
                      <div key={index} className="flex">
                        <div className="w-10 h-10 rounded-full bg-medical-light flex items-center justify-center mt-1">
                          <Award className="h-5 w-5 text-medical-primary" />
                        </div>
                        <div className="ml-4">
                          <h3 className="font-semibold text-lg">{edu.degree}</h3>
                          <p className="text-gray-700">{edu.university}</p>
                          <p className="text-gray-500">{edu.year}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="services">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-6">الخدمات الطبية</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {doctorData.services.map((service, index) => (
                      <div key={index} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-medical-secondary mr-2" />
                        <span>{service}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="clinics">
              <div className="space-y-6">
                {doctorData.clinics.map((clinic) => (
                  <Card key={clinic.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="p-6">
                        <h2 className="text-xl font-semibold mb-2">{clinic.name}</h2>
                        
                        <div className="flex flex-col md:flex-row md:items-start gap-6">
                          <div className="md:w-2/3">
                            <div className="space-y-4">
                              <div className="flex items-start">
                                <MapPin className="h-5 w-5 text-medical-primary mt-1 ml-2" />
                                <div>
                                  <h3 className="font-medium mb-1">العنوان</h3>
                                  <p className="text-gray-600">{clinic.address}</p>
                                </div>
                              </div>
                              
                              <div className="flex items-start">
                                <Clock className="h-5 w-5 text-medical-primary mt-1 ml-2" />
                                <div>
                                  <h3 className="font-medium mb-1">أوقات العمل</h3>
                                  <p className="text-gray-600">{clinic.workHours}</p>
                                </div>
                              </div>
                              
                              <div className="flex items-start">
                                <CreditCard className="h-5 w-5 text-medical-primary mt-1 ml-2" />
                                <div>
                                  <h3 className="font-medium mb-1">سعر الكشف</h3>
                                  <p className="text-gray-600">{clinic.price} ريال</p>
                                </div>
                              </div>
                              
                              <Button 
                                className="bg-medical-primary hover:bg-medical-dark"
                                onClick={() => {
                                  setSelectedClinic(clinic.id);
                                  setBookingModalOpen(true);
                                }}
                              >
                                حجز موعد في هذه العيادة
                              </Button>
                            </div>
                          </div>
                          
                          <div className="md:w-1/3">
                            <h3 className="font-medium flex items-center mb-3">
                              <ImageIcon className="h-5 w-5 mr-1" />
                              معرض الصور
                            </h3>
                            <div className="grid grid-cols-3 gap-2">
                              {clinic.images.map((image, index) => (
                                <div 
                                  key={index} 
                                  className="cursor-pointer rounded-md overflow-hidden hover:opacity-90 transition-opacity"
                                  onClick={() => setSelectedImage(image)}
                                >
                                  <img 
                                    src={image} 
                                    alt={`صورة العيادة ${index+1}`} 
                                    className="h-20 w-full object-cover"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="reviews">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/3">
                      <div className="bg-gray-50 p-6 rounded-lg text-center">
                        <div className="text-4xl font-bold text-medical-primary mb-2">{doctorData.ratings.overall}</div>
                        <div className="flex justify-center mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-5 w-5 ${i < Math.round(doctorData.ratings.overall) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                        <div className="text-gray-500">بناءً على {doctorData.ratings.count} تقييم</div>
                        
                        <div className="mt-6 space-y-3">
                          {[5, 4, 3, 2, 1].map((rating) => (
                            <div key={rating} className="flex items-center">
                              <span className="w-8 text-right">{rating}</span>
                              <Star className="h-4 w-4 mx-1 fill-yellow-400 text-yellow-400" />
                              <div className="flex-grow mx-2">
                                <Progress value={getRatingPercentage(rating)} className="h-2" />
                              </div>
                              <span className="text-gray-500 text-sm">
                                {doctorData.ratings.distribution[rating as keyof typeof doctorData.ratings.distribution]}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="md:w-2/3">
                      <h2 className="text-xl font-semibold mb-6">آراء المرضى</h2>
                      
                      <div className="space-y-6">
                        {doctorData.reviews.map((review) => (
                          <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0">
                            <div className="flex justify-between">
                              <div className="flex items-center">
                                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                                  <User className="h-6 w-6 text-gray-500" />
                                </div>
                                <div className="ml-3">
                                  <div className="font-medium">{review.name}</div>
                                  <div className="text-gray-500 text-sm">
                                    {new Date(review.date).toLocaleDateString('ar-SA', { 
                                      year: 'numeric', 
                                      month: 'long', 
                                      day: 'numeric' 
                                    })}
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`h-5 w-5 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                                  />
                                ))}
                              </div>
                            </div>
                            
                            <p className="mt-3 text-gray-700">{review.comment}</p>
                            
                            <div className="mt-2">
                              <button className="flex items-center text-gray-500 text-sm hover:text-medical-primary">
                                <ThumbsUp className="h-4 w-4 mr-1" />
                                <span>مفيد</span>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      {/* Booking Modal */}
      <Dialog open={bookingModalOpen} onOpenChange={setBookingModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-xl text-center">حجز موعد مع {doctorData.name}</DialogTitle>
          </DialogHeader>
          
          <div>
            <h3 className="font-medium mb-2">العيادة</h3>
            <select 
              className="w-full rounded-md border-gray-300 mb-4" 
              value={selectedClinic}
              onChange={(e) => setSelectedClinic(Number(e.target.value))}
            >
              {doctorData.clinics.map((clinic) => (
                <option key={clinic.id} value={clinic.id}>
                  {clinic.name} - {clinic.price} ريال
                </option>
              ))}
            </select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <h3 className="font-medium mb-3">اختر التاريخ</h3>
              <CalendarComponent
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="border rounded-md pointer-events-auto"
                disabled={{ before: new Date() }}
              />
            </div>
            
            <div>
              <h3 className="font-medium mb-3">اختر الوقت</h3>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((slot, index) => (
                  <button
                    key={index}
                    className={`py-2 px-1 rounded-md text-center ${
                      slot.available 
                        ? selectedTime === slot.time
                          ? 'bg-medical-primary text-white'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-50'
                    }`}
                    onClick={() => slot.available && setSelectedTime(slot.time)}
                    disabled={!slot.available}
                  >
                    {slot.time}
                  </button>
                ))}
              </div>
              
              <h3 className="font-medium mt-6 mb-3">معلومات الحجز</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الاسم الكامل</label>
                  <input
                    type="text"
                    name="name"
                    value={bookingInfo.name}
                    onChange={handleInputChange}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-medical-primary focus:ring-medical-primary"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">رقم الهاتف</label>
                  <input
                    type="tel"
                    name="phone"
                    value={bookingInfo.phone}
                    onChange={handleInputChange}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-medical-primary focus:ring-medical-primary"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
                  <input
                    type="email"
                    name="email"
                    value={bookingInfo.email}
                    onChange={handleInputChange}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-medical-primary focus:ring-medical-primary"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">سبب الزيارة</label>
                  <textarea
                    name="reason"
                    value={bookingInfo.reason}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-medical-primary focus:ring-medical-primary"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter className="mt-6">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setBookingModalOpen(false)}
            >
              إلغاء
            </Button>
            <Button 
              type="button" 
              className="bg-medical-primary hover:bg-medical-dark"
              onClick={handleBookAppointment}
              disabled={!selectedDate || !selectedTime || !bookingInfo.name || !bookingInfo.phone}
            >
              <CreditCard className="h-4 w-4 mr-2" /> تأكيد الحجز
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Confirmation Modal */}
      <Dialog open={confirmationModalOpen} onOpenChange={setConfirmationModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">تم الحجز بنجاح!</h2>
            <p className="text-gray-600 mb-6">
              لقد تم تأكيد حجزك مع {doctorData.name} يوم{' '}
              {selectedDate && format(selectedDate, 'dd/MM/yyyy')} الساعة {selectedTime}.
            </p>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-right">
              <div className="flex justify-between mb-2">
                <span className="font-medium">الطبيب:</span>
                <span>{doctorData.name}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-medium">التخصص:</span>
                <span>{doctorData.specialty}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-medium">العيادة:</span>
                <span>{doctorData.clinics.find(c => c.id === selectedClinic)?.name}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-medium">التاريخ:</span>
                <span>{selectedDate && format(selectedDate, 'dd/MM/yyyy')}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-medium">الوقت:</span>
                <span>{selectedTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">رسوم الكشف:</span>
                <span className="text-medical-primary font-semibold">
                  {doctorData.clinics.find(c => c.id === selectedClinic)?.price} ريال
                </span>
              </div>
            </div>
            
            <p className="text-gray-500 text-sm mb-4">
              تم إرسال تفاصيل الحجز إلى بريدك الإلكتروني ورقم هاتفك.
            </p>
            
            <Button 
              className="w-full bg-medical-primary hover:bg-medical-dark"
              onClick={() => setConfirmationModalOpen(false)}
            >
              موافق
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Image Gallery Modal */}
      <Dialog open={selectedImage !== null} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className="sm:max-w-[80vw] max-h-[90vh] p-1">
          <div className="relative">
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-2 right-2 rounded-full bg-black bg-opacity-40 text-white hover:bg-opacity-60 z-10"
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-5 w-5" />
            </Button>
            {selectedImage && (
              <img 
                src={selectedImage} 
                alt="صورة العيادة"
                className="w-full max-h-[80vh] object-contain" 
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default DoctorDetail;
