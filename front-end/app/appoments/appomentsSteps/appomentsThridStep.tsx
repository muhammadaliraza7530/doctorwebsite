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

export default function AppomentsThirdStep({ currentStep, onNext, onBack, selectedDoctor }: AppomentsStepProps) {
  const today = new Date();
  const [calendarYear, setCalendarYear] = useState<number>(today.getFullYear());
  const [calendarMonth, setCalendarMonth] = useState<number>(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<{ year: number; month: number; date: number }>(() => ({
    year: today.getFullYear(),
    month: today.getMonth(),
    date: today.getDate(),
  }));
  const [selectedSlot, setSelectedSlot] = useState<string>("Morning-10:45");

  const steps = [
    { id: 1, name: "Specialty", isCompleted: true },
    { id: 2, name: "Appointment Type", isCompleted: true },
    { id: 3, name: "Date & Time", isActive: true },
    { id: 4, name: "Basic Information" },
    { id: 5, name: "Payment" },
    { id: 6, name: "Confirmation" },
  ];

  const monthLabel = new Date(calendarYear, calendarMonth, 1).toLocaleString("default", { month: "long" });
  const yearLabel = calendarYear;

  const buildCalendarDays = (year: number, month: number) => {
    const firstOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const lastDayOfPrevMonth = new Date(year, month, 0).getDate();
    const leadingDays = firstOfMonth.getDay();

    const days: { day: string; date: number; isCurrentMonth: boolean }[] = [];

    for (let i = leadingDays; i > 0; i -= 1) {
      const date = lastDayOfPrevMonth - i + 1;
      const dateObj = new Date(year, month - 1, date);
      days.push({
        day: dateObj.toLocaleString("default", { weekday: "short" }),
        date,
        isCurrentMonth: false,
      });
    }

    for (let date = 1; date <= daysInMonth; date += 1) {
      const dateObj = new Date(year, month, date);
      days.push({
        day: dateObj.toLocaleString("default", { weekday: "short" }),
        date,
        isCurrentMonth: true,
      });
    }

    while (days.length % 7 !== 0) {
      const date = days.length - (leadingDays + daysInMonth) + 1;
      const dateObj = new Date(year, month + 1, date);
      days.push({
        day: dateObj.toLocaleString("default", { weekday: "short" }),
        date,
        isCurrentMonth: false,
      });
    }

    return days;
  };

  const calendarDays = buildCalendarDays(calendarYear, calendarMonth);

  const handlePreviousMonth = () => {
    setCalendarMonth((prevMonth) => {
      if (prevMonth === 0) {
        setCalendarYear((prevYear) => prevYear - 1);
        return 11;
      }
      return prevMonth - 1;
    });
  };

  const handleNextMonth = () => {
    setCalendarMonth((prevMonth) => {
      if (prevMonth === 11) {
        setCalendarYear((prevYear) => prevYear + 1);
        return 0;
      }
      return prevMonth + 1;
    });
  };

  const shifts = {
    Morning: ["09:45", "-", "10:45", "10:45", "10:45", "-", "09:45", "-", "10:45", "10:45", "10:45"],
    Afternoon: ["09:45", "-", "10:45", "10:45", "10:45"],
    Evening: ["09:45", "09:45", "09:45", "-", "10:45", "-", "09:45", "09:45", "09:45", "-", "10:45", "-"],
  };

  return (
    <div className="w-full max-w-[940px] mt-24 mx-auto bg-[#F8F9FA] rounded-[24px] p-6 sm:p-8 border border-slate-100 font-sans select-none shadow-[0_10px_40px_rgba(0,0,0,0.02)]">
      
      {/* 1. Top Stepper Header (Steps 1 & 2 Completed) */}
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

      {/* Main Container Dashboard */}
      <div className="w-full bg-white rounded-[18px] border border-[#EFF2F5] p-6 shadow-sm flex flex-col gap-6">
        
        {/* 2. Doctor Header Module */}
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

        {/* 3. Scheduler Framework Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          
          {/* Column Left: Calendar Module Panel */}
          <div className="border border-[#EFF2F5] rounded-[16px] p-5 bg-white">
            <div className="flex items-center justify-between mb-6 px-1">
              <button onClick={handlePreviousMonth} className="text-slate-400 hover:text-slate-700"><ChevronLeft className="w-4 h-4 stroke-[3]" /></button>
              <h3 className="text-[#032B5B] text-[15px] font-bold">{monthLabel} {yearLabel}</h3>
              <button onClick={handleNextMonth} className="text-slate-400 hover:text-slate-700"><ChevronRight className="w-4 h-4 stroke-[3]" /></button>
            </div>
            
            {/* Calendar Days Typography Matrix */}
            <div className="grid grid-cols-7 gap-y-3.5 text-center text-[13px] font-bold">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                <div key={d} className="text-[#64748B] text-[12px] pb-1">{d}</div>
              ))}
              {calendarDays.map((item, index) => {
                const isSelected =
                  selectedDate.year === calendarYear &&
                  selectedDate.month === calendarMonth &&
                  selectedDate.date === item.date &&
                  item.isCurrentMonth;
                return (
                  <div key={index} className="flex justify-center items-center">
                    <button
                      onClick={() =>
                        item.isCurrentMonth &&
                        setSelectedDate({ year: calendarYear, month: calendarMonth, date: item.date })
                      }
                      disabled={!item.isCurrentMonth}
                      className={`w-8 h-8 rounded-[8px] text-[13px] font-bold flex items-center justify-center transition-all ${
                        isSelected
                          ? "bg-[#007BFF] text-white shadow-sm font-extrabold"
                          : item.isCurrentMonth
                          ? "text-[#032B5B] hover:bg-slate-100"
                          : "text-slate-200 font-normal pointer-events-none"
                      }`}
                    >
                      {item.date}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Column Right: Slots Shift Grid Panels */}
          <div className="border border-[#EFF2F5] rounded-[16px] p-5 bg-white flex flex-col gap-5">
            {Object.entries(shifts).map(([shiftName, timeSlots]) => (
              <div key={shiftName} className="flex flex-col gap-2.5">
                <h4 className="text-[#032B5B] text-[14px] font-bold">{shiftName}</h4>
                <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-4 gap-2">
                  {timeSlots.map((slot, idx) => {
                    if (slot === "-") {
                      return (
                        <div key={idx} className="bg-[#E2E8F0]/50 text-slate-400 text-[12px] font-bold py-2 px-1 rounded-[6px] text-center cursor-not-allowed">
                          -
                        </div>
                      );
                    }
                    const slotKey = `${shiftName}-${idx}`;
                    const isSlotSelected = selectedSlot === slotKey;
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedSlot(slotKey)}
                        className={`text-[12px] font-bold py-2 px-1 rounded-[6px] text-center transition-all tracking-tight ${
                          isSlotSelected
                            ? "bg-[#007BFF] text-white font-extrabold shadow-sm"
                            : "bg-[#00BCD4] text-white hover:opacity-90"
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* 4. Bottom Directional Actions Panel */}
      <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mt-6 pt-2">
        <button onClick={onBack} className="w-full sm:w-auto bg-[#01122C] text-white text-[14px] font-bold px-5 py-[12px] rounded-full hover:bg-black active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 focus:outline-none">
          <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
          Back
        </button>
        <button onClick={onNext} className="w-full sm:w-auto bg-gradient-to-r from-[#007BFF] to-[#00BCD4] text-white text-[14px] font-bold px-5 py-[12px] rounded-full hover:opacity-95 shadow-[0_4px_12px_rgba(0,123,255,0.2)] active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 focus:outline-none">
          Add Basic Information
          <ChevronRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>

    </div>
  );
}