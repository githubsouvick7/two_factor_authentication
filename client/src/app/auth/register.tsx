"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Eye,
  EyeOff,
  KeyRound,
  LockKeyhole,
  Mail,
  Shield,
  User,
  UserPlus,
} from "lucide-react";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { fetcher } from "@/lib/fetcher";
import { Flip, toast } from "react-toastify";

interface SignupPageProps {
  setState: React.Dispatch<React.SetStateAction<string>>;
}

interface RegistrationResponse {
  registrationId: string;
  message: string;
}

const SignupPage: React.FC<SignupPageProps> = ({ setState }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const router = useRouter();

  const togglePasswordVisibility = (field: "password" | "confirm"): void => {
    if (field === "password") {
      setShowPassword((prev) => !prev);
    } else {
      setShowConfirmPassword((prev) => !prev);
    }
  };

  // Password validation function
  const validatePassword = (password: string) => {
    const errors = [];

    if (password.length < 8) {
      errors.push("Password must be at least 8 characters");
    }

    if (!/[A-Z]/.test(password)) {
      errors.push("Password must contain at least one uppercase letter");
    }

    if (!/[a-z]/.test(password)) {
      errors.push("Password must contain at least one lowercase letter");
    }

    if (!/[0-9]/.test(password)) {
      errors.push("Password must contain at least one number");
    }

    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      errors.push("Password must contain at least one special character");
    }

    return errors.length === 0 ? undefined : errors.join(", ");
  };

  // Validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string().required("Full name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .test(
        "password-validation",
        (value) => validatePassword(value || ""),
        (value) => validatePassword(value || "") === undefined
      )
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match for security")
      .required("Confirm password is required"),
    terms: Yup.boolean().oneOf([true], "You must accept the terms"),
  });

  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetcher<RegistrationResponse>(
          "/api/auth/register",
          "post",
          values
        );

        if (response) {
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

          localStorage.setItem("tempUserId", response.registrationId);
          router.push("/auth/verify-otp");
        }
      } catch (error: unknown) {
        console.log(error);
      }
    },
  });

  return (
    <div className="w-full flex items-center justify-center p-4">
      <div className="w-full max-w-md fade-in">
        <div className="glass rounded-3xl p-4 shadow-xl bg-white bg-opacity-80 backdrop-blur-sm">
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-indigo-100 rounded-full">
                <UserPlus className="h-10 w-10 text-indigo-600" />
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2">Create Account</h1>
            <p className="text-muted-foreground">
              Join our secure platform today
            </p>
          </div>
          <form className="space-y-4" onSubmit={formik.handleSubmit}>
            <div className="relative">
              <User className="absolute left-3 top-4 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                id="name"
                name="name"
                placeholder="Full Name"
                className="pl-10 h-12 text-base"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="text-red-500 text-xs mt-1">
                  {formik.errors.name}
                </div>
              ) : null}
            </div>

            <div className="relative">
              <Mail className="absolute left-3 top-4 h-4 w-4 text-muted-foreground" />
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="Email Address"
                className="pl-10 h-12 text-base"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500 text-xs mt-1">
                  {formik.errors.email}
                </div>
              ) : null}
            </div>

            <div className="relative">
              <LockKeyhole className="absolute left-3 top-4 h-4 w-4 text-muted-foreground" />
              <Input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Password"
                className="pl-10 pr-10 h-12 text-base"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />

              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500 text-xs mt-1">
                  {formik.errors.password}
                </div>
              ) : null}
              {formik.touched.password && !formik.errors.password && (
                <div className="text-green-500 text-xs mt-1">
                  Password meets all requirements
                </div>
              )}
              {!formik.touched.password && (
                <div className="text-gray-500 text-xs mt-1">
                  Password must contain at least 8 characters, one uppercase
                  letter, one lowercase letter, one number, and one special
                  character
                </div>
              )}
            </div>

            <div className="relative">
              <KeyRound className="absolute left-3 top-4 h-4 w-4 text-muted-foreground" />
              <Input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
                className="pl-10 pr-10 h-12 text-base"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-4 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => togglePasswordVisibility("confirm")}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <div className="text-red-500 text-xs mt-1">
                  {formik.errors.confirmPassword}
                </div>
              ) : null}
              {formik.touched.confirmPassword &&
              !formik.errors.confirmPassword &&
              formik.values.password === formik.values.confirmPassword &&
              formik.values.confirmPassword !== "" ? (
                <div className="text-green-500 text-xs mt-1">
                  Passwords match
                </div>
              ) : null}
              {!formik.touched.confirmPassword && (
                <div className="text-gray-500 text-xs mt-1">
                  Please confirm your password for security
                </div>
              )}
            </div>

            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                className="mt-1 rounded text-primary focus:ring-primary"
                checked={formik.values.terms}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              <label htmlFor="terms" className="text-sm text-muted-foreground">
                I agree to the{" "}
                <a href="#" className="text-primary hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-primary hover:underline">
                  Privacy Policy
                </a>
              </label>
            </div>
            {formik.touched.terms && formik.errors.terms ? (
              <div className="text-red-500 text-xs">{formik.errors.terms}</div>
            ) : null}

            <Button
              type="submit"
              className="w-full text-base py-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
            >
              Create Secure Account
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setState("login")}
                className="font-medium text-primary hover:underline"
              >
                Login
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

export default SignupPage;
