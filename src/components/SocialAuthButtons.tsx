
import { Button } from "@/components/ui/button";

const SocialAuthButtons = () => {
  const handleGoogleAuth = () => {
    console.log("تسجيل الدخول باستخدام Google");
    // سيتم إضافة منطق المصادقة الفعلي لاحقًا
  };

  const handleAppleAuth = () => {
    console.log("تسجيل الدخول باستخدام Apple");
    // سيتم إضافة منطق المصادقة الفعلي لاحقًا
  };

  return (
    <div className="space-y-3">
      <div className="relative flex items-center justify-center text-xs uppercase my-4">
        <span className="bg-background px-2 text-muted-foreground">
          أو يمكنك استخدام
        </span>
        <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-muted"></span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          type="button"
          onClick={handleGoogleAuth}
          className="flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="mr-2 h-4 w-4"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M17.13 17.21c-.73.47-1.58.86-2.44 1.11-.84.25-1.76.37-2.65.37-1.41 0-2.73-.36-3.81-1.05"></path>
            <path d="M6.57 6.69C5.93 7.85 5.57 9.2 5.57 10.63c0 1.45.37 2.82 1.04 3.99"></path>
            <path d="M9.13 18.32c.69.44 1.5.75 2.38.9"></path>
            <path d="M14.13 5.32c-.76-.19-1.57-.28-2.4-.28-2.34 0-4.47.94-6.01 2.48"></path>
            <path d="M15.75 18c2.07-1.17 3.51-3.36 3.66-5.89.08-1.39-.16-2.73-.69-3.92"></path>
            <path d="M7.62 14.5l2.25-4.5 2.25 4.5"></path>
            <path d="M12.12 12.5h-4.5"></path>
          </svg>
          حساب Google
        </Button>
        <Button
          variant="outline"
          type="button"
          onClick={handleAppleAuth}
          className="flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="mr-2 h-4 w-4"
          >
            <path d="M9 11V6a2 2 0 0 1 2-2v0a2 2 0 0 1 2 2v0"></path>
            <path d="M15 11V8a2 2 0 0 1 2-2v0a2 2 0 0 1 2 2v3"></path>
            <path d="M9 11h10"></path>
            <path d="M11 15.5c0 .9.444 1.5 1.5 1.5s1.5-.6 1.5-1.5v-4.5"></path>
            <path d="M3 9a2 2 0 0 1 2-2h1"></path>
            <path d="M3 14a2 2 0 0 0 2 2h1"></path>
          </svg>
          حساب Apple
        </Button>
      </div>
    </div>
  );
};

export default SocialAuthButtons;
