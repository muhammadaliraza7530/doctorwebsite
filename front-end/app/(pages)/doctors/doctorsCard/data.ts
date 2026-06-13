export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  priceRange: string;
  rating: number;
  location: string;
  consultations: number;
  image: string;
}

export const doctorsData: Doctor[] = [
  {
    id: 1,
    name: "Dr. Matthew Ruiz",
    specialty: "BDS, MDS - Oral & Maxillofacial Surgery",
    priceRange: "$20 - $50",
    rating: 4.0,
    location: "Georgia, USA",
    consultations: 450,
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=800"
  },
  {
    id: 2,
    name: "Dr. Aisha Khan",
    specialty: "MBBS, MD - Cardiologist",
    priceRange: "$40 - $80",
    rating: 4.9,
    location: "London, UK",
    consultations: 620,
    image: "/images/navHero/Dr.AishaKhan.png"
  },
  {
    id: 3,
    name: "Dr. Carlos Gomez",
    specialty: "Dermatologist - Skin Specialist",
    priceRange: "$30 - $60",
    rating: 4.5,
    location: "Madrid, Spain",
    consultations: 280,
    image: "/images/navHero/Dr.CarlosGomez.png"
  },
  {
    id: 4,
    name: "Dr. Lisa Graham",
    specialty: "MD - Pediatrician",
    priceRange: "$35 - $70",
    rating: 4.6,
    location: "Delhi, India",
    consultations: 540,
    image: "/images/navHero/Dr.LisaGraham.png"
  },
  {
    id: 5,
    name: "Dr. Noah Bennett",
    specialty: "MBBS, MS - Orthopedic Surgeon",
    priceRange: "$45 - $90",
    rating: 4.8,
    location: "Toronto, Canada",
    consultations: 710,
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=800"
  }
];
