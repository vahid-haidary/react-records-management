interface RecordsPageHeaderProps {
  totalRecords: number;
}

export function RecordsPageHeader({ totalRecords }: RecordsPageHeaderProps) {
  return (
    <section className="flex items-start justify-between w-full">
      <div className="mb-6 flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-bold text-text sm:text-3xl">
            مدیریت رکوردها
          </h1>
        </div>

        <p className="text-sm text-text-muted">
          در این بخش می‌توانید رکوردهای سیستم را مشاهده و مدیریت کنید.
        </p>
      </div>
      <div className="flex items-center gap-1 rounded-2xl px-3 py-1 text-lg font-medium bg-surface shadow-2xl">
        <span className="text-3xl font-bold">
          {totalRecords.toLocaleString("fa-IR")}
        </span>
        رکورد
      </div>
    </section>
  );
}
