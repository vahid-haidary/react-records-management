import { RecordsFilters } from "@/features/records/components/records-filters";
import { RecordsPageHeader } from "@/features/records/components/records-page-header";
import { RecordsPagination } from "@/features/records/components/records-pagination";
import { RecordsTable } from "@/features/records/components/records-table";
import type { RecordItem } from "@/features/records/types/record.types";

interface RecordsPageProps {
  onDelete: (record: RecordItem) => void;
}

const recordsMock: RecordItem[] = [
  {
    id: 1,
    title: "مدیریت کاربران",
    description:
      "این بخش برای مشاهده، بررسی و مدیریت اطلاعات ثبت‌شده در سامانه طراحی شده است.",
    status: {
      key: "active",
      value: "فعال",
    },
    image: {
      url: "https://picsum.photos/seed/react-record-1/600/400",
      alt: "تصویر کاربران",
    },
    created_at: "2026-07-01T05:30:00.000000Z",
    updated_at: "2026-07-01T14:17:29.052511Z",
  },
  {
    id: 2,
    title: "گزارش فروش",
    description:
      "در این قسمت اطلاعات مرتبط با فعالیت‌های کاربران و عملکرد بخش‌های مختلف سامانه نمایش داده می‌شود.",
    status: {
      key: "inactive",
      value: "غیرفعال",
    },
    image: {
      url: "https://picsum.photos/seed/react-record-2/600/400",
      alt: "تصویر گزارش فروش",
    },
    created_at: "2026-07-02T05:30:00.000000Z",
    updated_at: "2026-07-02T14:17:29.052511Z",
  },
];

export function RecordsPage({ onDelete }: RecordsPageProps) {
  const handleEdit = (record: RecordItem) => {
    console.log("Edit:", record);
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <RecordsPageHeader totalRecords={recordsMock.length} />

      <RecordsFilters
        search=""
        status=""
        onSearchChange={() => {}}
        onStatusChange={() => {}}
        onClear={() => {}}
      />

      <RecordsTable
        records={recordsMock}
        onEdit={handleEdit}
        onDelete={onDelete}
      />

      <RecordsPagination
        currentPage={1}
        totalPages={1}
        totalRecords={recordsMock.length}
        pageSize={10}
        pageSizeOptions={[5, 10, 20]}
        onPageChange={() => {}}
        onPageSizeChange={() => {}}
      />
    </main>
  );
}
