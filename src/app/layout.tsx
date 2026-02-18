import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "🦞 가재 에이전트 대시보드",
  description: "가재 컴퍼니 에이전트 상태 모니터링 대시보드 - 실시간 상태, 타임라인, 로그 피드",
  keywords: ["agent", "dashboard", "monitoring", "가재"],
  openGraph: {
    title: "🦞 가재 에이전트 대시보드",
    description: "에이전트 상태 모니터링 대시보드",
    type: "website",
    locale: "ko_KR",
  },
  robots: { index: true, follow: true },
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className="dark">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
