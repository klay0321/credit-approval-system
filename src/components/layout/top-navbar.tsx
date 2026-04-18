"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { clearMockLogin, getMockRole, getMockUserName, UserRole } from "@/lib/mock-auth";

export function TopNavbar() {
  const router = useRouter();
  const [currentRole, setCurrentRole] = useState<UserRole | null>(null);
  const [currentUserName, setCurrentUserName] = useState<string | null>(null);

  useEffect(() => {
    setCurrentRole(getMockRole());
    setCurrentUserName(getMockUserName());
  }, []);

  function handleLogout() {
    clearMockLogin();
    router.push("/login");
  }

  return (
    <header className="rounded-3xl border border-white/70 bg-white/85 p-5 shadow-[0_18px_60px_-30px_rgba(15,23,42,0.32)] backdrop-blur">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="text-sm font-medium tracking-[0.18em] text-brand-700">
            CREDIT APPROVAL SYSTEM
          </div>
          <h1 className="mt-2 text-2xl font-semibold text-slate-900">
            信贷风控审批流与 AI 辅助决策系统
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <InfoPill label="当前角色" value={currentRole ?? "未登录"} />
          <InfoPill label="当前用户" value={currentUserName ?? "未设置"} />
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-700"
          >
            退出登录
          </button>
        </div>
      </div>
    </header>
  );
}

function InfoPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700">
      {label}：{value}
    </div>
  );
}
