export const PERMISSIONS = [
  { name: "user:read", description: "melihat daftar user" },
  { name: "user:assign", description: "mengassign role ke user" },
  {
    name: "user:activation",
    description: "mengaktifkan / menonaktifkan user",
  },
  { name: "role:read", description: "melihat daftar role" },
  { name: "role:create", description: "membuat role baru" },
  { name: "role:manage", description: "mengelola role dan permission" },
  { name: "role:delete", description: "menghapus role" },
  { name: "dashboard:read", description: "mengakses halaman dashboard" },
] as const;

export type PermissionName = (typeof PERMISSIONS)[number]["name"];

export const SUPER_ADMIN_EMAIL = "admin@alakbar.com";
export const SUPER_ADMIN_ROLE = "SUPER_ADMIN";
