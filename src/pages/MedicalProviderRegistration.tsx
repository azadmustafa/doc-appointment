
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Check, Info, Plus, X } from "lucide-react";

// Components
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  providerType: z.enum(["doctor", "hospital", "clinic", "beautyCenter"]),
  name: z.object({
    ar: z.string().min(2, { message: "الاسم مطلوب" }),
    en: z.string().min(2, { message: "Name is required" }),
  }),
  specialty: z.object({
    ar: z.string().min(2, { message: "التخصص مطلوب" }),
    en: z.string().min(2, { message: "Specialty is required" }),
  }),
  bio: z.object({
    ar: z.string().min(10, { message: "السيرة الذاتية مطلوبة" }),
    en: z.string().min(10, { message: "Bio is required" }),
  }),
  email: z.string().email({ message: "البريد الإلكتروني غير صالح" }),
  phone: z.string().min(8, { message: "رقم الهاتف مطلوب" }),
  password: z.string().min(8, { message: "كلمة المرور يجب أن تكون 8 أحرف على الأقل" }),
  confirmPassword: z.string(),
  license: z.string().min(2, { message: "رقم الترخيص مطلوب" }),
  city: z.object({
    ar: z.string().min(2, { message: "المدينة مطلوبة" }),
    en: z.string().min(2, { message: "City is required" }),
  }),
  address: z.object({
    ar: z.string().min(5, { message: "العنوان مطلوب" }),
    en: z.string().min(5, { message: "Address is required" }),
  }),
  workingDays: z.array(z.string()).min(1, { message: "يرجى اختيار يوم عمل واحد على الأقل" }),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: "يجب الموافقة على الشروط والأحكام",
  }),
  services: z.array(
    z.object({
      ar: z.string().min(2, { message: "اسم الخدمة مطلوب" }),
      en: z.string().min(2, { message: "Service name is required" }),
      price: z.string().min(1, { message: "سعر الخدمة مطلوب" }),
    })
  ),
  acceptsHomeVisit: z.boolean().optional(),
  providesVideoConsultation: z.boolean().optional(),
  providesAudioConsultation: z.boolean().optional(),
}).refine(data => data.password === data.confirmPassword, {
  message: "كلمات المرور غير متطابقة",
  path: ["confirmPassword"],
});

type FormValues = z.infer<typeof formSchema>;

const MedicalProviderRegistration = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [currentLanguage, setCurrentLanguage] = useState<"ar" | "en">("ar");
  
  // Services state
  const [services, setServices] = useState<Array<{ ar: string; en: string; price: string }>>([]);
  const [newService, setNewService] = useState({ ar: "", en: "", price: "" });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      providerType: "doctor",
      name: { ar: "", en: "" },
      specialty: { ar: "", en: "" },
      bio: { ar: "", en: "" },
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      license: "",
      city: { ar: "", en: "" },
      address: { ar: "", en: "" },
      workingDays: [],
      acceptTerms: false,
      services: [],
      acceptsHomeVisit: false,
      providesVideoConsultation: false,
      providesAudioConsultation: false,
    },
  });

  const currentProvider = form.watch("providerType");

  const workingDays = [
    { value: "Sunday", labelAr: "الأحد", labelEn: "Sunday" },
    { value: "Monday", labelAr: "الإثنين", labelEn: "Monday" },
    { value: "Tuesday", labelAr: "الثلاثاء", labelEn: "Tuesday" },
    { value: "Wednesday", labelAr: "الأربعاء", labelEn: "Wednesday" },
    { value: "Thursday", labelAr: "الخميس", labelEn: "Thursday" },
    { value: "Friday", labelAr: "الجمعة", labelEn: "Friday" },
    { value: "Saturday", labelAr: "السبت", labelEn: "Saturday" },
  ];

  const addService = () => {
    if (newService.ar && newService.en && newService.price) {
      setServices([...services, newService]);
      setNewService({ ar: "", en: "", price: "" });
    }
  };

  const removeService = (index: number) => {
    const updatedServices = [...services];
    updatedServices.splice(index, 1);
    setServices(updatedServices);
  };

  const nextStep = async () => {
    let isValid = false;
    
    if (currentStep === 1) {
      isValid = await form.trigger(['providerType', 'name', 'specialty', 'email', 'phone', 'password', 'confirmPassword']);
    } else if (currentStep === 2) {
      isValid = await form.trigger(['license', 'city', 'address', 'workingDays']);
      form.setValue('services', services);
    }
    
    if (isValid) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const onSubmit = (data: FormValues) => {
    data.services = services;
    
    // Here you would typically send the data to your backend
    console.log("Form submitted:", data);
    
    toast({
      title: "تم إرسال طلب التسجيل",
      description: "سيتم مراجعة طلبك وإعلامك بالنتيجة قريبًا",
    });
    
    // Navigate to login or confirmation page
    setTimeout(() => {
      navigate("/doctor-login");
    }, 2000);
  };

  // Provider type label based on selected type
  const getProviderTypeLabel = () => {
    switch (currentProvider) {
      case "doctor":
        return currentLanguage === "ar" ? "طبيب" : "Doctor";
      case "hospital":
        return currentLanguage === "ar" ? "مستشفى" : "Hospital";
      case "clinic":
        return currentLanguage === "ar" ? "عيادة" : "Clinic";
      case "beautyCenter":
        return currentLanguage === "ar" ? "مركز تجميل" : "Beauty Center";
      default:
        return currentLanguage === "ar" ? "مقدم خدمة" : "Provider";
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="medical-container py-10">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl mb-2">
              {currentLanguage === "ar" ? "تسجيل مقدم خدمة جديد" : "Register New Medical Provider"}
            </CardTitle>
            <CardDescription>
              {currentLanguage === "ar" 
                ? "أنشئ حسابًا كطبيب أو مرفق طبي للانضمام إلى منصتنا"
                : "Create an account as a doctor or medical facility to join our platform"}
            </CardDescription>
            
            <div className="mt-4 flex justify-end">
              <div className="bg-gray-100 p-1 rounded-md inline-flex">
                <Button
                  type="button"
                  variant={currentLanguage === "ar" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentLanguage("ar")}
                  className="text-xs"
                >
                  العربية
                </Button>
                <Button
                  type="button"
                  variant={currentLanguage === "en" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentLanguage("en")}
                  className="text-xs"
                >
                  English
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="flex justify-between mb-8">
              <div className={`flex items-center ${currentStep === 1 ? 'text-medical-primary' : 'text-gray-500'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${currentStep === 1 ? 'bg-medical-primary text-white' : 'bg-gray-200'}`}>1</div>
                <span>{currentLanguage === "ar" ? "المعلومات الأساسية" : "Basic Information"}</span>
              </div>
              <div className={`flex items-center ${currentStep === 2 ? 'text-medical-primary' : 'text-gray-500'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${currentStep === 2 ? 'bg-medical-primary text-white' : 'bg-gray-200'}`}>2</div>
                <span>{currentLanguage === "ar" ? "معلومات العمل" : "Professional Information"}</span>
              </div>
              <div className={`flex items-center ${currentStep === 3 ? 'text-medical-primary' : 'text-gray-500'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${currentStep === 3 ? 'bg-medical-primary text-white' : 'bg-gray-200'}`}>3</div>
                <span>{currentLanguage === "ar" ? "المراجعة والتأكيد" : "Review & Confirm"}</span>
              </div>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="providerType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {currentLanguage === "ar" ? "نوع مقدم الخدمة" : "Provider Type"}
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder={currentLanguage === "ar" ? "اختر نوع مقدم الخدمة" : "Select provider type"} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="doctor">{currentLanguage === "ar" ? "طبيب" : "Doctor"}</SelectItem>
                              <SelectItem value="hospital">{currentLanguage === "ar" ? "مستشفى" : "Hospital"}</SelectItem>
                              <SelectItem value="clinic">{currentLanguage === "ar" ? "عيادة" : "Clinic"}</SelectItem>
                              <SelectItem value="beautyCenter">{currentLanguage === "ar" ? "مركز تجميل" : "Beauty Center"}</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Tabs defaultValue="ar" className="w-full">
                      <TabsList className="mb-4 w-full">
                        <TabsTrigger value="ar" className="flex-1">العربية</TabsTrigger>
                        <TabsTrigger value="en" className="flex-1">English</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="ar">
                        <FormField
                          control={form.control}
                          name="name.ar"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>الاسم (بالعربية) *</FormLabel>
                              <FormControl>
                                <Input placeholder="أدخل الاسم بالعربية" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="specialty.ar"
                          render={({ field }) => (
                            <FormItem className="mt-4">
                              <FormLabel>التخصص (بالعربية) *</FormLabel>
                              <FormControl>
                                <Input placeholder="التخصص باللغة العربية" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </TabsContent>
                      
                      <TabsContent value="en">
                        <FormField
                          control={form.control}
                          name="name.en"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name (English) *</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter name in English" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="specialty.en"
                          render={({ field }) => (
                            <FormItem className="mt-4">
                              <FormLabel>Specialty (English) *</FormLabel>
                              <FormControl>
                                <Input placeholder="Specialty in English" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </TabsContent>
                    </Tabs>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{currentLanguage === "ar" ? "البريد الإلكتروني" : "Email"} *</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="email@example.com" {...field} />
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
                            <FormLabel>{currentLanguage === "ar" ? "رقم الهاتف" : "Phone Number"} *</FormLabel>
                            <FormControl>
                              <Input placeholder="+964 771 234 5678" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{currentLanguage === "ar" ? "كلمة المرور" : "Password"} *</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="********" {...field} />
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
                            <FormLabel>
                              {currentLanguage === "ar" ? "تأكيد كلمة المرور" : "Confirm Password"} *
                            </FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="********" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                )}
                
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="license"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {currentLanguage === "ar" ? "رقم الترخيص / السجل" : "License / Registration Number"} *
                          </FormLabel>
                          <FormControl>
                            <Input placeholder={currentLanguage === "ar" ? "أدخل رقم الترخيص" : "Enter license number"} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Tabs defaultValue="ar" className="w-full">
                      <TabsList className="mb-4 w-full">
                        <TabsTrigger value="ar" className="flex-1">العربية</TabsTrigger>
                        <TabsTrigger value="en" className="flex-1">English</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="ar">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="city.ar"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>المدينة (بالعربية) *</FormLabel>
                                <FormControl>
                                  <Input placeholder="أدخل المدينة بالعربية" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="address.ar"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>العنوان (بالعربية) *</FormLabel>
                                <FormControl>
                                  <Input placeholder="العنوان التفصيلي بالعربية" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="bio.ar"
                          render={({ field }) => (
                            <FormItem className="mt-4">
                              <FormLabel>نبذة تعريفية (بالعربية) *</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="أدخل نبذة تعريفية باللغة العربية" 
                                  className="min-h-[120px]" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </TabsContent>
                      
                      <TabsContent value="en">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="city.en"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>City (English) *</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter city in English" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="address.en"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Address (English) *</FormLabel>
                                <FormControl>
                                  <Input placeholder="Detailed address in English" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="bio.en"
                          render={({ field }) => (
                            <FormItem className="mt-4">
                              <FormLabel>Bio (English) *</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Enter bio in English" 
                                  className="min-h-[120px]" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </TabsContent>
                    </Tabs>
                    
                    <FormField
                      control={form.control}
                      name="workingDays"
                      render={() => (
                        <FormItem>
                          <div className="mb-4">
                            <FormLabel>{currentLanguage === "ar" ? "أيام العمل" : "Working Days"} *</FormLabel>
                            <FormDescription>
                              {currentLanguage === "ar" 
                                ? "اختر الأيام التي ستكون متاحًا فيها للعمل"
                                : "Select days when you will be available"}
                            </FormDescription>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                            {workingDays.map((day) => (
                              <FormField
                                key={day.value}
                                control={form.control}
                                name="workingDays"
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      key={day.value}
                                      className="flex items-center space-x-3 space-x-reverse"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(day.value)}
                                          onCheckedChange={(checked) => {
                                            return checked
                                              ? field.onChange([...field.value, day.value])
                                              : field.onChange(
                                                  field.value?.filter(
                                                    (value) => value !== day.value
                                                  )
                                                )
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="font-normal">
                                        {currentLanguage === "ar" ? day.labelAr : day.labelEn}
                                      </FormLabel>
                                    </FormItem>
                                  )
                                }}
                              />
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {currentProvider === "doctor" && (
                      <div className="space-y-4">
                        <h3 className="font-medium text-lg">
                          {currentLanguage === "ar" ? "خدمات إضافية" : "Additional Services"}
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <FormField
                            control={form.control}
                            name="acceptsHomeVisit"
                            render={({ field }) => (
                              <FormItem className="flex items-start space-x-3 space-x-reverse">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel className="font-normal">
                                    {currentLanguage === "ar" ? "يقبل الزيارات المنزلية" : "Accepts Home Visits"}
                                  </FormLabel>
                                </div>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="providesVideoConsultation"
                            render={({ field }) => (
                              <FormItem className="flex items-start space-x-3 space-x-reverse">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel className="font-normal">
                                    {currentLanguage === "ar" ? "يقدم استشارات فيديو" : "Provides Video Consultations"}
                                  </FormLabel>
                                </div>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="providesAudioConsultation"
                            render={({ field }) => (
                              <FormItem className="flex items-start space-x-3 space-x-reverse">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel className="font-normal">
                                    {currentLanguage === "ar" ? "يقدم استشارات صوتية" : "Provides Audio Consultations"}
                                  </FormLabel>
                                </div>
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    )}
                    
                    <div>
                      <h3 className="font-medium text-lg mb-2">
                        {currentLanguage === "ar" ? "الخدمات والأسعار" : "Services & Pricing"}
                      </h3>
                      
                      <div className="mb-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                          <div>
                            <label className="text-sm font-medium mb-1 block">
                              {currentLanguage === "ar" ? "اسم الخدمة (عربي)" : "Service Name (Arabic)"}
                            </label>
                            <Input
                              placeholder={currentLanguage === "ar" ? "الخدمة بالعربية" : "Service in Arabic"}
                              value={newService.ar}
                              onChange={(e) => setNewService({...newService, ar: e.target.value})}
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-1 block">
                              {currentLanguage === "ar" ? "اسم الخدمة (إنجليزي)" : "Service Name (English)"}
                            </label>
                            <Input
                              placeholder={currentLanguage === "ar" ? "الخدمة بالإنجليزية" : "Service in English"}
                              value={newService.en}
                              onChange={(e) => setNewService({...newService, en: e.target.value})}
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-1 block">
                              {currentLanguage === "ar" ? "السعر (دينار)" : "Price (IQD)"}
                            </label>
                            <div className="flex">
                              <Input
                                placeholder="25000"
                                value={newService.price}
                                onChange={(e) => setNewService({...newService, price: e.target.value})}
                              />
                              <Button type="button" onClick={addService} className="mr-2 ml-2">
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {services.length > 0 && (
                        <div className="bg-gray-50 rounded-md p-3 mb-4">
                          <h4 className="font-medium mb-2">
                            {currentLanguage === "ar" ? "الخدمات المضافة" : "Added Services"}
                          </h4>
                          <div className="space-y-2">
                            {services.map((service, index) => (
                              <div key={index} className="bg-white rounded-md p-2 border flex justify-between items-center">
                                <div className="flex-1">
                                  <div className="flex justify-between">
                                    <div>
                                      <span className="font-medium">{service.ar}</span>
                                      {service.ar !== service.en && (
                                        <span className="text-sm text-gray-500 mr-2">({service.en})</span>
                                      )}
                                    </div>
                                    <div className="font-bold">
                                      {parseInt(service.price).toLocaleString()} {currentLanguage === "ar" ? "د.ع" : "IQD"}
                                    </div>
                                  </div>
                                </div>
                                <Button 
                                  type="button" 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => removeService(index)}
                                >
                                  <X className="h-4 w-4 text-red-500" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                {currentStep === 3 && (
                  <div>
                    <div className="mb-8">
                      <h3 className="text-xl font-medium mb-6">
                        {currentLanguage === "ar" ? "مراجعة المعلومات" : "Review Information"}
                      </h3>
                      
                      <div className="space-y-6">
                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-medium mb-3">
                            {currentLanguage === "ar" ? "المعلومات الأساسية" : "Basic Information"}
                          </h4>
                          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm">
                            <div className="grid grid-cols-2">
                              <dt className="text-gray-600">
                                {currentLanguage === "ar" ? "نوع مقدم الخدمة" : "Provider Type"}
                              </dt>
                              <dd>{getProviderTypeLabel()}</dd>
                            </div>
                            <div className="grid grid-cols-2">
                              <dt className="text-gray-600">
                                {currentLanguage === "ar" ? "الاسم" : "Name"}
                              </dt>
                              <dd>
                                {form.getValues("name.ar")}
                                {form.getValues("name.ar") !== form.getValues("name.en") && (
                                  <span className="text-gray-500 block">({form.getValues("name.en")})</span>
                                )}
                              </dd>
                            </div>
                            <div className="grid grid-cols-2">
                              <dt className="text-gray-600">
                                {currentLanguage === "ar" ? "التخصص" : "Specialty"}
                              </dt>
                              <dd>
                                {form.getValues("specialty.ar")}
                                {form.getValues("specialty.ar") !== form.getValues("specialty.en") && (
                                  <span className="text-gray-500 block">({form.getValues("specialty.en")})</span>
                                )}
                              </dd>
                            </div>
                            <div className="grid grid-cols-2">
                              <dt className="text-gray-600">
                                {currentLanguage === "ar" ? "البريد الإلكتروني" : "Email"}
                              </dt>
                              <dd>{form.getValues("email")}</dd>
                            </div>
                            <div className="grid grid-cols-2">
                              <dt className="text-gray-600">
                                {currentLanguage === "ar" ? "رقم الهاتف" : "Phone"}
                              </dt>
                              <dd>{form.getValues("phone")}</dd>
                            </div>
                          </dl>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-medium mb-3">
                            {currentLanguage === "ar" ? "معلومات العمل" : "Professional Information"}
                          </h4>
                          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm">
                            <div className="grid grid-cols-2">
                              <dt className="text-gray-600">
                                {currentLanguage === "ar" ? "رقم الترخيص" : "License"}
                              </dt>
                              <dd>{form.getValues("license")}</dd>
                            </div>
                            <div className="grid grid-cols-2">
                              <dt className="text-gray-600">
                                {currentLanguage === "ar" ? "المدينة" : "City"}
                              </dt>
                              <dd>
                                {form.getValues("city.ar")}
                                {form.getValues("city.ar") !== form.getValues("city.en") && (
                                  <span className="text-gray-500 block">({form.getValues("city.en")})</span>
                                )}
                              </dd>
                            </div>
                            <div className="grid grid-cols-2 md:col-span-2">
                              <dt className="text-gray-600">
                                {currentLanguage === "ar" ? "العنوان" : "Address"}
                              </dt>
                              <dd>
                                {form.getValues("address.ar")}
                                {form.getValues("address.ar") !== form.getValues("address.en") && (
                                  <span className="text-gray-500 block">({form.getValues("address.en")})</span>
                                )}
                              </dd>
                            </div>
                            <div className="grid grid-cols-2 md:col-span-2">
                              <dt className="text-gray-600">
                                {currentLanguage === "ar" ? "أيام العمل" : "Working Days"}
                              </dt>
                              <dd>
                                {form.getValues("workingDays")
                                  .map(day => 
                                    currentLanguage === "ar"
                                      ? workingDays.find(d => d.value === day)?.labelAr
                                      : workingDays.find(d => d.value === day)?.labelEn
                                  )
                                  .join(", ")}
                              </dd>
                            </div>
                          </dl>
                          
                          {currentProvider === "doctor" && (
                            <div className="mt-4">
                              <h5 className="font-medium text-sm mb-2">
                                {currentLanguage === "ar" ? "خدمات إضافية" : "Additional Services"}
                              </h5>
                              <div className="flex flex-wrap gap-2 text-sm">
                                {form.getValues("acceptsHomeVisit") && (
                                  <Badge variant="outline" className="bg-blue-50">
                                    <Check className="h-3 w-3 mr-1 text-green-500" />
                                    {currentLanguage === "ar" ? "زيارات منزلية" : "Home Visits"}
                                  </Badge>
                                )}
                                {form.getValues("providesVideoConsultation") && (
                                  <Badge variant="outline" className="bg-blue-50">
                                    <Check className="h-3 w-3 mr-1 text-green-500" />
                                    {currentLanguage === "ar" ? "استشارات فيديو" : "Video Consultations"}
                                  </Badge>
                                )}
                                {form.getValues("providesAudioConsultation") && (
                                  <Badge variant="outline" className="bg-blue-50">
                                    <Check className="h-3 w-3 mr-1 text-green-500" />
                                    {currentLanguage === "ar" ? "استشارات صوتية" : "Audio Consultations"}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                        
                        {services.length > 0 && (
                          <div className="bg-gray-50 p-4 rounded-md">
                            <h4 className="font-medium mb-3">
                              {currentLanguage === "ar" ? "الخدمات والأسعار" : "Services & Pricing"}
                            </h4>
                            <div className="space-y-2">
                              {services.map((service, index) => (
                                <div key={index} className="flex justify-between items-center text-sm">
                                  <div>
                                    <span>{service.ar}</span>
                                    {service.ar !== service.en && (
                                      <span className="text-gray-500 mr-1">({service.en})</span>
                                    )}
                                  </div>
                                  <div className="font-medium">
                                    {parseInt(service.price).toLocaleString()} {currentLanguage === "ar" ? "د.ع" : "IQD"}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="acceptTerms"
                      render={({ field }) => (
                        <FormItem className="flex items-start space-x-3 space-x-reverse">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="font-normal">
                              {currentLanguage === "ar" 
                                ? "أوافق على الشروط والأحكام وسياسة الخصوصية" 
                                : "I agree to the terms and conditions and privacy policy"}
                            </FormLabel>
                            <FormDescription>
                              {currentLanguage === "ar"
                                ? "بالتسجيل، فإنك توافق على جميع الشروط والأحكام المتعلقة باستخدام المنصة"
                                : "By registering, you agree to all terms and conditions related to using the platform"}
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                )}
                
                <div className="flex justify-between pt-4">
                  {currentStep > 1 ? (
                    <Button type="button" variant="outline" onClick={prevStep}>
                      {currentLanguage === "ar" ? "السابق" : "Previous"}
                    </Button>
                  ) : (
                    <div></div>
                  )}
                  
                  {currentStep < 3 ? (
                    <Button type="button" onClick={nextStep}>
                      {currentLanguage === "ar" ? "التالي" : "Next"}
                    </Button>
                  ) : (
                    <Button type="submit">
                      {currentLanguage === "ar" ? "إرسال طلب التسجيل" : "Submit Registration"}
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default MedicalProviderRegistration;
