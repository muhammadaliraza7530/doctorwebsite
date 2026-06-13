"use client";

import { useState } from "react";

const authTabs = [
  { id: "login", label: "Login" },
  { id: "signup", label: "Sign Up" },
];

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<string>("login");
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({ fullName: "", email: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState<string>("");
  const [submitError, setSubmitError] = useState<string>("");

  const validateEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleLoginChange = (field: string, value: string) => {
    setLoginData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
    setSubmitError("");
  };

  const handleSignupChange = (field: string, value: string) => {
    setSignupData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
    setSubmitError("");
  };

  const handleLoginSubmit = () => {
    const nextErrors: Record<string, string> = {};
    if (!loginData.email.trim()) nextErrors.email = "Email is required.";
    else if (!validateEmail(loginData.email.trim())) nextErrors.email = "Enter a valid email.";
    if (!loginData.password.trim()) nextErrors.password = "Password is required.";

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setMessage("");
      return;
    }

    setErrors({});
    setMessage("Login successful! Redirecting...");
  };

  const handleSignupSubmit = async () => {
    const nextErrors: Record<string, string> = {};
    if (!signupData.fullName.trim()) nextErrors.fullName = "Full name is required.";
    if (!signupData.email.trim()) nextErrors.email = "Email is required.";
    else if (!validateEmail(signupData.email.trim())) nextErrors.email = "Enter a valid email.";
    if (!signupData.password.trim()) nextErrors.password = "Password is required.";
    if (!signupData.confirmPassword.trim()) nextErrors.confirmPassword = "Confirm password is required.";
    else if (signupData.password !== signupData.confirmPassword) nextErrors.confirmPassword = "Passwords do not match.";

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setMessage("");
      setSubmitError("");
      return;
    }

    try {
      const response = await fetch("/api/send-signup-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: signupData.fullName.trim(),
          email: signupData.email.trim(),
        }),
      });
      const result = await response.json();

      if (!response.ok) {
        setSubmitError(result.error || "Unable to send welcome email.");
        setMessage("");
        return;
      }

      setErrors({});
      setMessage("Sign up successful! Welcome email sent to your inbox.");
      setSubmitError("");
      setActiveTab("login");
    } catch (error) {
      setSubmitError("An error occurred while sending email. Please try again later.");
      setMessage("");
    }
  };

  const inputClass = (field: string) =>
    `w-full rounded-[12px] border px-4 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-blue-300 ${
      errors[field] ? "border-red-400 bg-red-50" : "border-slate-200 bg-white"
    }`;

  return (
    <main className="min-h-screen mt-28 bg-slate-50 py-16 px-4">
      <div className="mx-auto max-w-4xl rounded-[30px] border border-slate-200 bg-white shadow-sm">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-[30px] bg-[#F4F9FF] p-8 sm:p-10 lg:rounded-l-[30px] lg:rounded-r-none">
            <div className="mb-7">
              <p className="text-sm font-semibold text-blue-600">Welcome back</p>
              <h1 className="mt-2 text-3xl font-extrabold text-slate-900 ">
                {activeTab === "login" ? "Login to your account" : "Create your account"}
              </h1>
              <p className="mt-3 max-w-lg text-sm leading-6 text-slate-600">
                {activeTab === "login"
                  ? "Sign in to access your appointments, manage bookings, and connect with doctors."
                  : "Create your free account to book appointments and save your medical details."}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 rounded-[18px] border border-slate-200 bg-white p-2">
              {authTabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(tab.id);
                    setErrors({});
                    setMessage("");
                  }}
                  className={`rounded-[14px] px-5 py-3 text-sm font-semibold transition ${
                    activeTab === tab.id
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-transparent text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {message ? (
              <div className="mt-6 rounded-[18px] border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                {message}
              </div>
            ) : null}
            {submitError ? (
              <div className="mt-6 rounded-[18px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {submitError}
              </div>
            ) : null}

            <div className="mt-8">
              {activeTab === "login" ? (
                <div className="grid gap-5">
                  <div className="grid gap-2">
                    <label className="text-sm font-bold text-slate-900">Email address</label>
                    <input
                      type="email"
                      value={loginData.email}
                      onChange={(e) => handleLoginChange("email", e.target.value)}
                      className={inputClass("email")}
                      placeholder="you@example.com"
                    />
                    {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                  </div>

                  <div className="grid gap-2">
                    <label className="text-sm font-bold text-slate-900">Password</label>
                    <input
                      type="password"
                      value={loginData.password}
                      onChange={(e) => handleLoginChange("password", e.target.value)}
                      className={inputClass("password")}
                      placeholder="Enter your password"
                    />
                    {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                  </div>

                  <button
                    type="button"
                    onClick={handleLoginSubmit}
                    className="rounded-[14px] bg-gradient-to-r from-[#0E82FD] to-[#06AED4] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-95"
                  >
                    Login
                  </button>
                </div>
              ) : (
                <div className="grid gap-5">
                  <div className="grid gap-2">
                    <label className="text-sm font-bold text-slate-900">Full name</label>
                    <input
                      type="text"
                      value={signupData.fullName}
                      onChange={(e) => handleSignupChange("fullName", e.target.value)}
                      className={inputClass("fullName")}
                      placeholder="Your full name"
                    />
                    {errors.fullName && <p className="text-sm text-red-500">{errors.fullName}</p>}
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-bold text-slate-900">Email address</label>
                    <input
                      type="email"
                      value={signupData.email}
                      onChange={(e) => handleSignupChange("email", e.target.value)}
                      className={inputClass("email")}
                      placeholder="you@example.com"
                    />
                    {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                  </div>
                  <div className="grid gap-2 md:grid-cols-2 md:grid-flow-col">
                    <div className="grid gap-2">
                      <label className="text-sm font-bold text-slate-900">Password</label>
                      <input
                        type="password"
                        value={signupData.password}
                        onChange={(e) => handleSignupChange("password", e.target.value)}
                        className={inputClass("password")}
                        placeholder="Create a password"
                      />
                      {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                    </div>
                    <div className="grid gap-2">
                      <label className="text-sm font-bold text-slate-900">Confirm password</label>
                      <input
                        type="password"
                        value={signupData.confirmPassword}
                        onChange={(e) => handleSignupChange("confirmPassword", e.target.value)}
                        className={inputClass("confirmPassword")}
                        placeholder="Repeat password"
                      />
                      {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleSignupSubmit}
                    className="rounded-[14px] bg-gradient-to-r from-[#0E82FD] to-[#06AED4] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-95"
                  >
                    Create account
                  </button>
                </div>
              )}
            </div>
          </section>

          <aside className="relative overflow-hidden rounded-[30px] bg-gradient-to-b from-black via-lightblue to-[#06AED4] p-10 text-white lg:rounded-r-[30px] lg:rounded-l-none">
            <div className="absolute inset-0 bg-[url('/images/auth/Dr.AnnBell.png')] bg-cover bg-center opacity-50" />
            <div className="absolute inset-0 " />
            <div className="relative z-10 mx-auto max-w-md">
              <h2 className="text-3xl font-extrabold">Welcome to Doccure</h2>
              <p className="mt-4 text-sm leading-6 text-slate-100/90">
                Use a dedicated login and signup experience to keep your medical appointments and bookings secure.
              </p>
              <div className="mt-8 space-y-4 p-6">
                <div>
                  <p className="text-xl  text-slate-100/70">Why use this page?</p>
                  <p className="mt-2 text-sm leading-6 text-slate-100/90">Book appointments faster, store patient info, and return to your dashboard.</p>
                </div>
                <div>
                  <p className="text-xl text-slate-100/70">Secure access</p>
                  <p className="mt-2 text-sm leading-6 text-slate-100/90">This page is your dedicated place for authentication and account management.</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
