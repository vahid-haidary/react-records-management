import type { InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

export function Input({
  label,
  error,
  id,
  className = "",
  startIcon,
  endIcon,
  ...props
}: InputProps) {
  return (
    <div className="flex w-full flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-text">
          {label}
        </label>
      )}

      <div className="relative">
        {startIcon && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
            {startIcon}
          </span>
        )}

        {endIcon && (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-muted">
            {endIcon}
          </span>
        )}

        <input
          id={id}
          className={`h-11 w-full rounded-lg border bg-background px-3 text-sm text-text outline-none transition ${
            startIcon ? "pl-10" : ""
          } ${endIcon ? "pr-10" : ""} ${
            error
              ? "border-danger"
              : "border-border focus:border-primary focus:ring-2 focus:ring-primary/10"
          } ${className}`}
          {...props}
        />
      </div>

      {error && <span className="text-xs text-danger">{error}</span>}
    </div>
  );
}
