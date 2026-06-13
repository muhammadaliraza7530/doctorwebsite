"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Appointment = {
  id: string;
  doctorName: string;
  specialty: string;
  rating: number;
  location: string;
  address: string;
  imageSrc: string;
  duration: string;
  fees: string;
  date: string;
  time: string;
};

export default function MYAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = window.localStorage.getItem("appointments");
    if (!stored) {
      setAppointments([]);
      return;
    }

    try {
      const parsed = JSON.parse(stored) as Appointment[];
      setAppointments(Array.isArray(parsed) ? parsed : []);
    } catch (error) {
      setAppointments([]);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 mt-28 py-12 px-4">
      <div className="mx-auto max-w-6xl p-8">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">My Appointments</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-500">
              
              Your confirmed appointments will appear here. Once you complete a booking, it will be saved here.
            </p>
          </div>
          <div className="rounded-[18px] bg-slate-50 px-5 py-4 text-slate-700">
            Total Appointments: <span className="font-semibold text-slate-900">{appointments.length}</span>
          </div>
        </div>

        {appointments.length === 0 ? (
          <div className="rounded-[24px] border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-600">
            <p className="text-lg font-semibold text-slate-900">No appointments have been stored yet</p>
            <p className="mt-2 text-sm text-slate-500">Please book an appointment first. You can then return here to view your scheduled bookings</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {appointments.map((appointment) => (
              <article key={appointment.id} className="grid gap-6 rounded-[24px] border border-slate-200 bg-slate-50 p-6 md:grid-cols-[220px_1fr]">
                <div className="relative h-42 w-full overflow-hidden rounded-[20px] bg-white">
                  <Image
                    src={appointment.imageSrc}
                    alt={appointment.doctorName}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="grid gap-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">{appointment.doctorName}</h2>
                      <p className="text-[12px] text-slate-500">{appointment.specialty}</p>
                    </div>
                    <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
                      {appointment.rating.toFixed(1)} ★
                    </span>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-[18px] bg-white p-4 shadow-sm border border-slate-200">
                      <p className="text-[10px] uppercase text-slate-400">Appointment Date</p>
                      <p className="mt-2 text-[13px] font-semibold text-slate-900">{appointment.date}</p>
                    </div>
                    <div className="rounded-[18px] bg-white p-4 shadow-sm border border-slate-200">
                      <p className="text-[10px] text-slate-400">Appointment Time</p>
                      <p className="mt-2 text-[13px] font-semibold text-slate-900">{appointment.time}</p>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="rounded-[18px] bg-white p-4 shadow-sm border border-slate-200">
                      <p className="text-[10px] text-slate-400">Location</p>
                      <p className="mt-2 text-[13px] font-semibold text-slate-900">{appointment.location}</p>
                      <p className="mt-1 text-[10px] text-slate-500">{appointment.address}</p>
                    </div>
                    <div className="rounded-[18px] bg-white p-4 shadow-sm border border-slate-200">
                      <p className="text-[10px] text-slate-400">Duration</p>
                      <p className="mt-2 text-[13px] font-semibold text-slate-900">{appointment.duration}</p>
                    </div>
                    <div className="rounded-[18px] bg-white p-4 shadow-sm border border-slate-200">
                      <p className="text-[10px] text-slate-400">Fees</p>
                      <p className="mt-2 text-[13px] font-semibold text-slate-900">{appointment.fees}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
