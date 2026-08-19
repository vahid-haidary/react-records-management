import { Button } from "@/shared/ui/button";

interface HeaderProps {
  onCreateRecord: () => void;
}

export function Header({ onCreateRecord }: HeaderProps) {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">
            پ
          </div>

          <span className="text-base font-bold text-gray-900 sm:text-lg">
            پنل مدیریت
          </span>
        </div>

        <Button onClick={onCreateRecord}>ایجاد رکورد جدید</Button>
      </div>
    </header>
  );
}
