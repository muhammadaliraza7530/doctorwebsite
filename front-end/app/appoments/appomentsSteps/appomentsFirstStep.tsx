'use client';

import { useState } from "react";
import { ChevronRight, ChevronLeft, Star, MapPin, Check } from "lucide-react";

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

export default function AppomentsFirstStep({ currentStep, onNext, onBack, selectedDoctor }: AppomentsStepProps) {
  const [selectedService, setSelectedService] = useState<number>(1);
   
  const steps = [
    { id: 1, name: "Specialty" },
    { id: 2, name: "Appointment Type" },
    { id: 3, name: "Date & Time" },
    { id: 4, name: "Basic Information" },
    { id: 5, name: "Payment" },
    { id: 6, name: "Confirmation" },
  ];
 
  const services = [
    { id: 1, name: "Echocardiograms", price: "$310" },
    { id: 2, name: "Stress tests", price: "$754" },
    { id: 3, name: "Stress tests", price: "$754" },
    { id: 4, name: "Heart Catheterization", price: "$150" },
    { id: 5, name: "Echocardiograms", price: "$200" },
    { id: 6, name: "Echocardiograms", price: "$200" },
  ];

  return (
    <div className="w-full max-w-[940px] mt-24 mx-auto bg-[#F8F9FA] rounded-[24px] p-6 sm:p-8 border border-slate-100 font-sans select-none shadow-[0_10px_40px_rgba(0,0,0,0.02)]">
      
      {/* 1. Top Horizontal Stepper Progress Bar */}
      <div className="flex items-center justify-start gap-3 overflow-x-auto pb-3 mb-10 scrollbar-none px-1">
        {steps.map((step) => {
          const isActive = step.id === currentStep;
          return (
            <div key={step.id} className="min-w-[72px] flex flex-col items-center gap-1.5 text-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold transition-all ${
                  isActive
                    ? "bg-[#007BFF] text-white ring-4 ring-blue-100"
                    : "bg-[#E2E8F0] text-[#94A3B8]"
                }`}
              >
                {step.id}
              </div>
              <span
                className={`text-[11px] font-semibold tracking-tight ${
                  isActive ? "text-[#032B5B]" : "text-[#94A3B8]"
                }`}
              >
                {step.name}
              </span>
            </div>
          );
        })}
      </div>

      {/* Main Framework Board */}
      <div className="w-full bg-white rounded-[18px] border border-[#EFF2F5] p-6 shadow-sm flex flex-col gap-6">
        
        {/* 2. Doctor Brief Card Section */}
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
              <span>{selectedDoctor.location} - {selectedDoctor.address}</span>
            </div>
          </div>
        </div>

        {/* 3. Dropdown Menu (Select Specialty) */}
        <div className="flex flex-col gap-2 mt-2">
          <label className="text-[#032B5B] text-[14px] font-bold">Select Specialty</label>
          <div className="relative w-full">
            <select className="w-full bg-white border border-[#E2E8F0] text-[#032B5B] text-[14px] font-semibold px-4 py-[13px] rounded-[10px] appearance-none focus:outline-none focus:border-blue-500 transition-colors cursor-pointer">
              <option>Cardiology</option>
              <option>Neurology</option>
              <option>Psychology</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
              <ChevronRight className="w-4 h-4 rotate-90 stroke-[2.5]" />
            </div>
          </div>
        </div>

        {/* 4. Medical Services Grid Array Selection */}
        <div className="flex flex-col gap-4 mt-2">
          <h3 className="text-[#032B5B] text-[16px] font-bold tracking-tight">Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service) => {
              const isSelected = selectedService === service.id;
              return (
                <div
                  key={service.id}
                  onClick={() => setSelectedService(service.id)}
                  className={`relative p-4 rounded-[12px] border-2 cursor-pointer transition-all flex flex-col gap-1 justify-between min-h-[82px] ${
                    isSelected
                      ? "border-[#007BFF] bg-[#F4F9FF]"
                      : "border-[#E2E8F0] bg-white hover:border-slate-300"
                  }`}
                >
                  <div className="flex flex-col gap-1 pr-6">
                    <span className="text-[#032B5B] text-[14px] font-bold tracking-tight leading-snug">
                      {service.name}
                    </span>
                    <span className="text-[#64748B] text-[13px] font-semibold">
                      {service.price}
                    </span>
                  </div>
                  {/* Dynamic Blue Checked Dot status */}
                  {isSelected && (
                    <div className="absolute top-4 right-4 w-[18px] h-[18px] bg-[#007BFF] text-white rounded-[4px] flex items-center justify-center shadow-sm">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* 5. Bottom Navigation Action Buttons Bar */}
      <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mt-6 pt-2">
        <button onClick={onBack} className="w-full sm:w-auto bg-[#01122C] text-white text-[14px] font-bold px-5 py-[12px] rounded-full hover:bg-black active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 focus:outline-none">
          <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
          Back
        </button>
        <button onClick={onNext} className="w-full sm:w-auto bg-gradient-to-r from-[#007BFF] to-[#00BCD4] text-white text-[14px] font-bold px-5 py-[12px] rounded-full hover:opacity-95 shadow-[0_4px_12px_rgba(0,123,255,0.2)] active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 focus:outline-none">
          Select Appointment Type
          <ChevronRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>

    </div>
  );
}