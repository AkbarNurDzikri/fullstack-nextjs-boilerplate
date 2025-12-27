"use server";

import { comparePassword, encrypt } from "@/lib/auth.utils";
import prisma from "@/lib/prisma";
import { getUserWithPermissions } from "@/lib/rbac";
import { cookies } from "next/headers";

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || !(await comparePassword(password, user.password))) {
    return { error: "Invalid credentials" };
  }

  const userWithPerms = await getUserWithPermissions(user.id);
  if (!userWithPerms) return { error: "User data not found" };

  // Verify email status
  if (!user.emailVerified) {
    return { error: "Please verify your email before logging in." };
  }

  // Verify account is active
  if (!user.isActive) {
    return {
      error: "Your account has been deactivated. Please contact administrator.",
    };
  }

  const expires = new Date(Date.now() + 2 * 60 * 60 * 1000);
  const session = await encrypt({ userId: user.id, expires });

  // Update last login
  await prisma.user.update({
    where: { id: user.id },
    data: { lastLogin: new Date() },
  });

  (await cookies()).set("session", session, { expires, httpOnly: true });

  return { success: true, user: userWithPerms };
}
