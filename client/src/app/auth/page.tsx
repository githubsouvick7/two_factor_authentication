"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Shield,
  CheckCircle,
  Fingerprint,
} from "lucide-react";
import Image from "next/image";

const Page: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePasswordVisibility = (): void => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="min-h-screen w-full flex bg-gradient-to-br from-purple-100 to-blue-50">
      <Image
        width={200}
        height={200}
        alt="Logo"
        layout="fixed"
        objectFit="cover"
        className="h-64 w-64 rounded-full mx-auto"
        src={
          "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        }
      />
      <div
        className="hidden md:block w-1/2 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
        }}
      >
        <div className="h-full w-full bg-black bg-opacity-40 flex items-center justify-center p-12">
          <div className="text-white">
            <div className="flex items-center justify-center mb-6">
              <Shield className="h-16 w-16 text-blue-300 mr-4" />
              <h2 className="text-4xl font-bold">Secure Access</h2>
            </div>
            <p className="text-xl max-w-md mb-8">
              Your data is protected with enterprise-grade security protocols.
            </p>

            <div className="space-y-4">
              <div className="flex items-center">
                <CheckCircle className="h-6 w-6 text-green-400 mr-3" />
                <span className="text-lg">End-to-end encryption</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-6 w-6 text-green-400 mr-3" />
                <span className="text-lg">Two-factor authentication</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-6 w-6 text-green-400 mr-3" />
                <span className="text-lg">ISO 27001 certified</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4">
        <div className="w-full max-w-md fade-in">
          <div className="glass rounded-3xl p-8 shadow-xl bg-white bg-opacity-80 backdrop-blur-sm">
            <div className="text-center mb-6">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <Fingerprint className="h-10 w-10 text-blue-600" />
                </div>
              </div>
              <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
              <p className="text-muted-foreground">
                Secure access to your account
              </p>
            </div>

            <form className="space-y-6">
              <div className="space-y-2">
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="Email"
                    className="pl-10 h-12 text-base"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="relative">
                  <LockKeyhole className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="pl-10 pr-10 h-12 text-base"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="remember"
                    className="rounded text-primary focus:ring-primary"
                  />
                  <label
                    htmlFor="remember"
                    className="text-sm text-muted-foreground"
                  >
                    Remember me
                  </label>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Forgot password?
                </a>
              </div>

              <Button
                type="submit"
                className="w-full text-base py-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
              >
                Secure Sign in
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                Don`t have an account?{" "}
                <a
                  href="#"
                  className="font-medium text-primary hover:underline"
                >
                  Sign up
                </a>
              </div>
            </form>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground flex items-center justify-center">
              <Shield className="h-3 w-3 mr-1" />
              Your connection to this site is secure
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
