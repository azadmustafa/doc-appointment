
import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface SpecialtyCardProps {
  icon: LucideIcon;
  title: string;
  count: number;
  color: string;
}

const SpecialtyCard = ({ icon: Icon, title, count, color }: SpecialtyCardProps) => {
  return (
    <Link to={`/doctors?specialty=${encodeURIComponent(title)}`}>
      <div className="medical-card p-6 text-center cursor-pointer h-full flex flex-col items-center justify-center">
        <div 
          className={`w-16 h-16 flex items-center justify-center rounded-full mb-4`}
          style={{ backgroundColor: `${color}20` }}
        >
          <Icon className="h-8 w-8" style={{ color: color }} />
        </div>
        <h3 className="font-medium text-lg mb-1">{title}</h3>
        <p className="text-gray-500 text-sm">{count} طبيب</p>
      </div>
    </Link>
  );
};

export default SpecialtyCard;
