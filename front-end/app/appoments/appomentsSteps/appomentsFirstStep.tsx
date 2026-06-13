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
    <div className="w-full max-w-[980px] mt-28 mx-auto bg-[#F8F9FA] rounded-[24px] px-4 py-6 sm:px-6 sm:py-8 border border-slate-100 font-sans select-none shadow-[0_10px_40px_rgba(0,0,0,0.02)] animate-fade-in-up">
      
      {/* 1. Top Horizontal Stepper Progress Bar */}
      <div className="flex items-center justify-start gap-2 md:gap-4 mb-10 overflow-x-auto pb-2 scrollbar-none">
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
                  {step.id}
                </div>
                <span
                  className={`text-[12px] font-semibold tracking-tight ${
                    isCompleted || isActive ? "text-[#032B5B]" : "text-[#94A3B8]"
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
        <button onClick={onNext} className="bg-gradient-to-r from-[#007BFF] to-[#00BCD4] text-white text-[14px] font-bold px-5 py-[12px] rounded-full hover:opacity-95 shadow-[0_4px_12px_rgba(0,123,255,0.2)] active:scale-[0.98] transition-all flex items-center gap-1.5 focus:outline-none">
          Select Appointment Type
          <ChevronRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>

    </div>
  );
}