"use client";

import { useForgotPasswordForm } from "./hooks/use-forgot-password.form";
import { EmailSentCard } from "./components/email-sent-card";
import { ForgotPasswordForm } from "./components/forgot-password-form";
import { useForgotPassword } from "./hooks/use-forgot-password";
import { AuthHeader } from "../components/auth-header";
import Image from "next/image";

export default function ForgotPasswordPage() {
  const { emailSent, setEmailSent } = useForgotPassword();
  const { form } = useForgotPasswordForm();

  if (emailSent) {
    return (
      <>
        <AuthHeader />
        <EmailSentCard email={form.getValues("email")} />
      </>
    );
  }

  return (
    <div className="min-h-screen flex bg-zinc-50 dark:bg-black">
      <AuthHeader />

      {/* Left Side - Hero Image */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-primary/10 via-primary/5 to-transparent items-center justify-center p-16">
        <div className="relative w-full h-full max-w-2xl animate-in fade-in-50 duration-700">
          <div className="absolute inset-0 bg-primary/5 rounded-3xl blur-3xl"></div>
          <div className="relative">
            <Image
              src="/forgot-password-hero.png"
              alt="Password recovery"
              width={800}
              height={800}
              className="w-full h-auto rounded-2xl shadow-2xl shadow-primary/20 dark:shadow-primary/40 hover:scale-105 transition-transform duration-500"
              priority
            />
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4">
        <ForgotPasswordForm form={form} setEmailSent={setEmailSent} />
      </div>
    </div>
  );
}
