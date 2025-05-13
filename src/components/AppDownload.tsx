
import { Button } from "@/components/ui/button";

const AppDownload = () => {
  return (
    <div className="py-12 bg-medical-light">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pl-8">
            <h2 className="text-3xl font-bold mb-4">حمّل تطبيق طبيبي الآن</h2>
            <p className="text-gray-600 mb-6 text-lg">
              احجز موعدك الطبي بسهولة وسرعة، وتابع حالتك الصحية أينما كنت.
              تمتع بكافة مميزات منصتنا الطبية مباشرة على هاتفك الذكي.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="flex items-center justify-center bg-gray-900 hover:bg-gray-800 h-14 pl-4 pr-6">
                <div className="mr-3">
                  <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current text-white">
                    <path d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 013 10a1 1 0 011.707-.707L10 14.586l5.293-5.293a1 1 0 011.414 0z" />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-xs text-gray-300">تحميل من</div>
                  <div className="text-lg font-semibold">App Store</div>
                </div>
              </Button>
              
              <Button className="flex items-center justify-center bg-gray-900 hover:bg-gray-800 h-14 pl-4 pr-6">
                <div className="mr-3">
                  <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current text-white">
                    <path d="M3 3h18v18H3z" />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-xs text-gray-300">تحميل من</div>
                  <div className="text-lg font-semibold">Google Play</div>
                </div>
              </Button>
            </div>
          </div>
          
          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              <div className="w-64 h-auto relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?ixlib=rb-4.0.3" 
                  alt="تطبيق طبيبي" 
                  className="rounded-3xl shadow-xl"
                />
              </div>
              <div className="absolute top-0 right-16 w-64 h-full bg-medical-primary/20 rounded-3xl -z-10 transform rotate-6"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppDownload;
