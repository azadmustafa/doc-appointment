
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Calendar, Clock, PlusCircle, Trash2, Edit, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// نوع البيانات للتذكير الصحي
interface HealthReminder {
  id: number;
  title: string;
  type: "medication" | "appointment" | "test" | "followup";
  date: string;
  time: string;
  completed: boolean;
  notes?: string;
}

// بيانات مثال
const sampleReminders: HealthReminder[] = [
  {
    id: 1,
    title: "تناول دواء الضغط",
    type: "medication",
    date: "2025-05-20",
    time: "08:00",
    completed: false,
    notes: "تناول قبل الإفطار مع كوب ماء"
  },
  {
    id: 2,
    title: "موعد مع د. أحمد الشمري",
    type: "appointment",
    date: "2025-05-25",
    time: "14:30",
    completed: false,
    notes: "المتابعة الدورية لحالة القلب"
  },
  {
    id: 3,
    title: "فحص مستوى السكر في الدم",
    type: "test",
    date: "2025-05-18",
    time: "09:00",
    completed: false,
    notes: "الصيام لمدة 8 ساعات قبل الفحص"
  }
];

const HealthReminders = () => {
  const navigate = useNavigate();
  const [reminders, setReminders] = useState<HealthReminder[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [formData, setFormData] = useState({
    title: "",
    type: "medication",
    date: "",
    time: "",
    notes: "",
  });

  // تحميل التذكيرات عند بدء الصفحة
  useEffect(() => {
    // في الحالة الحقيقية، هنا سنقوم بجلب البيانات من API
    const storedReminders = localStorage.getItem("healthReminders");
    if (storedReminders) {
      setReminders(JSON.parse(storedReminders));
    } else {
      setReminders(sampleReminders);
      localStorage.setItem("healthReminders", JSON.stringify(sampleReminders));
    }
    
    // التمرير إلى أعلى الصفحة عند فتحها
    window.scrollTo(0, 0);
  }, []);

  // تصفية التذكيرات حسب نوعها
  const filteredReminders = activeTab === "all" 
    ? reminders 
    : reminders.filter(reminder => 
        activeTab === "completed" ? reminder.completed : 
        activeTab === "upcoming" ? !reminder.completed && new Date(`${reminder.date}T${reminder.time}`) > new Date() :
        reminder.type === activeTab
      );

  // إضافة تذكير جديد
  const addReminder = () => {
    const newReminder: HealthReminder = {
      id: Date.now(),
      title: formData.title,
      type: formData.type as "medication" | "appointment" | "test" | "followup",
      date: formData.date,
      time: formData.time,
      completed: false,
      notes: formData.notes
    };

    const updatedReminders = [...reminders, newReminder];
    setReminders(updatedReminders);
    localStorage.setItem("healthReminders", JSON.stringify(updatedReminders));
    
    // إعادة ضبط النموذج وإغلاق الحوار
    setFormData({
      title: "",
      type: "medication",
      date: "",
      time: "",
      notes: "",
    });
    setIsAddDialogOpen(false);
  };

  // تغيير حالة التذكير (مكتمل/غير مكتمل)
  const toggleReminderCompletion = (id: number) => {
    const updatedReminders = reminders.map(reminder => 
      reminder.id === id ? { ...reminder, completed: !reminder.completed } : reminder
    );
    setReminders(updatedReminders);
    localStorage.setItem("healthReminders", JSON.stringify(updatedReminders));
  };

  // حذف تذكير
  const deleteReminder = (id: number) => {
    const updatedReminders = reminders.filter(reminder => reminder.id !== id);
    setReminders(updatedReminders);
    localStorage.setItem("healthReminders", JSON.stringify(updatedReminders));
  };

  // تحويل نوع التذكير إلى نص عربي
  const getReminderTypeText = (type: string) => {
    switch (type) {
      case "medication": return "دواء";
      case "appointment": return "موعد";
      case "test": return "فحص";
      case "followup": return "متابعة";
      default: return type;
    }
  };

  // الحصول على لون Badge حسب نوع التذكير
  const getReminderTypeColor = (type: string) => {
    switch (type) {
      case "medication": return "bg-blue-500";
      case "appointment": return "bg-green-500";
      case "test": return "bg-purple-500";
      case "followup": return "bg-orange-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-8 pb-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold">التذكيرات الصحية</h1>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-medical-primary hover:bg-medical-dark">
                  <PlusCircle className="ml-2 h-4 w-4" />
                  إضافة تذكير جديد
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>إضافة تذكير صحي جديد</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-2">
                    <label htmlFor="title" className="col-span-4 text-right font-medium">
                      عنوان التذكير
                    </label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      placeholder="أدخل عنوان التذكير"
                      className="col-span-4"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-2">
                    <label htmlFor="type" className="col-span-4 text-right font-medium">
                      نوع التذكير
                    </label>
                    <Select
                      value={formData.type}
                      onValueChange={(value) => setFormData({...formData, type: value})}
                    >
                      <SelectTrigger className="col-span-4">
                        <SelectValue placeholder="اختر نوع التذكير" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="medication">دواء</SelectItem>
                        <SelectItem value="appointment">موعد</SelectItem>
                        <SelectItem value="test">فحص</SelectItem>
                        <SelectItem value="followup">متابعة</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-2">
                    <label htmlFor="date" className="col-span-4 text-right font-medium">
                      التاريخ
                    </label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      className="col-span-4"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-2">
                    <label htmlFor="time" className="col-span-4 text-right font-medium">
                      الوقت
                    </label>
                    <Input
                      id="time"
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({...formData, time: e.target.value})}
                      className="col-span-4"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-2">
                    <label htmlFor="notes" className="col-span-4 text-right font-medium">
                      ملاحظات (اختياري)
                    </label>
                    <Input
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => setFormData({...formData, notes: e.target.value})}
                      placeholder="أضف أية ملاحظات إضافية"
                      className="col-span-4"
                    />
                  </div>
                </div>
                <DialogFooter className="flex justify-between">
                  <DialogClose asChild>
                    <Button variant="outline">إلغاء</Button>
                  </DialogClose>
                  <Button 
                    className="bg-medical-primary hover:bg-medical-dark"
                    onClick={addReminder}
                    disabled={!formData.title || !formData.date || !formData.time}
                  >
                    حفظ التذكير
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* تبويبات تصفية التذكيرات */}
          <Tabs defaultValue="all" className="mb-6" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 md:grid-cols-6 gap-2">
              <TabsTrigger value="all" className="text-sm">الكل</TabsTrigger>
              <TabsTrigger value="upcoming" className="text-sm">القادمة</TabsTrigger>
              <TabsTrigger value="completed" className="text-sm">المكتملة</TabsTrigger>
              <TabsTrigger value="medication" className="text-sm">الأدوية</TabsTrigger>
              <TabsTrigger value="appointment" className="text-sm">المواعيد</TabsTrigger>
              <TabsTrigger value="test" className="text-sm">الفحوصات</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* قائمة التذكيرات */}
          <div className="space-y-4">
            {filteredReminders.length === 0 ? (
              <div className="text-center py-10 bg-white rounded-lg shadow-sm">
                <Bell className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">لا توجد تذكيرات</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  لم يتم العثور على تذكيرات في هذه الفئة. يمكنك إضافة تذكير جديد بالضغط على زر "إضافة تذكير جديد"
                </p>
              </div>
            ) : (
              filteredReminders.map((reminder) => (
                <div 
                  key={reminder.id} 
                  className={`bg-white rounded-lg shadow-sm p-4 border-r-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 ${
                    reminder.completed ? "border-gray-300" : "border-medical-primary"
                  }`}
                >
                  <div className="flex-1">
                    <div className="flex items-start md:items-center mb-2 gap-3 flex-wrap">
                      <h3 className={`text-lg font-medium ${reminder.completed ? "line-through text-gray-500" : ""}`}>
                        {reminder.title}
                      </h3>
                      <Badge className={`${getReminderTypeColor(reminder.type)}`}>
                        {getReminderTypeText(reminder.type)}
                      </Badge>
                      {reminder.completed && (
                        <Badge className="bg-green-500">تم الإكمال</Badge>
                      )}
                    </div>
                    {reminder.notes && (
                      <p className="text-gray-500 text-sm mb-2">{reminder.notes}</p>
                    )}
                    <div className="flex items-center gap-4">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-gray-500 ml-1" />
                        <span className="text-sm text-gray-600">
                          {new Date(reminder.date).toLocaleDateString('ar-IQ')}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-gray-500 ml-1" />
                        <span className="text-sm text-gray-600">{reminder.time}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => toggleReminderCompletion(reminder.id)}
                      title={reminder.completed ? "وضع كغير مكتمل" : "وضع كمكتمل"}
                    >
                      <CheckCircle className={`h-4 w-4 ${reminder.completed ? "text-green-500 fill-green-500" : "text-gray-400"}`} />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon"
                      title="حذف التذكير"
                      onClick={() => deleteReminder(reminder.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HealthReminders;
