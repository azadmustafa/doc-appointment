
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Pill, MapPin, Phone } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from "@/components/ui/use-toast";

const PharmacyOrderSection = () => {
  const [medicationName, setMedicationName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would handle the form submission here
    toast({
      title: "طلب ناجح",
      description: "تم استلام طلبك وسيتم التواصل معك قريباً",
    });
    setIsOpen(false);
    // Reset form
    setMedicationName('');
    setPhone('');
    setAddress('');
    setNotes('');
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden shadow-lg border-0">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="bg-medical-primary p-6 md:p-10 text-white">
                  <div className="flex items-center mb-6">
                    <Pill className="h-10 w-10 mr-3" />
                    <h2 className="text-3xl font-bold">اطلب من الصيدلية</h2>
                  </div>
                  <p className="mb-6 text-white/90 text-lg">
                    اطلب أدويتك من أقرب صيدلية واحصل عليها في أسرع وقت. خدمة سريعة وموثوقة.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="bg-white/20 h-6 w-6 rounded-full flex items-center justify-center mt-0.5 ml-3">1</span>
                      <span>أدخل اسم الدواء المطلوب</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-white/20 h-6 w-6 rounded-full flex items-center justify-center mt-0.5 ml-3">2</span>
                      <span>أكمل تفاصيل العنوان ورقم الهاتف</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-white/20 h-6 w-6 rounded-full flex items-center justify-center mt-0.5 ml-3">3</span>
                      <span>استلم طلبك خلال ساعات قليلة</span>
                    </li>
                  </ul>
                </div>
                <div className="p-6 md:p-10">
                  <h3 className="text-xl font-bold mb-6">اكتب اسم الدواء المطلوب</h3>
                  <form>
                    <div className="space-y-4">
                      <div>
                        <Textarea 
                          placeholder="اكتب أسماء الأدوية المطلوبة (يمكنك كتابة أكثر من دواء)"
                          className="h-28 resize-none text-right"
                          value={medicationName}
                          onChange={(e) => setMedicationName(e.target.value)}
                        />
                      </div>
                      <Dialog open={isOpen} onOpenChange={setIsOpen}>
                        <DialogTrigger asChild>
                          <Button 
                            className="w-full bg-medical-primary hover:bg-medical-dark"
                            disabled={!medicationName.trim()}
                            onClick={() => medicationName.trim() && setIsOpen(true)}
                          >
                            أرسل الطلب
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md text-right">
                          <DialogHeader>
                            <DialogTitle className="text-right">أكمل بيانات طلبك</DialogTitle>
                            <DialogDescription className="text-right">
                              أدخل بيانات التواصل والعنوان لإتمام الطلب
                            </DialogDescription>
                          </DialogHeader>
                          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                            <div className="space-y-2">
                              <Label htmlFor="phone" className="text-right block">رقم الهاتف</Label>
                              <div className="relative">
                                <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <Input
                                  id="phone"
                                  className="text-right pr-10"
                                  placeholder="أدخل رقم هاتفك"
                                  value={phone}
                                  onChange={(e) => setPhone(e.target.value)}
                                  required
                                />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="address" className="text-right block">العنوان</Label>
                              <div className="relative">
                                <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <Input
                                  id="address"
                                  className="text-right pr-10"
                                  placeholder="المحافظة، المنطقة، الشارع"
                                  value={address}
                                  onChange={(e) => setAddress(e.target.value)}
                                  required
                                />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="notes" className="text-right block">ملاحظات إضافية (اختياري)</Label>
                              <Textarea
                                id="notes"
                                className="text-right"
                                placeholder="أي تفاصيل إضافية عن طلبك"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                              />
                            </div>
                            <div className="pt-4">
                              <Button type="submit" className="w-full bg-medical-primary hover:bg-medical-dark">
                                تأكيد الطلب
                              </Button>
                            </div>
                          </form>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </form>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PharmacyOrderSection;
