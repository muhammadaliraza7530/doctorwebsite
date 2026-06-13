import { notFound } from "next/navigation";
import { doctorsData } from "../data";

interface DoctorPageProps {
  params: {
    dcotorDynamicPages: string;
  };
}

export default function DoctorsPages({ params }: DoctorPageProps) {
  const doctorId = Number(params.dcotorDynamicPages);
  const doctor = doctorsData.find((item) => item.id === doctorId);

  if (!doctor) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="max-w-5xl mx-auto bg-white rounded-[24px] shadow-[0_10px_50px_rgba(15,23,42,0.08)] overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 p-8">
          <div className="flex flex-col gap-6">
            <div className="rounded-[24px] bg-slate-100 p-6">
              <h1 className="text-3xl font-bold text-slate-900">{doctor.name}</h1>
              <p className="text-slate-500 mt-2">{doctor.specialty}</p>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-[20px] bg-white p-4 shadow-sm">
                  <p className="text-sm text-slate-400">Location</p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">{doctor.location}</p>
                </div>
                <div className="rounded-[20px] bg-white p-4 shadow-sm">
                  <p className="text-sm text-slate-400">Consultations</p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">{doctor.consultations}</p>
                </div>
              </div>
            </div>

            <div className="rounded-[24px] bg-slate-100 p-8 shadow-sm">
              <p className="text-sm uppercase tracking-[0.18em] text-slate-500">Doctor Profile</p>
              <h2 className="mt-4 text-4xl font-bold text-slate-950">{doctor.name}</h2>
              <p className="mt-4 text-base leading-7 text-slate-600">{doctor.specialty}</p>

              <div className="mt-8 grid gap-4">
                <div className="rounded-[20px] bg-white p-5 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Rating</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-950">{doctor.rating.toFixed(1)} / 5</p>
                </div>
                <div className="rounded-[20px] bg-white p-5 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Price Range</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-950">{doctor.priceRange}</p>
                </div>
              </div>
            </div>

            <div className="rounded-[24px] bg-white p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900">About the doctor</h3>
              <p className="mt-4 text-slate-600 leading-7">
                {doctor.name} is an experienced specialist with over {doctor.consultations} successful consultations.
                Book now to take the first step toward better health.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-full h-[400px] rounded-[24px] object-cover opacity-50"
            />
          </div>
        </div>
      </div>
    </div>
  );
}