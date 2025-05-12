
import { Link } from "react-router-dom";
import { Calendar, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Brief */}
          <div className="space-y-4">
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

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">روابط سريعة</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors duration-200">الرئيسية</Link>
              </li>
              <li>
                <Link to="/doctors" className="text-gray-400 hover:text-white transition-colors duration-200">الأطباء</Link>
              </li>
              <li>
                <Link to="/specialties" className="text-gray-400 hover:text-white transition-colors duration-200">التخصصات</Link>
              </li>
              <li>
                <Link to="/appointments" className="text-gray-400 hover:text-white transition-colors duration-200">مواعيدي</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors duration-200">من نحن</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
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

          {/* Working Hours */}
          <div>
            <h4 className="font-semibold text-lg mb-4">ساعات العمل</h4>
            <ul className="space-y-2">
              <li className="text-gray-400">الأحد - الخميس: 9 صباحًا - 9 مساءً</li>
              <li className="text-gray-400">الجمعة: 2 ظهرًا - 8 مساءً</li>
              <li className="text-gray-400">السبت: 10 صباحًا - 6 مساءً</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} طبيبي. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
