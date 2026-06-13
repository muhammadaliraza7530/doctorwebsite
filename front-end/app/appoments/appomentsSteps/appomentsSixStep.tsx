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
  const [sending, setSending] = useState(false);
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

  const handleGoToAppointments = async () => {
    setSending(true);
    
    try {
      // Send appointment confirmation email if user email is available
      if (userEmail && userFullName) {
        const response = await fetch("/api/send-appointment-confirmation", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userEmail: userEmail,
            userFullName: userFullName,
            bookingReference: bookingReference,
            doctorName: selectedDoctor.name,
            doctorSpecialty: selectedDoctor.specialty,
            doctorRating: selectedDoctor.rating,
            doctorLocation: selectedDoctor.location,
            doctorAddress: selectedDoctor.address,
            appointmentDate: "15 October 2025",
            appointmentTime: "10:00 - 11:00 AM",
            duration: selectedDoctor.duration,
            fees: selectedDoctor.fees,
          }),
        });

        if (!response.ok) {
          console.warn("Failed to send appointment email, but continuing...");
        }
      }

      // Save to localStorage
      if (typeof window !== "undefined") {
        const existing = window.localStorage.getItem("appointments");
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
    } catch (error) {
      console.error("Error in appointment confirmation:", error);
      // Still navigate even if there's an error
      router.push("/my-appointments");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="w-full max-w-[980px] mt-28 mx-auto bg-[#F8F9FA] rounded-[24px] px-4 py-6 sm:px-6 sm:py-8 border border-slate-100 font-sans select-none shadow-[0_10px_40px_rgba(0,0,0,0.02)] animate-fade-in-up">
      
      {/* 1. Top Stepper Header Progress Bar (Steps 1 to 5 All Completed) */}
      <div className="flex items-center justify-start gap-2 md:gap-4 mb-12 overflow-x-auto pb-2 scrollbar-none">
        {steps.map((step, idx) => {
          const isCompleted = step.id < currentStep;
          const isActive = step.id === currentStep;
          return (
            <div key={step.id} className="flex items-center gap-2 shrink-0">
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-[13px] font-bold transition-all ${
                    isCompleted
                      ? "bg-[#10B981] text-white"
                      : isActive
                      ? "bg-[#007BFF] text-white ring-4 ring-blue-100"
                      : "bg-[#E2E8F0] text-[#94A3B8]"
                  }`}
                >
                  {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : step.id}
                </div>
                <span
                  className={`text-[12px] font-semibold tracking-tight ${
                    isActive || isCompleted ? "text-[#032B5B]" : "text-[#94A3B8]"
                  }`}
                >
                  {step.name}
                </span>
            </div>
            {idx < steps.length - 1 && (
              <div className="w-8 md:w-12 h-[1px] border-t border-dashed border-slate-200 mt-[-18px]" />
            )}
          </div>
          );
        })}
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
            <strong className="text-[#007BFF]">Cash Payment Note:</strong> Kirya clinic counter par check-in karte waqt total billing amount ready rakhein. Appointment time se 15 minute pehle pohnchein.
          </p>
        </div>

      </div>

      {/* 6. Action Control Board (View Dashboard) */}
      <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mt-8">
        <button onClick={onBack} className="bg-[#01122C] text-white text-[14px] font-bold px-5 py-[12px] rounded-full hover:bg-black active:scale-[0.98] transition-all flex items-center gap-1.5 focus:outline-none">
          <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
          Back
        </button>
        <button
          onClick={handleGoToAppointments}
          disabled={sending}
          className="w-full sm:w-auto bg-gradient-to-r from-[#007BFF] to-[#00BCD4] text-white text-[14px] font-bold px-8 py-[13px] rounded-full shadow-[0_4px_15px_rgba(0,123,255,0.25)] hover:opacity-95 active:scale-[0.98] transition-all flex items-center gap-2 justify-center focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <CalendarCheck className="w-4 h-4 stroke-[2.2]" />
          {sending ? "Sending Confirmation..." : "Go To My Appointments"}
        </button>
      </div>

    </div>
  );
}