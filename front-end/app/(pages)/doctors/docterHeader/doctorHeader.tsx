"use client";

import { useState } from "react";
import { Search, MapPin, Calendar } from "lucide-react";

interface DoctorHeaderProps {
  onSearch: (query: string) => void;
}

export default function DoctorHeader({ onSearch }: DoctorHeaderProps) {
  const [searchInput, setSearchInput] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);

  const locationSuggestions = [
    "San Francisco, CA",
    "Los Angeles, CA",
    "New York, NY",
    "Chicago, IL",
    "Austin, TX",
    "Seattle, WA",
  ];

  const filteredLocations = locationSuggestions.filter((location) =>
    location.toLowerCase().includes(locationQuery.toLowerCase())
  );

  return (
    <div className="relative w-full bg-[#F8F9FA] overflow-hidden select-none font-sans">
      
      {/* Background Decorative Abstract Vectors (Left & Right Overlays) */}
      <div className="absolute inset-y-0 left-0 w-[240px] pointer-events-none opacity-60">
        <div className="absolute -left-12 top-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full border-[25px] border-[#E2EAF8] opacity-40" />
        <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border-[12px] border-[#E2EAF8] opacity-30" />
      </div>
      <div className="absolute inset-y-0 right-0 w-[280px] pointer-events-none opacity-75">
        <div className="absolute -right-16 top-1/2 -translate-y-1/2 w-[320px] h-[320px] rounded-full border-[40px] border-[#EBF4FE]" />
        <div className="absolute right-6 top-1/2 -translate-y-1/2 w-[220px] h-[220px] rounded-full border-[1px] border-[#DCE8FA] border-dashed" />
      </div>

      {/* Main Content Wrapper */}
      <div className="max-w-[1280px] mx-auto px-6 pt-[50px] pb-[85px] flex flex-col items-center relative z-10">
        
       
        {/* Page Main Headline Title */}
        <h1 className="text-[#032B5B] text-[36px] md:text-[42px] font-bold tracking-tight mb-[40px] mt-[40px] text-center">
          Doctors List
        </h1>

        {/* Universal Sticky Search Bar Panel */}
        <div className="w-full max-w-[1020px] bg-white rounded-full p-2 pl-6 border-2 border-[#00BCD4]/80 shadow-[0_12px_35px_rgba(3,43,91,0.06)] flex flex-col md:flex-row items-center gap-2 md:gap-0">
          
          {/* Field 1: Search Scope */}
          <div className="w-full md:flex-[1.3] flex items-center gap-3 py-2 md:py-0">
            <Search className="w-[18px] h-[18px] text-[#8A99AD] stroke-[2.5]" />
            <input
              type="text"
              placeholder="Search for Doctors, Hospitals, Clinics"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") onSearch(searchInput);
              }}
              className="w-full bg-transparent text-[15px] text-[#032B5B] placeholder-[#8A99AD] font-medium focus:outline-none"
            />
          </div>

          {/* Separation Pillar Line 1 */}
          <div className="hidden md:block w-[1px] h-[28px] bg-[#E2E8F0] mx-4" />

          {/* Field 2: Location Filtering */}
          <div className="w-full md:flex-[0.8] relative">
            <div className="flex items-center gap-3 py-2 md:py-0">
              <MapPin className="w-[18px] h-[18px] text-[#8A99AD] stroke-[2.5]" />
              <input
                type="text"
                placeholder="Location"
                value={locationQuery}
                onChange={(event) => setLocationQuery(event.target.value)}
                onFocus={() => setShowLocationSuggestions(true)}
                onBlur={() => setTimeout(() => setShowLocationSuggestions(false), 150)}
                className="w-full bg-transparent text-[15px] text-[#032B5B] placeholder-[#8A99AD] font-medium focus:outline-none"
              />
            </div>
            {showLocationSuggestions && locationQuery.length > 0 && filteredLocations.length > 0 && (
              <div className="absolute left-0 right-0 mt-1 z-20 rounded-3xl border border-slate-200 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.12)]">
                {filteredLocations.map((location) => (
                  <button
                    key={location}
                    type="button"
                    onMouseDown={() => {
                      setLocationQuery(location);
                      setShowLocationSuggestions(false);
                    }}
                    className="w-full px-4 py-3 text-left text-[14px] text-[#0F172A] hover:bg-slate-100 transition-colors"
                  >
                    {location}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Separation Pillar Line 2 */}
          <div className="hidden md:block w-[1px] h-[28px] bg-[#E2E8F0] mx-4" />

          {/* Field 3: Date picker integration */}
          <div className="w-full md:flex-[0.8] flex items-center gap-3 py-2 md:py-0">
            <Calendar className="w-[18px] h-[18px] text-[#8A99AD] stroke-[2.5]" />
            <input 
              type="date" 
              placeholder="Date" 
              className="w-full bg-transparent text-[15px] text-[#032B5B] placeholder-[#8A99AD] font-medium focus:outline-none"
            />
          </div>

          {/* Search Trigger Button Component */}
          <button
            type="button"
            onClick={() => onSearch(searchInput)}
            className="w-full md:w-auto bg-gradient-to-r from-[#007BFF] to-[#00BCD4] text-white font-semibold text-[16px] px-8 py-[13px] rounded-full hover:opacity-95 shadow-[0_4px_12px_rgba(0,123,255,0.25)] transition-all duration-200 flex items-center justify-center gap-2 tracking-wide focus:outline-none shrink-0"
          >
            <Search className="w-4 h-4 stroke-[3]" />
            Search
          </button>

        </div>

      </div>
    </div>
  );
}