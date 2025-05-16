"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, Eye, EyeOff, AtSign } from "lucide-react";
import { signIn } from "@/lib/database";

export default function LoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const registered = searchParams.get("registered");
  const verified = searchParams.get("verified");

  useEffect(() => {
    setMounted(true);
    if (registered) {
      setSuccess("Account created successfully! Please log in.");
    }
    if (verified) {
      setSuccess("Email verified successfully! You can now log in.");
    }
  }, [registered, verified]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { data, error } = await signIn(identifier, password);

      if (error) {
        // Handle specific error cases
        if (error.message.includes("Email not confirmed")) {
          setError(
            "Please verify your email before logging in. Check your inbox for a verification link."
          );
        } else if (error.message.includes("Invalid login")) {
          setError("Invalid username/email or password");
        } else {
          setError(error.message || "Login failed");
        }
        setLoading(false);
        return;
      }

      if (data.user) {
        // Successfully logged in
        router.push("/profile");
      } else {
        setError("Failed to log in");
        setLoading(false);
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-gray-50 p-4 ${
        mounted ? "animate-fadeIn" : "opacity-0"
      }`}
    >
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 transition-transform duration-300 ease-in-out transform hover:scale-[1.01]">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="relative w-30 h-30">
            <Image
              src="/img/SunnPark-Logo.PNG"
              alt="Parking App Logo"
              fill
              sizes="(max-width: 768px) 100vw, 300px"
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-center text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-[#003087] to-[#4e89d3]">
          Welcome Back
        </h1>

        {/* Subtitle */}
        <p className="text-center text-gray-600 mb-8">
          Log in to your SUNN Park account
        </p>

        {/* Success message */}
        {success && (
          <div className="mb-4 p-3 bg-green-50 text-green-800 rounded-lg text-sm">
            {success}
          </div>
        )}

        {/* Error display */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-800 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email or Username */}
          <div className="group relative transition-all duration-300">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400 group-focus-within:text-[#003087]">
              <AtSign className="h-5 w-5 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Email or Username"
              className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3.5 px-10 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#73A9E6] focus:border-transparent transition-all"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="group relative transition-all duration-300">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400 group-focus-within:text-[#003087]">
              <Lock className="h-5 w-5 transition-colors" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3.5 px-10 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#73A9E6] focus:border-transparent transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-[#003087] transition-colors"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-sm text-[#003087] hover:text-[#4e89d3] transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#003087] to-[#4e89d3] text-white py-3.5 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>

          {/* Sign Up Link */}
          <div className="text-center text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-[#003087] hover:text-[#4e89d3] font-medium transition-colors"
            >
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
