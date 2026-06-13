"use client";

import Image from "next/image";

interface ClinicFeaturesCardProps {
  title: string;
  imageSrc: string;
  onClick?: () => void;
}

export default function ClinicFeaturesCard({
  title,
  imageSrc,
  onClick,
}: ClinicFeaturesCardProps) {
  return (
    <div className="relative w-[260px] h-[280px] rounded-[24px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-[#EBF4FA] group select-none hover:shadow-[0_16px_45px_rgb(0,123,255,0.15)] transition-all duration-300">
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={imageSrc}
          alt={title}
          fill
          sizes="340px"
          priority
          className="object-cover object-center transition-transform duration-500 group-hover:scale-110 w-5"
        />
        <div className="absolute inset-0 bg-white/5 pointer-events-none" />
      </div>

      <div className="absolute inset-x-0 bottom-0 p-6 flex justify-center z-10">
        <button
          type="button"
          onClick={onClick}
          className="w-full max-w-[240px] bg-[#007BFF] text-white text-[18px] font-semibold py-[8px] px-4 rounded-[20px] shadow-[0_4px_14px_rgba(0,123,255,0.3)] hover:bg-[#0069D9] hover:shadow-[0_8px_20px_rgba(0,123,255,0.4)] active:scale-[0.98] transition-all duration-200 text-center tracking-wide focus:outline-none"
        >
          {title}
        </button>
      </div>
    </div>
  );
}
