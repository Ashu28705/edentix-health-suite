import heroPatient from "@/assets/hero-patient.jpg";
import clinicInterior from "@/assets/clinic-interior.jpg";
import serviceGeneral from "@/assets/service-general.jpg";
import serviceCosmetic from "@/assets/service-cosmetic.jpg";
import serviceImplants from "@/assets/service-implants.jpg";
import serviceOrtho from "@/assets/service-ortho.jpg";
import servicePediatric from "@/assets/service-pediatric.jpg";
import technology from "@/assets/technology.jpg";
import doctor1 from "@/assets/doctor-1.jpg";
import doctor2 from "@/assets/doctor-2.jpg";
import doctor3 from "@/assets/doctor-3.jpg";
import doctor4 from "@/assets/doctor-4.jpg";
import beforeImg from "@/assets/before.jpg";
import afterImg from "@/assets/after.jpg";

export const media = {
  heroPatient,
  clinicInterior,
  technology,
  beforeImg,
  afterImg,
};

export type Service = {
  slug: string;
  name: string;
  tagline: string;
  category: "General" | "Cosmetic" | "Specialised" | "Surgical" | "Urgent";
  image: string;
  description: string;
  duration: string;
  priceFrom: number;
  priceTo: number;
  recovery: string;
  procedure: { title: string; detail: string }[];
  faqs: { q: string; a: string }[];
  recommendedDoctorIds: string[];
};

export const services: Service[] = [
  {
    slug: "general-dentistry",
    name: "General Dentistry",
    tagline: "Preventive care that keeps every visit boring — in the best way.",
    category: "General",
    image: serviceGeneral,
    description:
      "Comprehensive examinations, digital X-rays, scaling and polishing designed to catch problems years before they become painful or expensive. Every general appointment at eDentix includes a full-mouth digital chart shared straight to your patient dashboard.",
    duration: "30 – 45 minutes",
    priceFrom: 2000,
    priceTo: 2500,
    recovery: "No downtime — eat and drink normally straight after.",
    procedure: [
      { title: "Digital assessment", detail: "Intra-oral scan and low-dose radiographs build a 3D record of your mouth." },
      { title: "Clinical examination", detail: "Soft tissue, gum pocket depth and bite analysis by your assigned dentist." },
      { title: "Professional cleaning", detail: "Ultrasonic scaling, air polishing and fluoride varnish." },
      { title: "Care plan", detail: "A prioritised plan with transparent pricing is published to your dashboard." },
    ],
    faqs: [
      { q: "How often should I book a check-up?", a: "Every six months for most adults; every three months if you are managing gum disease." },
      { q: "Are X-rays included?", a: "Yes — digital bitewings are included in the quoted price for new patients." },
    ],
    recommendedDoctorIds: ["d1", "d2"],
  },
  {
    slug: "cosmetic-dentistry",
    name: "Cosmetic Dentistry",
    tagline: "Smile design engineered on screen before a single tooth is touched.",
    category: "Cosmetic",
    image: serviceCosmetic,
    description:
      "Veneers, bonding and full smile makeovers planned with digital smile design. You approve a photorealistic preview of the result before treatment begins.",
    duration: "2 – 3 visits",
    priceFrom: 7999,
    priceTo: 24999,
    recovery: "24 hours of mild sensitivity; normal routine immediately.",
    procedure: [
      { title: "Smile design consult", detail: "Facial photography and a 3D mock-up of your proposed smile." },
      { title: "Preview fitting", detail: "A trial smile is bonded temporarily so you can live with the shape." },
      { title: "Preparation", detail: "Minimal-prep enamel shaping under magnification." },
      { title: "Bonding", detail: "Hand-layered ceramic veneers bonded and polished." },
    ],
    faqs: [
      { q: "How long do veneers last?", a: "Ten to fifteen years with good hygiene and a night guard where indicated." },
      { q: "Can I see the result first?", a: "Yes — the trial smile stage is standard on every eDentix cosmetic case." },
    ],
    recommendedDoctorIds: ["d2", "d3"],
  },
  {
    slug: "teeth-whitening",
    name: "Teeth Whitening",
    tagline: "Up to eight shades brighter in a single premium session.",
    category: "Cosmetic",
    image: serviceCosmetic,
    description:
      "Clinically supervised in-chair whitening paired with a custom take-home kit for maintenance. Enamel-safe formulations with desensitising pre-treatment.",
    duration: "60 – 90 minutes",
    priceFrom: 11999,
    priceTo: 13000,
    recovery: "Avoid staining foods for 48 hours.",
    procedure: [
      { title: "Shade record", detail: "Baseline photography and shade matching." },
      { title: "Desensitising prep", detail: "Potassium nitrate barrier applied to reduce sensitivity." },
      { title: "Activation cycles", detail: "Three fifteen-minute LED-activated gel cycles." },
      { title: "Home kit", detail: "Custom trays scanned and delivered within 48 hours." },
    ],
    faqs: [
      { q: "Does it hurt?", a: "Mild zinging for a few hours is normal and settles overnight." },
      { q: "Will it whiten crowns?", a: "No. Existing ceramics keep their shade, so we sequence whitening before cosmetic work." },
    ],
    recommendedDoctorIds: ["d2"],
  },
  {
    slug: "dental-implants",
    name: "Dental Implants",
    tagline: "Titanium roots placed with guided surgical precision.",
    category: "Surgical",
    image: serviceImplants,
    description:
      "Single-tooth to full-arch implant rehabilitation using CBCT-guided placement. Surgical guides are 3D printed in-house for sub-millimetre accuracy.",
    duration: "90 minutes surgery + healing phase",
    priceFrom: 9999,
    priceTo: 15999,
    recovery: "3 – 5 days of soft diet; osseointegration over 3 – 4 months.",
    procedure: [
      { title: "CBCT planning", detail: "Bone volume and nerve mapping in three dimensions." },
      { title: "Guided placement", detail: "Implant placed through a printed guide under local anaesthetic." },
      { title: "Healing phase", detail: "Temporary crown fitted while the implant integrates." },
      { title: "Final crown", detail: "Scanned, milled and bonded zirconia crown." },
    ],
    faqs: [
      { q: "Is implant surgery painful?", a: "The procedure is done under local anaesthetic; most patients take only paracetamol afterwards." },
      { q: "What is the success rate?", a: "Above 97% at ten years in healthy non-smoking patients." },
    ],
    recommendedDoctorIds: ["d4", "d1"],
  },
  {
    slug: "orthodontics",
    name: "Orthodontics",
    tagline: "Clear aligner therapy planned tooth-by-tooth.",
    category: "Specialised",
    image: serviceOrtho,
    description:
      "Invisible aligners and modern fixed appliances for adults and teenagers, with a simulated movement timeline you can scrub through before starting.",
    duration: "6 – 18 months",
    priceFrom: 45000,
    priceTo: 180000,
    recovery: "Pressure for 2 – 3 days after each aligner change.",
    procedure: [
      { title: "3D scan", detail: "Full-arch intra-oral scan, no impressions." },
      { title: "Movement simulation", detail: "Approve your final position in an interactive 3D plan." },
      { title: "Aligner series", detail: "Sequential trays changed every 7 – 10 days." },
      { title: "Retention", detail: "Fixed and removable retainers to lock in the result." },
    ],
    faqs: [
      { q: "How often are reviews?", a: "Every six weeks, with remote photo monitoring in between." },
      { q: "Can I switch from braces?", a: "Yes, hybrid plans are common and are quoted transparently." },
    ],
    recommendedDoctorIds: ["d3"],
  },
  {
    slug: "braces",
    name: "Braces",
    tagline: "Ceramic and self-ligating systems for complex movements.",
    category: "Specialised",
    image: serviceOrtho,
    description:
      "Where aligners cannot deliver, low-friction fixed appliances handle severe crowding, rotations and bite correction with fewer adjustment visits.",
    duration: "12 – 24 months",
    priceFrom: 38000,
    priceTo: 120000,
    recovery: "Soft diet for the first week after fitting.",
    procedure: [
      { title: "Records", detail: "Cephalometric and panoramic imaging." },
      { title: "Bonding", detail: "Indirect bonding tray places every bracket in one appointment." },
      { title: "Adjustments", detail: "Wire progression reviewed every 6 – 8 weeks." },
      { title: "Debond & retain", detail: "Polish, whitening option and retainer scan." },
    ],
    faqs: [
      { q: "Are ceramic brackets weaker?", a: "Modern ceramics are comparable in strength and far less visible." },
      { q: "Do I need extractions?", a: "Only where space analysis demands it; we always present a non-extraction option if viable." },
    ],
    recommendedDoctorIds: ["d3"],
  },
  {
    slug: "root-canal",
    name: "Root Canal Therapy",
    tagline: "Single-visit endodontics under a surgical microscope.",
    category: "Specialised",
    image: serviceGeneral,
    description:
      "Rotary endodontics with apex location and microscope magnification saves teeth that would otherwise be extracted — usually in one appointment.",
    duration: "60 – 90 minutes",
    priceFrom: 6000,
    priceTo: 14000,
    recovery: "Tenderness for 2 – 3 days; crown recommended within a month.",
    procedure: [
      { title: "Diagnosis", detail: "Pulp vitality testing and periapical radiograph." },
      { title: "Isolation", detail: "Rubber dam placed for a sterile field." },
      { title: "Cleaning & shaping", detail: "Rotary files with irrigation to the apex." },
      { title: "Obturation", detail: "Warm gutta-percha seal and core build-up." },
    ],
    faqs: [
      { q: "Is it more painful than an extraction?", a: "No. Most patients report it feels like a long filling." },
      { q: "Do I need a crown after?", a: "Almost always — it prevents the treated tooth from fracturing." },
    ],
    recommendedDoctorIds: ["d1", "d4"],
  },
  {
    slug: "pediatric-dentistry",
    name: "Pediatric Dentistry",
    tagline: "Calm, playful care that builds lifelong habits.",
    category: "General",
    image: servicePediatric,
    description:
      "Child-focused appointments with tell-show-do technique, sealants, fluoride programmes and habit counselling in a room designed to be un-scary.",
    duration: "30 minutes",
    priceFrom: 1500,
    priceTo: 6000,
    recovery: "None.",
    procedure: [
      { title: "Familiarisation", detail: "A no-treatment first visit is always offered." },
      { title: "Examination", detail: "Caries risk assessment and growth monitoring." },
      { title: "Prevention", detail: "Fissure sealants and fluoride varnish." },
      { title: "Parent briefing", detail: "Diet and brushing plan sent to your dashboard." },
    ],
    faqs: [
      { q: "From what age?", a: "First visit by the first birthday, or when the first tooth appears." },
      { q: "Can I stay in the room?", a: "Always — parents are welcome throughout." },
    ],
    recommendedDoctorIds: ["d2", "d3"],
  },
  {
    slug: "dental-surgery",
    name: "Dental Surgery",
    tagline: "Wisdom teeth and bone grafting with sedation options.",
    category: "Surgical",
    image: serviceImplants,
    description:
      "Surgical extractions, impacted third molars, sinus lifts and grafting performed by an oral surgeon with IV sedation available on request.",
    duration: "45 – 120 minutes",
    priceFrom: 8000,
    priceTo: 45000,
    recovery: "5 – 7 days with a structured post-operative protocol.",
    procedure: [
      { title: "Surgical planning", detail: "CBCT review of nerve proximity and root anatomy." },
      { title: "Anaesthesia", detail: "Local, oral or IV sedation depending on anxiety and complexity." },
      { title: "Procedure", detail: "Atraumatic technique to preserve bone volume." },
      { title: "Aftercare", detail: "Suture review at 7 days plus 24/7 contact line." },
    ],
    faqs: [
      { q: "Will I be asleep?", a: "IV sedation puts you in a deeply relaxed twilight state; general anaesthesia is referred out." },
      { q: "How much time off work?", a: "Plan for two days for a straightforward case." },
    ],
    recommendedDoctorIds: ["d4"],
  },
  {
    slug: "emergency-dentistry",
    name: "Emergency Dentistry",
    tagline: "Same-day relief, seven days a week.",
    category: "Urgent",
    image: serviceGeneral,
    description:
      "Reserved emergency slots at every clinic for trauma, swelling, uncontrolled pain and lost restorations. Triage happens by phone within minutes.",
    duration: "Same-day, 20 – 60 minutes",
    priceFrom: 2500,
    priceTo: 12000,
    recovery: "Depends on the definitive treatment provided.",
    procedure: [
      { title: "Phone triage", detail: "Clinical urgency scored and a slot reserved instantly." },
      { title: "Pain control", detail: "Immediate anaesthesia and drainage where indicated." },
      { title: "Stabilisation", detail: "Temporary restoration or splinting." },
      { title: "Definitive plan", detail: "Booked before you leave the chair." },
    ],
    faqs: [
      { q: "Do you treat knocked-out teeth?", a: "Yes — keep the tooth in milk and call us immediately; re-implantation is time critical." },
      { q: "Are emergency fees higher?", a: "No surcharge on weekdays; a modest out-of-hours fee applies on Sundays." },
    ],
    recommendedDoctorIds: ["d1", "d4"],
  },
];

export type Doctor = {
  id: string;
  name: string;
  specialisation: string;
  qualification: string;
  photo: string;
  experience: number;
  rating: number;
  reviews: number;
  patients: number;
  fee: number;
  gender: "Male" | "Female";
  clinicId: string;
  languages: string[];
  availableToday: boolean;
  bio: string;
  education: { year: string; item: string }[];
  awards: string[];
  timeline: { year: string; role: string; place: string }[];
  slots: string[];
};

export const doctors: Doctor[] = [
  {
    id: "d1",
    name: "Dr. Neeraj Verma",
    specialisation: "General & Restorative Dentistry",
    qualification: "BDS, MDS (Conservative Dentistry)",
    photo: doctor1,
    experience: 16,
    rating: 4.9,
    reviews: 412,
    patients: 9800,
    fee: 800,
    gender: "Male",
    clinicId: "c1",
    languages: ["English", "Hindi", "Gujarati"],
    availableToday: true,
    bio: "Dr. Neeraj Verma leads the restorative unit at eDentix Infocity. He is known for single-visit endodontics and a famously gentle injection technique, and has mentored more than sixty postgraduate residents.",
    education: [
      { year: "2006", item: "BDS — Government Dental College, Ahmedabad" },
      { year: "2010", item: "MDS Conservative Dentistry & Endodontics — KSV University" },
      { year: "2015", item: "Fellowship in Microscopic Endodontics, Singapore" },
    ],
    awards: ["Indian Dental Association Clinical Excellence 2019", "Top 40 Under 40 Clinicians, DentistryToday India"],
    timeline: [
      { year: "2010", role: "Associate Dentist", place: "Smile Studio, Ahmedabad" },
      { year: "2014", role: "Consultant Endodontist", place: "Apex Dental Institute" },
      { year: "2019", role: "Clinical Director", place: "eDentix Infocity" },
    ],
    slots: ["09:00 AM", "10:30 AM", "12:00 PM", "03:30 PM", "05:00 PM"],
  },
  {
    id: "d2",
    name: "Dr. Amrita Gogia",
    specialisation: "Cosmetic & Aesthetic Dentistry",
    qualification: "BDS, Cert. Digital Smile Design",
    photo: doctor2,
    experience: 12,
    rating: 4.8,
    reviews: 358,
    patients: 7400,
    fee: 1200,
    gender: "Female",
    clinicId: "c2",
    languages: ["English", "Hindi", "Punjabi"],
    availableToday: true,
    bio: "Dr. Amrita Gogia designs smiles digitally before touching a tooth. Her veneer cases are published in two national aesthetic journals and she runs the eDentix trial-smile protocol.",
    education: [
      { year: "2011", item: "BDS — Manipal College of Dental Sciences" },
      { year: "2016", item: "Digital Smile Design Residency — Madrid" },
      { year: "2020", item: "Advanced Ceramic Bonding — Geneva" },
    ],
    awards: ["National Aesthetic Case of the Year 2022", "Patient Choice Award 2023 & 2024"],
    timeline: [
      { year: "2011", role: "Resident", place: "Manipal Dental Hospital" },
      { year: "2016", role: "Aesthetic Consultant", place: "Lumière Dental, Mumbai" },
      { year: "2021", role: "Head of Cosmetic Unit", place: "eDentix Downtown" },
    ],
    slots: ["09:30 AM", "11:00 AM", "02:00 PM", "04:30 PM"],
  },
  {
    id: "d3",
    name: "Dr. Ekta Chadha",
    specialisation: "Orthodontics & Dentofacial Orthopaedics",
    qualification: "BDS, MDS (Orthodontics)",
    photo: doctor3,
    experience: 14,
    rating: 4.9,
    reviews: 289,
    patients: 5200,
    fee: 1000,
    gender: "Female",
    clinicId: "c1",
    languages: ["English", "Hindi", "Marathi"],
    availableToday: false,
    bio: "Dr. Ekta Chadha has finished more than 1,800 clear aligner cases and specialises in adult non-extraction treatment and paediatric growth modification.",
    education: [
      { year: "2009", item: "BDS — Nair Hospital Dental College" },
      { year: "2013", item: "MDS Orthodontics — KSV University" },
      { year: "2018", item: "Invisalign Diamond Provider certification" },
    ],
    awards: ["Invisalign Diamond Provider 2021 – 2025", "Best Paper, Indian Orthodontic Conference 2017"],
    timeline: [
      { year: "2013", role: "Orthodontist", place: "Align Dental Centre" },
      { year: "2018", role: "Senior Orthodontist", place: "Gandhinagar Ortho Clinic" },
      { year: "2022", role: "Head of Orthodontics", place: "eDentix Infocity" },
    ],
    slots: ["10:00 AM", "11:30 AM", "01:00 PM", "04:00 PM"],
  },
  {
    id: "d4",
    name: "Dr. Rohan Mehta",
    specialisation: "Oral & Maxillofacial Surgery",
    qualification: "BDS, MDS (Oral Surgery), FICOI",
    photo: doctor4,
    experience: 11,
    rating: 4.7,
    reviews: 194,
    patients: 4100,
    fee: 1500,
    gender: "Male",
    clinicId: "c3",
    languages: ["English", "Hindi", "Gujarati", "Tamil"],
    availableToday: true,
    bio: "Dr. Rohan Mehta places guided implants and manages complex third-molar surgery with IV sedation. He built the in-house 3D printing lab that produces every eDentix surgical guide.",
    education: [
      { year: "2012", item: "BDS — SRM Dental College, Chennai" },
      { year: "2017", item: "MDS Oral & Maxillofacial Surgery" },
      { year: "2021", item: "Fellowship, International Congress of Oral Implantologists" },
    ],
    awards: ["ICOI Fellowship 2021", "Implant Innovation Grant 2023"],
    timeline: [
      { year: "2017", role: "Surgical Registrar", place: "Civil Hospital, Ahmedabad" },
      { year: "2020", role: "Implant Surgeon", place: "OsseoCare Clinics" },
      { year: "2023", role: "Head of Surgery", place: "eDentix Sector 21" },
    ],
    slots: ["09:00 AM", "12:30 PM", "03:00 PM"],
  },
];

export type Clinic = {
  id: string;
  name: string;
  city: string;
  address: string;
  phone: string;
  hours: string;
  chairs: number;
  emergency: boolean;
};

export const clinics: Clinic[] = [
  {
    id: "c1",
    name: "eDentix Infocity",
    city: "Gandhinagar",
    address: "Super Mall-2, GF/22, Ground Floor, next to Cafe Coffee Day, SP-5, Infocity, Gandhinagar, Gujarat 382007",
    phone: "+91 56842 86546",
    hours: "Mon – Sat · 09:00 – 20:00",
    chairs: 8,
    emergency: true,
  },
  {
    id: "c2",
    name: "eDentix Downtown",
    city: "Ahmedabad",
    address: "3rd Floor, Iscon Emporio, Satellite Road, Ahmedabad, Gujarat 380015",
    phone: "+91 56842 86547",
    hours: "Mon – Sun · 08:00 – 21:00",
    chairs: 12,
    emergency: true,
  },
  {
    id: "c3",
    name: "eDentix Sector 21",
    city: "Gandhinagar",
    address: "Plot 44, Sector 21, Near Central Park, Gandhinagar, Gujarat 382021",
    phone: "+91 56842 86548",
    hours: "Mon – Sat · 09:30 – 19:00",
    chairs: 6,
    emergency: false,
  },
  {
    id: "c4",
    name: "eDentix Surat Ring Road",
    city: "Surat",
    address: "2nd Floor, Rahul Raj Mall, Ring Road, Surat, Gujarat 395002",
    phone: "+91 56842 86549",
    hours: "Mon – Sun · 09:00 – 20:30",
    chairs: 10,
    emergency: true,
  },
];

export const stats = [
  { label: "Happy Patients", value: 15000, suffix: "+" },
  { label: "Specialists", value: 250, suffix: "+" },
  { label: "Clinics", value: 40, suffix: "+" },
  { label: "Satisfaction", value: 99, suffix: "%" },
];

export const trustedBrands = [
  "Philips Sonicare",
  "3M Health Care",
  "Straumann",
  "Invisalign",
  "Dentsply Sirona",
  "Colgate Professional",
  "Ivoclar",
];

export const insurers = [
  "Star Health",
  "HDFC ERGO",
  "ICICI Lombard",
  "Niva Bupa",
  "Aditya Birla Health",
  "Care Health",
];

export const technologies = [
  { name: "CBCT 3D Imaging", detail: "Low-dose volumetric scans that map bone and nerve anatomy before surgery." },
  { name: "Intra-oral Scanning", detail: "Impression-free digital records captured in under four minutes." },
  { name: "In-house 3D Printing", detail: "Surgical guides and models printed overnight at the Infocity lab." },
  { name: "Laser Soft-Tissue Therapy", detail: "Diode laser contouring with minimal bleeding and faster healing." },
  { name: "Surgical Microscopy", detail: "Up to 25× magnification for endodontics and micro-restorative work." },
  { name: "AI Caries Detection", detail: "Radiograph analysis that flags early lesions a human eye can miss." },
];

export const whyChooseUs = [
  { title: "Verified specialists only", detail: "Every clinician is credential-checked, licence-verified and peer-reviewed before joining the network." },
  { title: "Transparent pricing", detail: "Published price bands on every treatment page. No quote changes at the chair." },
  { title: "One digital record", detail: "Scans, prescriptions, invoices and notes live in a single encrypted patient dashboard." },
  { title: "Never wait on hold", detail: "Real-time slot availability with instant confirmation by email and SMS." },
  { title: "Emergency capacity", detail: "Reserved same-day slots at every clinic, seven days a week." },
  { title: "Sedation available", detail: "Anxiety-led pathways including oral and IV sedation at surgical sites." },
];

export const patientJourney = [
  { step: "01", title: "Create your profile", detail: "Register in under a minute with email or phone. Your record is encrypted at rest." },
  { step: "02", title: "Find the right specialist", detail: "Filter by specialisation, experience, language, clinic, rating and live availability." },
  { step: "03", title: "Book a real slot", detail: "Live calendars prevent double-booking. Confirmation lands instantly by email and SMS." },
  { step: "04", title: "Attend your visit", detail: "Digital check-in, treatment notes written live and shared before you leave the chair." },
  { step: "05", title: "Track and pay", detail: "Prescriptions, reports and invoices download from your dashboard whenever you need them." },
];

export const testimonials = [
  {
    name: "Sarah Miller",
    role: "Verified Patient · Cosmetic",
    quote: "The trial smile stage changed everything. I saw exactly what I was buying before a single tooth was touched, and the result matched the preview precisely.",
    rating: 5,
  },
  {
    name: "Mark D'Souza",
    role: "Verified Patient · Family Care",
    quote: "Three children, one platform. Detailed profiles and honest reviews meant I found a paediatric team that my youngest actually looks forward to visiting.",
    rating: 5,
  },
  {
    name: "Emily Chen",
    role: "Verified Patient · Emergency",
    quote: "Fractured a molar at 9pm. Triage call, slot reserved, treated by 8:40 the next morning. I have never had healthcare move that fast.",
    rating: 5,
  },
  {
    name: "Rahul Iyer",
    role: "Verified Patient · Implants",
    quote: "The guided implant surgery took forty minutes and I was back at work the next day. Every cost was on screen before I agreed to anything.",
    rating: 5,
  },
];

export const faqs = [
  { q: "Do I need an account to book?", a: "Yes. An account gives you your medical history, prescriptions, invoices and reminders in one place, and lets us prevent duplicate bookings." },
  { q: "How do reminders work?", a: "Confirmation is instant. You then receive an email 24 hours before and an SMS two hours before your appointment." },
  { q: "Can I reschedule or cancel?", a: "Yes, free of charge up to six hours before your slot, directly from your dashboard." },
  { q: "Is my medical data secure?", a: "Records are encrypted in transit and at rest, and access is enforced by role — patients, doctors, receptionists and administrators each see only what they need." },
  { q: "Which payment methods are supported?", a: "Cards, UPI and net banking at the clinic, with online pre-payment available on selected treatments." },
  { q: "Do you accept insurance?", a: "We are empanelled with six major insurers and our billing team files cashless pre-authorisation on your behalf." },
];

export const blogPosts = [
  {
    slug: "new-clinic-opening-downtown",
    title: "eDentix opens its flagship Downtown clinic",
    excerpt: "Twelve chairs, two surgical suites and an in-house digital lab now live in Ahmedabad.",
    body: "Our largest site to date opens with twelve treatment rooms, two dedicated surgical suites and an on-site milling and printing lab. Same-day crowns are now possible for patients across Ahmedabad, and emergency capacity has doubled.",
    category: "Announcement",
    date: "12 July 2026",
    read: "3 min",
    image: clinicInterior,
  },
  {
    slug: "how-often-should-you-really-visit",
    title: "How often should you really see a dentist?",
    excerpt: "The six-month rule is a starting point, not a law. Here is how risk-based recall actually works.",
    body: "Recall intervals should be driven by caries risk, periodontal status and habits — not by a calendar. We explain the risk assessment we run at every check-up and what would move you to a three-month or a twelve-month interval.",
    category: "Prevention",
    date: "28 June 2026",
    read: "5 min",
    image: serviceGeneral,
  },
  {
    slug: "inside-guided-implant-surgery",
    title: "Inside a guided implant surgery",
    excerpt: "From CBCT scan to printed surgical guide to a crown in the mouth — a full case walkthrough.",
    body: "Guided surgery converts implant placement from a freehand skill into a reproducible process. We follow one case end to end, showing the planning software, the printed guide and the final restoration.",
    category: "Technology",
    date: "09 June 2026",
    read: "7 min",
    image: serviceImplants,
  },
];

export const successStories = [
  {
    name: "Sarah's journey to a brighter smile",
    detail: "A busy professional who could not find a dentist to fit her schedule booked an 8pm slot with a top-rated cosmetic specialist and finished treatment in three visits.",
  },
  {
    name: "Mark's family finds their dentist",
    detail: "Detailed profiles and verified reviews helped a family of five settle on one paediatric-friendly clinic for everybody.",
  },
  {
    name: "Emily's emergency care",
    detail: "A fractured molar at night was triaged, reserved and treated before 9am the following morning.",
  },
];

export const beforeAfterCases = [
  { title: "Composite bonding", detail: "Six upper teeth, single visit", before: beforeImg, after: afterImg },
  { title: "Whitening + veneers", detail: "Eight shades, three visits", before: beforeImg, after: afterImg },
];

/* ----- demo clinical records for dashboards ----- */

export const demoAppointments = [
  { id: "a1", date: "2026-08-12", time: "10:00 AM", doctorId: "d1", clinicId: "c1", service: "Routine Check-up", status: "Confirmed", reason: "Six-month recall" },
  { id: "a2", date: "2026-07-15", time: "10:00 AM", doctorId: "d1", clinicId: "c1", service: "Professional Cleaning", status: "Completed", reason: "Scaling" },
  { id: "a3", date: "2026-06-22", time: "02:30 PM", doctorId: "d3", clinicId: "c2", service: "Aligner Review", status: "Completed", reason: "Tray 12 fitting" },
  { id: "a4", date: "2026-05-10", time: "11:00 AM", doctorId: "d2", clinicId: "c2", service: "Teeth Whitening", status: "Completed", reason: "Shade upgrade" },
];

export const demoTreatments = [
  { date: "15 Jul 2026", treatment: "Full-mouth cleaning", tooth: "All", cost: 5000 },
  { date: "22 Jun 2026", treatment: "Composite filling", tooth: "18", cost: 4500 },
  { date: "10 May 2026", treatment: "In-chair whitening", tooth: "All", cost: 12000 },
  { date: "02 Feb 2026", treatment: "Root canal, upper right", tooth: "16", cost: 9500 },
];

export const demoInvoices = [
  { id: "INV-20260715-001", date: "15 Jul 2026", amount: 5000, status: "Paid", method: "UPI" },
  { id: "INV-20260622-002", date: "22 Jun 2026", amount: 4500, status: "Paid", method: "Card" },
  { id: "INV-20260510-003", date: "10 May 2026", amount: 12000, status: "Paid", method: "Card" },
  { id: "INV-20260812-004", date: "12 Aug 2026", amount: 2200, status: "Due", method: "—" },
];

export const demoPrescriptions = [
  { id: "RX-4411", date: "22 Jun 2026", doctorId: "d1", items: ["Amoxicillin 500mg — 1 cap, 3× daily, 5 days", "Ibuprofen 400mg — as needed, max 3× daily"], notes: "Complete the full antibiotic course." },
  { id: "RX-4285", date: "02 Feb 2026", doctorId: "d1", items: ["Chlorhexidine 0.2% rinse — 10ml, 2× daily, 7 days"], notes: "Do not rinse immediately after brushing." },
];

export const demoReports = [
  { id: "R-9021", name: "Panoramic radiograph (OPG)", date: "12 Jul 2026", size: "4.2 MB", type: "Imaging" },
  { id: "R-8890", name: "CBCT volume — lower right quadrant", date: "22 Jun 2026", size: "38.1 MB", type: "Imaging" },
  { id: "R-8712", name: "Periodontal charting", date: "15 Jul 2026", size: "220 KB", type: "Clinical" },
  { id: "R-8544", name: "Intra-oral scan STL set", date: "10 May 2026", size: "12.6 MB", type: "Digital" },
];

export const demoMessages = [
  { id: "m1", from: "Dr. Neeraj Verma", time: "2 hours ago", text: "Your radiograph looks clear. Keep flossing the lower right quadrant — I will re-check at the August visit.", unread: true },
  { id: "m2", from: "eDentix Reception", time: "Yesterday", text: "Your invoice INV-20260812-004 is ready. You can settle it at the clinic or from your dashboard.", unread: true },
  { id: "m3", from: "Dr. Ekta Chadha", time: "3 days ago", text: "Tray 13 is ready for collection. Wear tray 12 for two more nights before switching.", unread: false },
];

export const demoNotifications = [
  { id: "n1", title: "Appointment confirmed", detail: "12 Aug 2026, 10:00 AM with Dr. Neeraj Verma", time: "Just now", kind: "success" as const },
  { id: "n2", title: "SMS reminder scheduled", detail: "You will be reminded 2 hours before your visit", time: "Just now", kind: "info" as const },
  { id: "n3", title: "Invoice due", detail: "INV-20260812-004 · ₹2,200", time: "1 day ago", kind: "warning" as const },
  { id: "n4", title: "New report available", detail: "Panoramic radiograph uploaded by Dr. Verma", time: "3 days ago", kind: "info" as const },
];

/* ----- admin analytics ----- */

export const revenueSeries = [
  { month: "Feb", revenue: 1840000, appointments: 612 },
  { month: "Mar", revenue: 2110000, appointments: 688 },
  { month: "Apr", revenue: 1975000, appointments: 641 },
  { month: "May", revenue: 2420000, appointments: 742 },
  { month: "Jun", revenue: 2680000, appointments: 806 },
  { month: "Jul", revenue: 3125000, appointments: 918 },
];

export const serviceMix = [
  { name: "General", value: 34 },
  { name: "Cosmetic", value: 24 },
  { name: "Ortho", value: 19 },
  { name: "Surgical", value: 14 },
  { name: "Emergency", value: 9 },
];

export const staffDirectory = [
  { id: "s1", name: "Priya Nair", role: "Receptionist", clinicId: "c1", email: "priya@edentix.com", phone: "+91 98250 11221", status: "Active" },
  { id: "s2", name: "Vikram Shah", role: "Receptionist", clinicId: "c2", email: "vikram@edentix.com", phone: "+91 98250 11222", status: "Active" },
  { id: "s3", name: "Meera Joshi", role: "Dental Nurse", clinicId: "c1", email: "meera@edentix.com", phone: "+91 98250 11223", status: "Active" },
  { id: "s4", name: "Arjun Rana", role: "Lab Technician", clinicId: "c2", email: "arjun@edentix.com", phone: "+91 98250 11224", status: "On leave" },
  { id: "s5", name: "Fatima Sheikh", role: "Billing Executive", clinicId: "c4", email: "fatima@edentix.com", phone: "+91 98250 11225", status: "Active" },
];

export const patientDirectory = [
  { id: "p1", name: "Sarah Miller", age: 34, phone: "+91 90000 10001", lastVisit: "15 Jul 2026", clinicId: "c1", balance: 2200 },
  { id: "p2", name: "Mark D'Souza", age: 41, phone: "+91 90000 10002", lastVisit: "02 Jul 2026", clinicId: "c2", balance: 0 },
  { id: "p3", name: "Emily Chen", age: 28, phone: "+91 90000 10003", lastVisit: "28 Jun 2026", clinicId: "c2", balance: 0 },
  { id: "p4", name: "Rahul Iyer", age: 52, phone: "+91 90000 10004", lastVisit: "19 Jun 2026", clinicId: "c3", balance: 15999 },
  { id: "p5", name: "Ananya Bose", age: 23, phone: "+91 90000 10005", lastVisit: "11 Jun 2026", clinicId: "c1", balance: 0 },
  { id: "p6", name: "Imran Qureshi", age: 37, phone: "+91 90000 10006", lastVisit: "04 Jun 2026", clinicId: "c4", balance: 4500 },
];

export const inventoryItems = [
  { id: "i1", item: "Composite resin A2", qty: 42, reorder: 20, supplier: "3M Health Care", status: "Healthy" },
  { id: "i2", item: "Titanium implant 4.1mm", qty: 9, reorder: 12, supplier: "Straumann", status: "Low" },
  { id: "i3", item: "Nitrile gloves (M)", qty: 380, reorder: 150, supplier: "Medline", status: "Healthy" },
  { id: "i4", item: "Whitening gel 16%", qty: 6, reorder: 10, supplier: "Ivoclar", status: "Low" },
  { id: "i5", item: "Rotary file set", qty: 24, reorder: 10, supplier: "Dentsply Sirona", status: "Healthy" },
];

export const auditLog = [
  { id: "l1", actor: "admin@edentix.com", action: "Updated role permissions for Receptionist", target: "roles", time: "Today · 09:14" },
  { id: "l2", actor: "priya@edentix.com", action: "Created appointment #A-10442", target: "appointments", time: "Today · 08:51" },
  { id: "l3", actor: "neeraj@edentix.com", action: "Published treatment note for patient P-1024", target: "records", time: "Yesterday · 18:22" },
  { id: "l4", actor: "system", action: "Nightly encrypted backup completed", target: "system", time: "Yesterday · 02:00" },
  { id: "l5", actor: "fatima@edentix.com", action: "Marked invoice INV-20260622-002 as paid", target: "billing", time: "22 Jun · 16:40" },
];

export const rolePermissions = [
  { role: "Patient", permissions: ["Book appointments", "View own records", "Download invoices", "Message clinic"] },
  { role: "Doctor", permissions: ["View assigned schedule", "Write treatment notes", "Issue prescriptions", "View patient history"] },
  { role: "Receptionist", permissions: ["Manage all appointments", "Register patients", "Generate invoices", "Collect payments"] },
  { role: "Admin", permissions: ["Full system access", "Manage users & roles", "Manage clinics & CMS", "View audit logs & reports"] },
];

export const cmsBlocks = [
  { id: "cb1", block: "Hero headline", value: "Transform Your Smile With Confidence", page: "Home", updated: "12 Jul 2026" },
  { id: "cb2", block: "Emergency banner", value: "Same-day emergency slots · 7 days a week", page: "Global", updated: "02 Jul 2026" },
  { id: "cb3", block: "Offer strip", value: "Free Invisalign consultation this month", page: "Services", updated: "28 Jun 2026" },
  { id: "cb4", block: "Footer note", value: "© 2026 eDentix by FAT NOOB TECHNOLOGY", page: "Global", updated: "01 Jun 2026" },
];

export const specialOffers = [
  { title: "New Patient Exam & X-rays", detail: "Comprehensive examination and all necessary radiographs for first-time patients.", price: "₹1,499", tag: "New patients" },
  { title: "Teeth Whitening Package", detail: "In-office whitening session plus a custom take-home maintenance kit.", price: "₹11,999", tag: "Most booked" },
  { title: "Invisalign Consultation", detail: "Free 3D scan and suitability assessment with an orthodontist.", price: "Free", tag: "Limited" },
  { title: "Dental Implant Programme", detail: "Guided placement, healing abutment and zirconia crown bundled.", price: "₹34,999", tag: "Bundle" },
];

export const getDoctor = (id: string) => doctors.find((d) => d.id === id);
export const getClinic = (id: string) => clinics.find((c) => c.id === id);
export const getService = (slug: string) => services.find((s) => s.slug === slug);
export const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;
