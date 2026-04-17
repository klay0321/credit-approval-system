import Link from "next/link";
import {
  ApprovalTaskDetail,
  getMockApprovalTaskDetail
} from "@/data/mock-approval-task-detail";

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

const currencyFormatter = new Intl.NumberFormat("zh-CN", {
  style: "currency",
  currency: "CNY",
  maximumFractionDigits: 0
});

export function ApprovalTaskDetailView({ id }: { id: string }) {
  const detail = getMockApprovalTaskDetail(id);

  if (!detail) {
    return (
      <main className="min-h-screen px-6 py-10 md:px-10">
        <div className="mx-auto max-w-4xl rounded-3xl border border-white/70 bg-white/85 p-8 shadow-[0_24px_80px_-32px_rgba(15,23,42,0.35)]">
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
      </main>
    );
  }

  return (
    <main className="min-h-screen px-6 py-10 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <section className="rounded-3xl border border-white/70 bg-white/85 p-8 shadow-[0_24px_80px_-32px_rgba(15,23,42,0.35)]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-sm font-medium tracking-[0.2em] text-brand-700">APPROVAL DETAIL</p>
              <h1 className="mt-3 text-3xl font-semibold text-slate-900">审批任务详情页</h1>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                这一步只展示单笔审批任务的核心信息，方便你从列表页进入详情页，把审批流程串起来。
              </p>
            </div>
            <Link
              href="/approvals"
              className="inline-flex rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            >
              返回列表
            </Link>
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
          </div>

          <div className="space-y-6">
            <InfoCard title="关键风险因子">
              <TagList items={detail.riskFactors} tone="risk" />
            </InfoCard>

            <InfoCard title="客户分群标签">
              <TagList items={detail.customerTags} tone="group" />
            </InfoCard>

            <InfoCard title="审批操作">
              <div className="space-y-4">
                <div>
                  <label htmlFor="approval-comment" className="text-sm font-medium text-slate-700">
                    审批意见
                  </label>
                  <textarea
                    id="approval-comment"
                    className="mt-2 h-32 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-brand-500 focus:bg-white"
                    placeholder="请输入审批意见，例如：建议补充收入证明后再复核。"
                  />
                </div>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    className="rounded-full bg-emerald-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-emerald-500"
                  >
                    通过
                  </button>
                  <button
                    type="button"
                    className="rounded-full bg-amber-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-amber-400"
                  >
                    打回
                  </button>
                  <button
                    type="button"
                    className="rounded-full bg-rose-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-rose-500"
                  >
                    拒绝
                  </button>
                </div>
                <p className="text-sm leading-6 text-slate-500">
                  当前按钮先只做界面展示，不会真正提交数据库。这样更适合你先把详情页结构跑通。
                </p>
              </div>
            </InfoCard>
          </div>
        </section>
      </div>
    </main>
  );
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
