import { customAlphabet } from "nanoid";

const generateShortId = customAlphabet("0123456789", 4);

export function generateId(): number {
  return Number(generateShortId());
}
