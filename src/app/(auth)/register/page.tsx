import RegisterForm from "./components/register-form";
import { Card, CardContent } from "@/components/ui/card";
import { AuthHeader } from "../components/auth-header";
import Image from "next/image";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex bg-zinc-50 dark:bg-black">
      <AuthHeader />

      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 order-2 lg:order-1">
        <Card className="w-full max-w-md border-none shadow-none bg-transparent">
          <CardContent className="bg-white dark:bg-zinc-900 shadow-xl dark:shadow-primary/40 p-8 rounded-3xl">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-2">
                Create an account
              </h1>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                Join us today and start your journey
              </p>
            </div>

            <RegisterForm />
          </CardContent>
        </Card>
      </div>

      {/* Right Side - Hero Image */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-bl from-primary/10 via-primary/5 to-transparent items-center justify-center p-16 order-1 lg:order-2">
        <div className="relative w-full h-full max-w-2xl animate-in fade-in-50 duration-700 delay-150">
          <div className="absolute inset-0 bg-primary/5 rounded-3xl blur-3xl"></div>
          <div className="relative">
            <Image
              src="/register-hero.png"
              alt="Join our community"
              width={800}
              height={800}
              className="w-full h-auto rounded-2xl shadow-2xl shadow-primary/20 dark:shadow-primary/40 hover:scale-105 transition-transform duration-500"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
