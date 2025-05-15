
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Video, Home, Phone, MapPin, Calendar } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from "@/components/ui/use-toast";
import { Select } from '@/components/ui/select';

const specialties = [
  "قلب وأوعية دموية", "المخ والأعصاب", "طب عام", "طب العيون", 
  "عظام", "طب الباطنة", "جراحة", "أمراض جلدية", "طب الأطفال", "طب الأسنان"
];

const PatientActionForm = ({ 
  type, 
  onClose 
}: { 
  type: 'video' | 'home'; 
  onClose: () => void;
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would handle the form submission here
    
    toast({
      title: "تم إرسال طلبك بنجاح",
      description: type === 'video' 
        ? "سيتم التواصل معك قريباً لتأكيد موعد المكالمة" 
        : "سيتم التواصل معك قريباً لتأكيد موعد الزيارة المنزلية",
    });
    
    onClose();
    // Reset form
    setName('');
    setPhone('');
    setSpecialty('');
    setAddress('');
    setDate('');
    setTime('');
    setNotes('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-right block">الاسم الكامل</Label>
          <Input
            id="name"
            className="text-right"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="أدخل الاسم الكامل"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-right block">رقم الهاتف</Label>
          <div className="relative">
            <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              id="phone"
              className="text-right pr-10"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="أدخل رقم الهاتف"
              required
            />
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="specialty" className="text-right block">التخصص المطلوب</Label>
        <select
          id="specialty"
          className="w-full p-2 border rounded text-right"
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
          required
        >
          <option value="">اختر التخصص</option>
          {specialties.map((spec) => (
            <option key={spec} value={spec}>{spec}</option>
          ))}
        </select>
      </div>
      
      {type === 'home' && (
        <div className="space-y-2">
          <Label htmlFor="address" className="text-right block">العنوان</Label>
          <div className="relative">
            <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              id="address"
              className="text-right pr-10"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="المحافظة، المنطقة، الشارع، المبنى"
              required
            />
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="date" className="text-right block">التاريخ المفضل</Label>
          <div className="relative">
            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              id="date"
              type="date"
              className="text-right pr-10"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="time" className="text-right block">الوقت المفضل</Label>
          <Input
            id="time"
            type="time"
            className="text-right"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="notes" className="text-right block">ملاحظات إضافية (اختياري)</Label>
        <Textarea
          id="notes"
          className="text-right"
          placeholder="أي تفاصيل أو أعراض تريد ذكرها"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>
      
      <DialogFooter className="mt-6">
        <DialogClose asChild>
          <Button type="button" variant="outline">إلغاء</Button>
        </DialogClose>
        <Button type="submit" className="bg-medical-primary hover:bg-medical-dark">
          {type === 'video' ? 'طلب استشارة فيديو' : 'طلب زيارة منزلية'}
        </Button>
      </DialogFooter>
    </form>
  );
};

const PatientActionsSection = () => {
  const [activeDialog, setActiveDialog] = useState<'video' | 'home' | null>(null);
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">خيارات المريض</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            نقدم لك خيارات متعددة للحصول على الرعاية الطبية المناسبة من مكانك
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Dialog open={activeDialog === 'video'} onOpenChange={(open) => open ? setActiveDialog('video') : setActiveDialog(null)}>
            <DialogTrigger asChild>
              <Card className="hover:shadow-lg transition-shadow duration-200 cursor-pointer">
                <CardContent className="p-8 flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full bg-medical-light flex items-center justify-center mb-6">
                    <Video className="h-10 w-10 text-medical-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">اطلب مكالمة فيديو</h3>
                  <p className="text-gray-600">
                    تحدث مع الطبيب مباشرة عبر مكالمة فيديو من منزلك. استشارة سريعة وآمنة.
                  </p>
                  <Button className="mt-6 bg-medical-primary hover:bg-medical-dark">
                    طلب مكالمة فيديو
                  </Button>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="max-w-lg text-right">
              <DialogHeader>
                <DialogTitle className="text-right flex items-center">
                  <Video className="inline-block ml-2" /> 
                  طلب استشارة فيديو
                </DialogTitle>
                <DialogDescription className="text-right">
                  أكمل النموذج التالي لطلب استشارة عبر مكالمة فيديو مع طبيب متخصص
                </DialogDescription>
              </DialogHeader>
              <PatientActionForm type="video" onClose={() => setActiveDialog(null)} />
            </DialogContent>
          </Dialog>
          
          <Dialog open={activeDialog === 'home'} onOpenChange={(open) => open ? setActiveDialog('home') : setActiveDialog(null)}>
            <DialogTrigger asChild>
              <Card className="hover:shadow-lg transition-shadow duration-200 cursor-pointer">
                <CardContent className="p-8 flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full bg-medical-light flex items-center justify-center mb-6">
                    <Home className="h-10 w-10 text-medical-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">اطلب زيارة منزلية</h3>
                  <p className="text-gray-600">
                    سيأتي الطبيب إلى منزلك لتقديم الرعاية الطبية. خيار مثالي لكبار السن والحالات الطارئة.
                  </p>
                  <Button className="mt-6 bg-medical-primary hover:bg-medical-dark">
                    طلب زيارة منزلية
                  </Button>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="max-w-lg text-right">
              <DialogHeader>
                <DialogTitle className="text-right flex items-center">
                  <Home className="inline-block ml-2" /> 
                  طلب زيارة منزلية
                </DialogTitle>
                <DialogDescription className="text-right">
                  أكمل النموذج التالي لطلب زيارة طبيب متخصص إلى منزلك
                </DialogDescription>
              </DialogHeader>
              <PatientActionForm type="home" onClose={() => setActiveDialog(null)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
};

export default PatientActionsSection;
