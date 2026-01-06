import * as React from "react";
import { cn } from "@sglara/cn";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const variants = {
      primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
      secondary:
        "bg-slate-100 text-slate-900 hover:bg-slate-200 focus:ring-slate-400",
      ghost: "bg-transparent text-slate-700 hover:bg-slate-100",
      danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    };

    const sizes = {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-4 text-sm",
      lg: "h-12 px-6 text-base",
    };

    console.log(props.type);

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          // base
          "inline-flex items-center justify-center rounded-md font-medium",
          "transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1",
          "disabled:cursor-not-allowed disabled:opacity-50",

          // variant & size
          variants[variant],
          sizes[size],

          className
        )}
        {...props}
      >
        {loading && (
          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
