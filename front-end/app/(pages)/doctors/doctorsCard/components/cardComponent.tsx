'use client';

import { Star, MapPin, UserCheck } from "lucide-react";

export interface DoctorCardProps {
  image?: string;
  priceRange?: string;
  rating?: number;
  name?: string;
  specialty?: string;
  location?: string;
  consultations?: number;
  onViewProfile?: () => void;
  onBookNow?: () => void;
}

export default function CardComponent({
  image,
  priceRange,
  rating = 4.0,
  name,
  specialty,
  location,
  consultations,
  onViewProfile,
  onBookNow
}: DoctorCardProps) {
  const renderStars = () => {
    return Array.from({ length: 5 }).map((_, index) => {
      const starValue = index + 1;
      const isFilled = starValue <= Math.floor(rating);
      return (
        <Star
          key={index}
          className={`w-5 h-5 ${isFilled ? "text-[#FFC107] fill-[#FFC107]" : "text-[#E2E8F0] fill-[#E2E8F0]"}`}
        />
      );
    });
  };

  return (
    <div className="w-full max-w-[360px] mx-auto bg-white rounded-[20px] shadow-[0_4px_25px_rgba(0,0,0,0.05)] overflow-hidden border border-slate-50 font-sans select-none flex flex-col justify-between">
      <div>
        <div className="relative w-full h-[200px]">
          <img
            src={image}
            alt={name ?? "Doctor"}
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute top-[14px] right-[14px] bg-[#007BFF] text-white font-semibold text-[17px] px-[16px] py-[6px] rounded-full shadow-sm tracking-wide">
            {priceRange}
          </div>
        </div>

        <div className="p-[22px] flex flex-col">
          <div className="flex items-center gap-2 mb-[16px]">
            <div className="flex items-center gap-[3px]">
              {renderStars()}
            </div>
            <span className="bg-[#8A2BE2] text-white text-[13px] font-bold px-[10px] py-[2px] rounded-full min-w-[34px] text-center">
              {rating.toFixed(1)}
            </span>
          </div>

          <h3 className="text-[#032B5B] text-[22px] font-bold tracking-tight leading-tight mb-[6px] truncate">
            {name}
          </h3>
          <p className="text-[#64748B] text-[14px] font-normal tracking-normal min-h-[40px] line-clamp-2">
            {specialty}
          </p>

          <div className="flex items-center gap-x-4 gap-y-2 flex-wrap">
            <div className="flex items-center gap-1.5 text-[#64748B] text-[14px]">
              <MapPin className="w-4 h-4 text-[#007BFF] fill-[#007BFF]/10 stroke-[2.5]" />
              <span className="font-medium text-slate-600">{location}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#64748B] text-[14px]">
              <UserCheck className="w-4 h-4 text-[#007BFF] fill-[#007BFF]/10 stroke-[2.5]" />
              <span className="font-medium text-slate-600">{consultations} Consultations</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-[22px] pb-[22px]">
        <div className="w-full h-[1px] bg-[#EDF2F7]" />
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onViewProfile}
            className="flex-1 bg-[#01122C] text-white cursor-pointer text-[15px] font-semibold py-[11px] px-4 rounded-full hover:bg-black transition-colors duration-200 focus:outline-none"
          >
            View Profile
          </button>
          <button
            type="button"
            onClick={onBookNow}
            className="flex-1 bg-gradient-to-r from-[#007BFF] to-[#00BCD4] text-white cursor-pointer text-[15px] font-semibold py-[11px] px-4 rounded-full hover:opacity-95 transition-opacity duration-200 focus:outline-none"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
