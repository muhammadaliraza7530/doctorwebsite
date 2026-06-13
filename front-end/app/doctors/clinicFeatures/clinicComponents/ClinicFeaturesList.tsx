'use client';

import ClinicFeaturesCard from "./ClinicFeaturesCard";
import { useScrollAnimation } from "../../../../hooks/useScrollAnimation";

const featuresData = [
  {
    id: 1,
    title: "Operation",
    imageSrc: "/images/clinicFeatures/Image.png",
  },
  {
    id: 2,
    title: "Medical",
    imageSrc: "/images/clinicFeatures/Image1.png",
  },
  {
    id: 3,
    title: "Patient Ward",
    imageSrc: "/images/clinicFeatures/Image2.png",
  },
  {
    id: 4,
    title: "Test Room",
    imageSrc: "/images/clinicFeatures/Image3.png",
  },
];

export default function ClinicFeaturesList() {
  const { ref: containerRef, isVisible } = useScrollAnimation();

  return (
    <div ref={containerRef} className="w-full max-w-6xl mx-auto px-4">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
      {featuresData.map((feature, index) => (
        <div
          key={feature.id}
          className={`${isVisible ? 'animate-scale-in' : 'opacity-0'}`}
          style={{
            animationDelay: isVisible ? `${0.1 * index}s` : '0s'
          }}
        >
          <ClinicFeaturesCard
            title={feature.title}
            imageSrc={feature.imageSrc}
          />
        </div>
      ))}
      </div>
    </div>
  );
}
