"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { TopNavbar } from "@/components/layout/top-navbar";
import { mockApprovalTasks } from "@/data/mock-approval-tasks";
import { getMockRole, roleTaskStatusMap, UserRole } from "@/lib/mock-auth";
import { AiSuggestion, RiskLevel, TaskStatus } from "@/types/approval-task";

const riskLevelStyles: Record<RiskLevel, string> = {
  低风险: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  中风险: "bg-amber-50 text-amber-700 ring-amber-200",
  高风险: "bg-rose-50 text-rose-700 ring-rose-200"
};

const suggestionStyles: Record<AiSuggestion, string> = {
  建议通过: "bg-sky-50 text-sky-700 ring-sky-200",
  建议人工复核: "bg-orange-50 text-orange-700 ring-orange-200",
  建议拒绝: "bg-rose-50 text-rose-700 ring-rose-200"
};

const statusStyles: Record<TaskStatus, string> = {
  初审中: "bg-brand-50 text-brand-700 ring-brand-100",
  复核中: "bg-violet-50 text-violet-700 ring-violet-200",
  已打回: "bg-slate-100 text-slate-700 ring-slate-200"
};

const currencyFormatter = new Intl.NumberFormat("zh-CN", {
  style: "currency",
  currency: "CNY",
  maximumFractionDigits: 0
});

export function ApprovalTaskList() {
  const router = useRouter();
  const [currentRole, setCurrentRole] = useState<UserRole | null>(null);

  useEffect(() => {
    const role = getMockRole();

    if (!role) {
      router.replace("/login");
      return;
    }

    setCurrentRole(role);
  }, [router]);

  const visibleTasks = useMemo(() => {
    if (!currentRole) {
      return [];
    }

    const roleScope = roleTaskStatusMap[currentRole];

    if (roleScope === "全部") {
      return mockApprovalTasks;
    }

    return mockApprovalTasks.filter((task) => task.status === roleScope);
  }, [currentRole]);

  const totalTasks = visibleTasks.length;
  const urgentTasks = visibleTasks.filter((task) => task.priority === "加急").length;
  const reviewTasks = visibleTasks.filter((task) => task.aiSuggestion === "建议人工复核").length;

  return (
    <main className="min-h-screen px-6 py-10 md:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <TopNavbar />

        <section className="overflow-hidden rounded-3xl border border-white/70 bg-white/80 p-8 shadow-[0_24px_80px_-32px_rgba(15,23,42,0.35)] backdrop-blur">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-medium tracking-[0.2em] text-brand-700">
                CREDIT APPROVAL TASKS
              </p>
              <h1 className="mt-3 text-3xl font-semibold text-slate-900 md:text-4xl">
                审批任务列表页
              </h1>
              <p className="mt-3 text-sm leading-7 text-slate-600 md:text-base">
                当前页面会根据登录角色展示不同任务范围。这样你可以很直观地看到“基础权限展示”是怎么工作的。
              </p>
            </div>

            <div className="grid min-w-full grid-cols-1 gap-3 sm:grid-cols-3 lg:min-w-[420px]">
              <StatCard label="当前可见任务" value={`${totalTasks} 条`} />
              <StatCard label="加急任务" value={`${urgentTasks} 条`} />
              <StatCard label="需人工复核" value={`${reviewTasks} 条`} />
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <FilterCard
            title="当前登录角色"
            value={currentRole ?? "未登录"}
            note={currentRole ? "角色来自浏览器本地 localStorage。" : "请先去登录页选择角色。"}
          />
          <FilterCard
            title="任务可见范围"
            value={currentRole ? roleTaskStatusMap[currentRole] : "无"}
            note="信审员只看初审中，复核员只看复核中，管理员看全部。"
          />
          <div className="rounded-2xl border border-white/70 bg-white/80 p-5 shadow-sm backdrop-blur">
            <div className="text-sm text-slate-500">角色操作</div>
            <div className="mt-2 text-lg font-semibold text-slate-900">切换角色</div>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              如果想看不同权限效果，可以返回登录页重新选择。
            </p>
            <Link
              href="/login"
              className="mt-4 inline-flex rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
            >
              去登录页
            </Link>
          </div>
        </section>

        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_16px_50px_-28px_rgba(15,23,42,0.28)]">
          <div className="border-b border-slate-200 px-6 py-5">
            <h2 className="text-lg font-semibold text-slate-900">审批任务明细</h2>
            <p className="mt-1 text-sm text-slate-500">
              当前根据角色过滤后的任务列表，只展示你这个角色现在应该看到的范围。
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-left">
              <thead className="bg-slate-50">
                <tr className="text-sm text-slate-500">
                  <th className="px-6 py-4 font-medium">申请编号</th>
                  <th className="px-6 py-4 font-medium">申请人</th>
                  <th className="px-6 py-4 font-medium">申请金额</th>
                  <th className="px-6 py-4 font-medium">期限</th>
                  <th className="px-6 py-4 font-medium">风险等级</th>
                  <th className="px-6 py-4 font-medium">AI建议</th>
                  <th className="px-6 py-4 font-medium">任务状态</th>
                  <th className="px-6 py-4 font-medium">优先级</th>
                  <th className="px-6 py-4 font-medium">提交时间</th>
                  <th className="px-6 py-4 font-medium">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {visibleTasks.map((task) => (
                  <tr key={task.id} className="align-top text-sm text-slate-700">
                    <td className="px-6 py-5 font-medium text-slate-900">{task.id}</td>
                    <td className="px-6 py-5">
                      <div className="font-medium text-slate-900">{task.applicantName}</div>
                      <div className="mt-1 text-slate-500">{task.phone}</div>
                    </td>
                    <td className="px-6 py-5">{currencyFormatter.format(task.amount)}</td>
                    <td className="px-6 py-5">{task.termMonths} 个月</td>
                    <td className="px-6 py-5">
                      <Tag className={riskLevelStyles[task.riskLevel]}>{task.riskLevel}</Tag>
                    </td>
                    <td className="px-6 py-5">
                      <Tag className={suggestionStyles[task.aiSuggestion]}>{task.aiSuggestion}</Tag>
                    </td>
                    <td className="px-6 py-5">
                      <Tag className={statusStyles[task.status]}>{task.status}</Tag>
                    </td>
                    <td className="px-6 py-5">{task.priority}</td>
                    <td className="px-6 py-5 text-slate-500">{task.submittedAt}</td>
                    <td className="px-6 py-5">
                      <Link
                        href={`/approvals/${task.id}`}
                        className="inline-flex rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
                      >
                        查看详情
                      </Link>
                    </td>
                  </tr>
                ))}
                {visibleTasks.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="px-6 py-10 text-center text-sm text-slate-500">
                      当前角色下没有可见任务。
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="text-sm text-slate-500">{label}</div>
      <div className="mt-2 text-2xl font-semibold text-slate-900">{value}</div>
    </div>
  );
}

function FilterCard({
  title,
  value,
  note
}: {
  title: string;
  value: string;
  note: string;
}) {
  return (
    <div className="rounded-2xl border border-white/70 bg-white/80 p-5 shadow-sm backdrop-blur">
      <div className="text-sm text-slate-500">{title}</div>
      <div className="mt-2 text-lg font-semibold text-slate-900">{value}</div>
      <p className="mt-2 text-sm leading-6 text-slate-500">{note}</p>
    </div>
  );
}

function Tag({
  children,
  className
}: {
  children: React.ReactNode;
  className: string;
}) {
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ring-1 ${className}`}>
      {children}
    </span>
  );
}
