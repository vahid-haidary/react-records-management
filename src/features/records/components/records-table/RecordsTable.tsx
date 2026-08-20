import type { RecordItem } from "../../types/record.types";
import { RecordsTableRow } from "./RecordTableRow";
import { RecordMobileCard } from "./RecordMobileCard";

interface RecordsTableProps {
  records: RecordItem[];
  onEdit: (record: RecordItem) => void;
  onDelete: (record: RecordItem) => void;
}

const COLUMNS = [
  { label: "شناسه", className: "w-20" },
  { label: "تصویر", className: "w-24" },
  { label: "عنوان", className: "min-w-48" },
  { label: "توضیحات", className: "min-w-72" },
  { label: "وضعیت", className: "w-28" },
  { label: "تاریخ ایجاد", className: "w-36" },
  { label: "عملیات", className: "w-32" },
] as const;

export function RecordsTable({ records, onEdit, onDelete }: RecordsTableProps) {
  return (
    <div className="w-full">
      {/* desktop size */}
      <div className="hidden overflow-hidden rounded-xl border border-border bg-surface md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-245 border-collapse text-right">
            <thead>
              <tr className="border-b border-border bg-background">
                {COLUMNS.map(({ label, className }) => (
                  <th
                    key={label}
                    className={`${className} px-4 py-4 text-sm font-semibold text-text-muted`}
                  >
                    {label}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {records.map((record) => (
                <RecordsTableRow
                  key={record.id}
                  record={record}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* mobile card */}
      <div className="flex flex-col gap-3 md:hidden">
        {records.map((record) => (
          <RecordMobileCard
            key={record.id}
            record={record}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}
