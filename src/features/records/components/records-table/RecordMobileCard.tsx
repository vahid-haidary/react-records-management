import type { RecordItem } from "../../types/record.types";
import { formatRecordDate } from "../../utils/format-record-date";
import { RecordActions } from "./RecordActions";
import { RecordStatusBadge } from "./RecordStatusBadge";

interface RecordMobileCardProps {
  record: RecordItem;
  onEdit: (record: RecordItem) => void;
  onDelete: (record: RecordItem) => void;
}

export function RecordMobileCard({
  record,
  onEdit,
  onDelete,
}: RecordMobileCardProps) {
  return (
    <article className="rounded-xl border border-border bg-surface p-4 shadow-sm md:hidden">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <img
            src={record.image.url}
            alt={record.image.alt}
            loading="lazy"
            className="h-14 w-20 shrink-0 rounded-lg border border-border object-cover"
          />

          <div className="min-w-0">
            <p className="mb-1 text-xs text-text-muted">شناسه #{record.id}</p>

            <h3
              title={record.title}
              className="truncate text-sm font-semibold text-text"
            >
              {record.title}
            </h3>
          </div>
        </div>

        <RecordStatusBadge record={record} />
      </div>

      <div className="mb-4">
        <p className="mb-1 text-xs font-medium text-text-muted">توضیحات</p>

        <p
          title={record.description}
          className="line-clamp-3 text-sm leading-6 text-text"
        >
          {record.description}
        </p>
      </div>

      <div className="mb-4 flex items-center justify-between border-t border-border pt-3">
        <span className="text-xs text-text-muted">تاریخ ایجاد</span>

        <span className="text-xs font-medium text-text">
          {formatRecordDate(record.created_at)}
        </span>
      </div>

      <RecordActions record={record} onEdit={onEdit} onDelete={onDelete} />
    </article>
  );
}
