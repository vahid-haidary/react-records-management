import type { RecordItem } from "../../types/record.types";
import { RecordsTableRow } from "./record-table-row";

interface RecordsTableProps {
  records: RecordItem[];
  onEdit: (record: RecordItem) => void;
  onDelete: (record: RecordItem) => void;
}

export function RecordsTable({ records, onEdit, onDelete }: RecordsTableProps) {
  return (
    <div className="w-full">
      {/* Desktop */}
      <div className="hidden overflow-hidden rounded-xl border border-border bg-surface md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-245 border-collapse text-right">
            <thead>
              <tr className="border-b border-border bg-background">
                <th className="w-20 px-4 py-4 text-xs font-semibold text-text-muted">
                  شناسه
                </th>

                <th className="w-24 px-4 py-4 text-xs font-semibold text-text-muted">
                  تصویر
                </th>

                <th className="min-w-48 px-4 py-4 text-xs font-semibold text-text-muted">
                  عنوان
                </th>

                <th className="min-w-72 px-4 py-4 text-xs font-semibold text-text-muted">
                  توضیحات
                </th>

                <th className="w-28 px-4 py-4 text-xs font-semibold text-text-muted">
                  وضعیت
                </th>

                <th className="w-36 px-4 py-4 text-xs font-semibold text-text-muted">
                  تاریخ ایجاد
                </th>

                <th className="w-32 px-4 py-4 text-xs font-semibold text-text-muted">
                  عملیات
                </th>
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

      {/* Mobile */}
      <div className="flex flex-col gap-3 md:hidden">
        {records.map((record) => (
          <RecordsTableRow
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
