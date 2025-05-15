
import React, { useEffect, useState } from "react";
import { Loader } from "lucide-react";

interface GlobalLoaderProps {
  timeout?: number;
}

const GlobalLoader: React.FC<GlobalLoaderProps> = ({ timeout = 800 }) => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading time for demo purposes
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, timeout);
    
    return () => clearTimeout(timer);
  }, [timeout]);
  
  if (!isLoading) return null;
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
      <div className="text-center">
        <Loader className="h-12 w-12 animate-spin text-medical-primary mx-auto" />
        <p className="mt-4 text-gray-600 font-medium">جاري التحميل...</p>
      </div>
    </div>
  );
};

export default GlobalLoader;
