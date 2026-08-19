import type { ReactNode } from "react";
import { Header } from "./header";

interface AppLayoutProps {
  children: ReactNode;
  onCreateRecord: () => void;
}

export function AppLayout({ children, onCreateRecord }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header onCreateRecord={onCreateRecord} />

      <main>{children}</main>
    </div>
  );
}
