
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/context/AuthContext";
import {
  Menu,
  MenuTrigger,
  MenuContent,
  MenuItem,
  MenuLabel,
} from "@/components/ui/menu";
import { Button } from "@/components/ui/button";
import {
  Home,
  User,
  Settings,
  HelpCircle,
  LogOut,
  LogIn,
  Edit,
  DollarSign,
  CreditCard,
  Newspaper,
} from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";

const Header = () => {
  const { t } = useTranslation();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const userMenuItems = [
    {
      label: "تعديل الملف الشخصي",
      icon: "edit",
      href: "/dashboard",
    },
    {
      label: "الإعدادات",
      icon: "settings",
      href: "/settings",
    },
    {
      label: "طلبات التسعير",
      icon: "dollar-sign",
      href: "/my-quotes",
    },
    {
      label: "المساعدة",
      icon: "help-circle",
      href: "/faq",
    },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo Section */}
        <Link to="/" className="text-xl font-bold text-medical-primary">
          شفاء
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="hover:text-medical-primary">
            {t("home")}
          </Link>
          <Link to="/doctors" className="hover:text-medical-primary">
            {t("doctors")}
          </Link>
          <Link to="/hospitals" className="hover:text-medical-primary">
            {t("hospitals")}
          </Link>
          <Link to="/beauty-centers" className="hover:text-medical-primary">
            {t("beautyCenters")}
          </Link>
          <Link to="/promotions" className="hover:text-medical-primary">
            {t("offers")}
          </Link>
          <Link to="/home-services" className="hover:text-medical-primary">
            الخدمات المنزلية
          </Link>
          <Link to="/news" className="hover:text-medical-primary">
            <Newspaper className="w-4 h-4 inline ml-1" />
            الأخبار والفعاليات
          </Link>
          <Link to="/contact" className="hover:text-medical-primary">
            {t("contactUs")}
          </Link>
          <Link to="/about" className="hover:text-medical-primary">
            {t("aboutUs")}
          </Link>
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <LanguageSwitcher />
          {isAuthenticated ? (
            <Menu>
              <MenuTrigger asChild>
                <Button variant="ghost">
                  <User className="mr-2 h-4 w-4" />
                  {user?.name}
                </Button>
              </MenuTrigger>
              <MenuContent align="end">
                <MenuLabel>My Account</MenuLabel>
                {userMenuItems.map((item) => (
                  <MenuItem key={item.label} asChild>
                    <Link to={item.href} className="flex items-center">
                      {item.icon === "edit" && (
                        <Edit className="mr-2 h-4 w-4" />
                      )}
                      {item.icon === "settings" && (
                        <Settings className="mr-2 h-4 w-4" />
                      )}
                      {item.icon === "help-circle" && (
                        <HelpCircle className="mr-2 h-4 w-4" />
                      )}
                      {item.icon === "dollar-sign" && (
                        <DollarSign className="mr-2 h-4 w-4" />
                      )}
                      <span>{item.label}</span>
                    </Link>
                  </MenuItem>
                ))}
                <MenuItem onSelect={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  تسجيل الخروج
                </MenuItem>
              </MenuContent>
            </Menu>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline">{t("login")}</Button>
              </Link>
              <Link to="/register">
                <Button>{t("register")}</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-500 hover:text-medical-primary focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full right-0 bg-white shadow-md rounded-md mt-2 py-2 w-48">
            <Link
              to="/"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={closeMenu}
            >
              {t("home")}
            </Link>
            <Link
              to="/doctors"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={closeMenu}
            >
              {t("doctors")}
            </Link>
            <Link
              to="/hospitals"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={closeMenu}
            >
              {t("hospitals")}
            </Link>
            <Link
              to="/beauty-centers"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={closeMenu}
            >
              {t("beautyCenters")}
            </Link>
            <Link
              to="/promotions"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={closeMenu}
            >
              {t("offers")}
            </Link>
            <Link
              to="/home-services"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={closeMenu}
            >
              الخدمات المنزلية
            </Link>
            <Link
              to="/news"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={closeMenu}
            >
              الأخبار والفعاليات
            </Link>
            <Link
              to="/contact"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={closeMenu}
            >
              {t("contactUs")}
            </Link>
            <Link
              to="/about"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={closeMenu}
            >
              {t("aboutUs")}
            </Link>
            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={closeMenu}
                >
                  {t("login")}
                </Link>
                <Link
                  to="/register"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={closeMenu}
                >
                  {t("register")}
                </Link>
              </>
            ) : (
              <>
                {userMenuItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                ))}
                <button
                  onClick={() => {
                    handleLogout();
                    closeMenu();
                  }}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  تسجيل الخروج
                </button>
              </>
            )}
            <LanguageSwitcher />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
