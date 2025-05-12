
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
import { Mail, Lock, LogIn } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const loginFormSchema = z.object({
  email: z.string().email({ message: "يرجى إدخال بريد إلكتروني صحيح" }),
  password: z.string().min(8, { message: "كلمة المرور يجب أن تحتوي على 8 أحرف على الأقل" }),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);
    try {
      console.log("بيانات تسجيل الدخول:", values);
      // هنا سيتم إضافة منطق تسجيل الدخول الفعلي لاحقًا
      
      toast({
        title: "تم تسجيل الدخول بنجاح",
        description: "مرحبًا بك في منصة طبيبي",
      });
      
      // توجيه المستخدم إلى الصفحة الرئيسية بعد تسجيل الدخول
      navigate("/");
    } catch (error) {
      toast({
        title: "فشل تسجيل الدخول",
        description: "يرجى التحقق من بيانات الاعتماد الخاصة بك",
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
      
      <main className="flex-grow flex items-center justify-center py-12 bg-gray-50">
        <div className="w-full max-w-md px-6">
          <div className="bg-white shadow-md rounded-lg p-8">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">تسجيل الدخول</h1>
              <p className="text-gray-600 mt-2">أدخل بيانات حسابك للوصول إلى منصة طبيبي</p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

                <div className="flex items-center justify-between">
                  <FormField
                    control={form.control}
                    name="rememberMe"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-3 space-x-reverse space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-medium cursor-pointer">
                          تذكرني
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                  <a
                    href="#"
                    className="text-sm font-medium text-medical-primary hover:text-medical-dark"
                  >
                    نسيت كلمة المرور؟
                  </a>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-medical-primary hover:bg-medical-dark"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    "جاري تسجيل الدخول..."
                  ) : (
                    <>
                      <LogIn className="ml-2 h-5 w-5" /> تسجيل الدخول
                    </>
                  )}
                </Button>

                <div className="text-center mt-4">
                  <p className="text-sm text-gray-600">
                    ليس لديك حساب؟{" "}
                    <a
                      onClick={() => navigate("/register")}
                      className="font-semibold text-medical-primary hover:text-medical-dark cursor-pointer"
                    >
                      إنشاء حساب جديد
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

export default Login;
