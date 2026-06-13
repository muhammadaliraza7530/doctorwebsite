import Image from 'next/image';
import BackgroundImage from './backgroundImage/backgroundImage';
import HeroSearch from './heroSearchbar/heroSearch';
import DoctorsCard from '../../doctors/doctorsCard/doctorsCard';

export default function HeroSection() {
  return (
    <>
    <main className="relative w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10 h-[85vh]">
        <BackgroundImage />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 md:py-16 lg:py-20 min-h-[85vh] flex items-center">
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid gap-6 md:gap-10 grid-cols-1 lg:grid-cols-[1fr_1fr] items-center">
            <div className="flex flex-col justify-center">
              <div className="text-center lg:text-left mb-8 md:mb-10">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[42px] font-bold text-blue-400 mb-4 tracking-tight drop-shadow-lg animate-fade-in-up">
                  Search Doctor,
                  <br />
                  <span className="text-black">Make an Appointment</span>
                </h1>
                <p className="text-black text-base sm:text-lg md:text-[16px] max-w-xl mx-auto lg:mx-0 mt-6 drop-shadow-md animate-fade-in-up animate-stagger-1">
                  Access to expert physicians and surgeons, advanced technologies
                  and top-quality surgery facilities right here.
                </p>
              </div>
              <div className="w-full max-w-sm mx-auto lg:mx-0 animate-fade-in-up animate-stagger-2">
                <HeroSearch />
              </div>
            </div>

            <div className="hidden lg:flex justify-center lg:justify-end animate-slide-in-right">
              <div className="relative w-full max-w-sm h-96">
                <Image
                  src="/images/navHero/doctor.png"
                  alt="Doctor"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <DoctorsCard />
    </>
  )
}
