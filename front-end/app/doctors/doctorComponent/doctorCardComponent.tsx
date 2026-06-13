"use client";

import { Heart, MapPin, Calendar, Star } from "lucide-react";
import Image from "next/image";

// 1. Reusable TypeScript Props Interface
interface DoctorCardProps {
  imageSrc: string;
  rating?: number;
  specialty: string;
  isAvailable: boolean;
  name: string;
  location: string;
  duration: string;
  fees: string;
  onBookNow?: (doctor: { imageSrc: string; rating?: number; specialty: string; isAvailable: boolean; name: string; location: string; duration: string; fees: string }) => void;
  onFavorite?: () => void;
}

// 2. Pixel-Perfect Child Card Component
export function DoctorCardComponent({
  imageSrc,
  rating,
  specialty,
  isAvailable,
  name,
  location,
  duration,
  fees,
  onBookNow,
  onFavorite,
}: DoctorCardProps) {
  return (
    <div className="w-[280px] bg-white rounded-[16px] shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-slate-100 overflow-hidden font-sans flex flex-col justify-between select-none">
      
      {/* Upper Section: Image & Floating Badges */}
      <div className="relative w-full h-[210px] bg-[#EBEFEF]">
        <img
          src={imageSrc}
          alt={name}
          className="w-full h-full object-cover object-top"
        />
        
        {/* Floating Star Rating Badge (Top Left) */}
        <div className="absolute top-[12px] left-[12px] bg-[#E04F16] text-white text-[13px] font-bold px-[8px] py-[3px] rounded-[6px] flex items-center gap-1 shadow-sm">
            <Star className="w-3.5 h-3.5 fill-current stroke-none" />
            <span>{typeof rating === "number" ? rating.toFixed(1) : "N/A"}</span>
          </div>
        {/* Floating Heart Button (Top Right) */}
        <button
          onClick={onFavorite}
          className="absolute top-[12px] right-[12px] w-9 h-9 bg-white text-slate-300 hover:text-red-500 rounded-full flex items-center justify-center shadow-md active:scale-95 transition-all duration-200 focus:outline-none"
        >
          <Heart className="w-[18px] h-[18px] stroke-[2.5]" />
        </button>
      </div>

      {/* Middle Section: Doctor Essential Details */}
      <div className="p-3 flex flex-col flex-1">
        
        {/* Specialty & Availability Row */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[#4E46E5] text-[13px] font-semibold tracking-wide">
            {specialty}
          </span>
          {isAvailable && (
            <span className="bg-[#EBFDF5] text-[#10B981] text-[11px] font-semibold px-[10px] py-[3px] rounded-[6px] flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-[#10B981] rounded-full" />
              Available
            </span>
          )}
        </div>

        {/* Doctor Name */}
        <h3 className="text-[#032B5B] text-[17px] font-bold tracking-tight mb-1.5 truncate">
          {name}
        </h3>

        {/* Location & Time Info */}
        <div className="flex items-center gap-2 text-[#64748B] text-[13px] font-medium mb-2">
          <div className="flex items-center gap-1 max-w-[160px] truncate">
            <MapPin className="w-3 h-3 text-slate-400 stroke-[2.5]" />
            <span>{location}</span>
          </div>
          <span className="text-blue-500 font-bold text-[16px]">•</span>
          <div className="flex items-center gap-1 shrink-0">
            <span>{duration}</span>
          </div>
        </div>

        {/* Dashed Separator Line */}
        <div className="w-full border-t border-dashed border-[#E2E8F0] my-2" />

        {/* Footer Section: Fees & Book Button */}
        <div className="flex items-center justify-between gap-2 pt-2">
          <div className="flex flex-col">
            <span className="text-[#64748B] text-[13px] font-medium">Consultation Fees</span>
            <span className="text-[#E04F16] text-[22px] font-extrabold leading-tight">
              {fees}
            </span>
          </div>
          
          <button
            onClick={() => onBookNow?.({ imageSrc, rating, specialty, isAvailable, name, location, duration, fees })}
            className="bg-[#01122C] hover:bg-black text-white text-[12px] font-bold px-[15px] py-[8px] rounded-full flex items-center gap-2 shadow-sm transition-colors duration-200 focus:outline-none shrink-0"
          >
            <Calendar className="w-4 h-4 stroke-[2.5]" />
            Book Now
          </button>
        </div>

      </div>
    </div>
  );
}

// 3. Main Export Component (With Array of Objects Mapping)
export default function DoctorsCatalogSection() {
  
  // Array of objects jahan se data easily loop ho raha hai
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
      imageSrc: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400", // Default doctor photo
    },
    {
      id: 2,
      name: "Dr. Sophia Martinez",
      specialty: "Neurologist",
      rating: 4.8,
      isAvailable: true,
      location: "Houston, TX",
      duration: "45 Min",
      fees: "$800",
      imageSrc: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400",
    },
    {
      id: 3,
      name: "Dr. David Warner",
      specialty: "Pediatrician",
      rating: 4.9,
      isAvailable: true,
      location: "Chicago, IL",
      duration: "20 Min",
      fees: "$450",
      imageSrc: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400",
    }
  ];

  return (
    <div className="w-full bg-slate-50/50 py-12 px-4 min-h-screen">
      {/* Grid structure to neatly organize the cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-[1300px] mx-auto justify-items-center">
        
        {doctorsData.map((doctor) => (
          <DoctorCardComponent
            key={doctor.id}
            imageSrc={doctor.imageSrc}
            rating={doctor.rating}
            specialty={doctor.specialty}
            isAvailable={doctor.isAvailable}
            name={doctor.name}
            location={doctor.location}
            duration={doctor.duration}
            fees={doctor.fees}
            onBookNow={() => console.log(`Booking session with ${doctor.name}`)}
            onFavorite={() => console.log(`Added ${doctor.name} to favorites`)}
          />
        ))}

      </div>
    </div>
  );
}