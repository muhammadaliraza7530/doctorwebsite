'use client';

import { useState } from "react";
import { ChevronRight, ChevronLeft, Star, MapPin, Check, Building2, Video, Phone, MessageSquare, Home } from "lucide-react";

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
  currentStep: number;
  onNext: () => void;
  onBack: () => void;
  selectedDoctor: DoctorDetails;
};

export default function AppomentsSecondStep({ currentStep, onNext, onBack, selectedDoctor }: AppomentsStepProps) {
  // Active Appointment Type State (Default: Clinic)
  const [selectedType, setSelectedType] = useState<string>("Clinic");
  // Selected Clinic List State (Default: Vitalplus Clinic)
  const [selectedClinic, setSelectedClinic] = useState<number>(2);

  const steps = [
    { id: 1, name: "Specialty", isCompleted: true },
    { id: 2, name: "Appointment Type", isActive: true },
    { id: 3, name: "Date & Time" },
    { id: 4, name: "Basic Information" },
    { id: 5, name: "Payment" },
    { id: 6, name: "Confirmation" },
  ];

  const appointmentTypes = [
    { id: "Clinic", name: "Clinic", icon: Building2 },
    { id: "Video", name: "Video Call", icon: Video },
    { id: "Audio", name: "Audio Call", icon: Phone },
    { id: "Chat", name: "Chat", icon: MessageSquare },
    { id: "Home", name: "Home Visit", icon: Home },
  ];

  const clinics = [
    { id: 1, name: "AllCare Family Medicine", address: "3343 Private Lane, Valdosta", distance: "500 Meters", logoBg: "bg-teal-100 text-teal-600" },
    { id: 2, name: "Vitalplus Clinic", address: "4223 Pleasant Hill Road, Miami, FL 33169", distance: "12 KM", logoBg: "bg-rose-100 text-rose-600" },
    { id: 3, name: "Wellness Path Chiropractic", address: "8190 Spring Avenue, Austin, TX 78701", distance: "15 KM", logoBg: "bg-blue-100 text-blue-600" },
  ];

  return (
    <div className="w-full max-w-[940px] mt-24 mx-auto bg-[#F8F9FA] rounded-[24px] p-6 sm:p-8 border border-slate-100 font-sans select-none shadow-[0_10px_40px_rgba(0,0,0,0.02)]">
      
      {/* 1. Top Stepper Progress Bar (Step 1 Completed Checkmark) */}
      <div className="flex items-center justify-start gap-3 overflow-x-auto pb-3 mb-10 scrollbar-none px-1">
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

      {/* Main Framework Content Panel */}
      <div className="w-full bg-white rounded-[18px] border border-[#EFF2F5] p-6 shadow-sm flex flex-col gap-6">
        
        {/* 2. Doctor Identity Element */}
        <div className="w-full bg-[#F8F9FA] rounded-[16px] border border-[#EFF2F5] p-5 flex flex-col sm:flex-row items-start gap-4">
          <div className="relative w-[75px] h-[75px] rounded-full overflow-hidden border-2 border-white shadow-sm shrink-0 bg-sky-200">
            <img
              src={selectedDoctor.imageSrc}
              alt={selectedDoctor.name}
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-[#032B5B] text-[18px] font-bold tracking-tight">
                {selectedDoctor.name}
              </h2>
              <span className="bg-[#E04F16] text-white text-[11px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5 shadow-sm">
                <Star className="w-2.5 h-2.5 fill-current stroke-none" /> {selectedDoctor.rating.toFixed(1)}
              </span>
            </div>
            <span className="text-[#4E46E5] text-[13px] font-semibold">{selectedDoctor.specialty}</span>
            <div className="flex items-center gap-1 text-[#64748B] text-[13px] font-medium mt-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400 stroke-[2.5]" />
              <span>{selectedDoctor.address || selectedDoctor.location}</span>
            </div>
          </div>
        </div>

        {/* 3. Appointment Type Selector Block */}
        <div className="flex flex-col gap-3 mt-1">
          <h3 className="text-[#032B5B] text-[15px] font-bold">Select Appointment Type</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {appointmentTypes.map((type) => {
              const IconComponent = type.icon;
              const isSelected = selectedType === type.id;
              return (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`flex flex-col items-center justify-center gap-2 py-4 px-3 rounded-[12px] border-2 transition-all ${
                    isSelected
                      ? "border-[#007BFF] bg-[#F4F9FF] text-[#007BFF]"
                      : "border-[#E2E8F0] bg-white text-slate-700 hover:border-slate-300"
                  }`}
                >
                  <IconComponent className={`w-5 h-5 ${isSelected ? "stroke-[2.5]" : "stroke-[2]"}`} />
                  <span className="text-[13px] font-bold tracking-tight">{type.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. Clinics List Array (Conditionally Shown for Clinic Type) */}
        {selectedType === "Clinic" && (
          <div className="flex flex-col gap-3 mt-1">
            <h3 className="text-[#032B5B] text-[15px] font-bold">Select Clinics</h3>
            <div className="flex flex-col gap-3">
              {clinics.map((clinic) => {
                const isClinicSelected = selectedClinic === clinic.id;
                return (
                  <div
                    key={clinic.id}
                    onClick={() => setSelectedClinic(clinic.id)}
                    className={`p-4 rounded-[12px] border-2 cursor-pointer transition-all flex items-center justify-between gap-4 ${
                      isClinicSelected
                        ? "border-[#007BFF] bg-[#F4F9FF]"
                        : "border-[#E2E8F0] bg-white hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {/* Placeholder Clinic Custom Round Logo */}
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-[12px] shrink-0 ${clinic.logoBg}`}>
                        {clinic.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[#032B5B] text-[14px] font-bold tracking-tight">
                          {clinic.name}
                        </span>
                        <div className="flex items-center gap-1.5 text-[#64748B] text-[12px] font-semibold flex-wrap">
                          <span>{clinic.address}</span>
                          <span className="text-blue-500 font-extrabold text-[14px]">•</span>
                          <span className="text-blue-500">{clinic.distance}</span>
                        </div>
                      </div>
                    </div>
                    {/* Blue Round Check Indicator Custom Module */}
                    <div className={`w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center transition-all ${
                      isClinicSelected 
                        ? "border-[#007BFF] bg-[#007BFF] text-white" 
                        : "border-slate-300 bg-white"
                    }`}>
                      {isClinicSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>

      {/* 5. Bottom Navigation Action Controllers */}
      <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mt-6 pt-2">
        <button onClick={onBack} className="w-full sm:w-auto bg-[#01122C] text-white text-[14px] font-bold px-5 py-[12px] rounded-full hover:bg-black active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 focus:outline-none">
          <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
          Back
        </button>
        <button onClick={onNext} className="w-full sm:w-auto bg-gradient-to-r from-[#007BFF] to-[#00BCD4] text-white text-[14px] font-bold px-5 py-[12px] rounded-full hover:opacity-95 shadow-[0_4px_12px_rgba(0,123,255,0.2)] active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 focus:outline-none">
          Select Date & Time
          <ChevronRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>

    </div>
  );
}