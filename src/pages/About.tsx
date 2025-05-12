
import { Building, Award, CheckCircle, Users, Clock, Phone } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* الجزء العلوي */}
        <section className="py-16 bg-medical-light">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">من نحن</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              طبيبي هي منصة رائدة في مجال حجز المواعيد الطبية في المملكة العربية السعودية، تهدف إلى تسهيل وصول المرضى إلى الرعاية الصحية من خلال تقنية سهلة الاستخدام.
            </p>
          </div>
        </section>
        
        {/* قسم رؤيتنا ورسالتنا */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="text-center md:text-right p-8 bg-gray-50 rounded-lg shadow-sm">
                <div className="w-16 h-16 bg-medical-light rounded-full flex items-center justify-center mx-auto md:mr-0 mb-6">
                  <Building className="h-8 w-8 text-medical-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-4">رؤيتنا</h2>
                <p className="text-gray-600">
                  نسعى لأن نكون المنصة الصحية الرائدة في المملكة العربية السعودية والوطن العربي، مع توفير تجربة سلسة تربط المرضى بأفضل مقدمي الرعاية الصحية.
                </p>
              </div>
              
              <div className="text-center md:text-right p-8 bg-gray-50 rounded-lg shadow-sm">
                <div className="w-16 h-16 bg-medical-light rounded-full flex items-center justify-center mx-auto md:mr-0 mb-6">
                  <Award className="h-8 w-8 text-medical-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-4">رسالتنا</h2>
                <p className="text-gray-600">
                  تمكين المرضى من اتخاذ قرارات صحية أفضل من خلال توفير منصة سهلة الاستخدام للوصول إلى أفضل الخدمات الطبية وإدارة رحلتهم الصحية.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* قسم قيمنا */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">قيمنا</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="w-14 h-14 rounded-full bg-medical-light flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-7 w-7 text-medical-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">الجودة</h3>
                <p className="text-gray-600">
                  نضمن تقديم خدمات ذات جودة عالية ونتعاون فقط مع أفضل مقدمي الرعاية الصحية.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="w-14 h-14 rounded-full bg-medical-light flex items-center justify-center mx-auto mb-4">
                  <Users className="h-7 w-7 text-medical-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">سهولة الوصول</h3>
                <p className="text-gray-600">
                  نؤمن بأن الرعاية الصحية حق للجميع، لذا نسعى لتسهيل وصول الجميع إليها.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="w-14 h-14 rounded-full bg-medical-light flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-7 w-7 text-medical-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">الكفاءة</h3>
                <p className="text-gray-600">
                  نقدم خدماتنا بكفاءة عالية لتوفير وقت وجهد المستخدمين والأطباء على حد سواء.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* قسم الاتصال */}
        <section className="py-16 bg-medical-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8">تواصل معنا</h2>
            <div className="flex flex-col md:flex-row justify-center items-center gap-6 max-w-2xl mx-auto">
              <div className="flex items-center">
                <Phone className="h-6 w-6 ml-2" />
                <span className="text-lg">800-123-4567</span>
              </div>
              <div className="flex items-center">
                <Building className="h-6 w-6 ml-2" />
                <span className="text-lg">الرياض، المملكة العربية السعودية</span>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
