
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

// Offers data
const offers = [
  {
    id: 1,
    title: "فحص شامل للعيون",
    description: "خصم 30% على الفحص الشامل للعيون يشمل قياس النظر وفحص قاع العين",
    originalPrice: 45000,
    discountedPrice: 31500,
    validUntil: "2025-06-30",
    provider: "مركز الرؤية للعيون",
    location: "بغداد، الكرخ",
    images: [
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1616497951628-844f1c85d1bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    ]
  },
  {
    id: 2,
    title: "تنظيف الأسنان وكشف",
    description: "خصم 25% على تنظيف الأسنان مع كشف مجاني من أفضل أطباء الأسنان",
    originalPrice: 35000,
    discountedPrice: 26250,
    validUntil: "2025-07-15",
    provider: "مركز الابتسامة",
    location: "بغداد، الرصافة",
    images: [
      "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    ]
  },
  {
    id: 3,
    title: "فحص قلب شامل",
    description: "فحص شامل للقلب يشمل تخطيط القلب والموجات فوق الصوتية بخصم 35%",
    originalPrice: 60000,
    discountedPrice: 39000,
    validUntil: "2025-07-30",
    provider: "مركز القلب التخصصي",
    location: "بغداد، المنصور",
    images: [
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    ]
  },
  {
    id: 4,
    title: "فحص سكري شامل",
    description: "فحص شامل لمرضى السكري يشمل التحاليل الضرورية والاستشارة الطبية",
    originalPrice: 40000,
    discountedPrice: 28000,
    validUntil: "2025-08-15",
    provider: "مركز الرعاية الطبية",
    location: "البصرة، العشار",
    images: [
      "https://images.unsplash.com/photo-1579154204601-01588f351e67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1624727828489-a1e03b79bba8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    ]
  },
  {
    id: 5,
    title: "فحص الحساسية",
    description: "فحص شامل للحساسية مع استشارة طبية بخصم 20%",
    originalPrice: 30000,
    discountedPrice: 24000,
    validUntil: "2025-08-30",
    provider: "مركز الشفاء التخصصي",
    location: "بغداد، زيونة",
    images: [
      "https://images.unsplash.com/photo-1584362917165-526a968579e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1581594693702-48cc357c3a2e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    ]
  },
];

const OfferCard = ({ offer }: { offer: typeof offers[0] }) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <div className="h-full flex flex-col">
        <div className="overflow-hidden h-48 relative">
          <Carousel className="w-full">
            <CarouselContent>
              {offer.images.map((image, idx) => (
                <CarouselItem key={idx}>
                  <img src={image} alt={`${offer.title} ${idx + 1}`} className="w-full h-48 object-cover" />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="absolute bottom-2 right-2">
              <CarouselPrevious className="h-7 w-7 bg-white/80" />
              <CarouselNext className="h-7 w-7 bg-white/80 ml-1" />
            </div>
          </Carousel>
          <div className="absolute top-2 left-2 bg-medical-accent text-white font-bold px-2 py-1 rounded text-xs">
            خصم {Math.round((1 - offer.discountedPrice / offer.originalPrice) * 100)}%
          </div>
        </div>
        <div className="p-4 flex-grow flex flex-col">
          <h3 className="font-bold text-lg mb-2">{offer.title}</h3>
          <p className="text-gray-600 text-sm mb-3 flex-grow">{offer.description}</p>
          <div className="flex items-center mb-2">
            <p className="text-medical-accent font-bold">{offer.discountedPrice.toLocaleString('ar-IQ')} د.ع</p>
            <p className="text-gray-500 text-sm line-through mr-2">{offer.originalPrice.toLocaleString('ar-IQ')} د.ع</p>
          </div>
          <p className="text-gray-500 text-xs mb-1">{offer.provider} - {offer.location}</p>
          <p className="text-gray-500 text-xs mb-3">صالح حتى {new Date(offer.validUntil).toLocaleDateString('ar-IQ')}</p>
          <Button className="w-full bg-medical-accent hover:bg-medical-accent/90">
            احجز العرض
          </Button>
        </div>
      </div>
    </Card>
  );
};

const OffersSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">العروض والخصومات</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            استفد من أفضل العروض والخصومات على الخدمات الطبية المختلفة
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
            {offers.map((offer) => (
              <CarouselItem key={offer.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <OfferCard offer={offer} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:flex justify-end gap-2 mt-4">
            <CarouselPrevious className="static translate-y-0 ml-auto" />
            <CarouselNext className="static translate-y-0" />
          </div>
        </Carousel>
        
        <div className="text-center mt-10">
          <Link to="/promotions">
            <Button variant="outline" className="border-medical-accent text-medical-accent hover:bg-medical-accent/10">
              عرض جميع العروض
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OffersSection;
