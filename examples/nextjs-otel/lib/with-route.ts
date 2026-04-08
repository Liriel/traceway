import { trace, SpanStatusCode } from "@opentelemetry/api";

type RouteHandler = (
  req: Request,
  context: { params: Promise<Record<string, string>> }
) => Response | Promise<Response>;

export function withRoute(route: string, handler: RouteHandler): RouteHandler {
  return async (req, context) => {
    const span = trace.getActiveSpan();
    if (span) {
      span.setAttribute("http.route", route);
    }
    try {
      return await handler(req, context);
    } catch (error) {
      if (span) {
        span.recordException(error as Error);
        span.setStatus({
          code: SpanStatusCode.ERROR,
          message: (error as Error).message,
        });
      }
      throw error;
    }
  };
}
