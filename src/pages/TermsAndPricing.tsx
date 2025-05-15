import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Check, X, CreditCard, FileText } from 'lucide-react';

const TermsAndPricing = () => {
  const [activeTab, setActiveTab] = useState('pricing');

  const pricingPlans = [
    {
      name: "الباقة الأساسية",
      price: 49.99,
      description: "للأفراد والاستشارات البسيطة",
      features: [
        "استشارة طبية لمدة 30 دقيقة",
        "تقرير طبي مختصر",
        "متابعة لمدة أسبوع",
        "وصفة طبية إلكترونية",
      ],
      notIncluded: [
        "تحويلات للأخصائيين",
        "متابعة مستمرة",
        "خدمة الطوارئ على مدار الساعة",
      ]
    },
    {
      name: "الباقة المتقدمة",
      price: 149.99,
      description: "للحالات المتوسطة والمتابعة المستمرة",
      features: [
        "استشارة طبية لمدة 45 دقيقة",
        "تقرير طبي مفصل",
        "متابعة لمدة شهر",
        "وصفة طبية إلكترونية",
        "تحويلات للأخصائيين",
        "استشارة متابعة مجانية",
      ],
      notIncluded: [
        "خدمة الطوارئ على مدار الساعة",
      ],
      recommended: true
    },
    {
      name: "الباقة الشاملة",
      price: 299.99,
      description: "للحالات المعقدة والرعاية المستمرة",
      features: [
        "استشارات طبية غير محدودة لمدة 3 أشهر",
        "تقارير طبية مفصلة",
        "متابعة مستمرة",
        "وصفات طبية إلكترونية",
        "تحويلات للأخصائيين",
        "خدمة الطوارئ على مدار الساعة",
        "زيارات منزلية (في المناطق المحددة)",
      ],
      notIncluded: []
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 bg-medical-light">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">الشروط والأسعار</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              نقدم باقات متنوعة تناسب احتياجاتك الطبية المختلفة بأسعار تنافسية وشروط مرنة
            </p>
          </div>
        </section>
        
        {/* Tabs Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="pricing" className="w-full" onValueChange={setActiveTab}>
              <div className="flex justify-center mb-8">
                <TabsList className="grid w-full max-w-md grid-cols-2">
                  <TabsTrigger value="pricing">الأسعار والباقات</TabsTrigger>
                  <TabsTrigger value="terms">الشروط والأحكام</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="pricing" className="mt-6">
                <div className="text-center mb-12">
                  <h2 className="text-2xl font-bold mb-4">اختر الباقة المناسبة لاحتياجاتك</h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    نقدم مجموعة من الباقات المصممة لتلبية احتياجاتك الطبية المختلفة، مع خيارات متنوعة تناسب جميع الميزانيات
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                  {pricingPlans.map((plan, index) => (
                    <Card key={index} className={`flex flex-col ${plan.recommended ? 'border-medical-primary shadow-lg relative' : ''}`}>
                      {plan.recommended && (
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-medical-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                          الأكثر شيوعاً
                        </div>
                      )}
                      <CardHeader>
                        <CardTitle className="text-xl">{plan.name}</CardTitle>
                        <CardDescription>{plan.description}</CardDescription>
                        <div className="mt-4">
                          <span className="text-3xl font-bold text-medical-primary">{plan.price}</span>
                          <span className="text-gray-600 mr-1">دينار</span>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <div className="space-y-4">
                          <h4 className="font-medium text-sm">المميزات المشمولة:</h4>
                          <ul className="space-y-2">
                            {plan.features.map((feature, i) => (
                              <li key={i} className="flex items-start">
                                <Check className="h-5 w-5 text-green-500 ml-2 mt-0.5 shrink-0" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                          
                          {plan.notIncluded.length > 0 && (
                            <>
                              <h4 className="font-medium text-sm mt-6">غير مشمول:</h4>
                              <ul className="space-y-2">
                                {plan.notIncluded.map((feature, i) => (
                                  <li key={i} className="flex items-start text-gray-500">
                                    <X className="h-5 w-5 text-red-400 ml-2 mt-0.5 shrink-0" />
                                    <span>{feature}</span>
                                  </li>
                                ))}
                              </ul>
                            </>
                          )}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button 
                          className={`w-full ${plan.recommended ? 'bg-medical-primary hover:bg-medical-dark' : ''}`}
                          onClick={() => window.location.href = '/payment'}
                        >
                          <CreditCard className="ml-2 h-5 w-5" />
                          اشترك الآن
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
                
                <div className="mt-16 bg-gray-50 rounded-lg p-6">
                  <div className="flex items-start">
                    <FileText className="h-6 w-6 text-medical-primary ml-4 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold mb-2">هل تحتاج إلى باقة مخصصة؟</h3>
                      <p className="text-gray-600 mb-4">
                        إذا كانت احتياجاتك الطبية تتطلب خدمات مخصصة، يمكننا تصميم باقة خاصة تناسب متطلباتك.
                      </p>
                      <Button variant="outline" onClick={() => window.location.href = '/contact'}>
                        تواصل معنا للحصول على عرض مخصص
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="terms">
                <div className="max-w-3xl mx-auto">
                  <h2 className="text-2xl font-bold mb-6">الشروط والأحكام</h2>
                  
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">1. الخدمات الطبية</h3>
                      <p className="text-gray-700 mb-4">
                        تقدم منصتنا خدمات استشارية طبية عن بعد، ولا تعتبر بديلاً عن زيارة الطبيب في الحالات الطارئة أو التي تتطلب فحصاً سريرياً مباشراً. الاستشارات المقدمة هي لأغراض إعلامية فقط ويجب عدم اعتبارها تشخيصاً نهائياً.
                      </p>
                      <p className="text-gray-700">
                        يحق للطبيب رفض تقديم الاستشارة إذا رأى أن الحالة تتطلب زيارة مباشرة للطبيب أو تدخلاً طبياً عاجلاً.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-3">2. الدفع والاشتراكات</h3>
                      <p className="text-gray-700 mb-4">
                        يتم دفع رسوم الاستشارات والباقات مقدماً عبر وسائل الدفع المتاحة في المنصة. في حال إلغاء موعد الاستشارة قبل 24 ساعة من الموعد المحدد، يمكن استرداد المبلغ كاملاً أو إعادة جدولة الموعد.
                      </p>
                      <p className="text-gray-700">
                        الاشتراكات في الباقات الشهرية أو السنوية تجدد تلقائياً ما لم يتم إلغاؤها قبل 3 أيام على الأقل من تاريخ التجديد.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-3">3. الخصوصية وسرية المعلومات</h3>
                      <p className="text-gray-700 mb-4">
                        نلتزم بالحفاظ على سرية جميع البيانات الطبية والشخصية للمستخدمين وفقاً للقوانين واللوائح المعمول بها. لا يتم مشاركة بياناتك مع أي طرف ثالث دون موافقة صريحة منك، باستثناء ما تقتضيه القوانين.
                      </p>
                      <p className="text-gray-700">
                        جميع المحادثات والاستشارات مع الأطباء مشفرة ومحمية، ويتم تخزينها بشكل آمن لمدة 5 سنوات وفقاً للمتطلبات القانونية.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-3">4. المسؤولية القانونية</h3>
                      <p className="text-gray-700 mb-4">
                        لا تتحمل المنصة المسؤولية عن أي أضرار قد تنتج عن سوء استخدام المعلومات المقدمة خلال الاستشارات، أو عدم اتباع التعليمات الطبية، أو إخفاء معلومات جوهرية عن الطبيب المعالج.
                      </p>
                      <p className="text-gray-700">
                        في حالة وجود أي شكاوى أو ملاحظات حول الخدمة المقدمة، يرجى التواصل مع فريق خدمة العملاء خلال 7 أيام من تاريخ الاستشارة.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-3">5. التعديلات على الشروط والأحكام</h3>
                      <p className="text-gray-700">
                        تحتفظ المنصة بالحق في تعديل هذه الشروط والأحكام في أي وقت، وسيتم إشعار المستخدمين بأي تغييرات جوهرية قبل 30 يوماً من تطبيقها. استمرار استخدام المنصة بعد نشر التعديلات يعتبر موافقة على الشروط الجديدة.
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-10 border-t pt-6">
                    <p className="text-gray-600 mb-6">
                      باستخدامك للمنصة، فإنك توافق على جميع الشروط والأحكام المذكورة أعلاه. إذا كان لديك أي استفسارات، يرجى التواصل مع فريق الدعم.
                    </p>
                    <div className="flex justify-center">
                      <Button onClick={() => window.location.href = '/contact'}>
                        تواصل مع فريق الدعم
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default TermsAndPricing;
