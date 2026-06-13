"use client";

import { useRouter } from "next/navigation";
import { DoctorCardComponent } from "../doctorComponent/doctorCardComponent";

interface DoctorsCardsProps {
  searchQuery?: string;
}

const doctorsData = [
  {
    id: 1,
    name: "Dr. Michael Brown",
    specialty: "Psychologist",
    rating: 5.0,
    isAvailable: true,
    location: "Minneapolis, MN",
    duration: "30 Min",
    fees: "$650",
    imageSrc: "/images/doctoPage/Dr.MichaelBrown.png",
  },
  {
    id: 2,
    name: "Dr. Nicholas Tello",
    specialty: "Neurologist",
    rating: 4.8,
    isAvailable: true,
    location: "Houston, TX",
    duration: "45 Min",
    fees: "$800",
    imageSrc: "/images/doctoPage/Dr.NicholasTello.png",
  },
  {
    id: 3,
    name: "Dr. Harold Bryant",
    specialty: "Pediatrician",
    rating: 4.9,
    isAvailable: true,
    location: "Chicago, IL",
    duration: "20 Min",
    fees: "$450",
    imageSrc: "/images/doctoPage/Dr.HaroldBryant.png",
  },
  {
    id: 4,
    name: "Dr. Sandra Jones",
    specialty: "Cardiologist",
    rating: 4.9,
    isAvailable: true,
    location: "Chicago, IL",
    duration: "20 Min",
    fees: "$400",
    imageSrc: "/images/doctoPage/Dr.SandraJones.png",
  },
   {
    id: 5,
    name: "Dr. Charles Scott",
    specialty: "Neurologist",
    rating: 4.9,
    isAvailable: true,
    location: "Chicago, IL",
    duration: "20 Min",
    fees: "$500",
    imageSrc: "/images/doctoPage/Dr.CharlesScott.png",
  },
   {
    id: 6,
    name: "Dr. Robert Thomas",
    specialty: "Cardiologist",
    rating: 4.9,
    isAvailable: true,
    location: "Chicago, IL",
    duration: "20 Min",
    fees: "$509",
    imageSrc: "/images/doctoPage/Dr.RobertThomas.png",
  },
    {
    id: 7,
    name: "Dr. Margaret Koller",
    specialty: "Psychologist",
    rating: 4.9,
    isAvailable: true,
    location: "Chicago, IL",
    duration: "20 Min",
    fees: "$150",
    imageSrc: "/images/doctoPage/Dr.MargaretKoller.png",
  },
   {
    id: 8,
    name: "Dr. Cath Busick",
    specialty: "Psychologist",
    rating: 4.9,
    isAvailable: true,
    location: "Chicago, IL",
    duration: "20 Min",
    fees: "$750",
    imageSrc: "/images/doctoPage/Dr.CathBusick.png",
  },
   {
    id: 9,
    name: "Dr. Travis Barton",
    specialty: "Psychologist",
    rating: 4.9,
    isAvailable: true,
    location: "Chicago, IL",
    duration: "20 Min",
    fees: "$480",
    imageSrc: "/images/doctoPage/Dr.TravisBarton.png",
  },
   {
    id: 10,
    name: "Dr. Daisy Malcolm",
    specialty: "Psychologist",
    rating: 4.9,
    isAvailable: true,
    location: "Chicago, IL",
    duration: "20 Min",
    fees: "$520",
    imageSrc: "/images/doctoPage/Dr.DaisyMalcolm.png",
  },
   {
    id: 11,
    name: "Dr. Tyrone Patrick",
    specialty: "Psychologist",
    rating: 4.9,
    isAvailable: true,
    location: "Chicago, IL",
    duration: "20 Min",
    fees: "$360",
    imageSrc: "/images/doctoPage/Dr.TyronePatrick.png",
  },
 {
    id: 12,
    name: "Dr. Ann Bell",
    specialty: "Psychologist",
    rating: 4.9,
    isAvailable: true,
    location: "Chicago, IL",
    duration: "20 Min",
    fees: "$630",
    imageSrc: "/images/doctoPage/Dr.AnnBell.png",
  },
];

export default function DoctorsCards({ searchQuery }: DoctorsCardsProps) {
  const router = useRouter();

  const filteredDoctors = searchQuery?.trim()
    ? doctorsData.filter((doctor) =>
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : doctorsData;

  const handleBookNow = (doctor: any) => {
    const params = new URLSearchParams();
    params.set("doctorId", doctor.id);
    params.set("doctorName", doctor.name);
    params.set("specialty", doctor.specialty);
    params.set("rating", doctor.rating.toString());
    params.set("location", doctor.location);
    params.set("imageSrc", doctor.imageSrc);
    params.set("duration", doctor.duration);
    params.set("fees", doctor.fees);
    params.set("address", doctor.location);
    router.push(`/appoments?${params.toString()}`);
  };

  return (
    <div className="w-full bg-slate-50/50 py-12 px-4 min-h-screen animate-fade-in-up">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl m-auto justify-items-center">
        {filteredDoctors.map((doctor, index) => (
          <div
            key={doctor.id}
            className="opacity-0 animate-fade-in-up"
            style={{ animationDelay: `${index * 0.08}s` }}
          >
            <DoctorCardComponent
              imageSrc={doctor.imageSrc}
              rating={doctor.rating}
              specialty={doctor.specialty}
              isAvailable={doctor.isAvailable}
              name={doctor.name}
              location={doctor.location}
              duration={doctor.duration}
              fees={doctor.fees}
              onBookNow={() => handleBookNow(doctor)}
              onFavorite={() => console.log(`Added ${doctor.name} to favorites`)}
            />
          </div>
        ))}
      </div>
      {filteredDoctors.length === 0 && (
        <div className="max-w-6xl mx-auto mt-8 rounded-3xl border border-slate-200 bg-white p-8 text-center text-[#0F172A] shadow-sm animate-fade-in-up">
          No doctors found matching "{searchQuery}".
        </div>
      )}
    </div>
  );
}