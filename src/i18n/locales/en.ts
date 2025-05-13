
export default {
  // Common translations
  common: {
    search: 'Search',
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    home: 'Home',
    doctors: 'Doctors',
    hospitals: 'Hospitals',
    appointments: 'Appointments',
    about: 'About',
    beautycenters: 'Beauty Centers',
    promotions: 'Promotions',
    specialties: 'Specialties',
    consultation: 'Consultation',
    bookAppointment: 'Book Appointment',
    viewMore: 'View More',
    location: 'Location',
    price: 'Price',
    rating: 'Rating',
    reviews: 'Reviews',
    apply: 'Apply',
    reset: 'Reset',
    filter: 'Filter',
    sortBy: 'Sort by',
    searchDoctor: 'Search for the best doctors',
    selectSpecialty: 'Select medical specialty',
    selectGovernorate: 'Select governorate',
    regionOrDoctorName: 'Region or doctor name',
    currency: 'IQD'
  },
  // Doctors List Page
  doctorsList: {
    title: 'Find the Best Doctors',
    noResults: 'No matching doctors',
    tryAgain: 'There are no doctors matching your selected filters. Please adjust your search criteria and try again.',
    filterOptions: 'Filter Options',
    specialty: 'Specialty',
    city: 'City',
    rating: 'Rating',
    price: 'Price',
    availability: 'Availability',
    availableToday: 'Available Today',
    sortOptions: {
      recommended: 'Recommended',
      rating: 'Rating (Highest)',
      priceLow: 'Price (Lowest)',
      priceHigh: 'Price (Highest)',
      availability: 'Available Today'
    },
    pagination: {
      previous: 'Previous',
      next: 'Next'
    },
    clearAll: 'Clear All',
    applyFilters: 'Apply Filters',
    resetFilters: 'Reset',
    filtersApplied: 'Filters Applied',
    resultsUpdated: 'Results have been updated based on your selections.'
  },
  // Consultation Page
  consultation: {
    title: 'Free Medical Consultations',
    subtitle: 'Ask your medical question and get answers from certified specialists',
    tabs: {
      allQuestions: 'All Questions',
      askQuestion: 'Ask a Question',
      myQuestions: 'My Questions'
    },
    askForm: {
      titleLabel: 'Question Title *',
      titlePlaceholder: 'Enter a clear and concise title for your question',
      specialtyLabel: 'Required Specialty *',
      specialtyPlaceholder: 'Select specialty',
      contentLabel: 'Question Details *',
      contentPlaceholder: 'Explain your condition in detail to help doctors provide an accurate answer...',
      notes: 'Important Notes:',
      notesList: [
        'Free consultations are for initial guidance only and do not replace a doctor\'s visit when necessary.',
        'Your personal information is subject to our privacy policy and is protected.',
        'Your question will be answered within 24-48 hours by certified doctors.'
      ],
      submit: 'Submit Question'
    },
    guidelines: {
      title: 'Consultation Guidelines',
      list: [
        'Be specific and clear in describing your condition',
        'Mention age, gender, and symptoms accurately',
        'List any medications you are currently taking',
        'Mention your medical history if relevant to the question',
        'Adhere to proper dialogue and respect for others'
      ]
    },
    answers: 'Answers',
    verified: 'Verified',
    noQuestions: 'No Questions',
    noQuestionsDesc: 'There are no questions in this specialty at the moment.',
    noMyQuestions: 'You haven\'t asked any questions yet.',
    askNow: 'Ask a Question Now',
    answered: 'Answered',
    waiting: 'Waiting for Response',
    formError: 'Form Error',
    fillAllFields: 'Please fill in all required fields.',
    questionSent: 'Question Sent Successfully',
    questionSentDesc: 'Our doctors will respond to your question as soon as possible.',
    showAll: 'All'
  },
  // Doctor Detail Page
  doctorDetail: {
    about: 'About Doctor',
    education: 'Education',
    experience: 'Experience',
    services: 'Services',
    reviews: 'Reviews',
    appointmentBooking: 'Appointment Booking',
    selectDate: 'Select Date',
    availableTimes: 'Available Times',
    noTimesAvailable: 'No times available on this day',
    selectAnotherDay: 'Please select another day',
    bookingConfirmation: 'Booking Confirmation',
    bookingSuccess: 'Booking Successful',
    bookingPending: 'Confirming your booking...'
  }
};
