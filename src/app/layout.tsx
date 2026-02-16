import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "🦞 가재 에이전트 대시보드",
  description: "Agent Status Monitoring Dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className="dark">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
