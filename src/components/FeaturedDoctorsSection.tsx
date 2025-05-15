
import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

// Featured doctors data
const featuredDoctors = [
  {
    id: 1,
    name: "د. أحمد الشمري",
    specialty: "قلب وأوعية دموية",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    rating: 4.9,
    reviewCount: 124,
    location: "بغداد، الكرخ",
    price: 35000
  },
  {
    id: 2,
    name: "د. سارة العبيدي",
    specialty: "طب الأطفال",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    rating: 4.8,
    reviewCount: 98,
    location: "بغداد، الرصافة",
    price: 30000
  },
  {
    id: 3,
    name: "د. محمد الكاظمي",
    specialty: "جراحة العظام",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    rating: 4.7,
    reviewCount: 87,
    location: "بغداد، المنصور",
    price: 40000
  },
  {
    id: 4,
    name: "د. فاطمة الموسوي",
    specialty: "طب الأسنان",
    image: "https://images.unsplash.com/photo-1571772996211-2f02974a304d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    rating: 4.9,
    reviewCount: 112,
    location: "البصرة، العشار",
    price: 28000
  },
  {
    id: 5,
    name: "د. علي الربيعي",
    specialty: "المخ والأعصاب",
    image: "https://images.unsplash.com/photo-1637059824899-a441006a6875?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    rating: 4.8,
    reviewCount: 75,
    location: "النجف، حي السلام",
    price: 45000
  },
  {
    id: 6,
    name: "د. زينب الحسيني",
    specialty: "أمراض جلدية",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    rating: 4.7,
    reviewCount: 91,
    location: "كربلاء، المركز",
    price: 32000
  },
  {
    id: 7,
    name: "د. حسين الجبوري",
    specialty: "طب العيون",
    image: "https://images.unsplash.com/photo-1618498082410-b4aa22193b38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    rating: 4.9,
    reviewCount: 103,
    location: "أربيل، عينكاوا",
    price: 38000
  },
  {
    id: 8,
    name: "د. نور العلي",
    specialty: "طب نسائية وتوليد",
    image: "https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    rating: 4.8,
    reviewCount: 128,
    location: "بغداد، زيونة",
    price: 36000
  },
  {
    id: 9,
    name: "د. كريم السعدي",
    specialty: "طب باطني",
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    rating: 4.6,
    reviewCount: 82,
    location: "البصرة، المعقل",
    price: 30000
  },
  {
    id: 10,
    name: "د. رنا الخفاجي",
    specialty: "طب الأطفال",
    image: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    rating: 4.9,
    reviewCount: 114,
    location: "بغداد، المنصور",
    price: 33000
  }
];

const FeaturedDoctorsSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">أطباء مميزون</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            تعرف على أفضل الأطباء المميزين في مختلف التخصصات واحجز موعدك معهم الآن
          </p>
        </div>
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full mx-auto"
        >
          <CarouselContent className="-ml-4">
            {featuredDoctors.map((doctor) => (
              <CarouselItem key={doctor.id} className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                <Link to={`/doctors/${doctor.id}`}>
                  <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200 h-full">
                    <div className="relative">
                      <img 
                        src={doctor.image} 
                        alt={doctor.name} 
                        className="w-full h-52 object-cover"
                      />
                      <div className="absolute top-2 left-2 bg-white rounded-full px-2 py-1 text-xs font-medium text-medical-primary">
                        {doctor.price.toLocaleString('ar-IQ')} د.ع
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center mb-1">
                        <Star className="w-4 h-4 text-yellow-500 ml-1" />
                        <span className="text-sm font-medium">{doctor.rating}</span>
                        <span className="text-xs text-gray-500 mr-1">({doctor.reviewCount} تقييم)</span>
                      </div>
                      <h3 className="font-bold text-lg mb-1">{doctor.name}</h3>
                      <p className="text-gray-600 text-sm mb-2">{doctor.specialty}</p>
                      <p className="text-gray-500 text-sm">{doctor.location}</p>
                      <Button className="w-full mt-3 bg-medical-primary hover:bg-medical-dark">
                        احجز الآن
                      </Button>
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:flex justify-end gap-2 mt-4">
            <CarouselPrevious className="static translate-y-0 ml-auto" />
            <CarouselNext className="static translate-y-0" />
          </div>
        </Carousel>
        
        <div className="text-center mt-10">
          <Link to="/doctors">
            <Button className="bg-medical-primary hover:bg-medical-dark">
              عرض جميع الأطباء
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDoctorsSection;
