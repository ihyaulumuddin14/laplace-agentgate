import type { NextRequest } from "next/server";
import { EXECUTION_RESPONSE_DUMMY } from "@/features/demo/constants/scenario";
import type { ExecutionResultResponseSchema } from "@/features/demo/schema/chat-schema";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { action_id, decision } = body;

  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (decision === "rejected") {
    return Response.json({
      type: "rejected",
      data: { action_id, message: "Action rejected by reviewer" },
    });
  }

  const executionResultResponse: ExecutionResultResponseSchema = {
    ...EXECUTION_RESPONSE_DUMMY,
    result_summary: "Action approved and executed successfully",
  };

  return Response.json({
    type: "execution_result",
    data: executionResultResponse,
  });
}
