import { CiEdit, CiTrash } from "react-icons/ci";

import { Button } from "@/shared/ui/button";
import type { RecordItem } from "../../types/record.types";

interface RecordsTableRowProps {
  record: RecordItem;
  onEdit: (record: RecordItem) => void;
  onDelete: (record: RecordItem) => void;
}

export function RecordsTableRow({
  record,
  onEdit,
  onDelete,
}: RecordsTableRowProps) {
  return (
    <>
      {/* Desktop Row */}
      <tr className="hidden border-b border-border last:border-b-0 transition-colors hover:bg-background/70 md:table-row">
        {/* ID */}
        <td className="px-4 py-4 align-middle text-sm font-medium text-text">
          {record.id}
        </td>

        {/* Image */}
        <td className="px-4 py-4 align-middle">
          <img
            src={record.image.url}
            alt={record.image.alt}
            loading="lazy"
            className="h-12 w-16 rounded-lg border border-border object-cover"
          />
        </td>

        {/* Title */}
        <td className="px-4 py-4 align-middle">
          <p
            title={record.title}
            className="max-w-52 truncate text-sm font-semibold text-text"
          >
            {record.title}
          </p>
        </td>

        {/* Description */}
        <td className="px-4 py-4 align-middle">
          <p
            title={record.description}
            className="line-clamp-2 max-w-md text-sm leading-6 text-text-muted"
          >
            {record.description}
          </p>
        </td>

        {/* Status */}
        <td className="px-4 py-4 align-middle">
          <StatusBadge record={record} />
        </td>

        {/* Created At */}
        <td className="px-4 py-4 align-middle text-sm text-text-muted">
          {formatDate(record.created_at)}
        </td>

        {/* Actions */}
        <td className="px-4 py-4 align-middle">
          <Actions record={record} onEdit={onEdit} onDelete={onDelete} />
        </td>
      </tr>

      {/* Mobile Card */}
      <article className="rounded-xl border border-border bg-surface p-4 shadow-sm md:hidden">
        {/* Card Header */}
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

          <StatusBadge record={record} />
        </div>

        {/* Description */}
        <div className="mb-4">
          <p className="mb-1 text-xs font-medium text-text-muted">توضیحات</p>

          <p
            title={record.description}
            className="line-clamp-3 text-sm leading-6 text-text"
          >
            {record.description}
          </p>
        </div>

        {/* Created At */}
        <div className="mb-4 flex items-center justify-between border-t border-border pt-3">
          <span className="text-xs text-text-muted">تاریخ ایجاد</span>

          <span className="text-xs font-medium text-text">
            {formatDate(record.created_at)}
          </span>
        </div>

        {/* Actions */}
        <Actions record={record} onEdit={onEdit} onDelete={onDelete} />
      </article>
    </>
  );
}

interface StatusBadgeProps {
  record: RecordItem;
}

function StatusBadge({ record }: StatusBadgeProps) {
  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-success/10 px-2.5 py-1 text-xs font-medium text-success">
      <span className="h-1.5 w-1.5 rounded-full bg-success" />
      {record.status.value}
    </span>
  );
}
interface ActionsProps {
  record: RecordItem;
  onEdit: (record: RecordItem) => void;
  onDelete: (record: RecordItem) => void;
}

function Actions({ record, onEdit, onDelete }: ActionsProps) {
  return (
    <div className="flex items-center justify-between w-full *:w-full gap-2">
      <Button
        type="button"
        variant="secondary"
        onClick={() => onEdit(record)}
        className="min-h-10 gap-1.5 px-3 text-sm"
      >
        <CiEdit size={19} aria-hidden="true" />
        <span>ویرایش</span>
      </Button>

      <Button
        type="button"
        variant="danger"
        onClick={() => onDelete(record)}
        className="min-h-10 gap-1.5 px-3 text-sm"
      >
        <CiTrash size={19} aria-hidden="true" />
        <span>حذف</span>
      </Button>
    </div>
  );
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(date));
}
