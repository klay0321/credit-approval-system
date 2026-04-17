export type ApprovalTaskDetail = {
  id: string;
  applicantName: string;
  idNumberMasked: string;
  amount: number;
  termMonths: number;
  riskLevel: "低风险" | "中风险" | "高风险";
  aiSuggestion: "建议通过" | "建议人工复核" | "建议拒绝";
  riskFactors: string[];
  customerTags: string[];
};

const mockApprovalTaskDetails: Record<string, ApprovalTaskDetail> = {
  "APP-20260417-001": {
    id: "APP-20260417-001",
    applicantName: "张晨",
    idNumberMasked: "310101********1234",
    amount: 120000,
    termMonths: 24,
    riskLevel: "低风险",
    aiSuggestion: "建议通过",
    riskFactors: ["近 12 个月逾期记录少", "收入水平稳定", "负债压力较低"],
    customerTags: ["工薪客群", "历史表现稳定", "优先审批"]
  },
  "APP-20260417-002": {
    id: "APP-20260417-002",
    applicantName: "李雪",
    idNumberMasked: "320101********5678",
    amount: 280000,
    termMonths: 36,
    riskLevel: "中风险",
    aiSuggestion: "建议人工复核",
    riskFactors: ["申请金额偏高", "近期征信查询次数较多", "收入覆盖倍数一般"],
    customerTags: ["成长型客户", "需要补充材料", "人工复核"]
  },
  "APP-20260417-003": {
    id: "APP-20260417-003",
    applicantName: "王强",
    idNumberMasked: "330101********2468",
    amount: 500000,
    termMonths: 48,
    riskLevel: "高风险",
    aiSuggestion: "建议拒绝",
    riskFactors: ["历史负债较高", "近半年出现逾期", "当前申请金额超出建议区间"],
    customerTags: ["高风险预警", "重点关注", "拒绝建议"]
  },
  "APP-20260417-004": {
    id: "APP-20260417-004",
    applicantName: "赵敏",
    idNumberMasked: "340101********4321",
    amount: 180000,
    termMonths: 12,
    riskLevel: "中风险",
    aiSuggestion: "建议人工复核",
    riskFactors: ["工作变动时间较短", "收入证明待补充", "客户信息需二次确认"],
    customerTags: ["新进客户", "资料待补全", "人工复核"]
  }
};

export function getMockApprovalTaskDetail(id: string) {
  return mockApprovalTaskDetails[id] ?? null;
}
