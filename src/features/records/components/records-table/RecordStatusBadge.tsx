import type { RecordItem } from "../../types/record.types";
interface RecordStatusBadgeProps {
  record: RecordItem;
}

export function RecordStatusBadge({ record }: RecordStatusBadgeProps) {
  const isActive = record.status.key === "active";

  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-sm font-medium ${
        isActive ? "bg-success/10 text-success" : "bg-danger/10 text-danger"
      }`}
    >
      {record.status.value}
    </span>
  );
}
