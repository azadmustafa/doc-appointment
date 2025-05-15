
import React, { useState } from 'react';
import { CheckCircle, FileText, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

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
          "بطاقة طبيب أساسية",
          "إدارة المواعيد",
          "تلقي استشارات محدودة (10 شهريًا)",
          "ظهور في نتائج البحث الأساسية",
          "دعم فني عبر البريد الإلكتروني"
        ],
        isPopular: false,
      },
      {
        name: "الخطة الاحترافية",
        price: 35,
        features: [
          "بطاقة طبيب احترافية مميزة",
          "إدارة المواعيد المتقدمة",
          "استشارات غير محدودة",
          "تصنيف أعلى في نتائج البحث",
          "إمكانية استلام الدفع الإلكتروني",
          "دعم فني على مدار الساعة",
          "إحصاءات شهرية للأداء"
        ],
        isPopular: true,
      },
      {
        name: "خطة المؤسسات الطبية",
        price: 80,
        features: [
          "بطاقات متعددة للأطباء (حتى 5 أطباء)",
          "إدارة شاملة للعيادة",
          "استشارات غير محدودة",
          "أولوية في نتائج البحث",
          "تكامل مع نظام المستشفى",
          "دعم فني متميز على مدار الساعة",
          "إحصاءات متقدمة وتقارير تحليلية",
          "تطبيق مخصص للعيادة"
        ],
        isPopular: false,
      }
    ],
    yearly: [
      {
        name: "الخطة الأساسية",
        price: 150,
        features: [
          "بطاقة طبيب أساسية",
          "إدارة المواعيد",
          "تلقي استشارات محدودة (10 شهريًا)",
          "ظهور في نتائج البحث الأساسية",
          "دعم فني عبر البريد الإلكتروني",
          "خصم 17% على الاشتراك السنوي"
        ],
        isPopular: false,
      },
      {
        name: "الخطة الاحترافية",
        price: 350,
        features: [
          "بطاقة طبيب احترافية مميزة",
          "إدارة المواعيد المتقدمة",
          "استشارات غير محدودة",
          "تصنيف أعلى في نتائج البحث",
          "إمكانية استلام الدفع الإلكتروني",
          "دعم فني على مدار الساعة",
          "إحصاءات شهرية للأداء",
          "خصم 17% على الاشتراك السنوي",
          "تمييز كطبيب موصى به"
        ],
        isPopular: true,
      },
      {
        name: "خطة المؤسسات الطبية",
        price: 800,
        features: [
          "بطاقات متعددة للأطباء (حتى 5 أطباء)",
          "إدارة شاملة للعيادة",
          "استشارات غير محدودة",
          "أولوية في نتائج البحث",
          "تكامل مع نظام المستشفى",
          "دعم فني متميز على مدار الساعة",
          "إحصاءات متقدمة وتقارير تحليلية",
          "تطبيق مخصص للعيادة",
          "خصم 17% على الاشتراك السنوي",
          "ورش تدريبية حصرية للطاقم الطبي"
        ],
        isPopular: false,
      }
    ]
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Terms Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-3xl font-bold mb-4">الشروط والأحكام</h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                اطّلع على شروط وأحكام استخدام منصة طبيبي للأطباء ومقدمي الخدمات الطبية
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-sm">
              <div className="flex items-center mb-8">
                <FileText className="h-10 w-10 text-medical-primary ml-4" />
                <h2 className="text-2xl font-semibold">شروط استخدام المنصة للأطباء</h2>
              </div>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-lg font-medium">التسجيل والحساب</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 text-gray-700">
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
                    <div className="space-y-4 text-gray-700">
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
                    <div className="space-y-4 text-gray-700">
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
                    <div className="space-y-4 text-gray-700">
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
                    <div className="space-y-4 text-gray-700">
                      <p>1. يمكن للطبيب إنهاء اشتراكه في المنصة في أي وقت من خلال تقديم طلب عبر البريد الإلكتروني.</p>
                      <p>2. في حالة إنهاء الاشتراك، يلتزم الطبيب بإكمال المواعيد المحجوزة مسبقًا.</p>
                      <p>3. لا يتم استرداد قيمة الاشتراك المتبقية عند إنهاء الاشتراك من قبل الطبيب.</p>
                      <p>4. تحتفظ المنصة بالحق في إنهاء اشتراك أي طبيب يخالف شروط الاستخدام دون إشعار مسبق.</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>
        
        {/* Pricing Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">خطط الاشتراك والأسعار</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                اختر خطة الاشتراك المناسبة لاحتياجاتك كطبيب أو مقدم خدمة طبية
              </p>
              
              <div className="flex justify-center mt-8 mb-12">
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
                          <CheckCircle className="h-5 w-5 text-green-500 ml-2 flex-shrink-0" />
                          <span>{feature}</span>
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
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default TermsAndPricing;
