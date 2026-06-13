'use client';

import { useState } from "react";
import { ChevronRight, ChevronLeft, Star, MapPin, Check, Banknote, ShieldCheck } from "lucide-react";

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

type AppomentsStepProps = {
  onNext: () => void;
  onBack: () => void;
  selectedDoctor: DoctorDetails;
};

export default function AppomentsFifthStep({ onNext, onBack, selectedDoctor }: AppomentsStepProps) {
  // Stepper lifecycle configurations
  const steps = [
    { id: 1, name: "Specialty", isCompleted: true },
    { id: 2, name: "Appointment Type", isCompleted: true },
    { id: 3, name: "Date & Time", isCompleted: true },
    { id: 4, name: "Basic Information", isCompleted: true },
    { id: 5, name: "Payment", isActive: true },
    { id: 6, name: "Confirmation" },
  ];

  // Dynamic state for terms checkbox acknowledgement
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  // Bill items summary configuration mapping
  const paymentDetails = {
    serviceName: "Echocardiograms",
    servicePrice: 200,
    bookingFees: 20,
    tax: 18,
    discount: 15,
  };

  // Math equation calculation
  const totalAmount = 
    paymentDetails.servicePrice + 
    paymentDetails.bookingFees + 
    paymentDetails.tax - 
    paymentDetails.discount;

  return (
    <div className="w-full max-w-[940px] mt-28 mx-auto bg-[#F8F9FA] rounded-[24px] p-8 border border-slate-100 font-sans select-none shadow-[0_10px_40px_rgba(0,0,0,0.02)]">
      
      {/* 1. Top Stepper Header Progress Bar (Steps 1 to 4 Completed) */}
      <div className="flex items-center justify-center gap-2 md:gap-4 mb-10 overflow-x-auto pb-2 scrollbar-none">
        {steps.map((step, idx) => (
          <div key={step.id} className="flex items-center gap-2 shrink-0">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-[13px] font-bold transition-all ${
                  step.isCompleted
                    ? "bg-[#10B981] text-white"
                    : step.isActive
                    ? "bg-[#007BFF] text-white ring-4 ring-blue-100"
                    : "bg-[#E2E8F0] text-[#94A3B8]"
                }`}
              >
                {step.isCompleted ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : step.id}
              </div>
              <span
                className={`text-[12px] font-semibold tracking-tight ${
                  step.isActive || step.isCompleted ? "text-[#032B5B]" : "text-[#94A3B8]"
                }`}
              >
                {step.name}
              </span>
            </div>
            {idx < steps.length - 1 && (
              <div className="w-8 md:w-12 h-[1px] border-t border-dashed border-slate-200 mt-[-18px]" />
            )}
          </div>
        ))}
      </div>

      {/* Main Two-Column Panel Gateway Framework */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column (Grid: 7) - Cash Method Selection & Guidelines */}
        <div className="lg:col-span-7 bg-white rounded-[18px] border border-[#EFF2F5] p-6 shadow-sm flex flex-col gap-5">
          <h3 className="text-[#032B5B] text-[16px] font-bold tracking-tight">Payment Gateway</h3>
          
          {/* Cash on Hand Selectable Block Option */}
          <div className="w-full p-5 rounded-[12px] border-2 border-[#007BFF] bg-[#F4F9FF] flex items-start gap-4">
            <div className="w-10 h-10 bg-[#007BFF]/10 text-[#007BFF] rounded-[10px] flex items-center justify-center shrink-0">
              <Banknote className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[#032B5B] text-[15px] font-bold tracking-tight">Cash on Hand / Pay at Clinic</span>
              <p className="text-[#64748B] text-[13px] font-medium leading-relaxed">
                Koi online card details ki zaroorat nahi hai. Aap appointment ke waqt clinic counter par cash payment kar sakte hain.
              </p>
            </div>
          </div>

          {/* Quick Notice Security Badge */}
          <div className="w-full bg-slate-50 border border-slate-100 rounded-[10px] p-4 flex items-center gap-2.5 text-[#64748B] text-[13px] font-medium">
            <ShieldCheck className="w-4 h-4 text-[#10B981] shrink-0 stroke-[2.5]" />
            <span>Aapki booking instantly secure ho jayegi bina kisi pre-payment ke.</span>
          </div>

          {/* Explicit Terms & Conditions Checklist Toggler */}
          <label className="flex items-start gap-3 mt-2 cursor-pointer group">
            <input
              type="checkbox"
              checked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
              className="w-4 h-4 mt-0.5 rounded border-slate-300 text-[#007BFF] focus:ring-[#007BFF] cursor-pointer"
            />
            <span className="text-slate-500 text-[13px] font-medium leading-tight group-hover:text-slate-800 transition-colors">
              Main tasdeeq karta/karti hoon ke diye gaye saare details durust hain aur main scheduled time par clinic visit karne ke liye sehmat hoon.
            </span>
          </label>
        </div>

        {/* Right Column (Grid: 5) - Booking Summaries & Bill Info Receipt */}
        <div className="lg:col-span-5 bg-white rounded-[18px] border border-[#EFF2F5] p-6 shadow-sm flex flex-col gap-5">
          <div className="w-full bg-[#F8F9FA] rounded-[16px] border border-[#EFF2F5] p-4 flex items-start gap-4">
            <div className="relative w-[60px] h-[60px] rounded-full overflow-hidden border border-white shadow-sm bg-sky-200">
              <img
                src={selectedDoctor.imageSrc}
                alt={selectedDoctor.name}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[#032B5B] text-[15px] font-bold">{selectedDoctor.name}</span>
              <span className="text-[#4E46E5] text-[13px] font-semibold">{selectedDoctor.specialty}</span>
              <span className="text-[#64748B] text-[13px]">{selectedDoctor.duration} • {selectedDoctor.fees}</span>
            </div>
          </div>
          
          {/* Sub-block A: Booking Info Metrics */}
          <div className="flex flex-col gap-4">
            <h3 className="text-[#032B5B] text-[15px] font-bold tracking-tight">Booking Info</h3>
            
            <div className="flex flex-col gap-3 text-[14px]">
              <div className="flex flex-col">
                <span className="text-slate-400 text-[12px] font-bold uppercase tracking-wider">Date & Time</span>
                <span className="text-[#032B5B] font-bold mt-0.5">10:00 - 11:00 AM, 15, Oct 2025</span>
              </div>
              <div className="flex flex-col">
                <span className="text-slate-400 text-[12px] font-bold uppercase tracking-wider">Appointment Type</span>
                <span className="text-[#032B5B] font-bold mt-0.5">Clinic (Wellness Path)</span>
              </div>
            </div>
          </div>

          {/* Horizontal Decorative Separator */}
          <div className="w-full border-t border-slate-100 my-1" />

          {/* Sub-block B: Detailed Statement Pricing Structure */}
          <div className="flex flex-col gap-4">
            <h3 className="text-[#032B5B] text-[15px] font-bold tracking-tight">Payment Info</h3>
            
            <div className="flex flex-col gap-2.5 text-[14px] font-semibold text-[#032B5B]">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-medium">{paymentDetails.serviceName}</span>
                <span>${paymentDetails.servicePrice}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-medium">Booking Fees</span>
                <span>${paymentDetails.bookingFees}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-medium">Tax</span>
                <span>${paymentDetails.tax}</span>
              </div>
              <div className="flex justify-between items-center text-red-500">
                <span className="font-medium">Discount</span>
                <span>-${paymentDetails.discount}</span>
              </div>
            </div>
          </div>

          {/* Dynamic Calculated Grand Total Section Box */}
          <div className="w-full bg-[#007BFF] text-white rounded-[12px] p-4 mt-2 flex items-center justify-between shadow-[0_4px_14px_rgba(0,123,255,0.25)]">
            <span className="text-[16px] font-bold">Total</span>
            <span className="text-[22px] font-extrabold tracking-tight">${totalAmount}</span>
          </div>

        </div>

      </div>

      {/* 5. Bottom Control Footer Navigation Action Bar */}
      <div className="w-full flex items-center justify-between gap-4 mt-6 pt-2">
        <button onClick={onBack} className="bg-[#01122C] text-white text-[14px] font-bold px-5 py-[12px] rounded-full hover:bg-black active:scale-[0.98] transition-all flex items-center gap-1.5 focus:outline-none">
          <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
          Back
        </button>
        <button
          onClick={() => {
            if (agreeToTerms) onNext();
          }}
          disabled={!agreeToTerms}
          className={`bg-gradient-to-r from-[#007BFF] to-[#00BCD4] text-white text-[14px] font-bold px-6 py-[12px] rounded-full shadow-[0_4px_12px_rgba(0,123,255,0.2)] active:scale-[0.98] transition-all flex items-center gap-1.5 focus:outline-none ${
            !agreeToTerms ? "opacity-50 cursor-not-allowed" : "hover:opacity-95"
          }`}
        >
          Confirm & Book
          <ChevronRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>

    </div>
  );
}