export function getTotalPages(totalRecords: number, pageSize: number): number {
  if (totalRecords === 0) {
    return 1;
  }

  return Math.ceil(totalRecords / pageSize);
}
