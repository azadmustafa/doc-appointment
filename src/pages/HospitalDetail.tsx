import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Phone, Globe, Clock, CheckCircle, XCircle, Star, ImagePlus, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useQuery } from "@tanstack/react-query";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NotFound from "@/pages/NotFound";
import { cn } from '@/lib/utils';

interface Hospital {
  id: number;
  name: string;
  description: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  website: string;
  email: string;
  openingHours: string;
  images: string[];
  rating: number;
  reviews: number;
  specialties: string[];
  services: string[];
  doctors: Doctor[];
  socialMedia: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
}

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  image: string;
  rating: number;
  reviews: number;
}

const HospitalDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [hospital, setHospital] = useState<Hospital | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHospital = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Replace with actual API endpoint
        const response = await fetch(`https://64f849b9824680f12c59152a.mockapi.io/hospitals/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Hospital = await response.json();
        setHospital(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHospital();
  }, [id]);

  if (isLoading) {
    return <div className="text-center py-10">Loading hospital details...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">Error: {error}</div>;
  }

  if (!hospital) {
    return <NotFound />;
  }

  const user = {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    role: "patient",
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 bg-gray-100 overflow-hidden">
          {/* Image Gallery */}
          <div className="absolute inset-0 h-full w-full object-cover object-center">
            <div className="relative h-96">
              <AspectRatio ratio={16 / 9}>
                <img
                  src={hospital.images[0] || "https://via.placeholder.com/1280x720"}
                  alt={`${hospital.name} Exterior`}
                  className="absolute inset-0 h-full w-full object-cover object-center"
                />
              </AspectRatio>
            </div>
          </div>
          <div className="absolute inset-0 bg-black opacity-40"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white mb-4">{hospital.name}</h1>
              <p className="text-lg text-gray-200 max-w-2xl mx-auto">{hospital.description}</p>
            </div>

            <div className="mt-8 flex justify-center gap-4">
              <Badge variant="secondary">
                <MapPin className="mr-2 h-4 w-4" />
                {hospital.city}, {hospital.country}
              </Badge>
              <Badge variant="secondary">
                <Star className="mr-2 h-4 w-4" />
                {hospital.rating} ({hospital.reviews} تقييم)
              </Badge>
            </div>
          </div>
        </section>

        {/* Details Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column - Contact Info */}
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>معلومات الاتصال</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-gray-500" />
                    <a href={`https://maps.google.com/?q=${hospital.address}, ${hospital.city}, ${hospital.country}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {hospital.address}, {hospital.city}, {hospital.country}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-gray-500" />
                    <a href={`tel:${hospital.phone}`} className="hover:underline">{hospital.phone}</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-gray-500" />
                    <a href={hospital.website} target="_blank" rel="noopener noreferrer" className="hover:underline">{hospital.website}</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-gray-500" />
                    <span>{hospital.openingHours}</span>
                  </div>
                  {hospital.socialMedia && (
                    <div className="flex gap-4 mt-4">
                      {hospital.socialMedia.facebook && (
                        <a href={hospital.socialMedia.facebook} target="_blank" rel="noopener noreferrer">
                          <Facebook className="h-6 w-6 text-blue-600 hover:opacity-75" />
                        </a>
                      )}
                      {hospital.socialMedia.instagram && (
                        <a href={hospital.socialMedia.instagram} target="_blank" rel="noopener noreferrer">
                          <Instagram className="h-6 w-6 text-pink-500 hover:opacity-75" />
                        </a>
                      )}
                      {hospital.socialMedia.twitter && (
                        <a href={hospital.socialMedia.twitter} target="_blank" rel="noopener noreferrer">
                          <Twitter className="h-6 w-6 text-blue-400 hover:opacity-75" />
                        </a>
                      )}
                      {hospital.socialMedia.linkedin && (
                        <a href={hospital.socialMedia.linkedin} target="_blank" rel="noopener noreferrer">
                          <Linkedin className="h-6 w-6 text-blue-800 hover:opacity-75" />
                        </a>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Middle Column - Specialties and Services */}
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>التخصصات</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[200px] w-full rounded-md border">
                    <div className="p-3">
                      {hospital.specialties.map((specialty, index) => (
                        <div key={index} className="mb-2">
                          <Badge>{specialty}</Badge>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>الخدمات</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[200px] w-full rounded-md border">
                    <div className="p-3">
                      {hospital.services.map((service, index) => (
                        <div key={index} className="mb-2">
                          <Badge variant="outline">{service}</Badge>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Doctors */}
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>الأطباء</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[430px] w-full rounded-md border">
                    <div className="p-3 space-y-4">
                      {hospital.doctors.map(doctor => (
                        <div key={doctor.id} className="flex items-center gap-4">
                          <img
                            src={doctor.image}
                            alt={doctor.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div>
                            <Link to={`/doctors/${doctor.id}`} className="font-medium hover:underline">
                              {doctor.name}
                            </Link>
                            <p className="text-sm text-gray-500">{doctor.specialty}</p>
                            <div className="flex items-center text-sm mt-1">
                              <Star className="mr-1 h-4 w-4 text-yellow-500" />
                              <span>{doctor.rating} ({doctor.reviews})</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HospitalDetail;
