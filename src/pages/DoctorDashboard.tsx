
import React from 'react';
import { Activity, Users, MessageSquare, Calendar, Settings, TrendingUp, DollarSign } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const DoctorDashboard = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">لوحة تحكم الطبيب</h1>
            <p className="text-gray-600 mt-2">مرحبًا بك، د. أحمد. هذه نظرة عامة على نشاطاتك الحالية</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {/* المواعيد */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-medical-primary" />
                  المواعيد
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">42</p>
                <p className="text-sm text-gray-600">هذا الأسبوع</p>
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>التقدم</span>
                    <span>70%</span>
                  </div>
                  <Progress value={70} className="h-2" />
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <p className="text-sm text-green-600">+12% عن الأسبوع الماضي</p>
              </CardFooter>
            </Card>
            
            {/* المرضى */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  المرضى
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">127</p>
                <p className="text-sm text-gray-600">المجموع</p>
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>مرضى جُدد</span>
                    <span>8</span>
                  </div>
                  <Progress value={40} className="h-2" />
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <p className="text-sm text-green-600">+5% عن الشهر الماضي</p>
              </CardFooter>
            </Card>
            
            {/* الاستشارات */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-purple-600" />
                  الاستشارات
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">18</p>
                <p className="text-sm text-gray-600">استشارات معلقة</p>
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>تم الرد</span>
                    <span>63%</span>
                  </div>
                  <Progress value={63} className="h-2" />
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <p className="text-sm text-yellow-600">5 استشارات جديدة</p>
              </CardFooter>
            </Card>
            
            {/* الإيرادات */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  الإيرادات
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">5,280</p>
                <p className="text-sm text-gray-600">هذا الشهر (دينار)</p>
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>الهدف</span>
                    <span>85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <p className="text-sm text-green-600">+18% عن الشهر الماضي</p>
              </CardFooter>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* النشاطات الأخيرة */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-xl">النشاطات الأخيرة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-5">
                  {[
                    { id: 1, type: "موعد", name: "محمد علي", time: "10:30 ص", date: "اليوم" },
                    { id: 2, type: "استشارة", name: "فاطمة أحمد", time: "12:15 م", date: "اليوم" },
                    { id: 3, type: "طلب تسعير", name: "سمير خالد", time: "3:45 م", date: "أمس" },
                    { id: 4, type: "موعد", name: "ليلى محمود", time: "11:00 ص", date: "غدًا" },
                    { id: 5, type: "استشارة", name: "رامي حسن", time: "5:30 م", date: "أمس" }
                  ].map(activity => (
                    <div key={activity.id} className="flex items-center justify-between border-b border-gray-100 pb-3">
                      <div className="flex items-center">
                        <div className="ml-3">
                          <Activity className="h-5 w-5 text-medical-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{activity.name}</p>
                          <p className="text-sm text-gray-500">{activity.type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{activity.time}</p>
                        <p className="text-xs text-gray-500">{activity.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <a href="#" className="text-medical-primary text-sm hover:underline">
                  عرض جميع النشاطات
                </a>
              </CardFooter>
            </Card>
            
            {/* مخطط الأداء */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">الأداء الأسبوعي</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] flex flex-col justify-center items-center">
                  <TrendingUp className="h-16 w-16 text-medical-primary mb-4" />
                  <p className="text-center text-gray-500 mb-6">
                    مخطط بياني يعرض معدل الأداء الأسبوعي
                  </p>
                  <div className="w-full flex justify-between">
                    <div className="text-center">
                      <p className="text-sm font-medium">المواعيد</p>
                      <p className="text-lg font-bold text-medical-primary">24</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium">الاستشارات</p>
                      <p className="text-lg font-bold text-medical-primary">18</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium">التقييمات</p>
                      <p className="text-lg font-bold text-medical-primary">4.8</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DoctorDashboard;
