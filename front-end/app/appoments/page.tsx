import { Suspense } from "react";
import AppomentsClient from "./AppomentsClient";

export const dynamic = "force-dynamic";

export default function Appoments() {
  return (
    <Suspense fallback={<div className="p-6 text-center text-sm text-slate-500">Loading appointment step...</div>}>
      <AppomentsClient />
    </Suspense>
  );
}
