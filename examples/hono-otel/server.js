import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { trace, SpanStatusCode } from "@opentelemetry/api";

const app = new Hono();

// Route middleware — sets http.route for endpoint grouping
app.use("*", async (c, next) => {
  await next();
  const span = trace.getActiveSpan();
  if (span) {
    span.setAttribute("http.route", c.req.routePath);
  }
});

// Error handler — records exceptions as Issues
app.onError((err, c) => {
  const span = trace.getActiveSpan();
  if (span) {
    span.recordException(err);
    span.setStatus({ code: SpanStatusCode.ERROR, message: err.message });
  }
  return c.json({ error: "Internal Server Error" }, 500);
});

const users = [
  { id: "1", name: "Alice", email: "alice@example.com" },
  { id: "2", name: "Bob", email: "bob@example.com" },
  { id: "3", name: "Charlie", email: "charlie@example.com" },
];

app.get("/api/users", (c) => {
  return c.json(users);
});

app.get("/api/users/:id", (c) => {
  const id = c.req.param("id");
  const user = users.find((u) => u.id === id);
  if (!user) {
    return c.json({ error: "User not found" }, 404);
  }
  return c.json(user);
});

app.post("/api/users", async (c) => {
  const body = await c.req.json();
  const newUser = { id: String(users.length + 1), ...body };
  users.push(newUser);
  return c.json(newUser, 201);
});

app.get("/api/slow", async (c) => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return c.json({ message: "Slow response" });
});

app.get("/api/test-error", () => {
  throw new Error("Test error from Hono");
});

serve({ fetch: app.fetch, port: 3002 }, () => {
  console.log("Hono listening on http://localhost:3002");
});
