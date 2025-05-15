
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, Calendar, User, LogIn, LogOut, Stethoscope, FileText, Tag, MessageCircle, HelpCircle, Map, LayoutDashboard } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LanguageSwitcher from './LanguageSwitcher';
import { useAuth } from '@/context/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Calendar className="h-8 w-8 text-medical-primary" />
          <span className="font-bold text-xl text-gray-700">طبيبي</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="font-medium text-gray-600 hover:text-medical-primary transition-colors duration-200">
            {t('common.home')}
          </Link>
          <Link to="/doctors" className="font-medium text-gray-600 hover:text-medical-primary transition-colors duration-200">
            {t('common.doctors')}
          </Link>
          <Link to="/hospitals" className="font-medium text-gray-600 hover:text-medical-primary transition-colors duration-200">
            المشافي
          </Link>
          <Link to="/beauty-centers" className="font-medium text-gray-600 hover:text-medical-primary transition-colors duration-200">
            مراكز التجميل
          </Link>
          <Link to="/consultation" className="font-medium text-gray-600 hover:text-medical-primary transition-colors duration-200">
            الاستشارات
          </Link>
          <Link to="/promotions" className="font-medium text-gray-600 hover:text-medical-primary transition-colors duration-200">
            العروض
          </Link>
          <Link to="/terms-pricing" className="font-medium text-gray-600 hover:text-medical-primary transition-colors duration-200">
            التسعير
          </Link>
          <Link to="/faq" className="font-medium text-gray-600 hover:text-medical-primary transition-colors duration-200">
            الأسئلة الشائعة
          </Link>
        </nav>
        
        <div className="hidden md:flex items-center space-x-3">
          <LanguageSwitcher />
          
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user?.image} alt={user?.name} />
                    <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>حسابي</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" onClick={() => user?.role === "doctor" ? navigate('/doctor-dashboard') : navigate('/appointments')}>
                  <LayoutDashboard className="ml-2 h-4 w-4" />
                  {user?.role === "doctor" ? "لوحة التحكم" : "حجوزاتي"}
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/profile')}>
                  <User className="ml-2 h-4 w-4" />
                  الملف الشخصي
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-red-500" onClick={handleLogout}>
                  <LogOut className="ml-2 h-4 w-4" />
                  تسجيل الخروج
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-medical-primary text-medical-primary hover:bg-medical-light"
                onClick={() => navigate('/login')}
              >
                <LogIn className="h-4 w-4 ml-1" /> {t('common.login')}
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-medical-primary text-medical-primary hover:bg-medical-light"
                onClick={() => navigate('/doctor-login')}
              >
                <Stethoscope className="h-4 w-4 ml-1" /> دخول الأطباء
              </Button>
              <Button 
                className="bg-medical-primary hover:bg-medical-dark"
                onClick={() => navigate('/register')}
              >
                <User className="h-4 w-4 ml-1" /> {t('common.register')}
              </Button>
            </>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center space-x-2">
          <LanguageSwitcher />
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.image} alt={user?.name} />
                    <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>حسابي</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" onClick={() => user?.role === "doctor" ? navigate('/doctor-dashboard') : navigate('/appointments')}>
                  <LayoutDashboard className="ml-2 h-4 w-4" />
                  {user?.role === "doctor" ? "لوحة التحكم" : "حجوزاتي"}
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/profile')}>
                  <User className="ml-2 h-4 w-4" />
                  الملف الشخصي
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-red-500" onClick={handleLogout}>
                  <LogOut className="ml-2 h-4 w-4" />
                  تسجيل الخروج
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : null}
          <button 
            className="text-gray-700 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t py-4">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            <Link 
              to="/" 
              className="font-medium text-gray-600 hover:text-medical-primary transition-colors duration-200 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('common.home')}
            </Link>
            <Link 
              to="/doctors" 
              className="font-medium text-gray-600 hover:text-medical-primary transition-colors duration-200 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('common.doctors')}
            </Link>
            <Link 
              to="/hospitals" 
              className="font-medium text-gray-600 hover:text-medical-primary transition-colors duration-200 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              المشافي
            </Link>
            <Link 
              to="/beauty-centers" 
              className="font-medium text-gray-600 hover:text-medical-primary transition-colors duration-200 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              مراكز التجميل
            </Link>
            <Link 
              to="/consultation" 
              className="font-medium text-gray-600 hover:text-medical-primary transition-colors duration-200 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              الاستشارات
            </Link>
            <Link 
              to="/promotions" 
              className="font-medium text-gray-600 hover:text-medical-primary transition-colors duration-200 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              العروض
            </Link>
            <Link 
              to="/terms-pricing" 
              className="font-medium text-gray-600 hover:text-medical-primary transition-colors duration-200 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              التسعير
            </Link>
            <Link 
              to="/faq" 
              className="font-medium text-gray-600 hover:text-medical-primary transition-colors duration-200 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              الأسئلة الشائعة
            </Link>
            {!isAuthenticated && (
              <div className="flex flex-col space-y-2 pt-2 border-t">
                <Button 
                  variant="outline" 
                  className="w-full justify-center border-medical-primary text-medical-primary hover:bg-medical-light"
                  onClick={() => {
                    navigate('/login');
                    setIsMenuOpen(false);
                  }}
                >
                  <LogIn className="h-4 w-4 ml-2" /> {t('common.login')}
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-center border-medical-primary text-medical-primary hover:bg-medical-light"
                  onClick={() => {
                    navigate('/doctor-login');
                    setIsMenuOpen(false);
                  }}
                >
                  <Stethoscope className="h-4 w-4 ml-2" /> دخول الأطباء
                </Button>
                <Button 
                  className="w-full justify-center bg-medical-primary hover:bg-medical-dark"
                  onClick={() => {
                    navigate('/register');
                    setIsMenuOpen(false);
                  }}
                >
                  <User className="h-4 w-4 ml-2" /> {t('common.register')}
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
