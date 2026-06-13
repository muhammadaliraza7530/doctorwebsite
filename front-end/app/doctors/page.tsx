"use client";

import { useState } from "react";
import DoctorHeader from "./docterHeader/doctorHeader";
import DoctorsCards from "./doctorsCards/doctorsCards";

export default function Doctor() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div>
      <DoctorHeader onSearch={setSearchQuery} />
      <DoctorsCards searchQuery={searchQuery} />
    </div>
  );
}