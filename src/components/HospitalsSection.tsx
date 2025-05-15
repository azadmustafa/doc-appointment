
import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';

// Sample data for hospitals
const hospitals = [
  {
    id: 1,
    name: 'مستشفى بغداد التعليمي',
    address: 'بغداد، الكرخ، شارع الرشيد',
    doctorsCount: 78,
    workingHours: '8:00 - 20:00',
    image: 'https://images.unsplash.com/photo-1587351021759-3e566b3db4f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 2,
    name: 'المركز التخصصي للعيون',
    address: 'بغداد، الرصافة، زيونة',
    doctorsCount: 35,
    workingHours: '9:00 - 18:00',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 3,
    name: 'مستشفى دار السلام',
    address: 'بغداد، المنصور، شارع 14 رمضان',
    doctorsCount: 63,
    workingHours: '24 ساعة',
    image: 'https://images.unsplash.com/photo-1519494080410-f9aa76cb4283?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 4,
    name: 'المستشفى التركي',
    address: 'بغداد، الكرخ، العامرية',
    doctorsCount: 42,
    workingHours: '8:00 - 22:00',
    image: 'https://images.unsplash.com/photo-1626315869436-d6781ba69d6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 5,
    name: 'مستشفى البصرة العام',
    address: 'البصرة، العشار، شارع الاستقلال',
    doctorsCount: 56,
    workingHours: '24 ساعة',
    image: 'https://images.unsplash.com/photo-1559000357-f6b52ddfcb99?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 6,
    name: 'مركز الرعاية الطبية',
    address: 'أربيل، عينكاوا، شارع العرب',
    doctorsCount: 31,
    workingHours: '9:00 - 21:00',
    image: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 7,
    name: 'مستشفى النور التخصصي',
    address: 'النجف، حي السلام',
    doctorsCount: 28,
    workingHours: '8:00 - 20:00',
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
  }
];

const HospitalsSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">المستشفيات والمراكز الطبية</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            اكتشف أفضل المستشفيات والمراكز الطبية المتاحة للحجز عبر منصتنا
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
            {hospitals.map((hospital) => (
              <CarouselItem key={hospital.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <Link to={`/hospitals/${hospital.id}`}>
                  <Card className="hover:shadow-lg transition-shadow duration-200 h-full">
                    <CardContent className="p-0">
                      <div className="aspect-video w-full overflow-hidden">
                        <img 
                          src={hospital.image} 
                          alt={hospital.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-lg mb-2">{hospital.name}</h3>
                        <div className="flex items-center text-gray-600 mb-2">
                          <Building2 className="h-4 w-4 ml-2" />
                          <span className="text-sm">{hospital.address}</span>
                        </div>
                        <div className="flex items-center text-gray-600 mb-2">
                          <Users className="h-4 w-4 ml-2" />
                          <span className="text-sm">{hospital.doctorsCount} طبيب</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Clock className="h-4 w-4 ml-2" />
                          <span className="text-sm">{hospital.workingHours}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
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
          <Link to="/hospitals">
            <Button variant="outline" className="border-medical-primary text-medical-primary hover:bg-medical-light">
              عرض جميع المستشفيات والمراكز
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HospitalsSection;
