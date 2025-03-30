"use client";

import React, { useState, useRef, useEffect } from "react";
import { KeyRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/userContext";
import { toast } from "sonner";
import { fetcher } from "@/lib/fetcher";
import type { User } from "@/context/userContext";

interface VerifyOtpResponse {
  token: string;
  user: User;
}

function App() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { setUser } = useUser();

  useEffect(() => {
    // Focus first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value[0];
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    const newOtp = [...otp];

    for (let i = 0; i < pastedData.length; i++) {
      if (i < 6) {
        newOtp[i] = pastedData[i];
      }
    }

    setOtp(newOtp);
    inputRefs.current[Math.min(pastedData.length, 5)]?.focus();
  };

  const handleVerify = async () => {
    setIsVerifying(false);
    const otpString = otp.join("");
    try {
      const response = await fetcher<VerifyOtpResponse>(
        "/api/auth/verify-otp",
        "post",
        {
          otp: otpString,
          registrationId: localStorage.getItem("tempUserId"),
        }
      );
      if (response) {
        console.log(response);
        localStorage.setItem("authToken", response.token);
        router.push("/dashboard");
        setUser(response.user);
      }
    } catch {
      setError("Failed to verify OTP. Please try again.");
    }
  };

  const resendOtp = async () => {
    try {
      const response = await fetcher(
        "/api/auth/resend-otp",
        "post",
        JSON.stringify({ registrationId: localStorage.getItem("tempUserId") })
      );
      if (response) {
        toast("Event has been created", {
          description: "Sunday, December 03, 2023 at 9:00 AM",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        });
      }
    } catch {
      setError("Failed to resend OTP. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-indigo-100 p-3 rounded-full mb-4">
            <KeyRound className="w-8 h-8 text-indigo-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">
            Verify Your Account
          </h1>
          <p className="text-gray-600 text-center mt-2">
            We`ve sent a verification code to your email
          </p>
        </div>

        <div className="flex gap-2 mb-6 justify-center">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className="w-12 h-12 border-2 rounded-lg text-center text-xl font-semibold text-gray-700 focus:border-indigo-500 focus:outline-none transition-colors"
            />
          ))}
        </div>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        <button
          onClick={handleVerify}
          disabled={isVerifying || otp.some((digit) => !digit)}
          className="w-full bg-indigo-600 text-white rounded-lg py-3 font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isVerifying ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Verifying...
            </span>
          ) : (
            "Verify Code"
          )}
        </button>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Didn`t receive the code?{" "}
            <button
              className="text-indigo-600 font-semibold hover:text-indigo-700 focus:outline-none"
              onClick={resendOtp}
            >
              Resend
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
