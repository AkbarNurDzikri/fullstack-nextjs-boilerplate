"use client";

import { useState } from "react";
import { Eye, EyeClosed, EyeOff } from "lucide-react";
import { FormInput } from "./form-controls";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

interface PasswordInputProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function PasswordInput<T extends FieldValues>({
  form,
  name,
  label = "Password",
  placeholder = "••••••••",
  disabled,
  className,
}: PasswordInputProps<T>) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormInput
      form={form}
      name={name}
      label={label}
      type={showPassword ? "text" : "password"}
      placeholder={placeholder}
      disabled={disabled}
      className={className}
      suffixIcon={
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="cursor-pointer hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors pointer-events-auto"
          tabIndex={-1}
        >
          {showPassword ? (
            <Eye className="h-5 w-5" />
          ) : (
            <EyeClosed className="h-5 w-5" />
          )}
        </button>
      }
    />
  );
}
