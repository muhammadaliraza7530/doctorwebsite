'use client';
import Buttons from "../../../components/button";
import { Search, MapPin, Stethoscope } from 'lucide-react';

export default function HeroSearch() {
    return (
        <div className="w-full bg-white/20 backdrop-blur-md rounded-full shadow-lg border border-white/30 p-1 flex items-center gap-2 md:gap-4">
            {/* Location Field */}
            <div className="flex items-center gap-2 flex-[1.8] px-6 py-3">
                <MapPin className="h-5 w-5 text-slate-400" />
                <input
                    type="text"
                    placeholder="Location"
                    className="bg-transparent text-slate-600 placeholder-slate-400 outline-none w-full text-sm"
                />
            </div>

            {/* Divider */}
            <div className="h-6 w-px bg-slate-300/40" />

            {/* Department Field */}
            <div className="flex items-center gap-2 flex-[1.8] px-6 py-3">
                <Stethoscope className="h-5 w-5 text-slate-400" />
                <input
                    type="text"
                    placeholder="Select Department"
                    className="bg-transparent text-slate-600 placeholder-slate-400 outline-none w-full text-sm"
                />
            </div>

            {/* Search Button */}
            <Buttons title="Search"/>
        </div>
    )
}
