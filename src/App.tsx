
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import DoctorsList from "./pages/DoctorsList";
import DoctorDetail from "./pages/DoctorDetail";
import Appointments from "./pages/Appointments";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Consultation from "./pages/Consultation";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/doctors" element={<DoctorsList />} />
          <Route path="/doctors/:id" element={<DoctorDetail />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/consultation" element={<Consultation />} />
          <Route path="/hospitals" element={<DoctorsList />} /> {/* يمكن تغييره لاحقاً */}
          <Route path="/hospitals/:id" element={<DoctorDetail />} /> {/* يمكن تغييره لاحقاً */}
          <Route path="/beauty-centers" element={<DoctorsList />} /> {/* يمكن تغييره لاحقاً */}
          <Route path="/beauty-centers/:id" element={<DoctorDetail />} /> {/* يمكن تغييره لاحقاً */}
          <Route path="/promotions" element={<DoctorsList />} /> {/* يمكن تغييره لاحقاً */}
          <Route path="/specialties" element={<DoctorsList />} /> {/* يمكن تغييره لاحقاً */}
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
