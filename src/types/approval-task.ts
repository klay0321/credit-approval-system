export type RiskLevel = "低风险" | "中风险" | "高风险";
export type AiSuggestion = "建议通过" | "建议人工复核" | "建议拒绝";
export type TaskStatus = "待初审" | "待终审" | "已退回补件";

export type ApprovalTask = {
  id: string;
  applicantName: string;
  phone: string;
  amount: number;
  termMonths: number;
  submittedAt: string;
  riskLevel: RiskLevel;
  aiSuggestion: AiSuggestion;
  status: TaskStatus;
  priority: "普通" | "加急";
};
