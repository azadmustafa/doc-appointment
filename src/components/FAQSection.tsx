
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// بيانات الأسئلة الشائعة
const faqs = [
  {
    question: "كيف يمكنني حجز موعد مع طبيب؟",
    answer: "يمكنك حجز موعد مع طبيب من خلال البحث عن التخصص المطلوب أو اسم الطبيب، ثم اختيار الطبيب المناسب من نتائج البحث، ثم اختيار التاريخ والوقت المناسبين وتأكيد الحجز بعد إدخال بياناتك."
  },
  {
    question: "هل يمكنني إلغاء أو تغيير موعد الحجز؟",
    answer: "نعم، يمكنك إلغاء أو تغيير موعد الحجز قبل 24 ساعة من الموعد المحدد دون أي رسوم إضافية. للقيام بذلك، قم بتسجيل الدخول إلى حسابك، ثم انتقل إلى صفحة 'مواعيدي' واختر الموعد الذي ترغب في تغييره أو إلغائه."
  },
  {
    question: "كيف يمكنني الحصول على استشارة طبية عبر الإنترنت؟",
    answer: "للحصول على استشارة طبية عبر الإنترنت، انتقل إلى قسم 'الاستشارات المباشرة' في الصفحة الرئيسية، واختر الطبيب المتاح حاليًا، ثم اختر نوع الاستشارة (فيديو أو صوت)، وقم بدفع الرسوم لبدء الاستشارة مباشرة."
  },
  {
    question: "ما هي طرق الدفع المتاحة؟",
    answer: "نوفر عدة طرق للدفع تشمل: بطاقات الائتمان (فيزا، ماستركارد)، والدفع الإلكتروني عبر المحافظ الرقمية، والدفع عند الزيارة في بعض العيادات والمستشفيات المشاركة."
  },
  {
    question: "كيف يمكنني الوصول إلى سجلاتي الطبية؟",
    answer: "يمكنك الوصول إلى سجلاتك الطبية من خلال تسجيل الدخول إلى حسابك، ثم الانتقال إلى قسم 'السجل الطبي'. هناك ستجد جميع زياراتك السابقة والتشخيصات والوصفات الطبية التي تم تقديمها لك من خلال منصتنا."
  }
];

const FAQSection = () => {
  return (
    <div className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">الأسئلة الشائعة</h2>
          <p className="text-gray-600">إجابات على أكثر الأسئلة شيوعًا حول خدماتنا</p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-right font-medium text-lg">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
