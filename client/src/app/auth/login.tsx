"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Eye,
  EyeOff,
  Fingerprint,
  LockKeyhole,
  Mail,
  Shield,
} from "lucide-react";
import { useState } from "react";

interface LoginPageProps {
  setState: React.Dispatch<React.SetStateAction<string>>;
}

const LoginPage: React.FC<LoginPageProps> = ({ setState }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePasswordVisibility = (): void => {
    setShowPassword((prev) => !prev);
  };
  return (
    <div className="w-full flex items-center justify-center p-4">
      <div className="w-full max-w-md fade-in">
        <div className="glass rounded-3xl p-4 shadow-xl bg-white bg-opacity-80 backdrop-blur-sm">
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
                <Mail className="absolute left-3 top-4 h-4 w-4 text-muted-foreground" />
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
                <LockKeyhole className="absolute left-3 top-4 h-4 w-4 text-muted-foreground" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="pl-10 pr-10 h-12 text-base"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-4 text-muted-foreground hover:text-foreground transition-colors"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
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
              <button
                onClick={() => setState("signup")}
                className="font-medium text-primary hover:underline"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground flex items-center justify-center">
            <Shield className="h-3 w-3 mr-1" />
            Protected by enterprise-grade security
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
