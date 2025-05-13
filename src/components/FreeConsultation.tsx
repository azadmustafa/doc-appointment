
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const FreeConsultation = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    query: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // هنا سيتم إرسال البيانات إلى الخادم في التطبيق الفعلي
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "تم استلام استشارتك",
        description: "سيتواصل معك أحد أطبائنا المختصين في أقرب وقت ممكن.",
      });
      setFormData({
        name: "",
        phone: "",
        email: "",
        query: ""
      });
    }, 1500);
  };

  return (
    <div className="py-12 bg-medical-light">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 md:pl-6 mb-6 md:mb-0">
              <h2 className="text-2xl font-bold mb-3">احصل على استشارة طبية مجانية</h2>
              <p className="text-gray-600 mb-6">
                هل لديك سؤال طبي؟ اطرح سؤالك وسيقوم أحد أطبائنا المختصين بالرد عليك في أقرب وقت ممكن.
                نقدم استشارات مجانية أولية لمساعدتك على اتخاذ القرار المناسب بشأن حالتك الصحية.
              </p>
              
              <div className="bg-medical-light/50 p-4 rounded-lg mb-4">
                <h3 className="font-medium text-lg mb-2">لماذا تختار استشاراتنا المجانية؟</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>إجابات من أطباء مختصين ومعتمدين</li>
                  <li>رد سريع خلال 24 ساعة</li>
                  <li>سرية تامة لجميع بياناتك الشخصية</li>
                  <li>توجيه طبي دقيق وموثوق</li>
                </ul>
              </div>
              
              <p className="text-sm text-gray-500">
                * الاستشارات المجانية مخصصة للإرشاد الأولي فقط ولا تغني عن زيارة الطبيب عند الضرورة.
              </p>
            </div>
            
            <div className="md:w-1/2 md:border-r border-gray-200 md:pr-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    الاسم الكامل *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="text-right"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    رقم الهاتف *
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="text-right"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    البريد الإلكتروني
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="text-right"
                  />
                </div>
                
                <div>
                  <label htmlFor="query" className="block text-sm font-medium text-gray-700 mb-1">
                    استشارتك أو سؤالك الطبي *
                  </label>
                  <Textarea
                    id="query"
                    name="query"
                    value={formData.query}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="text-right"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-medical-primary hover:bg-medical-dark"
                  disabled={loading}
                >
                  {loading ? "جاري الإرسال..." : "إرسال الاستشارة"}
                </Button>
                
                <p className="text-xs text-gray-500 mt-2">
                  بالضغط على "إرسال الاستشارة"، فإنك توافق على سياسة الخصوصية وشروط الاستخدام الخاصة بنا.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreeConsultation;
