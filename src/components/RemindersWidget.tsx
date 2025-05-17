
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface HealthReminder {
  id: number;
  title: string;
  type: "medication" | "appointment" | "test" | "followup";
  date: string;
  time: string;
  completed: boolean;
  notes?: string;
}

const RemindersWidget = () => {
  const [upcomingReminders, setUpcomingReminders] = useState<HealthReminder[]>([]);
  
  useEffect(() => {
    // جلب التذكيرات من التخزين المحلي
    const storedReminders = localStorage.getItem("healthReminders");
    if (storedReminders) {
      const reminders: HealthReminder[] = JSON.parse(storedReminders);
      
      // تصفية التذكيرات القادمة غير المكتملة (خلال الـ 7 أيام القادمة)
      const now = new Date();
      const oneWeekLater = new Date();
      oneWeekLater.setDate(now.getDate() + 7);
      
      const upcoming = reminders
        .filter(reminder => {
          const reminderDate = new Date(`${reminder.date}T${reminder.time}`);
          return !reminder.completed && 
                 reminderDate >= now && 
                 reminderDate <= oneWeekLater;
        })
        .sort((a, b) => {
          return new Date(`${a.date}T${a.time}`).getTime() - 
                 new Date(`${b.date}T${b.time}`).getTime();
        })
        .slice(0, 3); // أول 3 تذكيرات فقط
      
      setUpcomingReminders(upcoming);
    }
  }, []);
  
  // تحويل نوع التذكير إلى لون
  const getReminderTypeColor = (type: string) => {
    switch (type) {
      case "medication": return "bg-blue-500";
      case "appointment": return "bg-green-500";
      case "test": return "bg-purple-500";
      case "followup": return "bg-orange-500";
      default: return "bg-gray-500";
    }
  };
  
  if (upcomingReminders.length === 0) {
    return null;
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <Bell className="h-5 w-5 text-medical-primary ml-2" />
          تذكيرات صحية قادمة
        </h3>
        <Link to="/health-reminders" className="text-medical-primary hover:underline text-sm">
          عرض الكل
        </Link>
      </div>
      
      <div className="space-y-3">
        {upcomingReminders.map((reminder) => (
          <div key={reminder.id} className="flex items-center justify-between border-b pb-2 last:border-b-0">
            <div>
              <div className="flex items-center gap-2">
                <p className="font-medium">{reminder.title}</p>
                <Badge className={`${getReminderTypeColor(reminder.type)} text-xs`}>
                  {new Date(`${reminder.date}T${reminder.time}`).toLocaleDateString('ar-IQ')}
                </Badge>
              </div>
              <p className="text-sm text-gray-500">
                {reminder.time} • {reminder.notes?.substring(0, 30)}{reminder.notes && reminder.notes.length > 30 ? "..." : ""}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RemindersWidget;
