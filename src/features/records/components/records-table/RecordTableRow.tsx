import type { RecordItem } from "../../types/record.types";
import { formatRecordDate } from "../../utils/format-record-date";
import { RecordActions } from "./RecordActions";
import { RecordStatusBadge } from "./RecordStatusBadge";

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
    <tr className="hidden border-b border-border transition-colors last:border-b-0 hover:bg-background/70 md:table-row">
      <td className="px-4 py-4 align-middle text-sm font-medium text-text">
        {record.id}
      </td>

      <td className="px-4 py-4 align-middle">
        <img
          src={record.image.url}
          alt={record.image.alt}
          loading="lazy"
          className="h-12 w-16 rounded-lg border border-border object-cover"
        />
      </td>

      <td className="px-4 py-4 align-middle">
        <p
          title={record.title}
          className="max-w-52 truncate text-base font-semibold text-text"
        >
          {record.title}
        </p>
      </td>

      <td className="px-4 py-4 align-middle">
        <p
          title={record.description}
          className="line-clamp-2 max-w-md text-sm leading-6 text-text-muted"
        >
          {record.description}
        </p>
      </td>

      <td className="px-4 py-4 align-middle">
        <RecordStatusBadge record={record} />
      </td>

      <td className="px-4 py-4 align-middle text-sm text-text-muted">
        {formatRecordDate(record.created_at)}
      </td>

      <td className="px-4 py-4 align-middle">
        <RecordActions record={record} onEdit={onEdit} onDelete={onDelete} />
      </td>
    </tr>
  );
}
