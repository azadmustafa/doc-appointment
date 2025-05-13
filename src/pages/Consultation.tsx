
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Avatar } from "@/components/ui/avatar";
import { Star, MessageCircle, ThumbsUp } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// بيانات نموذجية للأسئلة والإجابات
const questionsData = [
  {
    id: 1,
    title: "ما هي أفضل الطرق لعلاج آلام الظهر المزمنة؟",
    content: "أعاني من آلام مزمنة في أسفل الظهر منذ عدة أشهر. جربت العديد من المسكنات والراحة لكن دون تحسن كبير. هل هناك علاجات بديلة أو تمارين يمكن أن تساعد؟",
    askedBy: "محمد أحمد",
    date: "منذ 3 أيام",
    specialty: "العظام",
    answers: [
      {
        id: 101,
        doctorName: "د. خالد العامري",
        doctorSpecialty: "طب العظام",
        doctorImage: "https://images.unsplash.com/photo-1622902046580-2b47f47f5471?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
        content: "آلام الظهر المزمنة يمكن علاجها بعدة طرق، أولها تمارين تقوية عضلات الظهر والبطن. أنصحك بممارسة السباحة والمشي المنتظم. يمكن أيضاً تجربة العلاج الطبيعي والحرارة الموضعية. في حالة استمرار الألم، ينبغي إجراء أشعة للتأكد من عدم وجود مشاكل هيكلية.",
        date: "منذ 2 يوم",
        likes: 12,
        verified: true
      },
      {
        id: 102,
        doctorName: "د. سارة العبيدي",
        doctorSpecialty: "طب التأهيل",
        doctorImage: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
        content: "بالإضافة إلى ما ذكره زميلي، أود أن أقترح مراجعة وضعية جلوسك ونومك، فهذا يؤثر بشكل كبير على آلام الظهر. تأكد من استخدام كرسي مريح وفراش مناسب. كما يمكن تجربة تقنيات الاسترخاء والتأمل للتخفيف من التوتر الذي قد يزيد من الألم.",
        date: "منذ 1 يوم",
        likes: 8,
        verified: true
      }
    ]
  },
  {
    id: 2,
    title: "هل يمكن علاج الصداع النصفي بدون أدوية؟",
    content: "أعاني من نوبات صداع نصفي متكررة، وأريد تجنب الاعتماد الدائم على الأدوية. هل هناك طرق طبيعية للتخفيف من حدة النوبات أو منع حدوثها؟",
    askedBy: "زينب علي",
    date: "منذ أسبوع",
    specialty: "المخ والأعصاب",
    answers: [
      {
        id: 201,
        doctorName: "د. عبدالله الجبوري",
        doctorSpecialty: "المخ والأعصاب",
        doctorImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
        content: "نعم، هناك عدة طرق يمكن أن تساعد في تخفيف الصداع النصفي. من أهمها تحديد المحفزات وتجنبها، مثل بعض الأطعمة أو التوتر أو قلة النوم. كما أن ممارسة تقنيات الاسترخاء مثل اليوغا والتأمل، والحصول على قسط كافٍ من النوم، وتطبيق كمادات باردة أو دافئة على الرأس يمكن أن تساعد كثيراً. التظليم والهدوء أثناء النوبة مهم أيضاً.",
        date: "منذ 5 أيام",
        likes: 15,
        verified: true
      }
    ]
  },
  {
    id: 3,
    title: "تساقط الشعر المفاجئ عند النساء",
    content: "بدأت أعاني من تساقط الشعر بشكل ملحوظ منذ حوالي شهر. عمري 32 سنة ولا أعاني من أي مشاكل صحية معروفة. ما هي الأسباب المحتملة وكيفية العلاج؟",
    askedBy: "نور الهاشمي",
    date: "منذ 4 أيام",
    specialty: "أمراض جلدية",
    answers: [
      {
        id: 301,
        doctorName: "د. ريم الحسيني",
        doctorSpecialty: "أمراض جلدية",
        doctorImage: "https://images.unsplash.com/photo-1614608682850-e0d6ed316d22?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
        content: "تساقط الشعر المفاجئ عند النساء قد يكون ناتجاً عن عدة أسباب، منها: نقص الحديد أو فيتامين D، اضطرابات الغدة الدرقية، التوتر والصدمات النفسية، تغيرات هرمونية (مثل بعد الحمل)، أو استخدام بعض الأدوية. أنصح بإجراء تحاليل للدم للتحقق من نقص المغذيات والهرمونات. في غضون ذلك، استخدمي شامبو لطيف، تجنبي الحرارة العالية على الشعر، وتناولي غذاءً متوازناً غنياً بالبروتين والفيتامينات.",
        date: "منذ 3 أيام",
        likes: 20,
        verified: true
      }
    ]
  },
];

// التخصصات للتصفية
const specialties = [
  "الكل",
  "قلب وأوعية دموية",
  "المخ والأعصاب",
  "طب عام",
  "طب العيون",
  "عظام",
  "طب الباطنة",
  "جراحة",
  "أمراض جلدية",
  "طب الأطفال",
  "طب الأسنان"
];

const Consultation = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("all-questions");
  const [selectedSpecialty, setSelectedSpecialty] = useState("الكل");
  const [newQuestion, setNewQuestion] = useState({
    title: "",
    content: "",
    specialty: ""
  });
  const [filteredQuestions, setFilteredQuestions] = useState(questionsData);
  
  // تصفية الأسئلة حسب التخصص
  const filterQuestions = (specialty: string) => {
    setSelectedSpecialty(specialty);
    if (specialty === "الكل") {
      setFilteredQuestions(questionsData);
    } else {
      setFilteredQuestions(questionsData.filter(q => q.specialty === specialty));
    }
  };
  
  // إرسال سؤال جديد
  const handleQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newQuestion.title || !newQuestion.content || !newQuestion.specialty) {
      toast({
        title: "خطأ في النموذج",
        description: "يرجى ملء جميع الحقول المطلوبة.",
        variant: "destructive"
      });
      return;
    }
    
    // إضافة السؤال (في التطبيق الحقيقي سيتم إرساله إلى الخادم)
    const newQuestionData = {
      id: Math.floor(Math.random() * 1000) + 10,
      ...newQuestion,
      askedBy: "أنت",
      date: "الآن",
      answers: []
    };
    
    // تحديث واجهة المستخدم (محاكاة)
    setFilteredQuestions([newQuestionData, ...filteredQuestions]);
    
    // إظهار رسالة نجاح
    toast({
      title: "تم إرسال السؤال بنجاح",
      description: "سيقوم أطباؤنا بالرد على سؤالك في أقرب وقت ممكن."
    });
    
    // إعادة تعيين النموذج
    setNewQuestion({
      title: "",
      content: "",
      specialty: ""
    });
    
    // التبديل إلى علامة تبويب "أسئلتي"
    setActiveTab("my-questions");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-medical-primary py-12 text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">استشارات طبية مجانية</h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto">
              اطرح سؤالك الطبي واحصل على إجابات من أطباء مختصين ومعتمدين
            </p>
          </div>
        </section>
        
        {/* Main Content */}
        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow p-4 mb-6">
                  <h3 className="font-semibold text-lg mb-4">التخصصات</h3>
                  <div className="space-y-2">
                    {specialties.map(specialty => (
                      <div 
                        key={specialty}
                        className={`cursor-pointer p-2 rounded-md ${
                          selectedSpecialty === specialty 
                            ? "bg-medical-light text-medical-primary font-medium" 
                            : "hover:bg-gray-100"
                        }`}
                        onClick={() => filterQuestions(specialty)}
                      >
                        {specialty}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow p-4">
                  <h3 className="font-semibold text-lg mb-3">إرشادات الاستشارة</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>كن محدداً وواضحاً في وصف حالتك</li>
                    <li>اذكر العمر والجنس والأعراض بدقة</li>
                    <li>اذكر أي أدوية تتناولها حالياً</li>
                    <li>اذكر تاريخك الطبي إذا كان مرتبطاً بالسؤال</li>
                    <li>التزم بآداب الحوار واحترام الآخرين</li>
                  </ul>
                </div>
              </div>
              
              {/* Main Area */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-lg shadow p-6">
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-3 mb-6">
                      <TabsTrigger value="all-questions">جميع الأسئلة</TabsTrigger>
                      <TabsTrigger value="ask-question">اطرح سؤالاً</TabsTrigger>
                      <TabsTrigger value="my-questions">أسئلتي</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="all-questions">
                      <div className="space-y-6">
                        {filteredQuestions.length > 0 ? (
                          filteredQuestions.map(question => (
                            <div key={question.id} className="border rounded-lg overflow-hidden">
                              <div className="bg-gray-50 p-4 border-b">
                                <h3 className="font-semibold text-lg mb-1">{question.title}</h3>
                                <div className="flex items-center text-sm text-gray-500 flex-wrap gap-2">
                                  <span>{question.askedBy}</span>
                                  <span className="mx-1">•</span>
                                  <span>{question.date}</span>
                                  <span className="mx-1">•</span>
                                  <span className="bg-medical-light text-medical-primary px-2 py-0.5 rounded-full text-xs">
                                    {question.specialty}
                                  </span>
                                </div>
                              </div>
                              <div className="p-4">
                                <p className="text-gray-700 mb-4">{question.content}</p>
                                
                                {/* الإجابات */}
                                <div className="mt-6 space-y-4">
                                  <div className="flex items-center text-medical-primary mb-3">
                                    <MessageCircle className="h-5 w-5 mr-2" />
                                    <span className="font-medium">{question.answers.length} إجابات</span>
                                  </div>
                                  
                                  {question.answers.map(answer => (
                                    <div key={answer.id} className="border-t pt-4">
                                      <div className="flex items-start">
                                        <Avatar>
                                          <img src={answer.doctorImage} alt={answer.doctorName} />
                                        </Avatar>
                                        <div className="ml-3">
                                          <div className="flex items-center">
                                            <h4 className="font-medium">{answer.doctorName}</h4>
                                            {answer.verified && (
                                              <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                                                معتمد
                                              </span>
                                            )}
                                          </div>
                                          <div className="text-sm text-gray-500 mb-2">
                                            {answer.doctorSpecialty} • {answer.date}
                                          </div>
                                          <p className="text-gray-700">{answer.content}</p>
                                          
                                          <div className="mt-3 flex items-center">
                                            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-medical-primary flex items-center">
                                              <ThumbsUp className="h-4 w-4 mr-1" />
                                              {answer.likes}
                                            </Button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-12">
                            <h3 className="text-xl font-semibold mb-2">لا توجد أسئلة</h3>
                            <p className="text-gray-600">
                              لا توجد أسئلة في هذا التخصص حالياً.
                            </p>
                          </div>
                        )}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="ask-question">
                      <form onSubmit={handleQuestionSubmit} className="space-y-4">
                        <div>
                          <label htmlFor="questionTitle" className="block text-sm font-medium text-gray-700 mb-1">
                            عنوان السؤال *
                          </label>
                          <Input
                            id="questionTitle"
                            placeholder="أدخل عنوانًا واضحًا ومختصرًا لسؤالك"
                            value={newQuestion.title}
                            onChange={(e) => setNewQuestion({...newQuestion, title: e.target.value})}
                            required
                            className="text-right"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="questionSpecialty" className="block text-sm font-medium text-gray-700 mb-1">
                            التخصص المطلوب *
                          </label>
                          <select
                            id="questionSpecialty"
                            value={newQuestion.specialty}
                            onChange={(e) => setNewQuestion({...newQuestion, specialty: e.target.value})}
                            required
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:border-medical-primary focus:ring focus:ring-medical-primary focus:ring-opacity-50 text-right"
                          >
                            <option value="">اختر التخصص</option>
                            {specialties.filter(s => s !== "الكل").map(specialty => (
                              <option key={specialty} value={specialty}>{specialty}</option>
                            ))}
                          </select>
                        </div>
                        
                        <div>
                          <label htmlFor="questionContent" className="block text-sm font-medium text-gray-700 mb-1">
                            تفاصيل السؤال *
                          </label>
                          <Textarea
                            id="questionContent"
                            placeholder="اشرح حالتك بالتفصيل لمساعدة الأطباء على تقديم إجابة دقيقة..."
                            value={newQuestion.content}
                            onChange={(e) => setNewQuestion({...newQuestion, content: e.target.value})}
                            required
                            className="text-right min-h-[150px]"
                          />
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-lg text-sm">
                          <p className="font-medium mb-2">ملاحظات هامة:</p>
                          <ul className="list-disc list-inside space-y-1 text-gray-600">
                            <li>الاستشارات المجانية مخصصة للإرشاد الأولي فقط ولا تغني عن زيارة الطبيب عند الضرورة.</li>
                            <li>المعلومات الشخصية التي تقدمها تخضع لسياسة الخصوصية وهي محمية.</li>
                            <li>سيتم الرد على سؤالك خلال 24-48 ساعة من قبل أطباء معتمدين.</li>
                          </ul>
                        </div>
                        
                        <Button 
                          type="submit" 
                          className="w-full bg-medical-primary hover:bg-medical-dark"
                        >
                          إرسال السؤال
                        </Button>
                      </form>
                    </TabsContent>
                    
                    <TabsContent value="my-questions">
                      <div className="py-6 text-center">
                        {filteredQuestions.filter(q => q.askedBy === "أنت").length > 0 ? (
                          <div className="space-y-6">
                            {filteredQuestions
                              .filter(q => q.askedBy === "أنت")
                              .map(question => (
                                <div key={question.id} className="border rounded-lg overflow-hidden text-right">
                                  <div className="bg-gray-50 p-4 border-b">
                                    <h3 className="font-semibold text-lg mb-1">{question.title}</h3>
                                    <div className="flex items-center text-sm text-gray-500">
                                      <span>{question.date}</span>
                                      <span className="mx-1">•</span>
                                      <span className="bg-medical-light text-medical-primary px-2 py-0.5 rounded-full text-xs">
                                        {question.specialty}
                                      </span>
                                      <span className="mx-1">•</span>
                                      <span className="text-yellow-600">
                                        {question.answers.length > 0 ? "تمت الإجابة" : "في انتظار الرد"}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="p-4">
                                    <p className="text-gray-700">{question.content}</p>

                                    {question.answers.length > 0 && (
                                      <div className="mt-4 pt-4 border-t">
                                        <p className="font-medium mb-2">الإجابات ({question.answers.length}):</p>
                                        {question.answers.map(answer => (
                                          <div key={answer.id} className="mb-3 pb-3 border-b last:border-b-0 last:pb-0 last:mb-0">
                                            <div className="flex items-start">
                                              <Avatar>
                                                <img src={answer.doctorImage} alt={answer.doctorName} />
                                              </Avatar>
                                              <div className="ml-3">
                                                <div className="flex items-center">
                                                  <h4 className="font-medium">{answer.doctorName}</h4>
                                                  {answer.verified && (
                                                    <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                                                      معتمد
                                                    </span>
                                                  )}
                                                </div>
                                                <div className="text-sm text-gray-500 mb-2">
                                                  {answer.doctorSpecialty} • {answer.date}
                                                </div>
                                                <p className="text-gray-700">{answer.content}</p>
                                              </div>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))
                            }
                          </div>
                        ) : (
                          <div className="py-12">
                            <h3 className="text-xl font-semibold mb-2">لا توجد أسئلة</h3>
                            <p className="text-gray-600 mb-6">
                              لم تقم بطرح أي أسئلة بعد.
                            </p>
                            <Button 
                              className="bg-medical-primary hover:bg-medical-dark"
                              onClick={() => setActiveTab("ask-question")}
                            >
                              اطرح سؤالاً الآن
                            </Button>
                          </div>
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Consultation;
