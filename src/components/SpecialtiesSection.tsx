
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Brain, Stethoscope, Eye, Bone, Activity, Scissors, Pill, Baby, Tooth, Ear, Lungs, Thermometer } from "lucide-react";

const specialties = [
  { icon: Heart, title: "قلب وأوعية دموية", count: 28, color: "#e74c3c" },
  { icon: Brain, title: "المخ والأعصاب", count: 16, color: "#9b59b6" },
  { icon: Stethoscope, title: "طب عام", count: 42, color: "#3498db" },
  { icon: Eye, title: "طب العيون", count: 20, color: "#2ecc71" },
  { icon: Bone, title: "عظام", count: 15, color: "#f39c12" },
  { icon: Activity, title: "باطنة", count: 31, color: "#1abc9c" },
  { icon: Scissors, title: "جراحة", count: 25, color: "#e67e22" },
  { icon: Pill, title: "أمراض جلدية", count: 18, color: "#8e44ad" },
  { icon: Baby, title: "طب الأطفال", count: 24, color: "#2980b9" },
  { icon: Tooth, title: "طب الأسنان", count: 33, color: "#27ae60" },
  { icon: Ear, title: "أنف وأذن وحنجرة", count: 14, color: "#c0392b" },
  { icon: Lungs, title: "الجهاز التنفسي", count: 19, color: "#16a085" },
  { icon: Thermometer, title: "طب مختبرات", count: 8, color: "#d35400" },
];

const SpecialtiesSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">تصفح حسب التخصص</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            اختر التخصص المناسب لحالتك الصحية واحجز موعدًا مع أفضل الأطباء المتخصصين
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
          {specialties.map((specialty, index) => (
            <Link to={`/doctors?specialty=${encodeURIComponent(specialty.title)}`} key={index}>
              <Card className="hover:shadow-lg transition-shadow duration-200 h-full">
                <CardContent className="flex flex-col items-center justify-center p-4 text-center">
                  <div 
                    className="w-14 h-14 rounded-full flex items-center justify-center mb-4 mt-2"
                    style={{ backgroundColor: `${specialty.color}20` }}
                  >
                    <specialty.icon style={{ color: specialty.color }} className="h-8 w-8" />
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1">{specialty.title}</h3>
                  <p className="text-sm text-gray-500">{specialty.count} طبيب</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Link to="/specialties">
            <Button variant="outline" className="border-medical-primary text-medical-primary hover:bg-medical-light">
              عرض جميع التخصصات
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SpecialtiesSection;
