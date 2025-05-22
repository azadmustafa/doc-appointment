
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
  Newspaper, Clock, Calendar, ChevronRight, 
  BookOpen, Users, Award, Bookmark 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Define types for our content
interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  type: "news" | "article" | "event";
  image: string;
  readTime?: string;
  location?: string;
  eventDate?: string;
}

// Mock data for demonstration
const newsData: NewsArticle[] = [
  {
    id: "1",
    title: "افتتاح قسم جديد للعلاج الطبيعي في مستشفى بغداد التعليمي",
    excerpt: "تم افتتاح قسم جديد للعلاج الطبيعي في مستشفى بغداد التعليمي، مجهز بأحدث التقنيات العلاجية لتقديم خدمات متميزة للمرضى.",
    date: "22 مايو 2025",
    category: "مستشفيات",
    type: "news",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800",
  },
  {
    id: "2",
    title: "إطلاق حملة توعوية للوقاية من أمراض القلب",
    excerpt: "أطلقت وزارة الصحة حملة توعوية واسعة للوقاية من أمراض القلب، تستهدف كافة شرائح المجتمع وتركز على أهمية النظام الغذائي الصحي.",
    date: "20 مايو 2025",
    category: "توعية صحية",
    type: "news",
    image: "https://images.unsplash.com/photo-1505751171710-1f6d0ace5a85?q=80&w=800",
  },
  {
    id: "3",
    title: "كيف تحمي نفسك من الإنفلونزا الموسمية",
    excerpt: "مع اقتراب موسم الشتاء، إليك أهم النصائح للوقاية من الإنفلونزا الموسمية وتعزيز جهاز المناعة بطرق طبيعية وفعالة.",
    date: "18 مايو 2025",
    category: "نصائح طبية",
    type: "article",
    image: "https://images.unsplash.com/photo-1608326389514-d39d347fe5e7?q=80&w=800",
    readTime: "5 دقائق",
  },
  {
    id: "4",
    title: "المؤتمر السنوي لأطباء القلب في العراق",
    excerpt: "ينظم المجلس العراقي لأطباء القلب المؤتمر السنوي بمشاركة نخبة من الأطباء المحليين والدوليين لمناقشة أحدث التقنيات في علاج أمراض القلب.",
    date: "15 مايو 2025",
    category: "مؤتمرات",
    type: "event",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=800",
    location: "فندق بابل، بغداد",
    eventDate: "15-17 يونيو 2025",
  },
  {
    id: "5",
    title: "فوائد الرياضة للوقاية من أمراض السكري",
    excerpt: "دراسة حديثة تكشف عن فوائد ممارسة الرياضة بانتظام للوقاية من مرض السكري من النوع الثاني وتحسين مستويات السكر في الدم.",
    date: "12 مايو 2025",
    category: "دراسات",
    type: "article",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800",
    readTime: "7 دقائق",
  },
  {
    id: "6",
    title: "ورشة عمل حول التغذية الصحية للأطفال",
    excerpt: "تنظم جمعية التغذية العراقية ورشة عمل متخصصة حول التغذية الصحية للأطفال وطرق الوقاية من السمنة في سن مبكرة.",
    date: "10 مايو 2025",
    category: "ورش عمل",
    type: "event",
    image: "https://images.unsplash.com/photo-1577041677443-8bbdfd8cce62?q=80&w=800",
    location: "مركز بغداد الثقافي",
    eventDate: "28 مايو 2025",
  },
  {
    id: "7",
    title: "توقيع اتفاقية تعاون طبي بين العراق وألمانيا",
    excerpt: "وقعت وزارة الصحة العراقية اتفاقية تعاون مع المستشفيات الألمانية لتدريب الكوادر الطبية العراقية وتبادل الخبرات في مجالات التخصصات الدقيقة.",
    date: "8 مايو 2025",
    category: "تعاون دولي",
    type: "news",
    image: "https://images.unsplash.com/photo-1541970005098-0c46ce508afa?q=80&w=800",
  },
  {
    id: "8",
    title: "أعراض نقص فيتامين د وكيفية علاجه",
    excerpt: "نقص فيتامين د من المشاكل الصحية الشائعة، تعرف على أعراضه وكيفية علاجه والوقاية منه خاصة في فصل الشتاء.",
    date: "5 مايو 2025",
    category: "تغذية",
    type: "article",
    image: "https://images.unsplash.com/photo-1475332432350-d01a3ca34999?q=80&w=800",
    readTime: "6 دقائق",
  },
];

const News = () => {
  useEffect(() => {
    // Scroll to the top of the page when component mounts
    window.scrollTo(0, 0);
  }, []);

  const [activeTab, setActiveTab] = useState("all");
  const [newsItems, setNewsItems] = useState<NewsArticle[]>(newsData);

  // Filter news items based on active tab
  useEffect(() => {
    if (activeTab === "all") {
      setNewsItems(newsData);
    } else {
      setNewsItems(newsData.filter(item => item.type === activeTab));
    }
  }, [activeTab]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-medical-light py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">أحدث الأخبار والمقالات الطبية</h1>
              <p className="text-gray-600 text-lg mb-6">
                تابع آخر المستجدات في عالم الطب والصحة، وتعرف على أحدث الفعاليات والمؤتمرات الطبية
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button variant="outline" className="border-medical-primary text-medical-primary hover:bg-medical-light">
                  <Newspaper className="w-4 h-4 ml-2" />
                  اشترك في النشرة الإخبارية
                </Button>
                <Button className="bg-medical-primary hover:bg-medical-dark">
                  <BookOpen className="w-4 h-4 ml-2" />
                  تصفح جميع المقالات
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* News Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-8">
              <TabsList className="w-full max-w-2xl mx-auto grid grid-cols-4">
                <TabsTrigger value="all" className="flex-1">الكل</TabsTrigger>
                <TabsTrigger value="news" className="flex-1">أخبار</TabsTrigger>
                <TabsTrigger value="article" className="flex-1">مقالات</TabsTrigger>
                <TabsTrigger value="event" className="flex-1">فعاليات</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {newsItems.map((item) => (
                <Card key={item.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-5">
                    <div className="flex justify-between items-center mb-3">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        item.type === 'news' ? 'bg-blue-100 text-blue-700' :
                        item.type === 'article' ? 'bg-green-100 text-green-700' :
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {item.type === 'news' ? 'خبر' : 
                         item.type === 'article' ? 'مقال' : 'فعالية'}
                      </span>
                      <span className="text-gray-500 text-sm flex items-center">
                        <Clock className="w-3 h-3 ml-1" />
                        {item.date}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 line-clamp-2">{item.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{item.excerpt}</p>
                    
                    <div className="flex justify-between items-center">
                      {item.readTime && (
                        <span className="text-gray-500 text-sm flex items-center">
                          <Clock className="w-3 h-3 ml-1" />
                          وقت القراءة: {item.readTime}
                        </span>
                      )}
                      {item.eventDate && (
                        <span className="text-gray-500 text-sm flex items-center">
                          <Calendar className="w-3 h-3 ml-1" />
                          {item.eventDate}
                        </span>
                      )}
                      <Link to={`/news/${item.id}`} className="text-medical-primary hover:underline flex items-center">
                        <span className="ml-1">قراءة المزيد</span>
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More Button */}
            <div className="text-center mt-10">
              <Button variant="outline" className="border-medical-primary text-medical-primary hover:bg-medical-light">
                عرض المزيد
              </Button>
            </div>
          </div>
        </section>

        {/* Featured Categories */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-center">تصفح حسب القسم</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="hover:shadow-md transition-shadow text-center cursor-pointer">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full bg-blue-100 text-medical-primary flex items-center justify-center mx-auto mb-3">
                    <Newspaper className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold">أخبار طبية</h3>
                  <p className="text-sm text-gray-500 mt-1">23 منشور</p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-md transition-shadow text-center cursor-pointer">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-3">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold">مقالات توعوية</h3>
                  <p className="text-sm text-gray-500 mt-1">45 منشور</p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-md transition-shadow text-center cursor-pointer">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-3">
                    <Users className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold">مؤتمرات وندوات</h3>
                  <p className="text-sm text-gray-500 mt-1">18 منشور</p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-md transition-shadow text-center cursor-pointer">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mx-auto mb-3">
                    <Award className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold">إنجازات طبية</h3>
                  <p className="text-sm text-gray-500 mt-1">12 منشور</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 bg-medical-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-4">ابق على اطلاع بأحدث المستجدات الطبية</h2>
            <p className="max-w-2xl mx-auto mb-8">
              اشترك في نشرتنا البريدية للحصول على آخر الأخبار والمقالات الطبية ومواعيد الفعاليات المهمة
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="أدخل بريدك الإلكتروني"
                className="px-4 py-2 rounded-md flex-1 text-right"
              />
              <Button className="bg-white text-medical-primary hover:bg-gray-100">
                <Bookmark className="w-4 h-4 ml-2" />
                اشترك الآن
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default News;
