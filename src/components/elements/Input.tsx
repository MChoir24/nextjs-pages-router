import * as React from "react";
import { cn } from "@sglara/cn";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          // base style
          "flex h-10 w-full rounded-md border bg-white px-3 py-2 text-sm",
          "placeholder:text-slate-400",
          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1",
          "disabled:cursor-not-allowed disabled:opacity-50",

          // normal / error state
          error ? "border-red-500 focus:ring-red-500" : "border-slate-300",

          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
