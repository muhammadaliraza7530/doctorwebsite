'use client';

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CardComponent from "./components/cardComponent";
import { doctorsData } from "./data";
import ClinicFeatures from "../clinicFeatures/clinciFeatures";
import { useScrollAnimation } from "../../../hooks/useScrollAnimation";

export default function DoctorsCard() {
  const router = useRouter();
  const { ref: sectionRef, isVisible } = useScrollAnimation();
  const visibleCount = 3;
  const [currentIndex, setCurrentIndex] = useState(0);
  const maxIndex = Math.max(0, doctorsData.length - visibleCount);

  const visibleDoctors = useMemo(
    () => doctorsData.slice(currentIndex, currentIndex + visibleCount),
    [currentIndex]
  );

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const handleViewProfile = (doctorId: number) => {
    router.push(`/Home/doctorsCard/${doctorId}`);
  };

  return (
    <>
    <div ref={sectionRef} className="w-full bg-slate-50 py-12 px-4">
      <div className={`w-full max-w-6xl mx-auto px-4 py-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between select-none ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <div className="flex flex-col gap-[10px]">
          <h2 className="text-black text-[35px] font-bold leading-tight tracking-tight">Book Our Best Doctor</h2>
          <p className="text-[#64748B] text-[16px] font-medium tracking-normal">Meet our experts & book online</p>
        </div>

        <div className="flex items-center gap-4 pb-2">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="w-11 h-11 bg-[#007BFF] rounded-[12px] rotate-45 flex items-center justify-center shadow-sm hover:bg-[#0069D9] transition-colors duration-200 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-lg"
            aria-label="Previous slide"
          >
            <ChevronLeft className="-rotate-45 text-white w-5 h-5 stroke-[2.5]" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            className="w-11 h-11 bg-[#007BFF] rounded-[12px] rotate-45 flex items-center justify-center shadow-sm hover:bg-[#0069D9] transition-colors duration-200 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-lg"
            aria-label="Next slide"
          >
            <ChevronRight className="-rotate-45 text-white w-5 h-5 stroke-[2.5]" />
          </button>
        </div>
      </div>

      <div className="w-full max-w-6xl mx-auto mt-10 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleDoctors.map((doctor, index) => (
            <div
              key={doctor.id}
              className={`${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{
                animationDelay: isVisible ? `${0.1 * (index + 1)}s` : '0s'
              }}
            >
              <CardComponent
                image={doctor.image}
                priceRange={doctor.priceRange}
                rating={doctor.rating}
                name={doctor.name}
                specialty={doctor.specialty}
                location={doctor.location}
                consultations={doctor.consultations}
                onViewProfile={() => handleViewProfile(doctor.id)}
                onBookNow={() => console.log(`Booking ${doctor.name}`)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
    <ClinicFeatures />
    </>
  )
}
