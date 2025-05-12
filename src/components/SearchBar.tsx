
import { useState } from "react";
import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/doctors?search=${encodeURIComponent(searchTerm)}&location=${encodeURIComponent(location)}`);
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="ابحث عن طبيب أو تخصص..."
            className="search-input w-full pl-10 py-3 pr-4 text-right"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="relative flex-grow">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="المدينة أو المنطقة"
            className="search-input w-full pl-10 py-3 pr-4 text-right"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
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
