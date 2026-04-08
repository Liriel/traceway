import express from "express";

const app = express();
app.use(express.json());

const users = [
  { id: "1", name: "Alice", email: "alice@example.com" },
  { id: "2", name: "Bob", email: "bob@example.com" },
  { id: "3", name: "Charlie", email: "charlie@example.com" },
];

app.get("/api/users", (req, res) => {
  res.json(users);
});

app.get("/api/users/:id", (req, res) => {
  const user = users.find((u) => u.id === req.params.id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json(user);
});

app.post("/api/users", (req, res) => {
  const newUser = { id: String(users.length + 1), ...req.body };
  users.push(newUser);
  res.status(201).json(newUser);
});

app.get("/api/slow", async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  res.json({ message: "Slow response" });
});

app.get("/api/test-error", () => {
  throw new Error("Test error from Traceway integration");
});

app.listen(3001, () => {
  console.log("Express listening on http://localhost:3001");
});
