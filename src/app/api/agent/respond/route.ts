import type { NextRequest } from "next/server";
import { EXECUTION_RESPONSE_DUMMY } from "@/features/demo/constants/scenario";
import type { ExecutionResultResponseSchema } from "@/features/demo/schema/chat-schema";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { _action_id, response } = body;

  await new Promise((resolve) => setTimeout(resolve, 1000));

  const executionResultResponse: ExecutionResultResponseSchema = {
    ...EXECUTION_RESPONSE_DUMMY,
    result_summary: `Action executed successfully with user response: "${response}"`,
  };

  return Response.json({
    type: "execution_result",
    data: executionResultResponse,
  });
}
