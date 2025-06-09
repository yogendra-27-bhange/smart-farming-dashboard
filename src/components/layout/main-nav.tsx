"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  BarChart3,
  Settings,
  Bell,
  Sprout,
  Lightbulb,
  AreaChart
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

const navItems: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/crop-recommendations", label: "Crop AI", icon: Lightbulb },
  { href: "/analytics", label: "Analytics", icon: AreaChart },
  { href: "/alerts", label: "Alerts", icon: Bell },
  // { href: "/profile", label: "Profile", icon: UserIcon }, // Profile usually in UserNav or separate settings
];

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();

  return (
    <nav
      className={cn("flex flex-col space-y-2", className)}
      {...props}
    >
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-accent hover:text-accent-foreground",
            pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/dashboard")
              ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
              : "text-foreground/70"
          )}
        >
          <item.icon className="h-5 w-5" />
          <span className="font-medium">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}
