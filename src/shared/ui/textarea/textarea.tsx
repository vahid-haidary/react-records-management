import type { TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function Textarea({
  label,
  error,
  id,
  className = "",
  ...props
}: TextareaProps) {
  return (
    <div className="flex w-full flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-text">
          {label}
        </label>
      )}

      <textarea
        id={id}
        className={`min-h-32 w-full resize-y rounded-lg border bg-background px-3 py-2.5 text-sm leading-6 text-text outline-none transition-colors placeholder:text-text-muted ${
          error
            ? "border-danger focus:border-danger"
            : "border-border focus:border-primary focus:ring-2 focus:ring-primary/10"
        } disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
        {...props}
      />

      {error && (
        <p className="text-xs text-danger" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
