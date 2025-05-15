
import React, { useState } from 'react';
import { MessageSquare, Send, HelpCircle, FileText, Users, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

const FAQ = () => {
  const [question, setQuestion] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [name, setName] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmitQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log({ question, specialty, name, image });
    // Reset form
    setQuestion('');
    setSpecialty('');
    setName('');
    setImage(null);
  };

  // Sample questions data
  const questions = [
    {
      id: 1,
      title: "هل يمكنني الحصول على استشارة طبية مباشرة؟",
      body: "نعم، يمكنك طلب استشارة طبية مباشرة مع أي من الأطباء المتوفرين على المنصة. ستظهر لك قائمة بالأطباء المتاحين حاليًا للاستشارات الفورية، ويمكنك بدء محادثة نصية أو مكالمة فيديو معهم مباشرة.",
      specialty: "عام",
      askedBy: "أحمد محمد",
      date: "قبل 3 أيام",
      answers: 4
    },
    {
      id: 2,
      title: "كيف يمكنني إلغاء موعد طبي؟",
      body: "لإلغاء موعد طبي، يرجى الدخول إلى صفحة 'مواعيدي' في حسابك الشخصي، ثم اختيار الموعد الذي ترغب في إلغائه والضغط على زر 'إلغاء الموعد'. يرجى ملاحظة أن الإلغاء يجب أن يتم قبل 24 ساعة على الأقل من وقت الموعد المحدد لاسترداد المبلغ كاملاً.",
      specialty: "عام",
      askedBy: "فاطمة علي",
      date: "قبل أسبوع",
      answers: 2
    },
    {
      id: 3,
      title: "ما هي أعراض ارتفاع ضغط الدم؟",
      body: "عادةً لا تظهر أعراض واضحة لارتفاع ضغط الدم، لذلك يُعرف باسم 'القاتل الصامت'. في بعض الحالات، قد تشمل الأعراض: صداع شديد، ضيق في التنفس، نزيف من الأنف، دوخة، ألم في الصدر. إذا كنت تعاني من أي من هذه الأعراض، يرجى استشارة الطبيب فورًا.",
      specialty: "قلب وأوعية دموية",
      askedBy: "سمير حسن",
      date: "قبل أسبوعين",
      answers: 7
    },
    {
      id: 4,
      title: "هل التهاب اللوزتين معدي؟",
      body: "نعم، التهاب اللوزتين البكتيري أو الفيروسي يمكن أن يكون معديًا. ينتقل عبر الرذاذ من السعال أو العطس أو مشاركة أدوات الطعام والشراب مع الشخص المصاب. للوقاية، ينصح بغسل اليدين بانتظام وتجنب مشاركة الأدوات الشخصية مع المصابين.",
      specialty: "أنف وأذن وحنجرة",
      askedBy: "ليلى كريم",
      date: "قبل 3 أسابيع",
      answers: 5
    },
    {
      id: 5,
      title: "ما هو أفضل علاج لحب الشباب؟",
      body: "يعتمد علاج حب الشباب على شدته ونوعه. للحالات البسيطة، يمكن استخدام منتجات تحتوي على بيروكسيد البنزويل أو حمض الساليسيليك. للحالات المتوسطة إلى الشديدة، قد يصف الطبيب أدوية موضعية أو عن طريق الفم مثل المضادات الحيوية أو الريتينويدات. من المهم استشارة طبيب الجلدية لتحديد العلاج المناسب لحالتك.",
      specialty: "أمراض جلدية",
      askedBy: "كريم سامي",
      date: "قبل شهر",
      answers: 9
    }
  ];

  // FAQ categories and items
  const faqCategories = [
    {
      id: "general",
      name: "أسئلة عامة",
      items: [
        {
          question: "كيف يمكنني حجز موعد مع طبيب؟",
          answer: "لحجز موعد، ابحث عن الطبيب المناسب لحالتك، ثم اختر التاريخ والوقت المناسب من جدول مواعيده المتاحة. أكمل بيانات الحجز وادفع الرسوم (إن وجدت) لتأكيد الموعد."
        },
        {
          question: "هل يمكنني إلغاء أو تغيير موعدي؟",
          answer: "نعم، يمكنك إلغاء أو تعديل موعدك من خلال صفحة 'مواعيدي' في حسابك. يرجى ملاحظة أن الإلغاء قبل 24 ساعة من الموعد يضمن استرداد المبلغ كاملاً."
        },
        {
          question: "هل تطبقون سياسة الخصوصية على بياناتي الطبية؟",
          answer: "نعم، نحن نلتزم بحماية خصوصية بياناتك الطبية وفقًا لأعلى معايير الأمان. جميع المعلومات التي تقدمها على المنصة مشفرة ولا يمكن الوصول إليها إلا من قبل الطبيب المعالج."
        }
      ]
    },
    {
      id: "payments",
      name: "الدفع والأسعار",
      items: [
        {
          question: "ما هي طرق الدفع المقبولة؟",
          answer: "نقبل الدفع عبر البطاقات الائتمانية (فيزا، ماستركارد)، محافظ إلكترونية، والدفع النقدي في العيادة (إذا كان متاحًا من قبل الطبيب)."
        },
        {
          question: "هل تفرضون رسومًا إضافية على الحجز؟",
          answer: "نفرض رسوم خدمة بنسبة 5% من قيمة الكشف. هذه الرسوم تظهر بشكل منفصل عند إتمام عملية الحجز."
        },
        {
          question: "كيف يمكنني الحصول على فاتورة الدفع؟",
          answer: "يتم إرسال فاتورة إلكترونية إلى بريدك الإلكتروني بعد إتمام عملية الدفع. يمكنك أيضًا الوصول إلى جميع الفواتير من خلال قسم 'المدفوعات' في حسابك."
        }
      ]
    },
    {
      id: "doctors",
      name: "الأطباء والتخصصات",
      items: [
        {
          question: "كيف يتم اختيار الأطباء في المنصة؟",
          answer: "نقوم بعملية تدقيق شاملة للتحقق من مؤهلات وخبرات جميع الأطباء المسجلين في منصتنا. نتأكد من امتلاكهم للتراخيص اللازمة والشهادات المهنية المعتمدة."
        },
        {
          question: "هل يمكنني اختيار طبيب معين؟",
          answer: "نعم، يمكنك البحث عن طبيب معين بالاسم أو اختيار طبيب بناءً على التخصص، الموقع، التقييمات، أو توفر المواعيد."
        },
        {
          question: "كيف أعرف أن الطبيب مناسب لحالتي؟",
          answer: "يمكنك الاطلاع على ملف الطبيب الذي يتضمن تخصصه، خبراته، الشهادات، وتقييمات المرضى السابقين. إذا كنت غير متأكد، يمكنك طلب استشارة أولية قبل حجز موعد كامل."
        }
      ]
    },
    {
      id: "consultations",
      name: "الاستشارات عبر الإنترنت",
      items: [
        {
          question: "كيف تعمل الاستشارات عبر الفيديو؟",
          answer: "بعد تأكيد موعد الاستشارة، ستتلقى رابطًا للانضمام إلى غرفة الاستشارة الافتراضية. انقر على الرابط في الوقت المحدد للاتصال بالطبيب عبر الفيديو مباشرة من متصفحك دون الحاجة لتثبيت أي برامج."
        },
        {
          question: "هل الاستشارات عبر الإنترنت آمنة وخاصة؟",
          answer: "نعم، جميع الاستشارات مشفرة ومحمية لضمان خصوصيتك الكاملة. لا يتم تسجيل أو تخزين الاستشارات إلا بموافقة صريحة منك."
        },
        {
          question: "هل يمكنني الحصول على وصفة طبية بعد الاستشارة عبر الإنترنت؟",
          answer: "نعم، يمكن للطبيب إصدار وصفة طبية إلكترونية بعد الاستشارة إذا كان ذلك ضروريًا. سيتم إرسالها إليك عبر البريد الإلكتروني أو تطبيق الهاتف."
        }
      ]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 bg-medical-light">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">الأسئلة والاستشارات</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              اطرح سؤالك الطبي واحصل على إجابات من أطباء متخصصين، أو تصفح الأسئلة الشائعة للعثور على المعلومات التي تبحث عنها
            </p>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-medical-primary hover:bg-medical-dark text-lg py-6 px-8">
                  <MessageSquare className="ml-2 h-5 w-5" />
                  اطرح سؤالاً الآن
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px] rtl">
                <DialogHeader>
                  <DialogTitle className="text-2xl text-center">اطرح سؤالاً طبياً</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmitQuestion} className="space-y-4 mt-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                      الاسم
                    </label>
                    <Input 
                      id="name" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      placeholder="أدخل اسمك (اختياري)"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="specialty" className="block text-sm font-medium mb-1">
                      التخصص المطلوب
                    </label>
                    <select 
                      id="specialty" 
                      value={specialty} 
                      onChange={(e) => setSpecialty(e.target.value)} 
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    >
                      <option value="">اختر التخصص</option>
                      <option value="general">طب عام</option>
                      <option value="cardiology">قلب وأوعية دموية</option>
                      <option value="dermatology">أمراض جلدية</option>
                      <option value="neurology">المخ والأعصاب</option>
                      <option value="pediatrics">طب الأطفال</option>
                      <option value="orthopedics">عظام</option>
                      <option value="ent">أنف وأذن وحنجرة</option>
                      <option value="ophthalmology">طب العيون</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="question" className="block text-sm font-medium mb-1">
                      السؤال
                    </label>
                    <Textarea 
                      id="question" 
                      value={question} 
                      onChange={(e) => setQuestion(e.target.value)} 
                      placeholder="اكتب سؤالك هنا بالتفصيل..." 
                      rows={5}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="image" className="block text-sm font-medium mb-1">
                      إرفاق صورة (اختياري)
                    </label>
                    <div className="flex items-center gap-2">
                      <Input 
                        id="image" 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageChange} 
                        className="w-full"
                      />
                      <Image className="h-5 w-5 text-gray-500" />
                    </div>
                    {image && (
                      <p className="text-xs text-green-600 mt-1">تم اختيار الملف: {image.name}</p>
                    )}
                  </div>
                  
                  <div className="flex justify-end pt-3">
                    <Button type="submit" className="bg-medical-primary hover:bg-medical-dark">
                      <Send className="ml-2 h-4 w-4" />
                      إرسال السؤال
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </section>
        
        {/* Questions & FAQ Content */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="recent" className="w-full">
              <TabsList className="mb-8 flex justify-center">
                <TabsTrigger value="recent" className="px-6 py-3">أحدث الأسئلة</TabsTrigger>
                <TabsTrigger value="faq" className="px-6 py-3">الأسئلة الشائعة</TabsTrigger>
              </TabsList>
              
              <TabsContent value="recent">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {questions.map((q) => (
                    <Card key={q.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <CardHeader className="bg-gray-50 pb-3">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-xl font-semibold hover:text-medical-primary">
                            <a href={`/question/${q.id}`}>{q.title}</a>
                          </CardTitle>
                          <span className="bg-medical-light text-medical-primary text-xs px-2 py-1 rounded-full">
                            {q.specialty}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 mt-2">
                          <span>{q.askedBy}</span>
                          <span className="mx-2">•</span>
                          <span>{q.date}</span>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4">
                        <p className="text-gray-700 mb-3 line-clamp-3">
                          {q.body}
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="text-medical-primary text-sm">{q.answers} إجابات</span>
                          <Button variant="outline" size="sm" className="text-xs">
                            عرض الإجابات
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="text-center mt-8">
                  <Button variant="outline" className="border-medical-primary text-medical-primary hover:bg-medical-light">
                    عرض المزيد من الأسئلة
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="faq">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  {faqCategories.map((category) => (
                    <div key={category.id} className="mb-8">
                      <h3 className="text-xl font-bold mb-4 flex items-center">
                        <HelpCircle className="h-5 w-5 text-medical-primary ml-2" />
                        {category.name}
                      </h3>
                      <Accordion type="single" collapsible className="w-full">
                        {category.items.map((item, i) => (
                          <AccordionItem key={i} value={`${category.id}-${i}`}>
                            <AccordionTrigger className="text-right font-medium text-base hover:text-medical-primary">
                              {item.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-700 leading-relaxed">
                              {item.answer}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-12 bg-medical-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-6">لم تجد إجابة على سؤالك؟</h2>
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <Button className="bg-white text-medical-primary hover:bg-gray-100">
                <MessageSquare className="ml-2 h-5 w-5" />
                اطرح سؤالاً جديدًا
              </Button>
              <Button className="bg-medical-dark hover:bg-medical-dark/90">
                <Users className="ml-2 h-5 w-5" />
                تواصل مع طبيب الآن
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default FAQ;
