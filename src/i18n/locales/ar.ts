
export default {
  // الترجمة العربية
  common: {
    search: 'بحث',
    login: 'تسجيل الدخول',
    register: 'تسجيل جديد',
    logout: 'تسجيل الخروج',
    home: 'الرئيسية',
    doctors: 'الأطباء',
    hospitals: 'المستشفيات',
    appointments: 'المواعيد',
    about: 'عن التطبيق',
    beautycenters: 'مراكز التجميل',
    promotions: 'العروض',
    specialties: 'التخصصات',
    consultation: 'الاستشارات',
    bookAppointment: 'حجز موعد',
    viewMore: 'عرض المزيد',
    location: 'الموقع',
    price: 'السعر',
    rating: 'التقييم',
    reviews: 'تقييم',
    apply: 'تطبيق',
    reset: 'إعادة ضبط',
    filter: 'تصفية',
    sortBy: 'الترتيب حسب',
    searchDoctor: 'ابحث عن أفضل الأطباء',
    selectSpecialty: 'اختر التخصص الطبي',
    selectGovernorate: 'اختر المحافظة',
    regionOrDoctorName: 'المنطقة أو اسم الطبيب',
    currency: 'دينار'
  },
  // صفحة البحث عن الأطباء
  doctorsList: {
    title: 'ابحث عن أفضل الأطباء',
    noResults: 'لا يوجد أطباء مطابقين',
    tryAgain: 'لا يوجد أطباء مطابقين للفلاتر المحددة. يرجى تعديل معايير البحث الخاصة بك وحاول مرة أخرى.',
    filterOptions: 'خيارات التصفية',
    specialty: 'التخصص',
    city: 'المدينة',
    rating: 'التقييم',
    price: 'السعر',
    availability: 'التوفر',
    availableToday: 'متاح اليوم',
    sortOptions: {
      recommended: 'الأنسب',
      rating: 'التقييم (الأعلى)',
      priceLow: 'السعر (الأقل)',
      priceHigh: 'السعر (الأعلى)',
      availability: 'المتاح اليوم'
    },
    pagination: {
      previous: 'السابق',
      next: 'التالي'
    },
    clearAll: 'مسح الكل',
    applyFilters: 'تطبيق الفلاتر',
    resetFilters: 'إعادة ضبط',
    filtersApplied: 'تم تطبيق الفلاتر',
    resultsUpdated: 'تم تحديث النتائج بناءً على اختياراتك.'
  },
  // صفحة الاستشارات
  consultation: {
    title: 'استشارات طبية مجانية',
    subtitle: 'اطرح سؤالك الطبي واحصل على إجابات من أطباء مختصين ومعتمدين',
    tabs: {
      allQuestions: 'جميع الأسئلة',
      askQuestion: 'اطرح سؤالاً',
      myQuestions: 'أسئلتي'
    },
    askForm: {
      titleLabel: 'عنوان السؤال *',
      titlePlaceholder: 'أدخل عنوانًا واضحًا ومختصرًا لسؤالك',
      specialtyLabel: 'التخصص المطلوب *',
      specialtyPlaceholder: 'اختر التخصص',
      contentLabel: 'تفاصيل السؤال *',
      contentPlaceholder: 'اشرح حالتك بالتفصيل لمساعدة الأطباء على تقديم إجابة دقيقة...',
      notes: 'ملاحظات هامة:',
      notesList: [
        'الاستشارات المجانية مخصصة للإرشاد الأولي فقط ولا تغني عن زيارة الطبيب عند الضرورة.',
        'المعلومات الشخصية التي تقدمها تخضع لسياسة الخصوصية وهي محمية.',
        'سيتم الرد على سؤالك خلال 24-48 ساعة من قبل أطباء معتمدين.'
      ],
      submit: 'إرسال السؤال'
    },
    guidelines: {
      title: 'إرشادات الاستشارة',
      list: [
        'كن محدداً وواضحاً في وصف حالتك',
        'اذكر العمر والجنس والأعراض بدقة',
        'اذكر أي أدوية تتناولها حالياً',
        'اذكر تاريخك الطبي إذا كان مرتبطاً بالسؤال',
        'التزم بآداب الحوار واحترام الآخرين'
      ]
    },
    answers: 'إجابات',
    verified: 'معتمد',
    noQuestions: 'لا توجد أسئلة',
    noQuestionsDesc: 'لا توجد أسئلة في هذا التخصص حالياً.',
    noMyQuestions: 'لم تقم بطرح أي أسئلة بعد.',
    askNow: 'اطرح سؤالاً الآن',
    answered: 'تمت الإجابة',
    waiting: 'في انتظار الرد',
    formError: 'خطأ في النموذج',
    fillAllFields: 'يرجى ملء جميع الحقول المطلوبة.',
    questionSent: 'تم إرسال السؤال بنجاح',
    questionSentDesc: 'سيقوم أطباؤنا بالرد على سؤالك في أقرب وقت ممكن.',
    showAll: 'الكل'
  },
  // تفاصيل الطبيب
  doctorDetail: {
    about: 'عن الطبيب',
    education: 'التعليم',
    experience: 'الخبرة',
    services: 'الخدمات',
    reviews: 'التقييمات',
    appointmentBooking: 'حجز موعد',
    selectDate: 'اختر تاريخ',
    availableTimes: 'المواعيد المتاحة',
    noTimesAvailable: 'لا يوجد مواعيد متاحة في هذا اليوم',
    selectAnotherDay: 'يرجى اختيار يوم آخر',
    bookingConfirmation: 'تأكيد الحجز',
    bookingSuccess: 'تم الحجز بنجاح',
    bookingPending: 'جاري تأكيد الحجز...'
  }
};
