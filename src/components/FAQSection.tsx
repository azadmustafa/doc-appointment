
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "كيف أحجز موعداً مع طبيب؟",
    answer: "يمكنك حجز موعد مع طبيب من خلال البحث عن التخصص المطلوب أو اسم الطبيب، ثم اختيار الطبيب المناسب وتحديد موعد متاح من جدوله. يتطلب الحجز إنشاء حساب أو تسجيل الدخول."
  },
  {
    question: "هل يمكنني إلغاء أو تغيير موعدي؟",
    answer: "نعم، يمكنك إلغاء أو تغيير موعدك قبل 24 ساعة على الأقل من وقت الموعد المحدد دون أي رسوم. يمكنك القيام بذلك من خلال لوحة التحكم الخاصة بك في قسم 'مواعيدي'."
  },
  {
    question: "كيف تتم المكالمات الطبية عبر الفيديو؟",
    answer: "عند حجزك لاستشارة فيديو، ستتلقى رابطاً في البريد الإلكتروني ورسالة نصية قبل موعد الاستشارة. انقر على الرابط في الوقت المحدد للدخول إلى غرفة الانتظار الافتراضية حيث سيتصل بك الطبيب عبر منصة فيديو آمنة ومشفرة."
  },
  {
    question: "كيف أدفع رسوم الاستشارة أو الحجز؟",
    answer: "نقبل مجموعة متنوعة من طرق الدفع بما في ذلك البطاقات الائتمانية، المحافظ الإلكترونية، والدفع النقدي عند الزيارة (للمواعيد الشخصية فقط). يمكنك اختيار طريقة الدفع المفضلة لديك أثناء عملية الحجز."
  },
  {
    question: "هل يمكنني الحصول على وصفة طبية إلكترونية؟",
    answer: "نعم، بعد الاستشارة، يمكن للطبيب إصدار وصفة طبية إلكترونية إذا لزم الأمر. ستتلقى الوصفة عبر البريد الإلكتروني أو من خلال تطبيقنا، ويمكنك صرفها في أي صيدلية متعاقدة معنا."
  },
  {
    question: "هل تغطي شركات التأمين الصحي الخدمات المقدمة؟",
    answer: "نعم، نحن نتعاون مع العديد من شركات التأمين الصحي في العراق. يمكنك التحقق من تغطية التأمين الخاص بك عن طريق إدخال بيانات بوليصة التأمين الخاصة بك أثناء الحجز أو الاتصال بخدمة العملاء للاستفسار."
  },
  {
    question: "كيف يمكنني طلب زيارة منزلية؟",
    answer: "يمكنك طلب زيارة منزلية من خلال قسم 'طلب زيارة منزلية' على موقعنا. أدخل بياناتك الشخصية والطبية والعنوان والوقت المفضل، وسنقوم بتأكيد الزيارة مع الطبيب المناسب في أقرب وقت ممكن."
  },
  {
    question: "هل يمكنني الحصول على تقرير طبي بعد الاستشارة؟",
    answer: "نعم، يمكن للأطباء إصدار تقارير طبية بناءً على طلبك. يمكنك طلب التقرير أثناء الاستشارة، وسيتم إرساله إليك خلال 24-48 ساعة عبر البريد الإلكتروني أو يمكنك استلامه من العيادة."
  },
  {
    question: "كيف يتم تأكيد موعدي؟",
    answer: "بمجرد إتمام الحجز، ستتلقى رسالة تأكيد عبر البريد الإلكتروني والرسائل النصية. سنرسل لك أيضًا تذكيرًا قبل 24 ساعة من موعدك."
  },
  {
    question: "ما هي سياسة الخصوصية وحماية البيانات؟",
    answer: "نحن نلتزم بأعلى معايير الخصوصية وحماية البيانات. جميع معلوماتك الشخصية والطبية محمية ومشفرة ولا يتم مشاركتها مع أي طرف ثالث دون موافقتك. يمكنك الاطلاع على سياسة الخصوصية الكاملة على موقعنا."
  },
];

const FAQSection = () => {
  // Split FAQs into two columns
  const midpoint = Math.ceil(faqs.length / 2);
  const leftColumnFAQs = faqs.slice(0, midpoint);
  const rightColumnFAQs = faqs.slice(midpoint);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">الأسئلة الشائعة</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            إجابات على الأسئلة الأكثر شيوعاً حول خدماتنا وكيفية الاستفادة منها
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <Accordion type="single" collapsible className="w-full">
              {leftColumnFAQs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-right">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-right">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          
          <div>
            <Accordion type="single" collapsible className="w-full">
              {rightColumnFAQs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index + midpoint}`}>
                  <AccordionTrigger className="text-right">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-right">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
