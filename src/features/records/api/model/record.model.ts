export type RecordStatusKey = "active" | "inactive" | "pending";

export interface RecordModel {
  id: number;
  title: string;
  description: string;

  status: {
    key: RecordStatusKey;
    label: string;
  };

  image: {
    url: string;
    alt: string;
  };

  createdAt: string;
  updatedAt: string;
}
