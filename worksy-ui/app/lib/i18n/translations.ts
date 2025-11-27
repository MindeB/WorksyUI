export type Locale = 'en' | 'lt';

export const translations = {
  en: {
    // Navigation
    nav: {
      home: 'Home',
      services: 'Services',
      about: 'About',
      allServices: 'All Services',
    },

    // Service Groups
    serviceGroups: {
      interior: 'Interior Services',
      exterior: 'Exterior Services',
      lawnGarden: 'Lawn & Garden',
      additional: 'Additional Services',
    },

    // Hero Section
    hero: {
      title: 'Find the Best Professionals for Your Needs',
      subtitle: 'Connect with trusted specialists for plumbing, electrical work, remodeling, and more. Get quality service at the right price.',
      searchPlaceholder: 'What service do you need? (e.g., plumber, electrician)',
      searchButton: 'Search',
      stats: {
        specialists: 'Verified Specialists',
        categories: 'Service Categories',
        satisfaction: 'Customer Satisfaction',
      },
    },

    // Categories Section
    categories: {
      title: 'Popular Services',
      subtitle: 'Browse our most requested services and find the perfect specialist for your needs',
      viewAll: 'View All Services',
    },

    // How It Works
    howItWorks: {
      title: 'How It Works',
      subtitle: 'Finding the right professional is easy with Worksy',
      steps: {
        search: {
          title: 'Search for Service',
          description: 'Browse categories or search for the specific service you need',
        },
        compare: {
          title: 'Compare Specialists',
          description: 'View profiles, ratings, reviews, and pricing from verified professionals',
        },
        contact: {
          title: 'Contact & Book',
          description: 'Reach out to specialists, discuss your needs, and schedule a time',
        },
        done: {
          title: 'Get It Done',
          description: 'Work gets completed, you pay securely, and leave a review',
        },
      },
    },

    // Reviews Section
    reviews: {
      title: 'What Our Customers Say',
      subtitle: 'Real experiences from people who found their perfect professional',
      items: [
        {
          name: 'Sarah Johnson',
          rating: 5,
          comment: 'Found an amazing electrician through Worksy! He was professional, on time, and the pricing was transparent. Highly recommend this platform!',
          service: 'Electrical Work',
        },
        {
          name: 'Michael Chen',
          rating: 5,
          comment: 'The plumber I hired fixed my leaking pipes in no time. The whole process was seamless from booking to payment. Will definitely use again!',
          service: 'Plumbing',
        },
        {
          name: 'Emma Williams',
          rating: 4,
          comment: 'Great experience! The house cleaning service was thorough and professional. Easy to schedule and communicate with the specialist.',
          service: 'House Cleaning',
        },
        {
          name: 'David Martinez',
          rating: 5,
          comment: 'I needed my roof repaired urgently. Found a reliable specialist within hours. Quality work at a fair price. Very satisfied!',
          service: 'Roofing',
        },
        {
          name: 'Lisa Anderson',
          rating: 5,
          comment: 'The painter did an excellent job on my living room. Attention to detail was impressive. Love how easy it was to find verified professionals!',
          service: 'Painting',
        },
        {
          name: 'James Wilson',
          rating: 4,
          comment: 'Hired a landscaper for my backyard. Professional service and great results. The review system really helped me choose the right person.',
          service: 'Landscaping',
        },
      ],
    },

    // CTA Sections
    cta: {
      user: {
        title: 'Need a Professional?',
        subtitle: 'Sign up today and connect with verified specialists in your area. Get quotes, compare prices, and hire with confidence.',
        features: {
          browse: 'Browse verified professionals',
          reviews: 'Read real reviews',
          payment: 'Secure payment system',
        },
        button: 'Sign Up as User',
      },
      specialist: {
        title: 'Are You a Professional?',
        subtitle: 'Join Worksy and grow your business. Create your profile, showcase your work, and connect with customers looking for your services.',
        features: {
          customers: 'Reach new customers',
          calendar: 'Manage your calendar',
          reputation: 'Build your reputation',
        },
        button: 'Join as Specialist',
      },
    },

    // Footer
    footer: {
      message: 'Welcome to the Worksy! We are aiming to let you find the best professionals for your problem.',
    },

    // Service Pages
    service: {
      findSpecialists: 'Find Specialists',
      comingSoon: 'Specialists Coming Soon',
      comingSoonDescription: 'This service category page will display verified specialists once the API is integrated. Features will include:',
      features: {
        browse: 'Browse verified specialists',
        reviews: 'View ratings and reviews',
        pricing: 'Check availability and pricing',
        contact: 'Contact specialists directly',
        book: 'Book appointments online',
      },
      whatToExpect: 'What to Expect from {service} Specialists',
      expectations: {
        verified: {
          title: 'Verified Professionals',
          description: 'All specialists are thoroughly vetted and verified before joining our platform.',
        },
        pricing: {
          title: 'Transparent Pricing',
          description: 'Get clear quotes and compare prices before making a decision.',
        },
        reviews: {
          title: 'Real Reviews',
          description: 'Read authentic reviews from customers who have used their services.',
        },
        payments: {
          title: 'Secure Payments',
          description: 'Pay safely through our secure payment system with buyer protection.',
        },
      },
      relatedServices: 'Related Services',
      breadcrumbs: {
        home: 'Home',
        services: 'Services',
      },
    },

    // Service Group Pages
    serviceGroup: {
      descriptions: {
        interior: 'Transform your home\'s interior with our professional services',
        exterior: 'Enhance your home\'s exterior and curb appeal',
        lawnGarden: 'Create and maintain beautiful outdoor spaces',
        additional: 'Essential services for your home and property',
      },
      cantFind: 'Can\'t Find What You\'re Looking For?',
      cantFindDescription: 'Browse all available services or contact us to discuss your specific needs',
    },

    // About Page
    about: {
      title: 'About Worksy',
      description: 'Welcome to Worksy! We are dedicated to connecting you with the best professionals to solve your problems. Our platform makes it easy to find skilled experts who can help you achieve your goals.',
    },
  },

  lt: {
    // Navigation
    nav: {
      home: 'Pradžia',
      services: 'Paslaugos',
      about: 'Apie mus',
      allServices: 'Visos paslaugos',
    },

    // Service Groups
    serviceGroups: {
      interior: 'Vidaus paslaugos',
      exterior: 'Išorės paslaugos',
      lawnGarden: 'Sodo paslaugos',
      additional: 'Papildomos paslaugos',
    },

    // Hero Section
    hero: {
      title: 'Raskite geriausius specialistus savo poreikiams',
      subtitle: 'Susisiekite su patikimais specialistais santechnikos, elektros, remonto darbams ir kt. Gaukite kokybišką paslaugą už teisingą kainą.',
      searchPlaceholder: 'Kokios paslaugos jums reikia? (pvz., santechnikas, elektrikas)',
      searchButton: 'Ieškoti',
      stats: {
        specialists: 'Patikrinti specialistai',
        categories: 'Paslaugų kategorijos',
        satisfaction: 'Klientų pasitenkinimas',
      },
    },

    // Categories Section
    categories: {
      title: 'Populiarios paslaugos',
      subtitle: 'Naršykite dažniausiai užsakomas paslaugas ir raskite tobulą specialistą savo poreikiams',
      viewAll: 'Žiūrėti visas paslaugas',
    },

    // How It Works
    howItWorks: {
      title: 'Kaip tai veikia',
      subtitle: 'Su Worksy lengva rasti tinkamą specialistą',
      steps: {
        search: {
          title: 'Ieškokite paslaugos',
          description: 'Naršykite kategorijas arba ieškokite konkrečios jums reikalingos paslaugos',
        },
        compare: {
          title: 'Palyginkite specialistus',
          description: 'Peržiūrėkite profilius, įvertinimus, atsiliepimus ir kainas patikrintų profesionalų',
        },
        contact: {
          title: 'Susisiekite ir užsisakykite',
          description: 'Kreipkitės į specialistus, aptarkite savo poreikius ir susitarkite dėl laiko',
        },
        done: {
          title: 'Atlikite darbą',
          description: 'Darbas atliekamas, mokate saugiai ir palikite atsiliepimą',
        },
      },
    },

    // Reviews Section
    reviews: {
      title: 'Ką sako mūsų klientai',
      subtitle: 'Tikri atsiliepimai žmonių, kurie rado savo tobulą specialistą',
      items: [
        {
          name: 'Sarah Johnson',
          rating: 5,
          comment: 'Radau nuostabų elektriką per Worksy! Jis buvo profesionalus, punktualus, o kainos buvo skaidrios. Labai rekomenduoju šią platformą!',
          service: 'Elektros darbai',
        },
        {
          name: 'Michael Chen',
          rating: 5,
          comment: 'Santechnikas, kurį pasamdžiau, per trumpą laiką sutvarkė mano tekančias vamzdžius. Visas procesas nuo užsakymo iki mokėjimo buvo sklandus. Tikrai naudosiu vėl!',
          service: 'Santechnika',
        },
        {
          name: 'Emma Williams',
          rating: 4,
          comment: 'Puiki patirtis! Namų valymo paslauga buvo kruopšti ir profesionali. Lengva planuoti ir bendrauti su specialistu.',
          service: 'Namų valymas',
        },
        {
          name: 'David Martinez',
          rating: 5,
          comment: 'Man skubiai reikėjo suremontuoti stogą. Radau patikimą specialistą per kelias valandas. Kokybiškas darbas už teisingą kainą. Labai patenkintas!',
          service: 'Stogų darbai',
        },
        {
          name: 'Lisa Anderson',
          rating: 5,
          comment: 'Dažytojas puikiai atliko darbą mano svetainėje. Įspūdingas dėmesys detalėms. Patinka, kaip lengva buvo rasti patikrintus specialistus!',
          service: 'Dažymas',
        },
        {
          name: 'James Wilson',
          rating: 4,
          comment: 'Pasamdžiau apželdintoją savo kiemui. Profesionali paslauga ir puikūs rezultatai. Atsiliepimų sistema tikrai padėjo pasirinkti tinkamą asmenį.',
          service: 'Apželdinimas',
        },
      ],
    },

    // CTA Sections
    cta: {
      user: {
        title: 'Reikia specialisto?',
        subtitle: 'Užsiregistruokite šiandien ir susisiekite su patikrintais specialistais savo rajone. Gaukite pasiūlymus, palyginkite kainas ir samdykite su pasitikėjimu.',
        features: {
          browse: 'Naršykite patikrintus specialistus',
          reviews: 'Skaitykite tikrus atsiliepimus',
          payment: 'Saugi mokėjimo sistema',
        },
        button: 'Registruotis kaip vartotojas',
      },
      specialist: {
        title: 'Ar esate profesionalas?',
        subtitle: 'Prisijunkite prie Worksy ir auginkite savo verslą. Sukurkite profilį, parodykite savo darbus ir susisiekite su klientais, ieškanči jūsų paslaugų.',
        features: {
          customers: 'Pasiekite naujus klientus',
          calendar: 'Tvarkykite savo kalendorių',
          reputation: 'Kurkite savo reputaciją',
        },
        button: 'Prisijungti kaip specialistas',
      },
    },

    // Footer
    footer: {
      message: 'Sveiki atvykę į Worksy! Mes siekiame padėti jums rasti geriausius specialistus jūsų problemoms spręsti.',
    },

    // Service Pages
    service: {
      findSpecialists: 'Rasti specialistus',
      comingSoon: 'Specialistai netrukus',
      comingSoonDescription: 'Šis paslaugų kategorijos puslapis rodys patikrintus specialistus, kai bus integruotas API. Funkcijos apims:',
      features: {
        browse: 'Naršyti patikrintus specialistus',
        reviews: 'Peržiūrėti įvertinimus ir atsiliepimus',
        pricing: 'Tikrinti prieinamumą ir kainas',
        contact: 'Susisiekti su specialistais tiesiogiai',
        book: 'Užsisakyti vizitus internetu',
      },
      whatToExpect: 'Ko tikėtis iš {service} specialistų',
      expectations: {
        verified: {
          title: 'Patikrinti profesionalai',
          description: 'Visi specialistai yra kruopščiai patikrinti prieš prisijungiant prie mūsų platformos.',
        },
        pricing: {
          title: 'Skaidrios kainos',
          description: 'Gaukite aiškius pasiūlymus ir palyginkite kainas prieš priimdami sprendimą.',
        },
        reviews: {
          title: 'Tikri atsiliepimai',
          description: 'Skaitykite autentiškus atsiliepimus klientų, kurie naudojosi jų paslaugomis.',
        },
        payments: {
          title: 'Saugūs mokėjimai',
          description: 'Mokėkite saugiai per mūsų saugią mokėjimo sistemą su pirkėjo apsauga.',
        },
      },
      relatedServices: 'Susijusios paslaugos',
      breadcrumbs: {
        home: 'Pradžia',
        services: 'Paslaugos',
      },
    },

    // Service Group Pages
    serviceGroup: {
      descriptions: {
        interior: 'Transformuokite savo namo vidų su mūsų profesionaliomis paslaugomis',
        exterior: 'Pagerinkite savo namo išorę ir patrauklumą',
        lawnGarden: 'Kurkite ir prižiūrėkite gražias lauko erdves',
        additional: 'Būtinos paslaugos jūsų namui ir nuosavybei',
      },
      cantFind: 'Nerandate to, ko ieškote?',
      cantFindDescription: 'Naršykite visas prieinamas paslaugas arba susisiekite su mumis aptarti savo konkrečių poreikių',
    },

    // About Page
    about: {
      title: 'Apie Worksy',
      description: 'Sveiki atvykę į Worksy! Mes esame atsidavę jūsų sujungimui su geriausiais profesionalais jūsų problemoms spręsti. Mūsų platforma leidžia lengvai rasti kvalifikuotus ekspertus, kurie gali padėti pasiekti tikslus.',
    },
  },
} as const;

export type TranslationKey = keyof typeof translations.en;
