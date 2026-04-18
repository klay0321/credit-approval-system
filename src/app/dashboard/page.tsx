"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { TopNavbar } from "@/components/layout/top-navbar";
import {
  mockDashboardMetrics,
  mockRecentApprovalTasks,
  mockRiskDistribution
} from "@/data/mock-dashboard";
import { getMockRole } from "@/lib/mock-auth";

const metricToneStyles = {
  blue: "from-sky-50 to-white border-sky-100",
  green: "from-emerald-50 to-white border-emerald-100",
  rose: "from-rose-50 to-white border-rose-100",
  amber: "from-amber-50 to-white border-amber-100"
} as const;

const riskTagStyles = {
  低风险: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  中风险: "bg-amber-50 text-amber-700 ring-amber-200",
  高风险: "bg-rose-50 text-rose-700 ring-rose-200"
} as const;

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const role = getMockRole();

    if (!role) {
      router.replace("/login");
    }
  }, [router]);

  return (
    <main className="min-h-screen px-6 py-10 md:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <TopNavbar />

        <section className="overflow-hidden rounded-3xl border border-white/70 bg-white/85 p-8 shadow-[0_24px_80px_-32px_rgba(15,23,42,0.35)] backdrop-blur">
          <p className="text-sm font-medium tracking-[0.2em] text-brand-700">DASHBOARD</p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900 md:text-4xl">
            审批工作台首页
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 md:text-base">
            这是一个最小可执行的审批工作台首页。当前所有统计和列表都来自 mock data，
            目的是先把后台首页结构搭好，方便你后续再接数据库和真实业务数据。
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {mockDashboardMetrics.map((item) => (
            <div
              key={item.label}
              className={`rounded-3xl border bg-gradient-to-br p-6 shadow-[0_16px_50px_-28px_rgba(15,23,42,0.28)] ${metricToneStyles[item.tone]}`}
            >
              <div className="text-sm text-slate-500">{item.label}</div>
              <div className="mt-3 text-3xl font-semibold text-slate-900">{item.value}</div>
              <p className="mt-2 text-sm leading-6 text-slate-500">{item.note}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_16px_50px_-28px_rgba(15,23,42,0.28)]">
            <div className="border-b border-slate-200 px-6 py-5">
              <h2 className="text-lg font-semibold text-slate-900">最近审批任务列表</h2>
              <p className="mt-1 text-sm text-slate-500">
                这里先展示最近 5 条 mock 任务，方便首页快速查看最新进度。
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 text-left">
                <thead className="bg-slate-50">
                  <tr className="text-sm text-slate-500">
                    <th className="px-6 py-4 font-medium">申请编号</th>
                    <th className="px-6 py-4 font-medium">客户姓名</th>
                    <th className="px-6 py-4 font-medium">申请金额</th>
                    <th className="px-6 py-4 font-medium">风险等级</th>
                    <th className="px-6 py-4 font-medium">任务状态</th>
                    <th className="px-6 py-4 font-medium">提交时间</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {mockRecentApprovalTasks.map((task) => (
                    <tr key={task.id} className="text-sm text-slate-700">
                      <td className="px-6 py-5 font-medium text-slate-900">{task.id}</td>
                      <td className="px-6 py-5">{task.applicantName}</td>
                      <td className="px-6 py-5">{task.amount}</td>
                      <td className="px-6 py-5">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ring-1 ${riskTagStyles[task.riskLevel]}`}
                        >
                          {task.riskLevel}
                        </span>
                      </td>
                      <td className="px-6 py-5">{task.status}</td>
                      <td className="px-6 py-5 text-slate-500">{task.submittedAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_16px_50px_-28px_rgba(15,23,42,0.28)]">
            <h2 className="text-lg font-semibold text-slate-900">风险等级分布展示</h2>
            <p className="mt-1 text-sm text-slate-500">
              第一版先用简单卡片和进度条展示，不引入复杂图表依赖。
            </p>

            <div className="mt-5 space-y-4">
              {mockRiskDistribution.map((item) => (
                <div key={item.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium text-slate-700">{item.label}</div>
                    <div className="text-sm text-slate-500">
                      {item.count} 条 / {item.percent}
                    </div>
                  </div>
                  <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-200">
                    <div
                      className={`h-full rounded-full ${
                        item.label === "低风险"
                          ? "bg-emerald-500"
                          : item.label === "中风险"
                            ? "bg-amber-500"
                            : "bg-rose-500"
                      }`}
                      style={{ width: item.percent }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}
