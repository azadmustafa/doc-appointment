
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Users, Calendar, DollarSign, Activity, FileText, Star } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Dashboard = () => {
  // This would normally be fetched from an API
  const analyticsData = {
    dailyAppointments: {
      total: 247,
      percentChange: 15,
      increasing: true
    },
    doctors: {
      total: 128,
      newThisWeek: 8,
      percentChange: 5,
      increasing: true
    },
    revenue: {
      total: 21500,
      percentChange: 12,
      increasing: true
    },
    patients: {
      total: 3842,
      percentChange: 3,
      increasing: false
    },
    userActivity: {
      searches: 3210,
      profileViews: 14260,
      bookings: 842,
      percentChange: 8,
      increasing: true
    },
    satisfaction: {
      rating: 4.7,
      reviews: 1903,
      percentChange: 2,
      increasing: true
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">لوحة الإحصائيات الحية</h1>
              <p className="text-gray-600 mt-2">نظرة عامة على أداء المنصة في الوقت الفعلي</p>
            </div>
            <div className="text-sm text-gray-500">
              آخر تحديث: {new Date().toLocaleString('ar-IQ')}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {/* المواعيد اليومية */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-medical-primary" />
                  المواعيد اليومية
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <p className="text-3xl font-bold">{analyticsData.dailyAppointments.total}</p>
                  <div className={`flex items-center ${
                    analyticsData.dailyAppointments.increasing ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {analyticsData.dailyAppointments.increasing ? 
                      <TrendingUp className="h-5 w-5 ml-1" /> : 
                      <TrendingDown className="h-5 w-5 ml-1" />
                    }
                    <span>{analyticsData.dailyAppointments.percentChange}%</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600">عدد المواعيد المحجوزة اليوم</p>
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>نسبة الإكمال</span>
                    <span>82%</span>
                  </div>
                  <Progress value={82} className="h-2" />
                </div>
              </CardContent>
            </Card>
            
            {/* الأطباء */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  الأطباء
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <p className="text-3xl font-bold">{analyticsData.doctors.total}</p>
                  <div className={`flex items-center ${
                    analyticsData.doctors.increasing ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {analyticsData.doctors.increasing ? 
                      <TrendingUp className="h-5 w-5 ml-1" /> : 
                      <TrendingDown className="h-5 w-5 ml-1" />
                    }
                    <span>{analyticsData.doctors.percentChange}%</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{analyticsData.doctors.newThisWeek} أطباء جدد هذا الأسبوع</p>
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>نسبة التفاعل</span>
                    <span>68%</span>
                  </div>
                  <Progress value={68} className="h-2" />
                </div>
              </CardContent>
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
                <div className="flex justify-between items-center">
                  <p className="text-3xl font-bold">{analyticsData.revenue.total.toLocaleString('ar-IQ')}</p>
                  <div className={`flex items-center ${
                    analyticsData.revenue.increasing ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {analyticsData.revenue.increasing ? 
                      <TrendingUp className="h-5 w-5 ml-1" /> : 
                      <TrendingDown className="h-5 w-5 ml-1" />
                    }
                    <span>{analyticsData.revenue.percentChange}%</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600">الإيرادات اليومية (دينار)</p>
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>الهدف اليومي</span>
                    <span>72%</span>
                  </div>
                  <Progress value={72} className="h-2" />
                </div>
              </CardContent>
            </Card>
            
            {/* المرضى */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <Users className="h-5 w-5 text-purple-600" />
                  المرضى
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <p className="text-3xl font-bold">{analyticsData.patients.total.toLocaleString('ar-IQ')}</p>
                  <div className={`flex items-center ${
                    analyticsData.patients.increasing ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {analyticsData.patients.increasing ? 
                      <TrendingUp className="h-5 w-5 ml-1" /> : 
                      <TrendingDown className="h-5 w-5 ml-1" />
                    }
                    <span>{analyticsData.patients.percentChange}%</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600">إجمالي عدد المرضى المسجلين</p>
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>نمو شهري</span>
                    <span>45%</span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Activity className="h-6 w-6 text-medical-primary" />
                  نشاطات المستخدمين
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <span className="h-3 w-3 rounded-full bg-medical-primary ml-2"></span>
                        <span className="font-medium">عمليات البحث</span>
                      </div>
                      <span className="font-bold">{analyticsData.userActivity.searches.toLocaleString('ar-IQ')}</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <span className="h-3 w-3 rounded-full bg-blue-500 ml-2"></span>
                        <span className="font-medium">زيارات الصفحات الشخصية</span>
                      </div>
                      <span className="font-bold">{analyticsData.userActivity.profileViews.toLocaleString('ar-IQ')}</span>
                    </div>
                    <Progress value={90} className="h-2 bg-blue-100">
                      <div className="h-full bg-blue-500 rounded-full" />
                    </Progress>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <span className="h-3 w-3 rounded-full bg-green-500 ml-2"></span>
                        <span className="font-medium">حجوزات مكتملة</span>
                      </div>
                      <span className="font-bold">{analyticsData.userActivity.bookings.toLocaleString('ar-IQ')}</span>
                    </div>
                    <Progress value={60} className="h-2 bg-green-100">
                      <div className="h-full bg-green-500 rounded-full" />
                    </Progress>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">معدل النمو اليومي</span>
                    <div className={`flex items-center text-sm ${
                      analyticsData.userActivity.increasing ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {analyticsData.userActivity.increasing ? 
                        <TrendingUp className="h-4 w-4 ml-1" /> : 
                        <TrendingDown className="h-4 w-4 ml-1" />
                      }
                      <span>{analyticsData.userActivity.percentChange}%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Star className="h-6 w-6 text-yellow-500" />
                  رضا المستخدمين
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-8">
                  <div className="text-center">
                    <p className="text-5xl font-bold text-medical-primary">{analyticsData.satisfaction.rating}</p>
                    <p className="text-sm text-gray-500 mt-1">التقييم العام</p>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-3xl font-bold">{analyticsData.satisfaction.reviews.toLocaleString('ar-IQ')}</p>
                    <p className="text-sm text-gray-500 mt-1">إجمالي التقييمات</p>
                  </div>
                  
                  <div className="text-center">
                    <div className={`flex items-center justify-center text-lg font-bold ${
                      analyticsData.satisfaction.increasing ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {analyticsData.satisfaction.increasing ? 
                        <TrendingUp className="h-5 w-5 ml-1" /> : 
                        <TrendingDown className="h-5 w-5 ml-1" />
                      }
                      <span>{analyticsData.satisfaction.percentChange}%</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">النمو الشهري</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {[
                    { rating: 5, percent: 72 },
                    { rating: 4, percent: 18 },
                    { rating: 3, percent: 7 },
                    { rating: 2, percent: 2 },
                    { rating: 1, percent: 1 }
                  ].map((item) => (
                    <div key={item.rating} className="flex items-center">
                      <div className="flex items-center ml-2 w-8">
                        <span>{item.rating}</span>
                        <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />
                      </div>
                      <div className="flex-1">
                        <div className="bg-gray-200 h-2.5 rounded-full overflow-hidden">
                          <div 
                            className="bg-yellow-500 h-full rounded-full" 
                            style={{ width: `${item.percent}%` }}
                          ></div>
                        </div>
                      </div>
                      <span className="text-sm text-gray-600 mr-2 w-10 text-left">{item.percent}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <FileText className="h-6 w-6 text-medical-primary" />
                  تقرير النشاط اليومي
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          النوع
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          العدد
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          النسبة
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          التغيير
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {[
                        { type: "حجز موعد جديد", count: 175, percentage: "38%", change: "+12%" },
                        { type: "استشارة طبية", count: 82, percentage: "18%", change: "+5%" },
                        { type: "طلب تسعير خدمة", count: 48, percentage: "10%", change: "+25%" },
                        { type: "تسجيل مستخدم جديد", count: 123, percentage: "27%", change: "-3%" },
                        { type: "تقييم طبيب", count: 31, percentage: "7%", change: "+9%" }
                      ].map((item, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{item.type}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{item.count}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{item.percentage}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className={`text-sm ${item.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                              {item.change}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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

export default Dashboard;
