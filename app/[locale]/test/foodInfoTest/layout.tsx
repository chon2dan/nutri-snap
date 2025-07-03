import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>; // 최소한이라도 이렇게
}
