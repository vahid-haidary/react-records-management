import { CiEdit, CiTrash } from "react-icons/ci";

import { Button } from "@/shared/ui/button";
import type { RecordModel } from "../../api/model/record.model";

interface RecordActionsProps {
  record: RecordModel;
  onEdit: (record: RecordModel) => void;
  onDelete: (record: RecordModel) => void;
}

export function RecordActions({
  record,
  onEdit,
  onDelete,
}: RecordActionsProps) {
  return (
    <div className="flex w-full items-center justify-between gap-2 *:w-full">
      <Button
        type="button"
        variant="secondary"
        onClick={() => onEdit(record)}
        className="min-h-10 gap-1.5 px-3 text-sm"
      >
        <CiEdit size={19} />
        <span>ویرایش</span>
      </Button>

      <Button
        type="button"
        variant="danger"
        onClick={() => onDelete(record)}
        className="min-h-10 gap-1.5 px-3 text-sm"
      >
        <CiTrash size={19} />
        <span>حذف</span>
      </Button>
    </div>
  );
}
