import Link from "next/link";

export default function Home() {
  return (
    <main style={{ padding: 24, fontFamily: "system-ui" }}>
      <h1 style={{ marginBottom: 12 }}>Valorant AI Chat</h1>
      <p>배포 테스트용 기본 페이지입니다.</p>
      <p style={{ marginTop: 20 }}>
        API 헬스 체크: <a href="/api/health">/api/health</a>
      </p>

      <div style={{ marginTop: 28 }}>
        <Link
          href="/chat"
          style={{
            display: "inline-block",
            padding: "10px 16px",
            borderRadius: 10,
            border: "1px solid #333",
            textDecoration: "none",
          }}
        >
          🚀 데모 채팅으로 가기 (/chat)
        </Link>
      </div>
    </main>
  );
}
