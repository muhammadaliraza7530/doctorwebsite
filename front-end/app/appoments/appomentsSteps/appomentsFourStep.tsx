'use client';

import { ChangeEvent, useState } from "react";
import { ChevronRight, ChevronLeft, Star, MapPin, Check, Upload, ChevronDown } from "lucide-react";

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
  onEmailChange?: (email: string) => void;
  onFullNameChange?: (name: string) => void;
};

export default function AppomentsFourthStep({ currentStep, onNext, onBack, selectedDoctor, onEmailChange, onFullNameChange }: AppomentsStepProps) {
  // Form input handling states
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    emailAddress: "",
    selectedPatient: "Andrew Fletcher",
    symptoms: "",
    reasonForVisit: "",
  });
  const [fileName, setFileName] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const steps = [
    { id: 1, name: "Specialty", isCompleted: true },
    { id: 2, name: "Appointment Type", isCompleted: true },
    { id: 3, name: "Date & Time", isCompleted: true },
    { id: 4, name: "Basic Information", isActive: true },
    { id: 5, name: "Payment" },
    { id: 6, name: "Confirmation" },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const validateEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const validatePhone = (value: string) => /^\+?[0-9\s()-]{7,20}$/.test(value);

  const validateForm = () => {
    const nextErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      nextErrors.firstName = "Please enter first name.";
    }
    if (!formData.lastName.trim()) {
      nextErrors.lastName = "Please enter last name.";
    }
    if (!formData.phoneNumber.trim()) {
      nextErrors.phoneNumber = "Please enter phone number.";
    } else if (!validatePhone(formData.phoneNumber.trim())) {
      nextErrors.phoneNumber = "Please enter a valid phone number.";
    }
    if (!formData.emailAddress.trim()) {
      nextErrors.emailAddress = "Please enter email address.";
    } else if (!validateEmail(formData.emailAddress.trim())) {
      nextErrors.emailAddress = "Please enter a valid email address.";
    }
    if (!formData.symptoms.trim()) {
      nextErrors.symptoms = "Please enter symptoms.";
    }
    if (!formData.reasonForVisit.trim()) {
      nextErrors.reasonForVisit = "Please describe your reason for visit.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onNext();
    }
  };

  return (
    <div className="w-full max-w-[940px] mt-24 mx-auto bg-[#F8F9FA] rounded-[24px] p-6 sm:p-8 border border-slate-100 font-sans select-none shadow-[0_10px_40px_rgba(0,0,0,0.02)]">
      
      {/* 1. Top Stepper Header (Steps 1, 2 & 3 Completed) */}
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

      {/* Main Container Form Panel */}
      <div className="w-full bg-white rounded-[18px] border border-[#EFF2F5] p-6 shadow-sm flex flex-col gap-6">
        
        {/* 2. Doctor Header Profile Module */}
        <div className="w-full bg-[#F8F9FA] rounded-[16px] border border-[#EFF2F5] p-5 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="relative w-[75px] h-[75px] rounded-full overflow-hidden border-2 border-white shadow-sm shrink-0 bg-sky-200">
              <img
                src={selectedDoctor.imageSrc}
                alt={selectedDoctor.name}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-[#032B5B] text-[18px] font-bold tracking-tight">{selectedDoctor.name}</h2>
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

          {/* Inner Booking Summary Stats Row */}
          <div className="w-full border-t border-slate-200/60 pt-4 mt-1 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex flex-col gap-0.5">
              <span className="text-slate-400 text-[12px] font-bold tracking-wide uppercase">Service</span>
              <span className="text-[#032B5B] text-[14px] font-bold">Cardiology (30 Mins)</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-slate-400 text-[12px] font-bold tracking-wide uppercase">Service</span>
              <span className="text-[#032B5B] text-[14px] font-bold">Echocardiograms</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-slate-400 text-[12px] font-bold tracking-wide uppercase">Date & Time</span>
              <span className="text-[#032B5B] text-[14px] font-bold">10:00 - 11:00 AM, 15, Oct 2025</span>
            </div>
          </div>
        </div>

        {/* 3. Patient Information Input Fields Grid Form */}
        <form className="flex flex-col gap-5">
          
          {/* Row 1: Name & Phone Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-[#032B5B] text-[14px] font-bold">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className={`w-full bg-white border rounded-[10px] px-4 py-[11px] text-[14px] font-semibold text-[#032B5B] focus:outline-none transition-colors ${
                  errors.firstName ? "border-red-400 focus:border-red-500" : "border-[#E2E8F0] focus:border-[#007BFF]"
                }`}
              />
              {errors.firstName && <p className="text-red-500 text-[12px]">{errors.firstName}</p>}
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[#032B5B] text-[14px] font-bold">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className={`w-full bg-white border rounded-[10px] px-4 py-[11px] text-[14px] font-semibold text-[#032B5B] focus:outline-none transition-colors ${
                  errors.lastName ? "border-red-400 focus:border-red-500" : "border-[#E2E8F0] focus:border-[#007BFF]"
                }`}
              />
              {errors.lastName && <p className="text-red-500 text-[12px]">{errors.lastName}</p>}
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[#032B5B] text-[14px] font-bold">Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className={`w-full bg-white border rounded-[10px] px-4 py-[11px] text-[14px] font-semibold text-[#032B5B] focus:outline-none transition-colors ${
                  errors.phoneNumber ? "border-red-400 focus:border-red-500" : "border-[#E2E8F0] focus:border-[#007BFF]"
                }`}
              />
              {errors.phoneNumber && <p className="text-red-500 text-[12px]">{errors.phoneNumber}</p>}
            </div>
          </div>

          {/* Row 2: Email, Patient Dropdown & Symptoms */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-[#032B5B] text-[14px] font-bold">Email Address</label>
              <input
                type="email"
                name="emailAddress"
                value={formData.emailAddress}
                onChange={handleInputChange}
                className={`w-full bg-white border rounded-[10px] px-4 py-[11px] text-[14px] font-semibold text-[#032B5B] focus:outline-none transition-colors ${
                  errors.emailAddress ? "border-red-400 focus:border-red-500" : "border-[#E2E8F0] focus:border-[#007BFF]"
                }`}
              />
              {errors.emailAddress && <p className="text-red-500 text-[12px]">{errors.emailAddress}</p>}
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="text-[#032B5B] text-[14px] font-bold">Select Patient</label>
                <button type="button" className="text-[#007BFF] text-[13px] font-bold hover:underline">
                  Add New
                </button>
              </div>
              <div className="relative w-full">
                <select
                  name="selectedPatient"
                  value={formData.selectedPatient}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-[#E2E8F0] text-[#032B5B] text-[14px] font-semibold px-4 py-[11px] rounded-[10px] appearance-none focus:outline-none focus:border-[#007BFF] transition-colors cursor-pointer"
                >
                  <option value="Andrew Fletcher">Andrew Fletcher</option>
                  <option value="Myself">Myself</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <ChevronDown className="w-4 h-4 stroke-[2.5]" />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[#032B5B] text-[14px] font-bold">Symptoms</label>
              <input
                type="text"
                name="symptoms"
                value={formData.symptoms}
                onChange={handleInputChange}
                className={`w-full bg-white border rounded-[10px] px-4 py-[11px] text-[14px] font-semibold text-[#032B5B] focus:outline-none transition-colors ${
                  errors.symptoms ? "border-red-400 focus:border-red-500" : "border-[#E2E8F0] focus:border-[#007BFF]"
                }`}
              />
              {errors.symptoms && <p className="text-red-500 text-[12px]">{errors.symptoms}</p>}
            </div>
          </div>

          {/* Row 3: Attachment Block */}
          <div className="flex flex-col gap-2">
            <label className="text-[#032B5B] text-[14px] font-bold">Attachment</label>
            <div className="w-full bg-white border border-[#E2E8F0] rounded-[10px] px-4 py-[11px] flex items-center justify-start gap-2 text-[14px] font-medium text-slate-400">
              <label className="flex items-center gap-1.5 text-[#007BFF] font-bold cursor-pointer hover:opacity-80 transition-opacity">
                <Upload className="w-4 h-4 stroke-[2.5]" />
                <span>Upload File</span>
                <input type="file" className="hidden" onChange={handleFileChange} />
              </label>
              {fileName && <span className="text-[#032B5B] text-[13px] font-semibold truncate max-w-[250px]">({fileName})</span>}
            </div>
          </div>

          {/* Row 4: Reason for Visit Textarea */}
          <div className="flex flex-col gap-2">
            <label className="text-[#032B5B] text-[14px] font-bold">Reason for Visit</label>
            <textarea
              name="reasonForVisit"
              value={formData.reasonForVisit}
              onChange={handleInputChange}
              rows={4}
              className={`w-full bg-white border rounded-[10px] px-4 py-[11px] text-[14px] font-semibold text-[#032B5B] focus:outline-none transition-colors resize-none ${
                errors.reasonForVisit ? "border-red-400 focus:border-red-500" : "border-[#E2E8F0] focus:border-[#007BFF]"
              }`}
            />
            {errors.reasonForVisit && <p className="text-red-500 text-[12px]">{errors.reasonForVisit}</p>}
          </div>

        </form>

      </div>

      {/* 4. Bottom Directional Actions Panel */}
      <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mt-6 pt-2">
        <button onClick={onBack} className="w-full sm:w-auto bg-[#01122C] text-white text-[14px] font-bold px-5 py-[12px] rounded-full hover:bg-black active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 focus:outline-none">
          <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
          Back
        </button>
        <button onClick={handleSubmit} className="w-full sm:w-auto bg-gradient-to-r from-[#007BFF] to-[#00BCD4] text-white text-[14px] font-bold px-5 py-[12px] rounded-full hover:opacity-95 shadow-[0_4px_12px_rgba(0,123,255,0.2)] active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 focus:outline-none">
          Select Payment
          <ChevronRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>

    </div>
  );
}