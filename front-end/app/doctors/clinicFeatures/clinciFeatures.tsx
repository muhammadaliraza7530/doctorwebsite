import Image from "next/image";
import ClinicFeaturesList from "./clinicComponents/ClinicFeaturesList";

export default function ClinicFeatures() {
  return (
    <div className="relative w-full overflow-hidden select-none">
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/navHero/Background.png" 
          alt="Background" 
          fill
          priority
          className="object-cover object-center" 
        />
      </div>

      <div className="relative z-10 w-full bg-slate-50/10 backdrop-blur-[2px] py-16 px-4">
        <div className="w-full max-w-6xl mx-auto px-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-[10px]">
            <h2 className="text-black text-[35px] sm:text-[40px] font-bold leading-tight tracking-tight drop-shadow-sm">
              Book Our Best Doctor
            </h2>
          </div>
        </div>
        <ClinicFeaturesList />
      </div>
    </div>
  );
}