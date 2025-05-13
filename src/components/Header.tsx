
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, Calendar, User, LogIn } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Calendar className="h-8 w-8 text-medical-primary" />
          <span className="font-bold text-xl text-gray-900">طبيبي</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="font-medium text-gray-700 hover:text-medical-primary transition-colors duration-200">
            {t('common.home')}
          </Link>
          <Link to="/doctors" className="font-medium text-gray-700 hover:text-medical-primary transition-colors duration-200">
            {t('common.doctors')}
          </Link>
          <Link to="/appointments" className="font-medium text-gray-700 hover:text-medical-primary transition-colors duration-200">
            {t('common.appointments')}
          </Link>
          <Link to="/consultation" className="font-medium text-gray-700 hover:text-medical-primary transition-colors duration-200">
            {t('common.consultation')}
          </Link>
          <Link to="/about" className="font-medium text-gray-700 hover:text-medical-primary transition-colors duration-200">
            {t('common.about')}
          </Link>
        </nav>
        
        <div className="hidden md:flex items-center space-x-3">
          <LanguageSwitcher />
          <Button 
            variant="outline" 
            size="sm" 
            className="border-medical-primary text-medical-primary hover:bg-medical-light"
            onClick={() => navigate('/login')}
          >
            <LogIn className="h-4 w-4 mr-1" /> {t('common.login')}
          </Button>
          <Button 
            className="bg-medical-primary hover:bg-medical-dark"
            onClick={() => navigate('/register')}
          >
            <User className="h-4 w-4 mr-1" /> {t('common.register')}
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center space-x-2">
          <LanguageSwitcher />
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
              className="font-medium text-gray-700 hover:text-medical-primary transition-colors duration-200 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('common.home')}
            </Link>
            <Link 
              to="/doctors" 
              className="font-medium text-gray-700 hover:text-medical-primary transition-colors duration-200 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('common.doctors')}
            </Link>
            <Link 
              to="/appointments" 
              className="font-medium text-gray-700 hover:text-medical-primary transition-colors duration-200 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('common.appointments')}
            </Link>
            <Link 
              to="/consultation" 
              className="font-medium text-gray-700 hover:text-medical-primary transition-colors duration-200 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('common.consultation')}
            </Link>
            <Link 
              to="/about" 
              className="font-medium text-gray-700 hover:text-medical-primary transition-colors duration-200 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('common.about')}
            </Link>
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
                className="w-full justify-center bg-medical-primary hover:bg-medical-dark"
                onClick={() => {
                  navigate('/register');
                  setIsMenuOpen(false);
                }}
              >
                <User className="h-4 w-4 ml-2" /> {t('common.register')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
