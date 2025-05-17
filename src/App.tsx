
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Index from "./pages/Index";
import DoctorsList from "./pages/DoctorsList";
import DoctorDetail from "./pages/DoctorDetail";
import Appointments from "./pages/Appointments";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import DoctorLogin from "./pages/DoctorLogin";
import Register from "./pages/Register";
import Consultation from "./pages/Consultation";
import DoctorDashboard from "./pages/DoctorDashboard";
import TermsAndPricing from "./pages/TermsAndPricing";
import FAQ from "./pages/FAQ";
import ServiceQuote from "./pages/ServiceQuote";
import UserQuotes from "./pages/UserQuotes";
import GeoSearch from "./pages/GeoSearch";
import BeautyCenters from "./pages/BeautyCenters";
import Dashboard from "./pages/Dashboard";
import ContactUs from "./pages/ContactUs";
import GlobalLoader from "./components/GlobalLoader";
import Promotions from "./pages/Promotions";
import PromotionDetail from "./pages/PromotionDetail";
import HospitalsList from "./pages/HospitalsList";
import HospitalDetail from "./pages/HospitalDetail";
import BeautyCenterDetail from "./pages/BeautyCenterDetail";
import Payment from "./pages/Payment";
import HealthReminders from "./pages/HealthReminders";
import HomeServices from "./pages/HomeServices";
import HomeServiceDetail from "./pages/HomeServiceDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <GlobalLoader />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/doctors" element={<DoctorsList />} />
            <Route path="/doctors/:id" element={<DoctorDetail />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/doctor-login" element={<DoctorLogin />} />
            <Route path="/register" element={<Register />} />
            <Route path="/consultation" element={<Consultation />} />
            <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
            <Route path="/terms-pricing" element={<TermsAndPricing />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/service-quote" element={<ServiceQuote />} />
            <Route path="/user-quotes" element={<UserQuotes />} />
            <Route path="/geo-search" element={<GeoSearch />} />
            <Route path="/beauty-centers" element={<BeautyCenters />} />
            <Route path="/beauty-centers/:id" element={<BeautyCenterDetail />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/hospitals" element={<HospitalsList />} />
            <Route path="/hospitals/:id" element={<HospitalDetail />} />
            <Route path="/promotions" element={<Promotions />} />
            <Route path="/promotions/:id" element={<PromotionDetail />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/health-reminders" element={<HealthReminders />} />
            <Route path="/home-services" element={<HomeServices />} />
            <Route path="/home-services/:slug" element={<HomeServiceDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
