"use client";

import Link from "next/link";
import { useRouter } from "next/router";
import { cn } from "@sglara/cn";

type NavLinkProps = {
  children: React.ReactNode;
  href: string;
  className?: string;
  lineColor?: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export default function NavLink({
  children,
  href,
  className = "",
  lineColor = "bg-indigo-600",
  ...props
}: NavLinkProps) {
  const router = useRouter();
  const path = router.asPath.split("?")[0];
  const isActive = path === href || (href !== "/" && path.startsWith(href));

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "text-lg group relative w-max",
        className,
        isActive && "font-bold"
      )}
      {...props}
    >
      <span>{children}</span>
      <span
        className={`absolute -bottom-1 left-1/2 h-0.5 ${lineColor} transition-all ${
          isActive ? "w-3/6" : "w-0 group-hover:w-3/6"
        }`}
      ></span>
      <span
        className={`absolute -bottom-1 right-1/2 h-0.5 ${lineColor} transition-all ${
          isActive ? "w-3/6" : "w-0 group-hover:w-3/6"
        }`}
      ></span>
    </Link>
  );
}
