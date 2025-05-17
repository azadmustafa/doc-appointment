
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface Image {
  id: number;
  src: string;
  alt: string;
  category: 'clinic' | 'equipment' | 'team';
}

interface ClinicGalleryProps {
  images: Image[];
}

const ClinicGallery = ({ images }: ClinicGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>("all");

  const filteredImages = filterCategory === "all" 
    ? images 
    : images.filter(img => img.category === filterCategory);

  return (
    <div>
      <Tabs defaultValue="all" onValueChange={setFilterCategory}>
        <TabsList>
          <TabsTrigger value="all">الكل</TabsTrigger>
          <TabsTrigger value="clinic">العيادة</TabsTrigger>
          <TabsTrigger value="equipment">المعدات</TabsTrigger>
          <TabsTrigger value="team">الفريق الطبي</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {filteredImages.map(image => (
          <div 
            key={image.id}
            className="cursor-pointer rounded-md overflow-hidden hover:opacity-90 transition-opacity"
            onClick={() => setSelectedImage(image)}
          >
            <div className="aspect-square w-full relative">
              <img 
                src={image.src} 
                alt={image.alt} 
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        ))}
      </div>

      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className="sm:max-w-[80vw] max-h-[90vh] p-1">
          <DialogHeader>
            <DialogTitle>{selectedImage?.alt}</DialogTitle>
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-2 right-2 rounded-full bg-black bg-opacity-40 text-white hover:bg-opacity-60 z-10"
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-5 w-5" />
            </Button>
          </DialogHeader>
          {selectedImage && (
            <img 
              src={selectedImage.src} 
              alt={selectedImage.alt}
              className="w-full max-h-[80vh] object-contain" 
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClinicGallery;
