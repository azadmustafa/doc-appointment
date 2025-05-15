
import { useState } from "react";
import { Search, MapPin, Stethoscope, ShieldCheck, Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const governorates = [
  "بغداد", "البصرة", "الموصل", "أربيل", "النجف", "كربلاء",
  "السليمانية", "الأنبار", "ديالى", "ذي قار", "كركوك"
];

const regions = {
  "بغداد": ["الكرخ", "الرصافة", "الكاظمية", "الأعظمية", "الدورة", "المنصور", "زيونة", "الشعب"],
  "البصرة": ["العشار", "الجبيلة", "المعقل", "الزبير"],
  "الموصل": ["الجانب الأيمن", "الجانب الأيسر", "الغابات", "الزهور"],
  // Other regions can be added as needed
};

const specialties = [
  "قلب وأوعية دموية", "المخ والأعصاب", "طب عام", "طب العيون", 
  "عظام", "طب الباطنة", "جراحة", "أمراض جلدية", "طب الأطفال", "طب الأسنان"
];

const insuranceProviders = [
  "شركة التأمين الوطنية", "آسيا للتأمين", "الخليج للتأمين", 
  "المجموعة العربية للتأمين", "التأمين الصحي الحكومي", "بغداد للتأمين"
];

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [governorate, setGovernorate] = useState("");
  const [region, setRegion] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [insurance, setInsurance] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/doctors?search=${encodeURIComponent(searchTerm)}&governorate=${encodeURIComponent(governorate)}&region=${encodeURIComponent(region)}&specialty=${encodeURIComponent(specialty)}&insurance=${encodeURIComponent(insurance)}`);
  };

  const handleGeoSearch = () => {
    navigate('/geo-search');
  };

  const availableRegions = governorate ? (regions[governorate as keyof typeof regions] || []) : [];

  return (
    <form onSubmit={handleSearch} className="w-full max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="relative">
          <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <select
            className="search-input w-full pr-10 py-3 pl-4 text-right"
            value={governorate}
            onChange={(e) => {
              setGovernorate(e.target.value);
              setRegion(""); // Reset region when governorate changes
            }}
          >
            <option value="">اختر المحافظة</option>
            {governorates.map((gov) => (
              <option key={gov} value={gov}>{gov}</option>
            ))}
          </select>
        </div>
        
        <div className="relative">
          <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <select
            className="search-input w-full pr-10 py-3 pl-4 text-right"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            disabled={!governorate}
          >
            <option value="">اختر المنطقة</option>
            {availableRegions.map((reg) => (
              <option key={reg} value={reg}>{reg}</option>
            ))}
          </select>
        </div>
        
        <div className="relative">
          <Stethoscope className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <select
            className="search-input w-full pr-10 py-3 pl-4 text-right"
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
          >
            <option value="">اختر التخصص الطبي</option>
            {specialties.map((spec) => (
              <option key={spec} value={spec}>{spec}</option>
            ))}
          </select>
        </div>
        
        <div className="relative">
          <ShieldCheck className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <select
            className="search-input w-full pr-10 py-3 pl-4 text-right"
            value={insurance}
            onChange={(e) => setInsurance(e.target.value)}
          >
            <option value="">اختر شركة التأمين</option>
            {insuranceProviders.map((ins) => (
              <option key={ins} value={ins}>{ins}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="relative mb-4">
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="اسم الطبيب (اختياري)"
          className="search-input w-full pr-10 py-3 pl-4 text-right"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        <Button 
          type="submit" 
          className="bg-medical-primary hover:bg-medical-dark py-3 px-8 text-lg"
        >
          <Search className="ml-2 h-5 w-5" />
          بحث
        </Button>
        
        <Button 
          type="button"
          variant="outline"
          className="border-medical-primary text-medical-primary hover:bg-medical-light py-3 px-8 text-lg"
          onClick={handleGeoSearch}
        >
          <Map className="ml-2 h-5 w-5" />
          البحث عن طريق الموقع
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
