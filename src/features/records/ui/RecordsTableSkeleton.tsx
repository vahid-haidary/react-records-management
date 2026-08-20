import { Skeleton } from "@/shared/ui/skeleton";
import { SKELETON_ROWS } from "../constants/records.constants";

export function RecordsTableSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface">
      {/* desktop table */}
      <div className="hidden md:block">
        <div className="border-b border-border px-4 py-4">
          <div className="grid grid-cols-[80px_80px_1.2fr_2fr_120px_140px_140px] items-center gap-4">
            <Skeleton className="h-4 w-10" />
            <Skeleton className="h-4 w-10" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>

        {Array.from({ length: SKELETON_ROWS }).map((_, index) => (
          <div
            key={index}
            className="grid grid-cols-[80px_80px_1.2fr_2fr_120px_140px_140px] items-center gap-4 border-b border-border px-4 py-4 last:border-b-0"
          >
            <Skeleton className="h-4 w-10" />

            <Skeleton className="h-12 w-16 rounded-lg" />

            <Skeleton className="h-5 w-28" />

            <div className="space-y-2">
              <Skeleton className="h-3 w-full max-w-xs" />
              <Skeleton className="h-3 w-3/4 max-w-xs" />
            </div>

            <Skeleton className="h-6 w-20 rounded-full" />

            <Skeleton className="h-4 w-24" />

            <div className="flex gap-2">
              <Skeleton className="h-9 w-9 rounded-lg" />
              <Skeleton className="h-9 w-9 rounded-lg" />
            </div>
          </div>
        ))}
      </div>

      {/* mobile sizwe */}
      <div className="space-y-4 p-4 md:hidden">
        {Array.from({ length: SKELETON_ROWS }).map((_, index) => (
          <div key={index} className="rounded-xl border border-border p-4">
            <div className="mb-4 flex items-center gap-3">
              <Skeleton className="h-14 w-20 rounded-lg" />

              <div className="flex-1 space-y-2">
                <Skeleton className="h-3 w-12" />
                <Skeleton className="h-4 w-28" />
              </div>

              <Skeleton className="h-6 w-16 rounded-full" />
            </div>

            <div className="mb-4 space-y-2">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-4/5" />
            </div>

            <div className="mb-4 flex justify-between border-t border-border pt-3">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-3 w-20" />
            </div>

            <div className="flex gap-2">
              <Skeleton className="h-10 flex-1 rounded-lg" />
              <Skeleton className="h-10 flex-1 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
