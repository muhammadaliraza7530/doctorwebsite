'use client';

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import AppomentsFirstStep from "./appomentsSteps/appomentsFirstStep";
import AppomentsSecondStep from "./appomentsSteps/appomentsSecondStep";
import AppomentsThridStep from "./appomentsSteps/appomentsThridStep";
import AppomentsFourStep from "./appomentsSteps/appomentsFourStep";
import AppomentsFifthStep from "./appomentsSteps/appomentsFiveStep";
import AppomentsSixStep from "./appomentsSteps/appomentsSixStep";

const defaultDoctor = {
  id: "",
  name: "Dr. Michael Brown",
  specialty: "Psychologist",
  rating: 5.0,
  location: "Minneapolis, MN",
  imageSrc: "/images/doctoPage/Dr.MichaelBrown.png",
  duration: "30 Min",
  fees: "$650",
  address: "1011 W 5th St, Suite 120, Austin, TX 78703",
};

export default function AppomentsClient() {
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState(defaultDoctor);
  const [userEmail, setUserEmail] = useState("");
  const [userFullName, setUserFullName] = useState("");

  useEffect(() => {
    if (searchParams.has("doctorName")) {
      setSelectedDoctor({
        id: searchParams.get("doctorId") || "",
        name: searchParams.get("doctorName") || defaultDoctor.name,
        specialty: searchParams.get("specialty") || defaultDoctor.specialty,
        rating: parseFloat(searchParams.get("rating") || `${defaultDoctor.rating}`),
        location: searchParams.get("location") || defaultDoctor.location,
        imageSrc: searchParams.get("imageSrc") || defaultDoctor.imageSrc,
        duration: searchParams.get("duration") || defaultDoctor.duration,
        fees: searchParams.get("fees") || defaultDoctor.fees,
        address: searchParams.get("address") || searchParams.get("location") || defaultDoctor.address,
      });
    }
  }, [searchParams]);

  const handleNext = () => setCurrentStep((prev) => Math.min(prev + 1, 6));
  const handleBack = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="animate-fade-in-up">
      {currentStep === 1 && (
        <AppomentsFirstStep currentStep={currentStep} onNext={handleNext} onBack={handleBack} selectedDoctor={selectedDoctor} />
      )}
      {currentStep === 2 && (
        <AppomentsSecondStep currentStep={currentStep} onNext={handleNext} onBack={handleBack} selectedDoctor={selectedDoctor} />
      )}
      {currentStep === 3 && (
        <AppomentsThridStep currentStep={currentStep} onNext={handleNext} onBack={handleBack} selectedDoctor={selectedDoctor} />
      )}
      {currentStep === 4 && (
        <AppomentsFourStep currentStep={currentStep} onNext={handleNext} onBack={handleBack} selectedDoctor={selectedDoctor} onEmailChange={setUserEmail} onFullNameChange={setUserFullName} />
      )}
      {currentStep === 5 && (
        <AppomentsFifthStep currentStep={currentStep} onNext={handleNext} onBack={handleBack} selectedDoctor={selectedDoctor} />
      )}
      {currentStep === 6 && <AppomentsSixStep currentStep={currentStep} onBack={handleBack} selectedDoctor={selectedDoctor} userEmail={userEmail} userFullName={userFullName} />}
    </div>
  );
}

