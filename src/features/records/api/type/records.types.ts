export interface RecordApiStatus {
  key: string;
  value: string;
}

export interface RecordApiImage {
  url: string;
  alt: string;
}

export interface RecordApiItem {
  id: number;
  title: string;
  description: string;
  status: RecordApiStatus;
  image: RecordApiImage;
  created_at: string;
  updated_at: string;
}

export interface RecordApiFilterOption {
  key: string;
  value: string;
}

export interface RecordApiFilter {
  key: string;
  label: string;
  type: "text" | "select";
  multiple: boolean;
  options: RecordApiFilterOption[];
}

export interface RecordsApiResponse {
  data: RecordApiItem[];
  filters: RecordApiFilter[];
}
