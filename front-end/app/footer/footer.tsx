import Link from "next/link";
import { 
  Mail,
  Stethoscope,
  MapPin,
  Phone
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-[#008BE5] to-[#01B2D4] text-white font-sans select-none">
      {/* Upper Footer Content Container */}
      <div className="max-w-[1240px] mx-auto px-6 pt-16 pb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Column 1: Logo & About */}
        <div className="flex flex-col gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2 text-[26px] font-black tracking-wider text-white">
            DOCCURE
            <Stethoscope className="w-7 h-7 stroke-[2.5] -rotate-12 text-white/90" />
          </div>
          {/* Description */}
          <p className="text-white/85 text-[14px] leading-[24px] font-medium max-w-[280px]">
            Effortlessly schedule your medical appointments with Doccure. Connect with healthcare professionals, manage appointments & prioritize your well being
          </p>
          {/* Social Icons */}
          <div className="flex items-center gap-3 mt-2">
            {/* Social links can be added here with custom SVGs or alternative icons */}
          </div>
        </div>

        {/* Column 2: For Patients */}
        <div className="flex flex-col gap-5">
          <h3 className="text-[18px] font-bold tracking-wide">For Patients</h3>
          <ul className="flex flex-col gap-3.5 text-white/85 text-[15px] font-medium">
            <li><Link href="#" className="hover:underline hover:text-white transition-all">Search for Doctors</Link></li>
            <li><Link href="#" className="hover:underline hover:text-white transition-all">Login</Link></li>
            <li><Link href="#" className="hover:underline hover:text-white transition-all">Register</Link></li>
            <li><Link href="#" className="hover:underline hover:text-white transition-all">Booking</Link></li>
            <li><Link href="#" className="hover:underline hover:text-white transition-all">Patient Dashboard</Link></li>
          </ul>
        </div>

        {/* Column 3: For Doctors */}
        <div className="flex flex-col gap-5">
          <h3 className="text-[18px] font-bold tracking-wide">For Doctors</h3>
          <ul className="flex flex-col gap-3.5 text-white/85 text-[15px] font-medium">
            <li><Link href="#" className="hover:underline hover:text-white transition-all">Appointments</Link></li>
            <li><Link href="#" className="hover:underline hover:text-white transition-all">Chat</Link></li>
            <li><Link href="#" className="hover:underline hover:text-white transition-all">Login</Link></li>
            <li><Link href="#" className="hover:underline hover:text-white transition-all">Register</Link></li>
            <li><Link href="#" className="hover:underline hover:text-white transition-all">Doctor Dashboard</Link></li>
          </ul>
        </div>

        {/* Column 4: Our Location */}
        <div className="flex flex-col gap-5">
          <h3 className="text-[18px] font-bold tracking-wide">Our Location</h3>
          <div className="flex flex-col gap-[18px] text-white/85 text-[14px] font-medium">
            {/* Address */}
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-white fill-white/10" />
              <p className="leading-[22px]">
                3556 Beech Street, San Francisco,<br />California, CA 94108
              </p>
            </div>
            {/* Phone */}
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 flex-shrink-0 text-white fill-white/10" />
              <span>+1 315 369 5943</span>
            </div>
            {/* Email */}
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 flex-shrink-0 text-white fill-white/10" />
              <a href="mailto:doccure@example.com" className="hover:underline">doccure@example.com</a>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Copyright Bar */}
      <div className="w-full border-t border-white/20">
        <div className="max-w-[1240px] mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[14px] text-white/90 font-medium">
          <div>
            Copyright © 2024 Doccure. All Rights Reserved
          </div>
          <div className="flex items-center gap-2">
            <Link href="#" className="hover:underline">Terms and Conditions</Link>
            <span className="text-white/40">|</span>
            <Link href="#" className="hover:underline">Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}