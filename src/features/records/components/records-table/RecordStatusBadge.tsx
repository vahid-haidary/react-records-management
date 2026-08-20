import type { RecordItem } from "../../types/record.types";

interface RecordStatusBadgeProps {
  record: RecordItem;
}

export function RecordStatusBadge({ record }: RecordStatusBadgeProps) {
  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-success/10 px-2.5 py-1 text-xs font-medium text-success">
      <span className="h-1.5 w-1.5 rounded-full bg-success" />
      {record.status.value}
    </span>
  );
}
