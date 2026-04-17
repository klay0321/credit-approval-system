import { ApprovalTaskDetailView } from "@/components/approval/approval-task-detail";

export default async function ApprovalDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <ApprovalTaskDetailView id={id} />;
}
