"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TopNavbar } from "@/components/layout/top-navbar";
import {
  ApprovalTaskDetail,
  getMockApprovalTaskDetail
} from "@/data/mock-approval-task-detail";
import { getMockRole, UserRole } from "@/lib/mock-auth";

type ApprovalAction = "已通过" | "已打回" | "已拒绝";

type ApprovalResult = {
  decision: ApprovalAction;
  comment: string;
  operatedAt: string;
};

type ApprovalHistoryItem = {
  id: string;
  operatorName: string;
  operatorRole: string;
  decision: string;
  comment: string;
  operatedAt: string;
};

const mockApprovalHistory: ApprovalHistoryItem[] = [
  {
    id: "HIS-001",
    operatorName: "陈雨",
    operatorRole: "初审员",
    decision: "已初审通过",
    comment: "客户基础资料完整，收入证明清晰，可进入下一环节。",
    operatedAt: "2026-04-17 09:30:00"
  },
  {
    id: "HIS-002",
    operatorName: "刘婷",
    operatorRole: "风控专员",
    decision: "建议人工复核",
    comment: "征信查询次数偏多，建议结合近三个月流水再综合判断。",
    operatedAt: "2026-04-17 09:45:00"
  },
  {
    id: "HIS-003",
    operatorName: "王磊",
    operatorRole: "审批主管",
    decision: "已打回补充材料",
    comment: "请补充社保记录和最近 6 个月银行流水。",
    operatedAt: "2026-04-17 10:05:00"
  },
  {
    id: "HIS-004",
    operatorName: "赵欣",
    operatorRole: "复核专员",
    decision: "重新提交待审",
    comment: "补件已收到，信息完整，可重新进入审批流程。",
    operatedAt: "2026-04-17 10:30:00"
  }
];

const riskLevelStyles: Record<ApprovalTaskDetail["riskLevel"], string> = {
  低风险: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  中风险: "bg-amber-50 text-amber-700 ring-amber-200",
  高风险: "bg-rose-50 text-rose-700 ring-rose-200"
};

const suggestionStyles: Record<ApprovalTaskDetail["aiSuggestion"], string> = {
  建议通过: "bg-sky-50 text-sky-700 ring-sky-200",
  建议人工复核: "bg-orange-50 text-orange-700 ring-orange-200",
  建议拒绝: "bg-rose-50 text-rose-700 ring-rose-200"
};

const resultStyles: Record<ApprovalAction, string> = {
  已通过: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  已打回: "bg-amber-50 text-amber-700 ring-amber-200",
  已拒绝: "bg-rose-50 text-rose-700 ring-rose-200"
};

const currencyFormatter = new Intl.NumberFormat("zh-CN", {
  style: "currency",
  currency: "CNY",
  maximumFractionDigits: 0
});

export function ApprovalTaskDetailView({ id }: { id: string }) {
  const router = useRouter();
  const detail = getMockApprovalTaskDetail(id);
  const [comment, setComment] = useState("");
  const [latestResult, setLatestResult] = useState<ApprovalResult | null>(null);
  const [currentRole, setCurrentRole] = useState<UserRole | null>(null);

  useEffect(() => {
    const role = getMockRole();

    if (!role) {
      router.replace("/login");
      return;
    }

    setCurrentRole(role);
  }, [router]);

  if (!detail) {
    return (
      <main className="min-h-screen px-6 py-10 md:px-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-6">
          <TopNavbar />
          <div className="rounded-3xl border border-white/70 bg-white/85 p-8 shadow-[0_24px_80px_-32px_rgba(15,23,42,0.35)]">
            <p className="text-sm font-medium tracking-[0.2em] text-brand-700">APPROVAL DETAIL</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900">未找到审批任务</h1>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              当前这个申请编号没有对应的 mock 数据。你可以先返回列表页，再点击其他已有任务查看详情。
            </p>
            <Link
              href="/approvals"
              className="mt-6 inline-flex rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-700"
            >
              返回审批任务列表
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const currentStatus = latestResult?.decision ?? "待处理";

  function handleDecision(decision: ApprovalAction) {
    const nextComment = comment.trim();

    setLatestResult({
      decision,
      comment: nextComment || "未填写审批意见",
      operatedAt: new Date().toLocaleString("zh-CN", { hour12: false })
    });
  }

  const visibleActions = getVisibleActions(currentRole);

  return (
    <main className="min-h-screen px-6 py-10 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <TopNavbar />

        <section className="rounded-3xl border border-white/70 bg-white/85 p-8 shadow-[0_24px_80px_-32px_rgba(15,23,42,0.35)]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-sm font-medium tracking-[0.2em] text-brand-700">APPROVAL DETAIL</p>
              <h1 className="mt-3 text-3xl font-semibold text-slate-900">审批任务详情页</h1>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                当前详情页会根据登录角色控制审批按钮的展示范围，这是最基础的前端权限展示。
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700">
                当前登录角色：{currentRole ?? "未登录"}
              </div>
              <StatusBadge status={currentStatus} />
              <Link
                href="/login"
                className="inline-flex rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
              >
                切换角色
              </Link>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6">
            <InfoCard title="申请基础信息">
              <InfoGrid
                items={[
                  { label: "申请编号", value: detail.id },
                  { label: "客户姓名", value: detail.applicantName },
                  { label: "身份证号", value: detail.idNumberMasked },
                  { label: "申请金额", value: currencyFormatter.format(detail.amount) },
                  { label: "期限", value: `${detail.termMonths} 个月` }
                ]}
              />
            </InfoCard>

            <InfoCard title="风控与 AI 建议">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="text-sm text-slate-500">风险等级</div>
                  <div className="mt-3">
                    <Tag className={riskLevelStyles[detail.riskLevel]}>{detail.riskLevel}</Tag>
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="text-sm text-slate-500">AI 建议</div>
                  <div className="mt-3">
                    <Tag className={suggestionStyles[detail.aiSuggestion]}>
                      {detail.aiSuggestion}
                    </Tag>
                  </div>
                </div>
              </div>
            </InfoCard>

            <InfoCard title="审批历史记录区">
              <div className="space-y-4">
                {mockApprovalHistory.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div>
                        <div className="text-base font-semibold text-slate-900">
                          {item.operatorName}
                        </div>
                        <div className="mt-1 text-sm text-slate-500">{item.operatorRole}</div>
                      </div>
                      <div className="text-sm text-slate-500">{item.operatedAt}</div>
                    </div>

                    <div className="mt-4 grid gap-3 md:grid-cols-[180px_1fr]">
                      <div className="rounded-2xl bg-white px-4 py-3">
                        <div className="text-sm text-slate-500">操作结果</div>
                        <div className="mt-2 text-sm font-medium text-slate-900">
                          {item.decision}
                        </div>
                      </div>
                      <div className="rounded-2xl bg-white px-4 py-3">
                        <div className="text-sm text-slate-500">审批意见</div>
                        <div className="mt-2 text-sm leading-6 text-slate-700">{item.comment}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </InfoCard>
          </div>

          <div className="space-y-6">
            <InfoCard title="关键风险因子">
              <TagList items={detail.riskFactors} tone="risk" />
            </InfoCard>

            <InfoCard title="客户分群标签">
              <TagList items={detail.customerTags} tone="group" />
            </InfoCard>

            <InfoCard title="审批操作">
              {currentRole ? (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="approval-comment" className="text-sm font-medium text-slate-700">
                      审批意见
                    </label>
                    <textarea
                      id="approval-comment"
                      value={comment}
                      onChange={(event) => setComment(event.target.value)}
                      className="mt-2 h-32 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-brand-500 focus:bg-white"
                      placeholder="请输入审批意见，例如：建议补充收入证明后再复核。"
                    />
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {visibleActions.includes("通过") ? (
                      <button
                        type="button"
                        onClick={() => handleDecision("已通过")}
                        className="rounded-full bg-emerald-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-emerald-500"
                      >
                        通过
                      </button>
                    ) : null}
                    {visibleActions.includes("打回") ? (
                      <button
                        type="button"
                        onClick={() => handleDecision("已打回")}
                        className="rounded-full bg-amber-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-amber-400"
                      >
                        打回
                      </button>
                    ) : null}
                    {visibleActions.includes("拒绝") ? (
                      <button
                        type="button"
                        onClick={() => handleDecision("已拒绝")}
                        className="rounded-full bg-rose-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-rose-500"
                      >
                        拒绝
                      </button>
                    ) : null}
                  </div>
                  <p className="text-sm leading-6 text-slate-500">
                    当前角色为“{currentRole}”，所以这里只显示这个角色有权限看到的按钮。
                  </p>
                </div>
              ) : null}
            </InfoCard>

            <InfoCard title="最近一次审批结果">
              {latestResult ? (
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <div className="text-sm text-slate-500">审批结果</div>
                      <div className="mt-2">
                        <Tag className={resultStyles[latestResult.decision]}>
                          {latestResult.decision}
                        </Tag>
                      </div>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:col-span-2">
                      <div className="text-sm text-slate-500">操作时间</div>
                      <div className="mt-2 text-base font-medium text-slate-900">
                        {latestResult.operatedAt}
                      </div>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="text-sm text-slate-500">审批意见</div>
                    <div className="mt-2 whitespace-pre-wrap text-base text-slate-900">
                      {latestResult.comment}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm leading-6 text-slate-500">
                  你还没有执行审批动作。请输入审批意见后，点击当前角色可见的审批按钮，这里就会显示最近一次审批结果。
                </div>
              )}
            </InfoCard>
          </div>
        </section>
      </div>
    </main>
  );
}

function getVisibleActions(role: UserRole | null) {
  if (role === "信审员") {
    return ["通过", "打回"] as const;
  }

  if (role === "复核员") {
    return ["通过", "拒绝"] as const;
  }

  if (role === "管理员") {
    return ["通过", "打回", "拒绝"] as const;
  }

  return [] as const;
}

function InfoCard({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_16px_50px_-28px_rgba(15,23,42,0.28)]">
      <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function InfoGrid({
  items
}: {
  items: Array<{ label: string; value: string }>;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {items.map((item) => (
        <div key={item.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="text-sm text-slate-500">{item.label}</div>
          <div className="mt-2 text-base font-medium text-slate-900">{item.value}</div>
        </div>
      ))}
    </div>
  );
}

function TagList({
  items,
  tone
}: {
  items: string[];
  tone: "risk" | "group";
}) {
  const toneClass =
    tone === "risk"
      ? "bg-rose-50 text-rose-700 ring-rose-200"
      : "bg-sky-50 text-sky-700 ring-sky-200";

  return (
    <div className="flex flex-wrap gap-3">
      {items.map((item) => (
        <Tag key={item} className={toneClass}>
          {item}
        </Tag>
      ))}
    </div>
  );
}

function StatusBadge({ status }: { status: ApprovalAction | "待处理" }) {
  if (status === "待处理") {
    return (
      <span className="inline-flex rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 ring-1 ring-slate-200">
        当前状态：待处理
      </span>
    );
  }

  return (
    <span
      className={`inline-flex rounded-full px-4 py-2 text-sm font-medium ring-1 ${
        resultStyles[status]
      }`}
    >
      当前状态：{status}
    </span>
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
