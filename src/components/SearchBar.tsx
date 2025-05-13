
import { useState } from "react";
import { Search, MapPin, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const governorates = [
  "بغداد", "البصرة", "الموصل", "أربيل", "النجف", "كربلاء",
  "السليمانية", "الأنبار", "ديالى", "ذي قار", "كركوك"
];

const specialties = [
  "قلب وأوعية دموية", "المخ والأعصاب", "طب عام", "طب العيون", 
  "عظام", "طب الباطنة", "جراحة", "أمراض جلدية", "طب الأطفال", "طب الأسنان"
];

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [governorate, setGovernorate] = useState("");
  const [region, setRegion] = useState("");
  const [specialty, setSpecialty] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/doctors?search=${encodeURIComponent(searchTerm)}&governorate=${encodeURIComponent(governorate)}&region=${encodeURIComponent(region)}&specialty=${encodeURIComponent(specialty)}`);
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-grow">
          <Stethoscope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <select
            className="search-input w-full pl-10 py-3 pr-4 text-right"
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
          >
            <option value="">اختر التخصص الطبي</option>
            {specialties.map((spec) => (
              <option key={spec} value={spec}>{spec}</option>
            ))}
          </select>
        </div>
        
        <div className="relative flex-grow">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <select
            className="search-input w-full pl-10 py-3 pr-4 text-right"
            value={governorate}
            onChange={(e) => setGovernorate(e.target.value)}
          >
            <option value="">اختر المحافظة</option>
            {governorates.map((gov) => (
              <option key={gov} value={gov}>{gov}</option>
            ))}
          </select>
        </div>
        
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="المنطقة أو اسم الطبيب"
            className="search-input w-full pl-10 py-3 pr-4 text-right"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Button 
          type="submit" 
          className="md:w-auto w-full bg-medical-primary hover:bg-medical-dark py-3 px-8"
        >
          بحث
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
