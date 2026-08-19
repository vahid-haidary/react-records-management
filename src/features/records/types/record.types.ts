export interface RecordStatus {
  key: string;
  value: string;
}

export interface RecordImage {
  url: string;
  alt: string;
}

export interface RecordItem {
  id: number;
  title: string;
  description: string;
  status: RecordStatus;
  image: RecordImage;
  created_at: string;
  updated_at: string;
}

export interface RecordFilterOption {
  key: string;
  value: string;
}

export interface RecordFilter {
  key: string;
  label: string;
  type: "text" | "select";
  multiple: boolean;
  options: RecordFilterOption[];
}

export interface RecordsResponse {
  data: RecordItem[];
  filters: RecordFilter[];
}
