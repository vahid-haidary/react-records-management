import type { RecordModel } from "../model/record.model";

interface Overrides {
  created: RecordModel[];
  edited: Record<number, Partial<RecordModel>>;
  deletedIds: number[];
}

export function mergeRecords(
  apiRecords: RecordModel[],
  overrides: Overrides,
): RecordModel[] {
  const withoutDeleted = apiRecords.filter(
    (record) => !overrides.deletedIds.includes(record.id),
  );

  const withEdits = withoutDeleted.map((record) => {
    const patch = overrides.edited[record.id];
    return patch ? { ...record, ...patch } : record;
  });

  return [...overrides.created, ...withEdits];
}
