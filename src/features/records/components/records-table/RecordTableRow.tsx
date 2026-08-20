import type { RecordModel } from "../../api/model/record.model";
import { formatRecordDate } from "../../utils/format-record-date";
import { RecordActions } from "./RecordActions";
import { RecordStatusBadge } from "./RecordStatusBadge";
import defaultImage from "@/assets/logo-default.png";

interface RecordsTableRowProps {
  record: RecordModel;
  onEdit: (record: RecordModel) => void;
  onDelete: (record: RecordModel) => void;
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
          src={record.image.url || "/src/assets/logo-default.png"}
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
        {formatRecordDate(record.createdAt)}
      </td>

      <td className="px-4 py-4 align-middle">
        <RecordActions record={record} onEdit={onEdit} onDelete={onDelete} />
      </td>
    </tr>
  );
}
