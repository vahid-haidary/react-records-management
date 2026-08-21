import { Button } from "@/shared/ui/button";
import { CiCirclePlus } from "react-icons/ci";

interface HeaderProps {
  onCreateRecord: () => void;
}

export function Header({ onCreateRecord }: HeaderProps) {
  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-sm font-bold tracking-tight text-white shadow-lg">
            BA
          </div>

          <div className="min-w-0">
            <p className="truncate text-base font-bold text-text sm:text-lg">
              پنل مدیریت
            </p>
          </div>
        </div>

        <Button
          variant="create"
          className="flex shrink-0 items-center gap-2 "
          onClick={onCreateRecord}
        >
          <span className="hidden sm:inline font-semibold">
            ایجاد رکورد جدید
          </span>
          <span className="sm:hidden font-semibold">ایجاد رکورد</span>
          <CiCirclePlus size={22} style={{ strokeWidth: 1 }} />
        </Button>
      </div>
    </header>
  );
}
