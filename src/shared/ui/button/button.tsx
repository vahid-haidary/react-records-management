import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode;
  isLoading?: boolean;
}

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost" | "create";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-blue-600 text-white hover:bg-blue-700",
  secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
  danger: "bg-red-600 text-white hover:bg-red-700",
  ghost: "bg-transparent text-gray-700 hover:bg-gray-100",
  create: "bg-blue-700 text-white hover:bg-blue-600",
};

export function Button({
  variant = "primary",
  children,
  isLoading = false,
  disabled,
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={`
        inline-flex
        cursor-pointer
        items-center
        justify-center
        rounded-lg
        px-4
        py-2
        text-sm
        font-medium
        transition-colors
        disabled:cursor-not-allowed
        disabled:opacity-50
        ${variantClasses[variant]}
        ${className}
      `}
      {...props}
    >
      {isLoading ? "در حال پردازش..." : children}
    </button>
  );
}
