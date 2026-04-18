export type DashboardMetric = {
  label: string;
  value: string;
  note: string;
  tone: "blue" | "green" | "rose" | "amber";
};

export type RecentApprovalTask = {
  id: string;
  applicantName: string;
  amount: string;
  riskLevel: "低风险" | "中风险" | "高风险";
  status: string;
  submittedAt: string;
};

export type RiskDistributionItem = {
  label: "低风险" | "中风险" | "高风险";
  count: number;
  percent: string;
};

export const mockDashboardMetrics: DashboardMetric[] = [
  {
    label: "待处理任务数",
    value: "18",
    note: "当前仍在审批流程中的任务总数",
    tone: "blue"
  },
  {
    label: "今日通过数",
    value: "9",
    note: "今天已经完成通过审批的任务数",
    tone: "green"
  },
  {
    label: "今日拒绝数",
    value: "3",
    note: "今天被拒绝的审批任务数",
    tone: "rose"
  },
  {
    label: "高风险任务数",
    value: "4",
    note: "当前标记为高风险的待处理任务数",
    tone: "amber"
  }
];

export const mockRecentApprovalTasks: RecentApprovalTask[] = [
  {
    id: "APP-20260418-001",
    applicantName: "张晨",
    amount: "¥120,000",
    riskLevel: "低风险",
    status: "初审中",
    submittedAt: "2026-04-18 09:15"
  },
  {
    id: "APP-20260418-002",
    applicantName: "李雪",
    amount: "¥280,000",
    riskLevel: "中风险",
    status: "复核中",
    submittedAt: "2026-04-18 09:40"
  },
  {
    id: "APP-20260418-003",
    applicantName: "王强",
    amount: "¥500,000",
    riskLevel: "高风险",
    status: "已打回",
    submittedAt: "2026-04-18 10:05"
  },
  {
    id: "APP-20260418-004",
    applicantName: "赵敏",
    amount: "¥180,000",
    riskLevel: "中风险",
    status: "初审中",
    submittedAt: "2026-04-18 10:20"
  },
  {
    id: "APP-20260418-005",
    applicantName: "陈宇",
    amount: "¥260,000",
    riskLevel: "高风险",
    status: "复核中",
    submittedAt: "2026-04-18 10:45"
  }
];

export const mockRiskDistribution: RiskDistributionItem[] = [
  {
    label: "低风险",
    count: 8,
    percent: "44%"
  },
  {
    label: "中风险",
    count: 6,
    percent: "33%"
  },
  {
    label: "高风险",
    count: 4,
    percent: "23%"
  }
];
