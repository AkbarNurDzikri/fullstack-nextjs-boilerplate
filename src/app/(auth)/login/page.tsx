import LoginForm from "./components/login-form";
import { Card, CardContent } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <Card className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-black p-4">
      <CardContent className="bg-white dark:bg-zinc-900 shadow-lg dark:shadow-emerald-500 p-6 rounded-xl">
        <div className="text-center mb-5">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Welcome back
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">
            Enter your credentials to access your account
          </p>
        </div>

        <LoginForm />
      </CardContent>
    </Card>
  );
}
