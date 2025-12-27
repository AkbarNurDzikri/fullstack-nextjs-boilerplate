import RegisterForm from "./components/register-form";
import { Card, CardContent } from "@/components/ui/card";

export default function RegisterPage() {
  return (
    <Card className="min-h-screen flex flex-col items-center justify-center p-4 bg-zinc-50 dark:bg-black">
      <CardContent className="w-full max-w-md space-y-8 bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-xl dark:shadow-emerald-500">
        <h1 className="text-3xl text-center font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Create an account
        </h1>

        <RegisterForm />
      </CardContent>
    </Card>
  );
}
