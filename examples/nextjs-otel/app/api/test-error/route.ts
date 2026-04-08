import { withRoute } from "@/lib/with-route";

export const GET = withRoute("/api/test-error", async () => {
  throw new Error("Test error from Next.js");
});
