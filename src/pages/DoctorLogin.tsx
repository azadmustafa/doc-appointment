
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import { Eye, EyeOff } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SocialAuthButtons from "../components/SocialAuthButtons";
import { useAuth } from "../context/AuthContext";

const formSchema = z.object({
  email: z.string().email({
    message: "يرجى إدخال بريد إلكتروني صالح",
  }),
  password: z.string().min(6, {
    message: "كلمة المرور يجب أن تكون 6 أحرف على الأقل",
  }),
  rememberMe: z.boolean().optional(),
});

const DoctorLogin = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await login({
        email: values.email,
        password: values.password,
        role: "doctor",
      });
      navigate("/doctor-dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      form.setError("email", {
        type: "manual",
        message: "خطأ في البريد الإلكتروني أو كلمة المرور",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 medical-container py-12">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">
                تسجيل الدخول كمقدم خدمة طبية
              </CardTitle>
              <CardDescription className="text-center">
                أدخل بياناتك للوصول إلى لوحة التحكم
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>البريد الإلكتروني</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="أدخل البريد الإلكتروني"
                            {...field}
                          />
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
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="أدخل كلمة المرور"
                              {...field}
                            />
                            <button
                              type="button"
                              className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOff className="h-5 w-5" />
                              ) : (
                                <Eye className="h-5 w-5" />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <FormField
                      control={form.control}
                      name="rememberMe"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-x-reverse">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            تذكرني
                          </FormLabel>
                        </FormItem>
                      )}
                    />

                    <Link
                      to="/forgot-password"
                      className="text-sm text-medical-primary hover:underline mr-auto"
                    >
                      نسيت كلمة المرور؟
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-medical-primary hover:bg-medical-dark"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting
                      ? "جاري تسجيل الدخول..."
                      : "تسجيل الدخول"}
                  </Button>
                </form>
              </Form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-white px-2 text-gray-500">أو</span>
                </div>
              </div>

              <SocialAuthButtons />
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-center text-sm">
                ليس لديك حساب؟{" "}
                <Link 
                  to="/medical-provider-registration" 
                  className="text-medical-primary hover:underline font-medium"
                >
                  سجل كمقدم خدمة جديد
                </Link>
              </div>
              <div className="text-center text-sm">
                <Link to="/login" className="text-gray-600 hover:underline">
                  تسجيل الدخول كمريض
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DoctorLogin;
