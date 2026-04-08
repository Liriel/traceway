export default function Home() {
  return (
    <div style={{ padding: "2rem", fontFamily: "monospace" }}>
      <h1>Next.js OTel Example</h1>
      <p>Test endpoints:</p>
      <ul>
        <li>
          <a href="/api/users">GET /api/users</a>
        </li>
        <li>
          <a href="/api/users/1">GET /api/users/1</a>
        </li>
        <li>
          <a href="/api/users/2">GET /api/users/2</a>
        </li>
        <li>
          <a href="/api/slow">GET /api/slow</a>
        </li>
        <li>
          <a href="/api/test-error">GET /api/test-error</a>
        </li>
      </ul>
    </div>
  );
}
