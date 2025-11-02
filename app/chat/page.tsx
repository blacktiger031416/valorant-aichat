"use client";
import { useState } from "react";

export default function ChatPage() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!input.trim()) return;
    const userMessage = { role: "user", content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      if (data?.content) {
        setMessages([...newMessages, { role: "assistant", content: data.content }]);
      }
    } catch (err) {
      setMessages([...newMessages, { role: "assistant", content: "⚠️ API 요청 실패" }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ padding: 24, fontFamily: "system-ui", maxWidth: 600, margin: "auto" }}>
      <h1>Valorant AI Chat</h1>
      <div style={{
        border: "1px solid #ccc", padding: 12, height: 400, overflowY: "auto",
        display: "flex", flexDirection: "column", gap: "8px", marginBottom: "12px"
      }}>
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              alignSelf: m.role === "user" ? "flex-end" : "flex-start",
              background: m.role === "user" ? "#007aff" : "#eee",
              color: m.role === "user" ? "white" : "black",
              borderRadius: 10,
              padding: "8px 12px",
              maxWidth: "80%"
            }}
          >
            {m.content}
          </div>
        ))}
        {loading && <div>⏳ AI가 생각 중...</div>}
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="메시지를 입력하세요..."
          style={{ flex: 1, padding: 8 }}
        />
        <button onClick={sendMessage} style={{ padding: "8px 16px" }}>
          전송
        </button>
      </div>
    </main>
  );
}
