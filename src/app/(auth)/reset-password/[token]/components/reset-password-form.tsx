"use client";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/form-controls";
import Link from "next/link";
import { useResetPasswordMutation } from "../hooks/use-reset-password.mutation";
import { Loader2 } from "lucide-react";
import { useResetPasswordForm } from "../hooks/use-reset-password.form";

export function ResetPasswordForm() {
  const { form } = useResetPasswordForm();
  const { mutate, isPending } = useResetPasswordMutation();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => mutate(data))}
        className="space-y-4"
      >
        <FormInput
          name="password"
          label="New Password"
          type="password"
          placeholder="••••••••"
          form={form}
          disabled={isPending}
        />
        <FormInput
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="••••••••"
          form={form}
          disabled={isPending}
        />

        <Button
          type="submit"
          size="lg"
          disabled={isPending}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-all shadow-lg shadow-emerald-200 dark:shadow-none flex items-center justify-center gap-2 hover:cursor-pointer"
        >
          {isPending && <Loader2 className="animate-spin" size={20} />}
          Reset Password
        </Button>

        <div className="text-center text-sm">
          <Link
            href="/login"
            className="font-semibold text-emerald-600 hover:text-emerald-500"
          >
            Back to Login
          </Link>
        </div>
      </form>
    </Form>
  );
}
