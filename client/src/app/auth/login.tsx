"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetcher } from "@/lib/fetcher";
import {
  Eye,
  EyeOff,
  Fingerprint,
  LockKeyhole,
  Mail,
  Shield,
} from "lucide-react";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { Flip, toast } from "react-toastify";

interface LoginPageProps {
  setState: React.Dispatch<React.SetStateAction<string>>;
}

interface LoginResponse {
  registrationId: string;
  message: string;
}

const LoginPage: React.FC<LoginPageProps> = ({ setState }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

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

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={Yup.object({
              email: Yup.string()
                .email("Invalid email")
                .required("Email is required"),
              password: Yup.string()
                .min(6, "Must be at least 6 characters")
                .required("Password is required"),
            })}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                setError(null);
                const response = await fetcher<LoginResponse>(
                  "/api/auth/login",
                  "post",
                  values
                );
                toast.success(response.message, {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: true,
                  closeOnClick: false,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "colored",
                  transition: Flip,
                });
                console.log("Login success:", response);
                localStorage.setItem("tempUserId", response.registrationId);
                router.push("/auth/verify-otp");
              } catch (err: unknown) {
                console.log(err);
              }
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6">
                <div className="space-y-2">
                  <div className="relative">
                    <Mail className="absolute left-3 top-4 h-4 w-4 text-muted-foreground" />
                    <Field
                      name="email"
                      type="email"
                      placeholder="Email"
                      className="pl-10 h-12 text-base w-full"
                      as={Input}
                    />
                  </div>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <div className="relative">
                    <LockKeyhole className="absolute left-3 top-4 h-4 w-4 text-muted-foreground" />
                    <Field
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      className="pl-10 pr-10 h-12 text-base w-full"
                      as={Input}
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
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                {error && (
                  <div className="text-red-500 text-sm text-center">
                    {error}
                  </div>
                )}

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
                  disabled={isSubmitting}
                  className="w-full text-base py-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
                >
                  {isSubmitting ? "Signing in..." : "Secure Sign in"}
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
              </Form>
            )}
          </Formik>
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
