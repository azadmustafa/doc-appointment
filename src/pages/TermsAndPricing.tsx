
import React, { useState } from 'react';
import { X, CheckCircle, FileText, DollarSign, QuestionCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const TermsAndPricing = () => {
  const [billingType, setBillingType] = useState<'monthly' | 'yearly'>('monthly');
  
  const pricingPlans = {
    monthly: [
      {
        name: "الخطة الأساسية",
        price: 15,
        features: [
          { name: "بطاقة طبيب أساسية", included: true },
          { name: "إدارة المواعيد", included: true },
          { name: "تلقي استشارات محدودة (10 شهريًا)", included: true },
          { name: "ظهور في نتائج البحث الأساسية", included: true },
          { name: "دعم فني عبر البريد الإلكتروني", included: true },
          { name: "تمييز كطبيب موصى به", included: false },
          { name: "استشارات فيديو", included: false },
          { name: "ظهور في المراكز المميزة", included: false },
          { name: "إحصاءات شهرية للأداء", included: false }
        ],
        isPopular: false,
      },
      {
        name: "الخطة الاحترافية",
        price: 35,
        features: [
          { name: "بطاقة طبيب احترافية مميزة", included: true },
          { name: "إدارة المواعيد المتقدمة", included: true },
          { name: "استشارات غير محدودة", included: true },
          { name: "تصنيف أعلى في نتائج البحث", included: true },
          { name: "إمكانية استلام الدفع الإلكتروني", included: true },
          { name: "دعم فني على مدار الساعة", included: true },
          { name: "إحصاءات شهرية للأداء", included: true },
          { name: "تمييز كطبيب موصى به", included: true },
          { name: "ظهور في المراكز المميزة", included: false }
        ],
        isPopular: true,
      },
      {
        name: "خطة المؤسسات الطبية",
        price: 80,
        features: [
          { name: "بطاقات متعددة للأطباء (حتى 5 أطباء)", included: true },
          { name: "إدارة شاملة للعيادة", included: true },
          { name: "استشارات غير محدودة", included: true },
          { name: "أولوية في نتائج البحث", included: true },
          { name: "تكامل مع نظام المستشفى", included: true },
          { name: "دعم فني متميز على مدار الساعة", included: true },
          { name: "إحصاءات متقدمة وتقارير تحليلية", included: true },
          { name: "تطبيق مخصص للعيادة", included: true },
          { name: "ورش تدريبية حصرية للطاقم الطبي", included: true }
        ],
        isPopular: false,
      }
    ],
    yearly: [
      {
        name: "الخطة الأساسية",
        price: 150,
        features: [
          { name: "بطاقة طبيب أساسية", included: true },
          { name: "إدارة المواعيد", included: true },
          { name: "تلقي استشارات محدودة (10 شهريًا)", included: true },
          { name: "ظهور في نتائج البحث الأساسية", included: true },
          { name: "دعم فني عبر البريد الإلكتروني", included: true },
          { name: "خصم 17% على الاشتراك السنوي", included: true },
          { name: "تمييز كطبيب موصى به", included: false },
          { name: "استشارات فيديو", included: false },
          { name: "ظهور في المراكز المميزة", included: false },
          { name: "إحصاءات شهرية للأداء", included: false }
        ],
        isPopular: false,
      },
      {
        name: "الخطة الاحترافية",
        price: 350,
        features: [
          { name: "بطاقة طبيب احترافية مميزة", included: true },
          { name: "إدارة المواعيد المتقدمة", included: true },
          { name: "استشارات غير محدودة", included: true },
          { name: "تصنيف أعلى في نتائج البحث", included: true },
          { name: "إمكانية استلام الدفع الإلكتروني", included: true },
          { name: "دعم فني على مدار الساعة", included: true },
          { name: "إحصاءات شهرية للأداء", included: true },
          { name: "خصم 17% على الاشتراك السنوي", included: true },
          { name: "تمييز كطبيب موصى به", included: true },
          { name: "ظهور في المراكز المميزة", included: false }
        ],
        isPopular: true,
      },
      {
        name: "خطة المؤسسات الطبية",
        price: 800,
        features: [
          { name: "بطاقات متعددة للأطباء (حتى 5 أطباء)", included: true },
          { name: "إدارة شاملة للعيادة", included: true },
          { name: "استشارات غير محدودة", included: true },
          { name: "أولوية في نتائج البحث", included: true },
          { name: "تكامل مع نظام المستشفى", included: true },
          { name: "دعم فني متميز على مدار الساعة", included: true },
          { name: "إحصاءات متقدمة وتقارير تحليلية", included: true },
          { name: "تطبيق مخصص للعيادة", included: true },
          { name: "خصم 17% على الاشتراك السنوي", included: true },
          { name: "ورش تدريبية حصرية للطاقم الطبي", included: true }
        ],
        isPopular: false,
      }
    ]
  };

  // FAQ data
  const faqItems = [
    {
      question: "ما هي الوثائق المطلوبة للانضمام كطبيب؟",
      answer: "يجب تقديم شهادة مزاولة المهنة، السيرة الذاتية، صورة شخصية احترافية، ووثائق إثبات التخصص والخبرات السابقة."
    },
    {
      question: "كيف يتم الدفع للأطباء؟",
      answer: "يتم تحويل المبالغ المستحقة للأطباء مرتين شهرياً بعد خصم عمولة المنصة. يمكن متابعة الأرباح من خلال لوحة تحكم الطبيب."
    },
    {
      question: "هل يمكنني تغيير خطة الاشتراك؟",
      answer: "نعم، يمكنك الترقية أو تخفيض خطة الاشتراك في أي وقت. تتم محاسبة الفارق في حالة الترقية، وفي حالة التخفيض يتم تفعيل الخطة الجديدة بعد انتهاء فترة الاشتراك الحالية."
    },
    {
      question: "ما هي نسبة العمولة التي تأخذها المنصة؟",
      answer: "تأخذ المنصة عمولة قدرها 10% من قيمة الكشف أو الاستشارة. يتم خصمها تلقائياً من المبلغ المدفوع."
    },
    {
      question: "كيف يمكنني إلغاء موعد تم حجزه؟",
      answer: "يمكن للمريض إلغاء الموعد قبل 24 ساعة من الموعد المحدد دون غرامة. أما بالنسبة للطبيب، فيجب إشعار المريض والمنصة قبل 48 ساعة على الأقل وتحديد موعد بديل."
    },
    {
      question: "هل يمكنني تقديم خصومات خاصة؟",
      answer: "نعم، يمكنك تقديم عروض وخصومات خاصة من خلال لوحة التحكم الخاصة بك. تظهر هذه العروض في قسم العروض بالموقع مما يزيد من فرص وصول المرضى إليك."
    },
    {
      question: "ما هو الحد الأقصى لعدد المواعيد اليومية؟",
      answer: "يمكنك تحديد الحد الأقصى للمواعيد يومياً من خلال إعدادات الجدول الزمني في لوحة التحكم. لا توجد قيود من المنصة على عدد المواعيد طالما أنها ضمن ساعات العمل التي حددتها."
    },
    {
      question: "كيف يتم تقييم الأطباء في المنصة؟",
      answer: "يتم تقييم الأطباء من خلال مراجعات المرضى بعد الزيارات. يؤثر متوسط التقييم وعدد المراجعات على ترتيب الطبيب في نتائج البحث."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4 text-gray-700">خطط الاشتراك والأسئلة الشائعة</h1>
            <p className="text-gray-500 max-w-2xl mx-auto">
              تعرف على خدماتنا وخيارات الاشتراك المتاحة واطلع على شروط الاستخدام والأسئلة الشائعة
            </p>
          </div>

          <Tabs defaultValue="pricing" className="w-full max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="pricing" className="text-lg">
                <DollarSign className="h-5 w-5 ml-2" /> الأسعار والخطط
              </TabsTrigger>
              <TabsTrigger value="terms" className="text-lg">
                <FileText className="h-5 w-5 ml-2" /> الشروط والأحكام
              </TabsTrigger>
              <TabsTrigger value="faq" className="text-lg">
                <QuestionCircle className="h-5 w-5 ml-2" /> الأسئلة الشائعة
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="pricing" className="mt-4">
              <div className="text-center mb-12">
                <div className="flex justify-center mt-4 mb-12">
                  <div className="bg-gray-100 p-1 rounded-full">
                    <Button 
                      variant={billingType === 'monthly' ? 'default' : 'ghost'} 
                      className={`rounded-full px-6 ${billingType === 'monthly' ? 'bg-medical-primary' : ''}`}
                      onClick={() => setBillingType('monthly')}
                    >
                      شهري
                    </Button>
                    <Button 
                      variant={billingType === 'yearly' ? 'default' : 'ghost'} 
                      className={`rounded-full px-6 ${billingType === 'yearly' ? 'bg-medical-primary' : ''}`}
                      onClick={() => setBillingType('yearly')}
                    >
                      سنوي (خصم 17%)
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {pricingPlans[billingType].map((plan, index) => (
                  <Card key={index} className={`overflow-hidden ${plan.isPopular ? 'border-medical-primary border-2 ring-4 ring-medical-light' : ''}`}>
                    {plan.isPopular && (
                      <div className="bg-medical-primary text-white text-center py-1 text-sm font-medium">
                        الأكثر شعبية
                      </div>
                    )}
                    
                    <CardHeader className="text-center">
                      <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    </CardHeader>
                    
                    <CardContent className="text-center pb-0">
                      <div className="flex justify-center items-baseline mb-8">
                        <span className="text-4xl font-bold">{plan.price}</span>
                        <span className="text-gray-600 mr-2">دولار/{billingType === 'monthly' ? 'شهر' : 'سنة'}</span>
                      </div>
                      
                      <ul className="space-y-3 text-right">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-center">
                            {feature.included ? (
                              <CheckCircle className="h-5 w-5 text-green-500 ml-2 flex-shrink-0" />
                            ) : (
                              <X className="h-5 w-5 text-red-500 ml-2 flex-shrink-0" />
                            )}
                            <span className={feature.included ? "" : "text-gray-400"}>{feature.name}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    
                    <CardFooter className="pt-6 pb-6">
                      <Button className={`w-full ${plan.isPopular ? 'bg-medical-primary hover:bg-medical-dark' : ''}`}>
                        {plan.isPopular ? 'اشترك الآن' : 'اختر الخطة'}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="terms" className="mt-4">
              <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-sm">
                <div className="flex items-center mb-8">
                  <FileText className="h-10 w-10 text-medical-primary ml-4" />
                  <h2 className="text-2xl font-semibold text-gray-700">شروط استخدام المنصة للأطباء</h2>
                </div>
                
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-lg font-medium">التسجيل والحساب</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 text-gray-600">
                        <p>1. يجب على جميع الأطباء تقديم وثائق رسمية تثبت هويتهم الشخصية ومؤهلاتهم الطبية.</p>
                        <p>2. يلتزم الطبيب بتقديم معلومات دقيقة وحقيقية عن تخصصه وخبراته المهنية.</p>
                        <p>3. يتحمل الطبيب المسؤولية الكاملة عن الحفاظ على سرية بيانات الدخول الخاصة بحسابه.</p>
                        <p>4. تحتفظ المنصة بالحق في تعليق أو إلغاء أي حساب يخالف شروط الاستخدام.</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-lg font-medium">الخدمات والرسوم</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 text-gray-600">
                        <p>1. تحصل المنصة على عمولة بنسبة 10% من كل حجز يتم من خلالها.</p>
                        <p>2. يتم خصم العمولة تلقائيًا من قيمة الحجز المدفوعة عبر المنصة.</p>
                        <p>3. يمكن للطبيب اختيار خطة الاشتراك المناسبة له من بين الخطط المتاحة.</p>
                        <p>4. جميع الرسوم غير قابلة للاسترداد بعد مرور 14 يومًا من تاريخ الدفع.</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3">
                    <AccordionTrigger className="text-lg font-medium">المواعيد والاستشارات</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 text-gray-600">
                        <p>1. يلتزم الطبيب بالمواعيد المحددة من قبل المرضى عبر المنصة.</p>
                        <p>2. في حالة تعذر الالتزام بالموعد، يجب على الطبيب إشعار المريض والمنصة قبل 24 ساعة على الأقل.</p>
                        <p>3. يجب الرد على الاستشارات الطبية خلال 48 ساعة كحد أقصى.</p>
                        <p>4. تحتفظ المنصة بالحق في تعديل تصنيف الطبيب بناءً على التزامه بالمواعيد وجودة الخدمة المقدمة.</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-4">
                    <AccordionTrigger className="text-lg font-medium">خصوصية البيانات</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 text-gray-600">
                        <p>1. يلتزم الطبيب بالحفاظ على سرية وخصوصية بيانات المرضى وعدم مشاركتها مع أي طرف ثالث.</p>
                        <p>2. تخزن جميع المعلومات الطبية والمحادثات بين الطبيب والمريض بشكل آمن على المنصة.</p>
                        <p>3. يحظر استخدام بيانات المرضى لأغراض التسويق أو أي غرض آخر خارج نطاق الخدمة الطبية.</p>
                        <p>4. يحق للمريض طلب حذف بياناته من قاعدة بيانات الطبيب في أي وقت.</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-5">
                    <AccordionTrigger className="text-lg font-medium">إنهاء الاشتراك</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 text-gray-600">
                        <p>1. يمكن للطبيب إنهاء اشتراكه في المنصة في أي وقت من خلال تقديم طلب عبر البريد الإلكتروني.</p>
                        <p>2. في حالة إنهاء الاشتراك، يلتزم الطبيب بإكمال المواعيد المحجوزة مسبقًا.</p>
                        <p>3. لا يتم استرداد قيمة الاشتراك المتبقية عند إنهاء الاشتراك من قبل الطبيب.</p>
                        <p>4. تحتفظ المنصة بالحق في إنهاء اشتراك أي طبيب يخالف شروط الاستخدام دون إشعار مسبق.</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </TabsContent>
            
            <TabsContent value="faq" className="mt-4">
              <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-sm">
                <div className="flex items-center mb-8">
                  <QuestionCircle className="h-10 w-10 text-medical-primary ml-4" />
                  <h2 className="text-2xl font-semibold text-gray-700">الأسئلة الشائعة</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                  {faqItems.map((item, index) => (
                    <Accordion key={index} type="single" collapsible className="w-full">
                      <AccordionItem value={`item-${index}`}>
                        <AccordionTrigger className="text-md font-medium">{item.question}</AccordionTrigger>
                        <AccordionContent>
                          <p className="text-gray-600">{item.answer}</p>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TermsAndPricing;
