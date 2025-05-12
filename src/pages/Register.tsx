
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { User, Mail, Lock, Phone, UserPlus } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const registerFormSchema = z
  .object({
    fullName: z.string().min(3, { message: "يجب أن يحتوي الاسم على 3 أحرف على الأقل" }),
    email: z.string().email({ message: "يرجى إدخال بريد إلكتروني صحيح" }),
    phone: z.string().min(10, { message: "يجب أن يكون رقم الهاتف صحيحًا" }),
    password: z.string().min(8, { message: "كلمة المرور يجب أن تحتوي على 8 أحرف على الأقل" }),
    confirmPassword: z.string(),
    acceptTerms: z.boolean().refine(val => val === true, {
      message: "يجب الموافقة على الشروط والأحكام للمتابعة"
    })
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "كلمات المرور غير متطابقة",
    path: ["confirmPassword"]
  });

type RegisterFormValues = z.infer<typeof registerFormSchema>;

const Register = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    setIsLoading(true);
    try {
      console.log("بيانات التسجيل:", values);
      // هنا سيتم إضافة منطق التسجيل الفعلي لاحقًا
      
      toast({
        title: "تم إنشاء الحساب بنجاح",
        description: "مرحبًا بك في منصة طبيبي",
      });
      
      // توجيه المستخدم إلى صفحة تسجيل الدخول بعد إنشاء الحساب
      navigate("/login");
    } catch (error) {
      toast({
        title: "فشل إنشاء الحساب",
        description: "يرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen" dir="rtl">
      <Header />
      
      <main className="flex-grow flex items-center justify-center py-10 bg-gray-50">
        <div className="w-full max-w-lg px-6">
          <div className="bg-white shadow-md rounded-lg p-8">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">إنشاء حساب جديد</h1>
              <p className="text-gray-600 mt-2">أدخل بياناتك لإنشاء حساب في منصة طبيبي</p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الاسم الكامل</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                          <Input
                            className="pr-10"
                            placeholder="محمد أحمد"
                            {...field}
                            disabled={isLoading}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>البريد الإلكتروني</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                          <Input
                            type="email"
                            className="pr-10"
                            placeholder="example@example.com"
                            {...field}
                            disabled={isLoading}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>رقم الهاتف</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Phone className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                          <Input
                            type="tel"
                            className="pr-10"
                            placeholder="05xxxxxxxx"
                            {...field}
                            disabled={isLoading}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>كلمة المرور</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                            <Input
                              type="password"
                              className="pr-10"
                              placeholder="********"
                              {...field}
                              disabled={isLoading}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>تأكيد كلمة المرور</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                            <Input
                              type="password"
                              className="pr-10"
                              placeholder="********"
                              {...field}
                              disabled={isLoading}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="acceptTerms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-x-reverse space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-medium">
                          أوافق على{" "}
                          <a
                            href="#"
                            className="font-semibold text-medical-primary hover:text-medical-dark"
                          >
                            الشروط والأحكام
                          </a>{" "}
                          و{" "}
                          <a
                            href="#"
                            className="font-semibold text-medical-primary hover:text-medical-dark"
                          >
                            سياسة الخصوصية
                          </a>
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full bg-medical-primary hover:bg-medical-dark"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    "جاري إنشاء الحساب..."
                  ) : (
                    <>
                      <UserPlus className="ml-2 h-5 w-5" /> إنشاء حساب
                    </>
                  )}
                </Button>

                <div className="text-center mt-4">
                  <p className="text-sm text-gray-600">
                    لديك حساب بالفعل؟{" "}
                    <a
                      onClick={() => navigate("/login")}
                      className="font-semibold text-medical-primary hover:text-medical-dark cursor-pointer"
                    >
                      تسجيل الدخول
                    </a>
                  </p>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Register;
