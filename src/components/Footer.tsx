
import { Link } from "react-router-dom";
import { Calendar, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  // Top hospitals mock data
  const topHospitals = [
    { id: 1, name: "مستشفى مدينة الطب", location: "بغداد" },
    { id: 2, name: "مستشفى ابن الهيثم", location: "البصرة" },
    { id: 3, name: "مركز بغداد التخصصي", location: "بغداد" },
    { id: 4, name: "مستشفى الكندي", location: "اربيل" },
    { id: 5, name: "مستشفى دار السلام", location: "الموصل" },
  ];

  // Top medical centers mock data
  const topMedicalCenters = [
    { id: 1, name: "مركز النخبة الطبي", location: "بغداد" },
    { id: 2, name: "مركز الشفاء التخصصي", location: "النجف" },
    { id: 3, name: "مركز الحياة", location: "البصرة" },
    { id: 4, name: "مركز الرعاية الدائمة", location: "اربيل" },
    { id: 5, name: "مركز الأمل الطبي", location: "كربلاء" },
  ];

  // Top beauty centers mock data
  const topBeautyCenters = [
    { id: 1, name: "مركز الجمال الحديث", location: "بغداد" },
    { id: 2, name: "روز كلينك للتجميل", location: "بغداد" },
    { id: 3, name: "دار الجمال", location: "البصرة" },
    { id: 4, name: "سكاي بيوتي سنتر", location: "أربيل" },
    { id: 5, name: "بيوتي لاين", location: "كربلاء" },
  ];

  return (
    <footer className="bg-gray-800 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
          {/* Logo and Brief */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center space-x-2">
              <Calendar className="h-6 w-6 text-medical-primary" />
              <span className="font-bold text-xl">طبيبي</span>
            </div>
            <p className="text-gray-400 text-sm">
              منصة طبيبي تقدم خدمة حجز المواعيد الطبية بطريقة سهلة وسريعة. اختر طبيبك واحجز موعدك في دقائق.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Top Hospitals */}
          <div className="md:col-span-1">
            <h4 className="font-semibold text-lg mb-4">أفضل المشافي</h4>
            <ul className="space-y-2">
              {topHospitals.map(hospital => (
                <li key={hospital.id}>
                  <Link to={`/hospitals/${hospital.id}`} className="text-gray-400 hover:text-white transition-colors duration-200">
                    {hospital.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Top Medical Centers */}
          <div className="md:col-span-1">
            <h4 className="font-semibold text-lg mb-4">أفضل المراكز الطبية</h4>
            <ul className="space-y-2">
              {topMedicalCenters.map(center => (
                <li key={center.id}>
                  <Link to={`/medical-centers/${center.id}`} className="text-gray-400 hover:text-white transition-colors duration-200">
                    {center.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Top Beauty Centers */}
          <div className="md:col-span-1">
            <h4 className="font-semibold text-lg mb-4">أفضل مراكز التجميل</h4>
            <ul className="space-y-2">
              {topBeautyCenters.map(center => (
                <li key={center.id}>
                  <Link to={`/beauty-centers/${center.id}`} className="text-gray-400 hover:text-white transition-colors duration-200">
                    {center.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-1">
            <h4 className="font-semibold text-lg mb-4">اتصل بنا</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <Phone size={18} className="text-medical-primary" />
                <span className="text-gray-400">+966 50 123 4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={18} className="text-medical-primary" />
                <span className="text-gray-400">info@tabibi.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin size={18} className="text-medical-primary" />
                <span className="text-gray-400">الرياض، المملكة العربية السعودية</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} طبيبي. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
