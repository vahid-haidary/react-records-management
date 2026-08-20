import type { RecordModel } from "../../api/model/record.model";

interface RecordStatusBadgeProps {
  record: RecordModel;
}

export function RecordStatusBadge({ record }: RecordStatusBadgeProps) {
  const statusStyles = {
    active: {
      badge: "bg-success/10 text-success",
      dot: "bg-success",
    },
    inactive: {
      badge: "bg-danger/10 text-danger",
      dot: "bg-danger",
    },
    pending: {
      badge: "bg-warning/10 text-warning",
      dot: "bg-warning",
    },
  } as const;

  const styles = statusStyles[record.status.key];

  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-sm font-medium ${styles.badge}`}
    >
      {record.status.label}
    </span>
  );
}
