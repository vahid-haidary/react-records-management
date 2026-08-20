import type { RecordModel } from "../model/record.model";
import { generateId } from "@/shared/utils/generate-id";

const STORAGE_KEY = "records-overrides";

interface RecordsOverrides {
  created: RecordModel[];
  edited: Record<number, Partial<RecordModel>>;
  deletedIds: number[];
}

function getEmptyOverrides(): RecordsOverrides {
  return { created: [], edited: {}, deletedIds: [] };
}

function readOverrides(): RecordsOverrides {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : getEmptyOverrides();
  } catch {
    return getEmptyOverrides();
  }
}

function writeOverrides(overrides: RecordsOverrides) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
}

export const RecordsStorage = {
  getOverrides: readOverrides,

  addCreated(record: RecordModel) {
    const overrides = readOverrides();
    overrides.created.unshift(record);
    writeOverrides(overrides);
  },

  addEdited(id: number, patch: Partial<RecordModel>) {
    const overrides = readOverrides();

    const createdIndex = overrides.created.findIndex((r) => r.id === id);

    if (createdIndex !== -1) {
      overrides.created[createdIndex] = {
        ...overrides.created[createdIndex],
        ...patch,
      };
    } else {
      overrides.edited[id] = {
        ...overrides.edited[id],
        ...patch,
      };
    }

    writeOverrides(overrides);
  },

  addDeleted(id: number) {
    const overrides = readOverrides();

    overrides.created = overrides.created.filter((r) => r.id !== id);
    delete overrides.edited[id];

    if (!overrides.deletedIds.includes(id)) {
      overrides.deletedIds.push(id);
    }

    writeOverrides(overrides);
  },

  generateId,
};
