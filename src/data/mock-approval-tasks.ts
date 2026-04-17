import { ApprovalTask } from "@/types/approval-task";

export const mockApprovalTasks: ApprovalTask[] = [
  {
    id: "APP-20260417-001",
    applicantName: "张晨",
    phone: "13800138001",
    amount: 120000,
    termMonths: 24,
    submittedAt: "2026-04-17 09:15",
    riskLevel: "低风险",
    aiSuggestion: "建议通过",
    status: "待初审",
    priority: "普通"
  },
  {
    id: "APP-20260417-002",
    applicantName: "李雪",
    phone: "13800138002",
    amount: 280000,
    termMonths: 36,
    submittedAt: "2026-04-17 09:40",
    riskLevel: "中风险",
    aiSuggestion: "建议人工复核",
    status: "待终审",
    priority: "加急"
  },
  {
    id: "APP-20260417-003",
    applicantName: "王强",
    phone: "13800138003",
    amount: 500000,
    termMonths: 48,
    submittedAt: "2026-04-17 10:05",
    riskLevel: "高风险",
    aiSuggestion: "建议拒绝",
    status: "已退回补件",
    priority: "普通"
  },
  {
    id: "APP-20260417-004",
    applicantName: "赵敏",
    phone: "13800138004",
    amount: 180000,
    termMonths: 12,
    submittedAt: "2026-04-17 10:20",
    riskLevel: "中风险",
    aiSuggestion: "建议人工复核",
    status: "待初审",
    priority: "普通"
  }
];
