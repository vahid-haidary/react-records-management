import type { ReactNode } from "react";

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-gray-300 p-10 text-center">
      <h3 className="text-base font-semibold text-gray-900">{title}</h3>

      {description && (
        <p className="max-w-md text-sm text-gray-500">{description}</p>
      )}

      {action}
    </div>
  );
}
