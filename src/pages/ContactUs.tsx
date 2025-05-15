
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add form validation here
    
    // Simulate form submission
    setSubmitStatus('success');
    
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });
    
    // Reset status after 3 seconds
    setTimeout(() => {
      setSubmitStatus('idle');
    }, 3000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 bg-medical-light">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">تواصل معنا</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              نحن هنا للإجابة على استفساراتك ومساعدتك في كل ما تحتاجه. لا تتردد في التواصل معنا عبر أي من القنوات المتاحة
            </p>
          </div>
        </section>
        
        {/* Contact Information */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto bg-medical-light rounded-full w-16 h-16 flex items-center justify-center mb-3">
                    <Phone className="h-8 w-8 text-medical-primary" />
                  </div>
                  <CardTitle className="text-xl">اتصل بنا</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500 mb-2">للاستفسارات العامة</p>
                  <a href="tel:+9647800123456" className="text-lg font-medium text-gray-900 hover:text-medical-primary">
                    +964 780 012 3456
                  </a>
                  <p className="text-gray-500 mt-4 mb-2">الدعم الفني</p>
                  <a href="tel:+9647800123457" className="text-lg font-medium text-gray-900 hover:text-medical-primary">
                    +964 780 012 3457
                  </a>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto bg-medical-light rounded-full w-16 h-16 flex items-center justify-center mb-3">
                    <Mail className="h-8 w-8 text-medical-primary" />
                  </div>
                  <CardTitle className="text-xl">راسلنا عبر البريد</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500 mb-2">للاستفسارات العامة</p>
                  <a href="mailto:info@tabibi.com" className="text-lg font-medium text-gray-900 hover:text-medical-primary">
                    info@tabibi.com
                  </a>
                  <p className="text-gray-500 mt-4 mb-2">الدعم الفني</p>
                  <a href="mailto:support@tabibi.com" className="text-lg font-medium text-gray-900 hover:text-medical-primary">
                    support@tabibi.com
                  </a>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto bg-medical-light rounded-full w-16 h-16 flex items-center justify-center mb-3">
                    <MapPin className="h-8 w-8 text-medical-primary" />
                  </div>
                  <CardTitle className="text-xl">العنوان</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500 mb-2">المكتب الرئيسي</p>
                  <p className="text-lg font-medium text-gray-900">
                    بغداد، المنصور، شارع 14 رمضان
                  </p>
                  <p className="text-gray-500 mt-4 mb-2">ساعات العمل</p>
                  <p className="text-gray-700">
                    الأحد - الخميس: 9 ص - 5 م<br />
                    الجمعة - السبت: مغلق
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <MessageSquare className="h-6 w-6 ml-2 text-medical-primary" />
                  أرسل رسالتك
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">الاسم الكامل</label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">رقم الهاتف</label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">الموضوع</label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">الرسالة</label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <Button 
                      type="submit" 
                      className="bg-medical-primary hover:bg-medical-dark w-full"
                      disabled={submitStatus === 'success'}
                    >
                      <Send className="h-4 w-4 ml-2" />
                      {submitStatus === 'success' ? 'تم الإرسال بنجاح' : 'إرسال الرسالة'}
                    </Button>
                    
                    {submitStatus === 'success' && (
                      <p className="mt-2 text-green-600 text-sm">
                        تم استلام رسالتك بنجاح. سنقوم بالرد عليك في أقرب وقت ممكن.
                      </p>
                    )}
                    
                    {submitStatus === 'error' && (
                      <p className="mt-2 text-red-600 text-sm">
                        حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.
                      </p>
                    )}
                  </div>
                </form>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <MapPin className="h-6 w-6 ml-2 text-medical-primary" />
                  موقعنا
                </h2>
                
                <div className="bg-gray-100 rounded-lg h-[400px] flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-16 w-16 text-medical-primary mx-auto mb-4" />
                    <p className="text-lg font-medium">هنا ستظهر خريطة موقع الشركة</p>
                    <p className="text-gray-600 max-w-md mx-auto">
                      في التطبيق الفعلي، ستظهر هنا خريطة تفاعلية تعرض موقع مكاتبنا
                    </p>
                  </div>
                </div>
                
                <div className="mt-6 p-6 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-xl mb-4">أسئلة متكررة</h3>
                  <ul className="space-y-4">
                    <li>
                      <h4 className="font-medium text-gray-900">ما هي ساعات عمل خدمة العملاء؟</h4>
                      <p className="text-gray-600">نوفر دعمًا على مدار الساعة طوال أيام الأسبوع من خلال نظام الدردشة في التطبيق، بينما يعمل فريق الاستقبال من 9 صباحًا حتى 5 مساءً من الأحد إلى الخميس.</p>
                    </li>
                    <li>
                      <h4 className="font-medium text-gray-900">كم من الوقت يستغرق الرد على الاستفسارات؟</h4>
                      <p className="text-gray-600">عادةً ما نرد على الاستفسارات خلال 24 ساعة من استلامها. للحالات العاجلة، يرجى الاتصال بنا مباشرة.</p>
                    </li>
                    <li>
                      <h4 className="font-medium text-gray-900">هل يمكنني زيارة مكاتبكم شخصيًا؟</h4>
                      <p className="text-gray-600">نعم، يمكنك زيارة مكاتبنا خلال ساعات العمل الرسمية. نوصي بتحديد موعد مسبق لضمان توفر فريقنا لمساعدتك.</p>
                    </li>
                  </ul>
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

export default ContactUs;
