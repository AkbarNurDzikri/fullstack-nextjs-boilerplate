import { MenuItem } from "@/types/nav";
import {
  LayoutDashboard,
  Database,
  ShieldCheck,
  Users,
  Settings,
} from "lucide-react";

export const menuItems: MenuItem[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    permission: "dashboard:read",
  },
  {
    name: "Master",
    icon: Database,
    children: [
      {
        name: "Users",
        href: "/users",
        icon: Users,
        permission: "user:read",
      },
      {
        name: "Roles",
        href: "/roles",
        icon: ShieldCheck,
        permission: "role:read",
      },
    ],
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
    permission: "dashboard:read", // Assuming standard access for settings
  },
];
