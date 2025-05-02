"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, AtSign } from "lucide-react";
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
          setError("Please verify your email before logging in. Check your inbox for a verification link.");
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
    <div className={`flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-gray-50 p-4 ${mounted ? 'animate-fadeIn' : 'opacity-0'}`}>
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
              placeholder="Your password"
              className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3.5 px-10 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#73A9E6] focus:border-transparent transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Remember Me and Forgot Password */}
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 text-[#003087] border-gray-300 rounded focus:ring-[#73A9E6] cursor-pointer"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-600 cursor-pointer select-none">
                Remember me
              </label>
            </div>
            <Link href="/forgot-password" className="text-sm text-[#003087] font-medium hover:underline transition-all">
              Forgot password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#003087] to-[#4e89d3] hover:from-[#002a77] hover:to-[#3d75b7] text-white font-semibold py-3.5 px-4 rounded-lg transition-all duration-300 ease-in-out transform hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#73A9E6] mt-6"
            disabled={loading}
          >
            {loading ? (
              <span className="flex justify-center items-center">
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </span>
            ) : (
              "Log In"
            )}
          </button>
        </form>

        {/* === ADDED DEMO CREDENTIALS NOTE HERE === */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Demo user: <span className="font-medium">MarySmith</span> / <span className="font-medium">hello123</span>
        </p>
        {/* ========================================== */}

        {/* Divider */}
        <div className="relative flex items-center justify-center mt-8 mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative bg-white px-4 text-gray-500 text-sm font-medium">
            Or continue with
          </div>
        </div>

        {/* Google Sign In */}
        <button
          type="button"
          className="w-full flex justify-center items-center bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-lg border border-gray-300 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 hover:shadow-sm"
        >
          <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
            {/* Google icon paths */}
            <path d="M12.545,10.239V13.95h5.346c-0.244,1.275-1.219,2.987-3.575,2.987c-2.195,0-3.971-1.787-3.971-3.996 c0-2.21,1.776-3.997,3.971-3.997c1.297,0,2.144,0.535,2.638,1.003l2.336-2.226c-1.145-1.097-2.761-1.84-4.974-1.84 C8.275,5.81,5,8.956,5,12.93c0,3.976,3.758,7.161,8.338,7.161c4.806,0,8.002-3.267,8.002-7.926 c0-0.625-0.069-1.107-0.156-1.587" fill="#4285F4" />
            <path d="M5.424,14.856l2.373,1.67C8.659,17.75,10.259,18.5,12.06,18.5c2.537,0,4.214-1.246,4.77-2.559 h-5.647V13.95H19.49c0.283,0.868,0.433,1.699,0.433,2.63c0,4.272-3.009,7.921-7.863,7.921c-4.253,0-7.881-3.033-9.123-7.034" fill="#34A853" />
            <path d="M5,12.93c0-0.564,0.08-1.109,0.22-1.632l4.842,3.558H5.424L3.12,11.67 C2.414,13.088,2,14.673,2,16.339c0,1.691,0.441,3.28,1.12,4.692l4.842-3.558C5.481,15.512,5,14.331,5,12.93" fill="#FBBC05" />
            <path d="M12.060,5.81c1.897,0,3.616,0.695,4.96,2.058l2.336-2.226 c-2.084-1.985-4.796-3.2-7.856-3.2C6.99,2.442,2.944,5.572,1.348,9.861l4.316,3.176C7.104,8.893,9.333,5.81,12.060,5.81" fill="#EA4335" />
          </svg>
          Google
        </button>

        {/* Sign Up Link */}
        <p className="text-center mt-6 text-gray-600">
          Don't have an account? <Link href="/signup" className="text-[#003087] font-medium hover:underline transition-all">Create Account</Link>
        </p>
      </div>

      {/* Add animation styles */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}