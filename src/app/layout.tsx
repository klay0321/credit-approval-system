import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "审批任务列表",
  description: "信贷风控审批流与 AI 辅助决策系统"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
