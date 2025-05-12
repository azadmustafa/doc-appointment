
import { useState } from "react";
import { Calendar, Clock, MapPin, Phone, X, Check, CalendarX } from "lucide-react";
import { format } from "date-fns";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Mock appointment data
const appointments = [
  {
    id: 1,
    doctorName: "د. أحمد الشمري",
    doctorSpecialty: "قلب وأوعية دموية",
    doctorImage: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    date: "2025-05-16",
    time: "10:30",
    location: "الرياض، العليا، مجمع الطبي، عيادة 305",
    price: 350,
    status: "قادم",
    notes: "تأكد من إحضار نتائج الفحوصات السابقة وقائمة الأدوية الحالية."
  },
  {
    id: 2,
    doctorName: "د. سارة العتيبي",
    doctorSpecialty: "طب الأطفال",
    doctorImage: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    date: "2025-05-12",
    time: "14:00",
    location: "جدة، الروضة، مجمع العائلة الطبي، عيادة 112",
    price: 300,
    status: "مكتمل",
    notes: "تم وصف الأدوية اللازمة والمتابعة بعد أسبوعين."
  },
  {
    id: 3,
    doctorName: "د. محمد القحطاني",
    doctorSpecialty: "جراحة العظام",
    doctorImage: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    date: "2025-05-20",
    time: "09:00",
    location: "الرياض، النزهة، مستشفى المملكة، الطابق الثاني",
    price: 400,
    status: "قادم",
    notes: "الحضور قبل الموعد بنصف ساعة لإكمال الإجراءات الإدارية."
  },
  {
    id: 4,
    doctorName: "د. خالد الهاجري",
    doctorSpecialty: "طب العيون",
    doctorImage: "https://images.unsplash.com/photo-1622902046580-2b47f47f5471?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    date: "2025-04-25",
    time: "15:30",
    location: "الرياض، العليا، مركز العيون التخصصي",
    price: 380,
    status: "ملغي",
    notes: "تم إلغاء الموعد بطلب من المريض."
  }
];

const Appointments = () => {
  const [appointmentsList, setAppointmentsList] = useState(appointments);
  const [selectedAppointment, setSelectedAppointment] = useState<number | null>(null);

  const cancelAppointment = (id: number) => {
    setAppointmentsList(prev =>
      prev.map(appointment =>
        appointment.id === id ? { ...appointment, status: "ملغي" } : appointment
      )
    );
  };

  const formatAppointmentDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'dd/MM/yyyy');
  };

  const upcomingAppointments = appointmentsList.filter(app => app.status === "قادم");
  const completedAppointments = appointmentsList.filter(app => app.status === "مكتمل");
  const cancelledAppointments = appointmentsList.filter(app => app.status === "ملغي");

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8 text-center">مواعيدي</h1>
          
          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="upcoming" className="w-full">
              <TabsList className="mb-8 grid grid-cols-3">
                <TabsTrigger value="upcoming" className="text-lg">
                  قادمة <Badge className="ml-2 bg-medical-primary">{upcomingAppointments.length}</Badge>
                </TabsTrigger>
                <TabsTrigger value="completed" className="text-lg">
                  مكتملة <Badge className="ml-2 bg-green-500">{completedAppointments.length}</Badge>
                </TabsTrigger>
                <TabsTrigger value="cancelled" className="text-lg">
                  ملغاة <Badge className="ml-2 bg-gray-500">{cancelledAppointments.length}</Badge>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="upcoming">
                {upcomingAppointments.length === 0 ? (
                  <div className="text-center py-12">
                    <CalendarX className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-medium text-gray-500 mb-2">لا توجد مواعيد قادمة</h3>
                    <p className="text-gray-400 mb-6">ليس لديك أي مواعيد قادمة في الوقت الحالي</p>
                    <Button asChild className="bg-medical-primary hover:bg-medical-dark">
                      <a href="/doctors">احجز موعد جديد</a>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {upcomingAppointments.map(appointment => (
                      <div 
                        key={appointment.id} 
                        className="bg-white rounded-lg shadow-sm border p-4 md:p-6 hover:shadow-md transition-shadow"
                      >
                        <div className="flex flex-col md:flex-row gap-4">
                          <div className="md:w-1/4">
                            <img 
                              src={appointment.doctorImage} 
                              alt={appointment.doctorName} 
                              className="w-full h-32 object-cover rounded-md"
                            />
                          </div>
                          
                          <div className="md:w-3/4">
                            <div className="flex flex-col md:flex-row justify-between mb-4">
                              <div>
                                <h3 className="text-xl font-semibold">{appointment.doctorName}</h3>
                                <p className="text-medical-primary font-medium">{appointment.doctorSpecialty}</p>
                              </div>
                              
                              <Badge className="self-start mt-2 md:mt-0 bg-medical-primary text-white">
                                {appointment.status}
                              </Badge>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 mb-4">
                              <div className="flex items-center">
                                <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                                <span>التاريخ: {formatAppointmentDate(appointment.date)}</span>
                              </div>
                              
                              <div className="flex items-center">
                                <Clock className="h-5 w-5 text-gray-500 mr-2" />
                                <span>الوقت: {appointment.time}</span>
                              </div>
                              
                              <div className="flex items-center md:col-span-2">
                                <MapPin className="h-5 w-5 text-gray-500 mr-2" />
                                <span>العنوان: {appointment.location}</span>
                              </div>
                            </div>
                            
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                              <div>
                                <p className="text-sm text-gray-500">سعر الكشف</p>
                                <p className="font-semibold text-medical-primary">{appointment.price} ريال</p>
                              </div>
                              
                              <div className="flex flex-wrap gap-2">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="border-medical-primary text-medical-primary hover:bg-medical-light"
                                  onClick={() => setSelectedAppointment(appointment.id === selectedAppointment ? null : appointment.id)}
                                >
                                  تفاصيل
                                </Button>
                                
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button 
                                      variant="outline" 
                                      size="sm"
                                      className="border-destructive text-destructive hover:bg-red-50"
                                    >
                                      إلغاء الموعد
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>هل أنت متأكد من إلغاء الموعد؟</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        سيتم إلغاء موعدك مع {appointment.doctorName} في تاريخ {formatAppointmentDate(appointment.date)} الساعة {appointment.time}.
                                        هذا الإجراء لا يمكن التراجع عنه.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>تراجع</AlertDialogCancel>
                                      <AlertDialogAction 
                                        className="bg-destructive hover:bg-destructive/90"
                                        onClick={() => cancelAppointment(appointment.id)}
                                      >
                                        إلغاء الموعد
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                                
                                <Button 
                                  size="sm"
                                  className="bg-medical-primary hover:bg-medical-dark"
                                >
                                  <Phone className="h-4 w-4 mr-2" />
                                  اتصل بالعيادة
                                </Button>
                              </div>
                            </div>
                            
                            {selectedAppointment === appointment.id && (
                              <div className="mt-4 p-4 bg-gray-50 rounded-md">
                                <h4 className="font-medium mb-2">ملاحظات:</h4>
                                <p className="text-gray-700">{appointment.notes}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="completed">
                {completedAppointments.length === 0 ? (
                  <div className="text-center py-12">
                    <Check className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-medium text-gray-500 mb-2">لا توجد مواعيد مكتملة</h3>
                    <p className="text-gray-400">ستظهر هنا قائمة المواعيد التي قمت بحضورها</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {completedAppointments.map(appointment => (
                      <div 
                        key={appointment.id} 
                        className="bg-white rounded-lg shadow-sm border p-4 md:p-6 hover:shadow-md transition-shadow"
                      >
                        <div className="flex flex-col md:flex-row gap-4">
                          <div className="md:w-1/4">
                            <img 
                              src={appointment.doctorImage} 
                              alt={appointment.doctorName} 
                              className="w-full h-32 object-cover rounded-md"
                            />
                          </div>
                          
                          <div className="md:w-3/4">
                            <div className="flex flex-col md:flex-row justify-between mb-4">
                              <div>
                                <h3 className="text-xl font-semibold">{appointment.doctorName}</h3>
                                <p className="text-medical-primary font-medium">{appointment.doctorSpecialty}</p>
                              </div>
                              
                              <Badge className="self-start mt-2 md:mt-0 bg-green-500 text-white">
                                {appointment.status}
                              </Badge>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 mb-4">
                              <div className="flex items-center">
                                <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                                <span>التاريخ: {formatAppointmentDate(appointment.date)}</span>
                              </div>
                              
                              <div className="flex items-center">
                                <Clock className="h-5 w-5 text-gray-500 mr-2" />
                                <span>الوقت: {appointment.time}</span>
                              </div>
                              
                              <div className="flex items-center md:col-span-2">
                                <MapPin className="h-5 w-5 text-gray-500 mr-2" />
                                <span>العنوان: {appointment.location}</span>
                              </div>
                            </div>
                            
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                              <div>
                                <p className="text-sm text-gray-500">سعر الكشف</p>
                                <p className="font-semibold text-medical-primary">{appointment.price} ريال</p>
                              </div>
                              
                              <div className="flex flex-wrap gap-2">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="border-medical-primary text-medical-primary hover:bg-medical-light"
                                  onClick={() => setSelectedAppointment(appointment.id === selectedAppointment ? null : appointment.id)}
                                >
                                  تفاصيل
                                </Button>
                                
                                <Button 
                                  size="sm"
                                  className="bg-medical-primary hover:bg-medical-dark"
                                >
                                  حجز موعد متابعة
                                </Button>
                              </div>
                            </div>
                            
                            {selectedAppointment === appointment.id && (
                              <div className="mt-4 p-4 bg-gray-50 rounded-md">
                                <h4 className="font-medium mb-2">ملاحظات:</h4>
                                <p className="text-gray-700">{appointment.notes}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="cancelled">
                {cancelledAppointments.length === 0 ? (
                  <div className="text-center py-12">
                    <X className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-medium text-gray-500 mb-2">لا توجد مواعيد ملغاة</h3>
                    <p className="text-gray-400">ستظهر هنا قائمة المواعيد التي قمت بإلغائها</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cancelledAppointments.map(appointment => (
                      <div 
                        key={appointment.id} 
                        className="bg-white rounded-lg shadow-sm border p-4 md:p-6 hover:shadow-md transition-shadow"
                      >
                        <div className="flex flex-col md:flex-row gap-4">
                          <div className="md:w-1/4">
                            <img 
                              src={appointment.doctorImage} 
                              alt={appointment.doctorName} 
                              className="w-full h-32 object-cover rounded-md"
                            />
                          </div>
                          
                          <div className="md:w-3/4">
                            <div className="flex flex-col md:flex-row justify-between mb-4">
                              <div>
                                <h3 className="text-xl font-semibold">{appointment.doctorName}</h3>
                                <p className="text-medical-primary font-medium">{appointment.doctorSpecialty}</p>
                              </div>
                              
                              <Badge className="self-start mt-2 md:mt-0 bg-gray-500 text-white">
                                {appointment.status}
                              </Badge>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 mb-4">
                              <div className="flex items-center">
                                <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                                <span>التاريخ: {formatAppointmentDate(appointment.date)}</span>
                              </div>
                              
                              <div className="flex items-center">
                                <Clock className="h-5 w-5 text-gray-500 mr-2" />
                                <span>الوقت: {appointment.time}</span>
                              </div>
                              
                              <div className="flex items-center md:col-span-2">
                                <MapPin className="h-5 w-5 text-gray-500 mr-2" />
                                <span>العنوان: {appointment.location}</span>
                              </div>
                            </div>
                            
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                              <div>
                                <p className="text-sm text-gray-500">سعر الكشف</p>
                                <p className="font-semibold text-medical-primary">{appointment.price} ريال</p>
                              </div>
                              
                              <div className="flex flex-wrap gap-2">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="border-medical-primary text-medical-primary hover:bg-medical-light"
                                  onClick={() => setSelectedAppointment(appointment.id === selectedAppointment ? null : appointment.id)}
                                >
                                  تفاصيل
                                </Button>
                                
                                <Button 
                                  size="sm"
                                  className="bg-medical-primary hover:bg-medical-dark"
                                  asChild
                                >
                                  <a href={`/doctors/${appointment.id}`}>حجز موعد جديد</a>
                                </Button>
                              </div>
                            </div>
                            
                            {selectedAppointment === appointment.id && (
                              <div className="mt-4 p-4 bg-gray-50 rounded-md">
                                <h4 className="font-medium mb-2">ملاحظات:</h4>
                                <p className="text-gray-700">{appointment.notes}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Appointments;
