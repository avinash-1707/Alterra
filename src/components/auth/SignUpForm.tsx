"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import GradientBlob from "../common/GradientBlog";
import GlassCard from "../common/GlassCard";
import LandingButton from "../landing/LandingButton";
import {
  authFormSchema,
  type AuthFormValues,
} from "@/lib/validations/auth-form";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export default function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AuthFormValues>({
    resolver: zodResolver(authFormSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: {
      isSignUp: true,
      name: "",
      email: "",
      password: "",
      terms: false,
    },
  });

  const collapsibleClasses = isSignUp
    ? "transition-all duration-500 ease-in-out overflow-hidden max-h-24 opacity-100"
    : "transition-all duration-500 ease-in-out overflow-hidden max-h-0 opacity-0 pointer-events-none";
  const trustBadgeClasses = isSignUp
    ? "mt-12 text-center transition-all duration-500 ease-in-out opacity-100 translate-y-0"
    : "mt-12 text-center transition-all duration-500 ease-in-out opacity-0 -translate-y-4 pointer-events-none";
  const inputClasses =
    "w-full px-4 py-3 bg-zinc-900/50 border border-zinc-800 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed";
  const inputErrorClasses =
    "border-red-500/70 focus:border-red-500/70 focus:ring-red-500/20";

  const onSubmit = async (values: AuthFormValues) => {
    setIsLoading(true);

    try {
      if (isSignUp) {
        const result = await authClient.signUp.email({
          email: values.email,
          password: values.password,
          name: values.name!,
        });

        if (result.error) {
          toast.error("Sign up failed", {
            description:
              result.error.message ||
              "An error occurred during sign up. Please try again.",
          });
          return;
        }

        toast("Account created successfully!", {
          description: "Welcome to Alterra. Redirecting to dashboard...",
        });

        router.push("/dashboard");
      } else {
        const result = await authClient.signIn.email({
          email: values.email,
          password: values.password,
        });

        if (result.error) {
          toast.error("Sign in failed", {
            description:
              result.error.message ||
              "Invalid email or password. Please try again.",
          });
          return;
        }

        toast.success("Welcome back!", {
          description: "Redirecting to dashboard...",
        });

        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Auth error:", error);
      toast.error("Something went wrong", {
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setIsGoogleLoading(true);

    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      });
    } catch (error) {
      console.error("Google auth error:", error);
      toast.error("Authentication failed", {
        description: "Unable to sign in with Google. Please try again.",
      });
      setIsGoogleLoading(false);
    }
  };

  const toggleMode = () => {
    if (isLoading || isGoogleLoading) return;

    setIsSignUp((prev) => {
      const next = !prev;
      reset({
        isSignUp: next,
        name: "",
        email: "",
        password: "",
        terms: false,
      });
      return next;
    });
  };

  const isFormDisabled = isLoading || isGoogleLoading;

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-40">
      {/* Gradient Blobs Background */}
      <GradientBlob
        className="top-1/4 right-0 w-175 h-175"
        colors="from-orange-500/30 via-pink-500/20 to-purple-500/10"
        blur="blur-3xl"
      />
      <GradientBlob
        className="bottom-1/4 left-0 w-150 h-150"
        colors="from-indigo-500/20 via-violet-500/20 to-purple-500/10"
        blur="blur-3xl"
      />

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-3 leading-tight transition-all duration-500">
            {isSignUp ? "Start Creating" : "Welcome Back"}
          </h1>
          <p className="text-2xl font-serif text-zinc-400 font-light transition-all duration-500">
            {isSignUp
              ? "Join thousands of creators using Alterra"
              : "Sign in to continue your journey"}
          </p>
        </div>

        {/* Auth Card */}
        <GlassCard glow>
          <div className="p-8">
            {/* Google Auth */}
            <button
              onClick={handleGoogleAuth}
              disabled={isFormDisabled}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white text-black rounded-full font-medium hover:bg-zinc-100 transition-all duration-300 mb-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGoogleLoading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5"
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
                  Connecting...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </>
              )}
            </button>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-800"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-zinc-950/40 text-zinc-500 uppercase tracking-wider text-xs">
                  Or {isSignUp ? "sign up" : "sign in"} with email
                </span>
              </div>
            </div>

            {/* Auth Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <input
                type="hidden"
                value={isSignUp ? "true" : "false"}
                {...register("isSignUp", {
                  setValueAs: (value) => value === true || value === "true",
                })}
              />

              {/* Name Input - Only for Sign Up */}
              <div className={collapsibleClasses}>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-zinc-400 mb-2"
                >
                  Full name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="John Doe"
                  className={`${inputClasses} ${errors.name ? inputErrorClasses : ""}`}
                  {...register("name")}
                  disabled={!isSignUp || isFormDisabled}
                />
                {isSignUp && errors.name && (
                  <p className="mt-2 text-xs text-red-400">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-zinc-400 mb-2"
                >
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="you@example.com"
                  className={`${inputClasses} ${errors.email ? inputErrorClasses : ""}`}
                  {...register("email")}
                  disabled={isFormDisabled}
                />
                {errors.email && (
                  <p className="mt-2 text-xs text-red-400">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Input */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-zinc-400"
                  >
                    Password
                  </label>
                  {!isSignUp && (
                    <Link
                      href="/forgot-password"
                      className="text-xs text-orange-400 hover:text-orange-300 transition-colors"
                      tabIndex={isFormDisabled ? -1 : 0}
                    >
                      Forgot password?
                    </Link>
                  )}
                </div>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  className={`${inputClasses} ${errors.password ? inputErrorClasses : ""}`}
                  {...register("password")}
                  disabled={isFormDisabled}
                />
                {errors.password ? (
                  <p className="mt-2 text-xs text-red-400">
                    {errors.password.message}
                  </p>
                ) : isSignUp ? (
                  <p className="mt-2 text-xs text-zinc-500">
                    Must be at least 8 characters
                  </p>
                ) : null}
              </div>

              {/* Terms Checkbox - Only for Sign Up */}
              <div className={collapsibleClasses}>
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="terms"
                    className="w-4 h-4 mt-0.5 rounded-full border-2 border-zinc-700 bg-zinc-900/50 text-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all cursor-pointer appearance-none relative
                    checked:bg-orange-500 checked:border-orange-500
                    checked:after:content-['✓'] checked:after:absolute checked:after:inset-0 checked:after:flex checked:after:items-center checked:after:justify-center checked:after:text-white checked:after:text-[10px] checked:after:font-bold
                    disabled:opacity-50 disabled:cursor-not-allowed"
                    {...register("terms")}
                    disabled={!isSignUp || isFormDisabled}
                  />
                  <label htmlFor="terms" className="ml-2 text-sm text-zinc-400">
                    I agree to the{" "}
                    <Link
                      href="/terms"
                      className="text-orange-400 hover:text-orange-300 transition-colors"
                      tabIndex={isFormDisabled ? -1 : 0}
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      className="text-orange-400 hover:text-orange-300 transition-colors"
                      tabIndex={isFormDisabled ? -1 : 0}
                    >
                      Privacy Policy
                    </Link>
                  </label>
                </div>
                {isSignUp && errors.terms && (
                  <p className="mt-2 text-xs text-red-400">
                    {errors.terms.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <LandingButton
                variant="primary"
                size="lg"
                type="submit"
                fullWidth
                disabled={isFormDisabled}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5"
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
                    {isSignUp ? "Creating account..." : "Signing in..."}
                  </span>
                ) : (
                  <span>{isSignUp ? "Create Account" : "Sign In"}</span>
                )}
              </LandingButton>
            </form>
          </div>
        </GlassCard>

        {/* Toggle Link */}
        <div className="text-center mt-6">
          <p className="text-zinc-500">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              onClick={toggleMode}
              disabled={isFormDisabled}
              className="text-orange-400 hover:text-orange-300 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSignUp ? "Sign in" : "Sign up"}
            </button>
          </p>
        </div>

        {/* Trust Badge - Only for Sign Up */}
        <div className={trustBadgeClasses}>
          <p className="text-xs text-zinc-600 uppercase tracking-wider mb-4">
            Trusted by 50,000+ creators
          </p>
          <div className="flex justify-center items-center gap-4 text-zinc-700">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L3.09 8.26 4 15.59 12 22l8-6.41.91-7.33L12 2zm0 2.42l6.46 4.82-.67 5.38L12 18.72l-5.79-4.1-.67-5.38L12 4.42z" />
            </svg>
            <span className="text-xs">SSL Encrypted</span>
            <span className="text-zinc-800">•</span>
            <span className="text-xs">GDPR Compliant</span>
          </div>
        </div>
      </div>
    </section>
  );
}
