import Image from 'next/image';
import BackgroundImage from './backgroundImage/backgroundImage';
import HeroSearch from './heroSearchbar/heroSearch';
import DoctorsCard from '../../doctors/doctorsCard/doctorsCard';

export default function HeroSection() {
  return (
    <>
    <main className="relative h-[85vh] w-full">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <BackgroundImage />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24 lg:py-22">
        <div className="max-w-5xl mx-auto grid gap-10 lg:grid-cols-[0.95fr_1fr] items-center">
          <div className="lg:pr-10">
            <div className="text-center lg:text-left mb-12 md:mb-5">
              <h1 className="text-4xl md:text-5xl lg:text-[42px] font-bold text-blue-400 mb-4 tracking-tight drop-shadow-lg">
                Search Doctor,
                <br />
                <span className="text-black">Make an Appointment</span>
              </h1>
              <p className="text-black text-lg md:text-[16px] max-w-2xl mx-auto lg:mx-0 mt-6 drop-shadow-md">
                Access to expert physicians and surgeons, advanced technologies
                and top-quality surgery facilities right here.
              </p>
            </div>
                  <HeroSearch />
          </div>

          <div className=" justify-center lg:justify-end">
            <div className="relative w-full max-w-105">
                  <div className="relative h-120 w-100 overflow-hidden">
                    <Image
                      src="/images/navHero/doctor.png"
                      alt="Doctor"
                      fill
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
