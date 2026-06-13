'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Calendar, Clock, MapPin, CheckCircle2, Copy, CalendarCheck, FileText, ChevronLeft } from "lucide-react";

type DoctorDetails = {
  id?: string;
  name: string;
  specialty: string;
  rating: number;
  location: string;
  imageSrc: string;
  duration: string;
  fees: string;
  address: string;
};

type AppomentsFinalStepProps = {
  currentStep: number;
  onBack: () => void;
  selectedDoctor: DoctorDetails;
  userEmail?: string;
  userFullName?: string;
};

export default function AppomentsSixStep({ currentStep, onBack, selectedDoctor, userEmail, userFullName }: AppomentsFinalStepProps) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const bookingReference = "DOC-2026-98314"; // Unique custom tracking token

  const steps = [
    { id: 1, name: "Specialty", isCompleted: true },
    { id: 2, name: "Appointment Type", isCompleted: true },
    { id: 3, name: "Date & Time", isCompleted: true },
    { id: 4, name: "Basic Information", isCompleted: true },
    { id: 5, name: "Payment", isCompleted: true },
    { id: 6, name: "Confirmation", isActive: true },
  ];

  const handleCopyToken = () => {
    navigator.clipboard.writeText(bookingReference);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGoToAppointments = () => {
    if (typeof window !== "undefined") {
      const existing = typeof window !== "undefined" ? window.localStorage.getItem("appointments") : null;
      const storedAppointments = existing ? JSON.parse(existing) : [];
      const appointment = {
        id: bookingReference,
        doctorName: selectedDoctor.name,
        specialty: selectedDoctor.specialty,
        rating: selectedDoctor.rating,
        location: selectedDoctor.location,
        address: selectedDoctor.address,
        imageSrc: selectedDoctor.imageSrc,
        duration: selectedDoctor.duration,
        fees: selectedDoctor.fees,
        date: "15 October 2025",
        time: "10:00 - 11:00 AM",
      };
      const exists = storedAppointments.some((item: any) => item.id === appointment.id);
      const nextAppointments = exists ? storedAppointments : [...storedAppointments, appointment];
      window.localStorage.setItem("appointments", JSON.stringify(nextAppointments));
    }
    router.push("/my-appointments");
  };

  return (
    <div className="w-full max-w-[940px] mt-24 mx-auto bg-[#F8F9FA] rounded-[24px] p-6 sm:p-8 border border-slate-100 font-sans select-none shadow-[0_10px_40px_rgba(0,0,0,0.02)]">
      
      {/* 1. Top Stepper Header Progress Bar (Steps 1 to 5 All Completed) */}
      <div className="flex items-center justify-start gap-3 overflow-x-auto pb-3 mb-12 scrollbar-none px-1">
        {steps.map((step) => {
          const isActive = step.isActive || step.id === currentStep;
          return (
            <div key={step.id} className="min-w-[72px] flex flex-col items-center gap-1.5 text-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold transition-all ${
                  step.isCompleted
                    ? "bg-[#10B981] text-white"
                    : isActive
                    ? "bg-[#007BFF] text-white ring-4 ring-blue-100"
                    : "bg-[#E2E8F0] text-[#94A3B8]"
                }`}
              >
                {step.isCompleted ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : step.id}
              </div>
              <span
                className={`text-[11px] font-semibold tracking-tight ${
                  isActive || step.isCompleted ? "text-[#032B5B]" : "text-[#94A3B8]"
                }`}
              >
                {step.name}
              </span>
            </div>
          );
        })}
      </div>

      {/* Main Framework Box */}
      <div className="w-full bg-white rounded-[18px] border border-[#EFF2F5] p-8 shadow-sm flex flex-col items-center text-center max-w-[620px] mx-auto">
        
        {/* 2. Success Splash Animated Ring Effect */}
        <div className="w-[72px] h-[72px] bg-[#10B981]/10 rounded-full flex items-center justify-center text-[#10B981] mb-5 animate-pulse">
          <CheckCircle2 className="w-12 h-12 stroke-[2.2]" />
        </div>

        {/* Header Typography */}
        <h2 className="text-[#032B5B] text-[24px] font-extrabold tracking-tight mb-2">
          Appointment Booked Successfully!
        </h2>
        <p className="text-[#64748B] text-[14px] font-medium max-w-[460px] leading-relaxed mb-6">
          Your appointment has been confirmed. A confirmation email and SMS message have been sent to you
        </p>

        {/* 3. Booking Code Reference Copy Box */}
        <div className="w-full bg-[#F8F9FA] border border-[#EFF2F5] rounded-[12px] p-3.5 flex items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-slate-400 stroke-[2.5]" />
            <span className="text-slate-500 text-[13px] font-bold uppercase tracking-wider">Booking ID:</span>
            <span className="text-[#032B5B] text-[14px] font-extrabold font-mono tracking-tight">{bookingReference}</span>
          </div>
          <button 
            onClick={handleCopyToken}
            className={`text-[12px] font-bold px-3 py-1.5 rounded-[6px] transition-all flex items-center gap-1 ${
              copied ? "bg-[#10B981] text-white" : "bg-white border border-slate-200 text-[#007BFF] hover:bg-slate-50"
            }`}
          >
            <Copy className="w-3 h-3" />
            {copied ? "Copied" : "Copy"}
          </button>
        </div>

        {/* 4. Ticket Schedule Properties Brief Grid */}
        <div className="w-full border border-slate-100 rounded-[14px] p-5 flex flex-col gap-4 text-left bg-slate-50/50 mb-6">
          <div className="flex items-start gap-3">
            <MapPin className="w-[18px] h-[18px] text-[#007BFF] mt-0.5 shrink-0 stroke-[2.5]" />
            <div className="flex flex-col">
              <span className="text-slate-400 text-[11px] font-bold uppercase tracking-wide">Location</span>
              <span className="text-[#032B5B] text-[14px] font-bold mt-0.5">{selectedDoctor.name}</span>
              <span className="text-slate-500 text-[12px] font-medium">{selectedDoctor.address || selectedDoctor.location}</span>
            </div>
          </div>

          <div className="w-full border-t border-slate-200/60" />

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <Calendar className="w-[18px] h-[18px] text-[#00BCD4] mt-0.5 shrink-0 stroke-[2.5]" />
              <div className="flex flex-col">
                <span className="text-slate-400 text-[11px] font-bold uppercase tracking-wide">Doctor</span>
                <span className="text-[#032B5B] text-[14px] font-bold mt-0.5">{selectedDoctor.name}</span>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Clock className="w-[18px] h-[18px] text-[#00BCD4] mt-0.5 shrink-0 stroke-[2.5]" />
              <div className="flex flex-col">
                <span className="text-slate-400 text-[11px] font-bold uppercase tracking-wide">Time Slot</span>
                <span className="text-[#032B5B] text-[14px] font-bold mt-0.5">10:00 - 11:00 AM</span>
              </div>
            </div>
          </div>
        </div>

        {/* 5. Special Cash Instruction Message Box */}
        <div className="w-full bg-[#F4F9FF] border border-blue-100/70 rounded-[12px] p-4 text-left flex items-start gap-3 mb-2">
          <div className="w-2 h-2 rounded-full bg-[#007BFF] mt-1.5 shrink-0" />
          <p className="text-[#032B5B] text-[13px] font-semibold leading-relaxed">
            <strong className="text-[#007BFF]">Cash Payment Note:</strong>Please keep the total billing amount ready when checking in at the clinic counter. Kindly arrive 15 minutes before your scheduled appointment time.
          </p>
        </div>

      </div>

      {/* 6. Action Control Board (View Dashboard) */}
      <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mt-8">
        <button onClick={onBack} className="w-full sm:w-auto bg-[#01122C] text-white text-[14px] font-bold px-5 py-[12px] rounded-full hover:bg-black active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 focus:outline-none">
          <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
          Back
        </button>
        <button
          onClick={handleGoToAppointments}
          className="w-full sm:w-auto bg-gradient-to-r from-[#007BFF] to-[#00BCD4] text-white text-[14px] font-bold px-8 py-[13px] rounded-full shadow-[0_4px_15px_rgba(0,123,255,0.25)] hover:opacity-95 active:scale-[0.98] transition-all flex items-center gap-2 justify-center focus:outline-none"
        >
          <CalendarCheck className="w-4 h-4 stroke-[2.2]" />
          Go To My Appointments
        </button>
      </div>

    </div>
  );
}