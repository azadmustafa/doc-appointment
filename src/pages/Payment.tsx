
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CreditCard, CheckCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from "@/components/ui/use-toast";
import { AspectRatio } from '@/components/ui/aspect-ratio';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const paymentSchema = z.object({
  cardholderName: z.string().min(3, { message: 'الرجاء إدخال اسم صحيح' }),
  cardNumber: z.string().regex(/^\d{16}$/, { message: 'الرجاء إدخال رقم بطاقة صحيح (16 رقم)' }),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, { message: 'الرجاء إدخال تاريخ انتهاء صحيح (MM/YY)' }),
  cvv: z.string().regex(/^\d{3,4}$/, { message: 'الرجاء إدخال رمز CVV صحيح (3 أو 4 أرقام)' }),
});

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState<'credit' | 'mada' | 'applepay' | 'googlepay'>('credit');
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);
  const [amount] = useState(149.99); // Example amount

  const form = useForm<z.infer<typeof paymentSchema>>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      cardholderName: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
    },
  });

  const onSubmit = (values: z.infer<typeof paymentSchema>) => {
    console.log('Payment form submitted:', values);
    // In a real app, we would call a payment processing service here
    
    // Simulate payment processing
    setTimeout(() => {
      setIsPaymentComplete(true);
      toast({
        title: "تمت عملية الدفع بنجاح",
        description: `تم دفع ${amount} دينار بنجاح`,
      });
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-center">إتمام عملية الدفع</h1>
            
            {isPaymentComplete ? (
              <Card className="border-green-500 shadow-lg">
                <CardHeader className="text-center bg-green-50 rounded-t-lg">
                  <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-2" />
                  <CardTitle className="text-2xl font-bold text-green-700">تمت عملية الدفع بنجاح</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 pb-4 text-center">
                  <p className="text-lg mb-4">تم خصم <span className="font-bold text-medical-primary">{amount} دينار</span> من حسابك</p>
                  <p className="text-gray-600 mb-6">سيتم إرسال إيصال إلى بريدك الإلكتروني</p>
                  <Button 
                    className="bg-medical-primary hover:bg-medical-dark w-full md:w-auto px-8"
                    onClick={() => window.location.href = '/'}
                  >
                    العودة للصفحة الرئيسية
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <>
                <div className="bg-gray-50 rounded-lg p-6 mb-8">
                  <h2 className="text-xl font-semibold mb-4">ملخص الطلب</h2>
                  <div className="flex justify-between mb-2">
                    <span>قيمة الخدمة:</span>
                    <span className="font-medium">{amount} دينار</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>الضريبة:</span>
                    <span className="font-medium">0.00 دينار</span>
                  </div>
                  <div className="border-t pt-2 mt-2 flex justify-between">
                    <span className="font-bold">المجموع:</span>
                    <span className="font-bold text-medical-primary">{amount} دينار</span>
                  </div>
                </div>

                <Card className="shadow-md">
                  <CardHeader>
                    <CardTitle className="text-xl">اختر طريقة الدفع</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div 
                        className={`border rounded-lg p-4 text-center cursor-pointer transition-all ${paymentMethod === 'credit' ? 'border-medical-primary bg-medical-light' : 'hover:border-gray-400'}`}
                        onClick={() => setPaymentMethod('credit')}
                      >
                        <CreditCard className="h-8 w-8 mx-auto mb-2 text-medical-primary" />
                        <p className="text-sm font-medium">بطاقة ائتمان</p>
                      </div>
                      <div 
                        className={`border rounded-lg p-4 text-center cursor-pointer transition-all ${paymentMethod === 'mada' ? 'border-medical-primary bg-medical-light' : 'hover:border-gray-400'}`}
                        onClick={() => setPaymentMethod('mada')}
                      >
                        <div className="h-8 flex items-center justify-center mb-2">
                          <img src="https://mada.com/wp-content/uploads/2020/02/mada-circle.png" alt="Mada" className="h-7" />
                        </div>
                        <p className="text-sm font-medium">مدى</p>
                      </div>
                      <div 
                        className={`border rounded-lg p-4 text-center cursor-pointer transition-all ${paymentMethod === 'applepay' ? 'border-medical-primary bg-medical-light' : 'hover:border-gray-400'}`}
                        onClick={() => setPaymentMethod('applepay')}
                      >
                        <div className="h-8 flex items-center justify-center mb-2">
                          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Apple_Pay_logo.svg/1200px-Apple_Pay_logo.svg.png" alt="Apple Pay" className="h-6" />
                        </div>
                        <p className="text-sm font-medium">Apple Pay</p>
                      </div>
                      <div 
                        className={`border rounded-lg p-4 text-center cursor-pointer transition-all ${paymentMethod === 'googlepay' ? 'border-medical-primary bg-medical-light' : 'hover:border-gray-400'}`}
                        onClick={() => setPaymentMethod('googlepay')}
                      >
                        <div className="h-8 flex items-center justify-center mb-2">
                          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Google_Pay_Logo.svg/1200px-Google_Pay_Logo.svg.png" alt="Google Pay" className="h-6" />
                        </div>
                        <p className="text-sm font-medium">Google Pay</p>
                      </div>
                    </div>

                    {(paymentMethod === 'credit' || paymentMethod === 'mada') && (
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                          <FormField
                            control={form.control}
                            name="cardholderName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>اسم حامل البطاقة</FormLabel>
                                <FormControl>
                                  <Input placeholder="الاسم كما يظهر على البطاقة" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="cardNumber"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>رقم البطاقة</FormLabel>
                                <FormControl>
                                  <Input placeholder="XXXX XXXX XXXX XXXX" 
                                    {...field} 
                                    onChange={(e) => {
                                      // Remove spaces and limit to 16 digits
                                      const value = e.target.value.replace(/\s/g, '').substring(0, 16);
                                      field.onChange(value);
                                    }}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="expiryDate"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>تاريخ الانتهاء</FormLabel>
                                  <FormControl>
                                    <Input placeholder="MM/YY" 
                                      {...field} 
                                      onChange={(e) => {
                                        let value = e.target.value.replace(/[^\d]/g, '');
                                        // Auto-format as MM/YY
                                        if (value.length > 2) {
                                          value = value.substring(0, 2) + '/' + value.substring(2, 4);
                                        }
                                        field.onChange(value);
                                      }}
                                      maxLength={5}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="cvv"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>رمز CVV</FormLabel>
                                  <FormControl>
                                    <Input placeholder="123" 
                                      type="password" 
                                      {...field} 
                                      onChange={(e) => {
                                        const value = e.target.value.replace(/\D/g, '').substring(0, 4);
                                        field.onChange(value);
                                      }}
                                      maxLength={4}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="pt-4">
                            <Button 
                              type="submit" 
                              className="w-full bg-medical-primary hover:bg-medical-dark"
                            >
                              دفع {amount} دينار
                            </Button>
                          </div>
                        </form>
                      </Form>
                    )}

                    {paymentMethod === 'applepay' && (
                      <div className="text-center py-6">
                        <Button 
                          className="w-full bg-black hover:bg-gray-900 text-white py-3"
                          onClick={() => {
                            setTimeout(() => {
                              setIsPaymentComplete(true);
                              toast({
                                title: "تمت عملية الدفع بنجاح",
                                description: `تم دفع ${amount} دينار بنجاح`,
                              });
                            }, 1500);
                          }}
                        >
                          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Apple_Pay_logo.svg/1200px-Apple_Pay_logo.svg.png" alt="Apple Pay" className="h-6 inline-block ml-2" />
                          الدفع باستخدام Apple Pay
                        </Button>
                      </div>
                    )}

                    {paymentMethod === 'googlepay' && (
                      <div className="text-center py-6">
                        <Button 
                          className="w-full bg-white hover:bg-gray-100 text-black border border-gray-300 py-3"
                          onClick={() => {
                            setTimeout(() => {
                              setIsPaymentComplete(true);
                              toast({
                                title: "تمت عملية الدفع بنجاح",
                                description: `تم دفع ${amount} دينار بنجاح`,
                              });
                            }, 1500);
                          }}
                        >
                          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Google_Pay_Logo.svg/1200px-Google_Pay_Logo.svg.png" alt="Google Pay" className="h-6 inline-block ml-2" />
                          الدفع باستخدام Google Pay
                        </Button>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="text-center text-sm text-gray-500 flex flex-col items-center">
                    <div className="mb-3 flex items-center gap-2">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-6" />
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" className="h-6" />
                      <img src="https://mada.com/wp-content/uploads/2020/02/mada-circle.png" alt="Mada" className="h-6" />
                    </div>
                    <p>جميع معلومات بطاقتك مشفرة ومحمية بشكل آمن</p>
                  </CardFooter>
                </Card>
              </>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Payment;
