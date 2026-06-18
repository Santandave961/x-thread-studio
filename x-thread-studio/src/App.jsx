import { useState, useCallback } from "react";

const NICHES = [
  { label: "Tech / AI", value: "tech and AI", emoji: "🤖" },
  { label: "Data Science", value: "data science and machine learning", emoji: "📊" },
  { label: "Finance", value: "personal finance and investing", emoji: "💰" },
  { label: "Startups", value: "startups and entrepreneurship", emoji: "🚀" },
  { label: "Fitness", value: "fitness and health", emoji: "💪" },
  { label: "Creator Economy", value: "content creation and personal branding", emoji: "🎯" },
  { label: "Career", value: "career growth and job hunting", emoji: "📈" },
  { label: "Product", value: "product management and design", emoji: "🎨" },
];

const FORMATS = [
  { label: "Thread", value: "thread", desc: "5–8 connected tweets" },
  { label: "Hot Take", value: "hottake", desc: "1 bold, punchy tweet" },
  { label: "How-To", value: "howto", desc: "Step-by-step breakdown" },
  { label: "Story", value: "story", desc: "Personal narrative arc" },
  { label: "List", value: "list", desc: "Quick value-packed list" },
];

const TONES = [
  { label: "Bold", value: "bold and direct, no fluff" },
  { label: "Educational", value: "educational and clear, like teaching a friend" },
  { label: "Conversational", value: "casual and conversational, like talking to a peer" },
  { label: "Motivational", value: "energetic and motivating" },
  { label: "Analytical", value: "data-driven and analytical with specific examples" },
];

function XCard({ tweet, index, isHook }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(tweet);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const charCount = tweet.length;
  const overLimit = charCount > 280;

  return (
    <div style={{
      background: "#16181C",
      border: `1px solid ${isHook ? "#1D9BF0" : "#2F3336"}`,
      borderRadius: "16px",
      padding: "16px",
      marginBottom: "8px",
      position: "relative",
      boxShadow: isHook ? "0 0 0 1px #1D9BF040" : "none",
      transition: "border-color 0.2s",
    }}>
      {isHook && (
        <div style={{
          position: "absolute", top: "-10px", left: "16px",
          background: "#1D9BF0", color: "#fff", fontSize: "10px",
          fontWeight: 700, letterSpacing: "0.08em", padding: "2px 8px",
          borderRadius: "4px", fontFamily: "Space Grotesk, sans-serif",
          textTransform: "uppercase"
        }}>Hook</div>
      )}

      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
        <div style={{
          width: "38px", height: "38px", borderRadius: "50%",
          background: "linear-gradient(135deg, #1D9BF0, #7856FF)",
          flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "14px", fontWeight: 700, color: "#fff",
          fontFamily: "Space Grotesk, sans-serif"
        }}>X</div>
        <div>
          <div style={{ color: "#E7E9EA", fontSize: "14px", fontWeight: 700, fontFamily: "Space Grotesk, sans-serif" }}>Your Name</div>
          <div style={{ color: "#71767B", fontSize: "13px", fontFamily: "Inter, sans-serif" }}>@yourhandle</div>
        </div>
        {index !== undefined && (
          <div style={{
            marginLeft: "auto", color: "#71767B", fontSize: "12px",
            fontFamily: "Space Grotesk, sans-serif", fontWeight: 600
          }}>{index + 1}</div>
        )}
      </div>

      <div style={{
        color: "#E7E9EA", fontSize: "15px", lineHeight: "1.6",
        fontFamily: "Inter, sans-serif", whiteSpace: "pre-wrap",
        wordBreak: "break-word", marginBottom: "12px"
      }}>{tweet}</div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: "20px" }}>
          {["💬", "🔁", "❤️", "📤"].map((icon, i) => (
            <span key={i} style={{ color: "#71767B", fontSize: "16px", cursor: "pointer" }}>{icon}</span>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{
            fontSize: "12px", fontFamily: "Space Grotesk, sans-serif",
            color: overLimit ? "#F4212E" : charCount > 240 ? "#FFD700" : "#71767B"
          }}>{charCount}/280</span>
          <button onClick={copy} style={{
            background: copied ? "#1D9BF020" : "transparent",
            border: `1px solid ${copied ? "#1D9BF0" : "#2F3336"}`,
            borderRadius: "20px", color: copied ? "#1D9BF0" : "#71767B",
            fontSize: "12px", padding: "4px 12px", cursor: "pointer",
            fontFamily: "Space Grotesk, sans-serif", fontWeight: 600,
            transition: "all 0.2s"
          }}>
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Spinner() {
  return (
    <div style={{ textAlign: "center", padding: "48px 0" }}>
      <div style={{
        width: "36px", height: "36px", border: "3px solid #2F3336",
        borderTop: "3px solid #1D9BF0", borderRadius: "50%",
        margin: "0 auto 16px",
        animation: "spin 0.8s linear infinite"
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <div style={{ color: "#71767B", fontFamily: "Space Grotesk, sans-serif", fontSize: "14px" }}>
        Generating your content...
      </div>
    </div>
  );
}

export default function XThreadStudio() {
  const [topic, setTopic] = useState("");
  const [niche, setNiche] = useState(NICHES[0].value);
  const [format, setFormat] = useState("thread");
  const [tone, setTone] = useState(TONES[0].value);
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const buildPrompt = () => {
    const f = FORMATS.find(x => x.value === format);
    const extraInstructions = {
      thread: `Write a thread of exactly 6 tweets. The first tweet is the hook — make it stop the scroll. Each tweet must standalone but flow into the next. End with a strong CTA tweet (follow, reply, or share). Number each tweet like "1/" "2/" etc.`,
      hottake: `Write exactly 1 bold, controversial-but-true hot take tweet. Max 240 chars. No thread. Just the tweet text.`,
      howto: `Write a how-to thread of 5 tweets. Tweet 1: the payoff promise. Tweets 2–4: clear steps. Tweet 5: summary + CTA. Number each "1/" "2/" etc.`,
      story: `Write a story thread of 5 tweets. Open with a hook moment, build tension in the middle, land on a lesson or insight. Number each "1/" "2/" etc.`,
      list: `Write a list thread: 1 hook tweet + 5 list-item tweets, each with one punchy insight. End with a CTA. Number each "1/" "2/" etc.`,
    };

    return `You are a world-class X (Twitter) content writer. Your job is to write high-performing ${f?.label} content.

Topic: "${topic}"
Niche: ${niche}
Tone: ${tone}

Instructions: ${extraInstructions[format]}

CRITICAL RULES:
- Every tweet must be under 280 characters
- No hashtags unless they add real value
- No filler phrases like "In today's world" or "Let's dive in"
- Be specific — use numbers, examples, names where possible
- Write like a human expert, not a bot

Return ONLY the tweet text(s), one per line, separated by a blank line between tweets. No preamble, no explanation.`;
  };

  const generate = useCallback(async () => {
    if (!topic.trim()) { setError("Enter a topic first."); return; }
    setError("");
    setLoading(true);
    setTweets([]);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: buildPrompt() }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Request failed");
      }

      const data = await res.json();
      const text = data.text || "";

      const parsed = text
        .split(/\n\s*\n/)
        .map(t => t.trim())
        .filter(t => t.length > 0);

      if (parsed.length === 0) throw new Error("No content returned.");
      setTweets(parsed);
    } catch (e) {
      setError(e.message || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }, [topic, niche, format, tone]);

  const copyAll = () => {
    navigator.clipboard.writeText(tweets.join("\n\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#000000", color: "#E7E9EA", fontFamily: "Inter, sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&family=Inter:wght@400;500&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{
        borderBottom: "1px solid #2F3336", padding: "18px 24px",
        display: "flex", alignItems: "center", gap: "12px",
        background: "#000", position: "sticky", top: 0, zIndex: 10,
      }}>
        <div style={{
          width: "32px", height: "32px", background: "#1D9BF0", borderRadius: "8px",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "18px", fontWeight: 900, color: "#fff", fontFamily: "Space Grotesk, sans-serif"
        }}>𝕏</div>
        <div>
          <div style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: "16px" }}>Thread Studio</div>
          <div style={{ color: "#71767B", fontSize: "12px" }}>AI-powered content for X</div>
        </div>
      </div>

      <div style={{
        maxWidth: "960px", margin: "0 auto", padding: "24px 16px",
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px",
      }}>
        {/* LEFT */}
        <div>
          <div style={{ marginBottom: "20px" }}>
            <label style={{
              display: "block", marginBottom: "8px",
              fontFamily: "Space Grotesk, sans-serif", fontWeight: 600, fontSize: "13px",
              color: "#71767B", textTransform: "uppercase", letterSpacing: "0.06em"
            }}>Your Topic or Idea</label>
            <textarea
              value={topic}
              onChange={e => setTopic(e.target.value)}
              placeholder="e.g. Why most people learn Python wrong and never get a job"
              rows={3}
              style={{
                width: "100%", background: "#16181C", border: "1px solid #2F3336",
                borderRadius: "12px", color: "#E7E9EA", fontSize: "15px",
                padding: "14px", fontFamily: "Inter, sans-serif", lineHeight: "1.5",
                resize: "vertical", outline: "none", boxSizing: "border-box", transition: "border-color 0.2s",
              }}
              onFocus={e => e.target.style.borderColor = "#1D9BF0"}
              onBlur={e => e.target.style.borderColor = "#2F3336"}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{
              display: "block", marginBottom: "10px",
              fontFamily: "Space Grotesk, sans-serif", fontWeight: 600, fontSize: "13px",
              color: "#71767B", textTransform: "uppercase", letterSpacing: "0.06em"
            }}>Your Niche</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {NICHES.map(n => (
                <button key={n.value} onClick={() => setNiche(n.value)} style={{
                  padding: "7px 14px", borderRadius: "20px", cursor: "pointer",
                  border: `1px solid ${niche === n.value ? "#1D9BF0" : "#2F3336"}`,
                  background: niche === n.value ? "#1D9BF015" : "transparent",
                  color: niche === n.value ? "#1D9BF0" : "#71767B",
                  fontSize: "13px", fontFamily: "Space Grotesk, sans-serif", fontWeight: 600, transition: "all 0.15s"
                }}>{n.emoji} {n.label}</button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{
              display: "block", marginBottom: "10px",
              fontFamily: "Space Grotesk, sans-serif", fontWeight: 600, fontSize: "13px",
              color: "#71767B", textTransform: "uppercase", letterSpacing: "0.06em"
            }}>Format</label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
              {FORMATS.map(f => (
                <button key={f.value} onClick={() => setFormat(f.value)} style={{
                  padding: "10px 14px", borderRadius: "10px", cursor: "pointer",
                  border: `1px solid ${format === f.value ? "#1D9BF0" : "#2F3336"}`,
                  background: format === f.value ? "#1D9BF015" : "#16181C",
                  color: format === f.value ? "#1D9BF0" : "#E7E9EA",
                  textAlign: "left", transition: "all 0.15s"
                }}>
                  <div style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: "13px" }}>{f.label}</div>
                  <div style={{ fontSize: "11px", color: format === f.value ? "#1D9BF080" : "#71767B", marginTop: "2px" }}>{f.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label style={{
              display: "block", marginBottom: "10px",
              fontFamily: "Space Grotesk, sans-serif", fontWeight: 600, fontSize: "13px",
              color: "#71767B", textTransform: "uppercase", letterSpacing: "0.06em"
            }}>Tone</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {TONES.map(t => (
                <button key={t.value} onClick={() => setTone(t.value)} style={{
                  padding: "7px 14px", borderRadius: "20px", cursor: "pointer",
                  border: `1px solid ${tone === t.value ? "#1D9BF0" : "#2F3336"}`,
                  background: tone === t.value ? "#1D9BF015" : "transparent",
                  color: tone === t.value ? "#1D9BF0" : "#71767B",
                  fontSize: "13px", fontFamily: "Space Grotesk, sans-serif", fontWeight: 600, transition: "all 0.15s"
                }}>{t.label}</button>
              ))}
            </div>
          </div>

          {error && (
            <div style={{
              background: "#F4212E15", border: "1px solid #F4212E40",
              borderRadius: "10px", padding: "12px", marginBottom: "16px",
              color: "#F4212E", fontSize: "13px", fontFamily: "Space Grotesk, sans-serif"
            }}>{error}</div>
          )}

          <button onClick={generate} disabled={loading} style={{
            width: "100%", padding: "16px",
            background: loading ? "#0E4D80" : "#1D9BF0",
            color: "#fff", border: "none", borderRadius: "24px",
            fontSize: "16px", fontWeight: 700, cursor: loading ? "not-allowed" : "pointer",
            fontFamily: "Space Grotesk, sans-serif", letterSpacing: "0.02em", transition: "background 0.2s",
          }}>
            {loading ? "Generating..." : "Generate Content ✦"}
          </button>
        </div>

        {/* RIGHT */}
        <div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
            <div style={{
              fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: "14px",
              color: tweets.length ? "#E7E9EA" : "#71767B"
            }}>
              {tweets.length ? `${tweets.length} tweet${tweets.length > 1 ? "s" : ""} ready` : "Preview"}
            </div>
            {tweets.length > 1 && (
              <button onClick={copyAll} style={{
                background: copied ? "#1D9BF020" : "transparent",
                border: `1px solid ${copied ? "#1D9BF0" : "#2F3336"}`,
                borderRadius: "20px", color: copied ? "#1D9BF0" : "#71767B",
                fontSize: "12px", padding: "6px 14px", cursor: "pointer",
                fontFamily: "Space Grotesk, sans-serif", fontWeight: 600,
              }}>
                {copied ? "All copied!" : "Copy all"}
              </button>
            )}
          </div>

          {loading && <Spinner />}

          {!loading && tweets.length === 0 && (
            <div style={{
              background: "#16181C", border: "1px dashed #2F3336",
              borderRadius: "16px", padding: "48px 24px", textAlign: "center"
            }}>
              <div style={{ fontSize: "32px", marginBottom: "12px" }}>𝕏</div>
              <div style={{ color: "#71767B", fontFamily: "Space Grotesk, sans-serif", fontSize: "14px" }}>
                Your tweets will appear here
              </div>
              <div style={{ color: "#3F4448", fontSize: "12px", marginTop: "6px" }}>
                Fill in your topic and hit Generate
              </div>
            </div>
          )}

          {!loading && tweets.map((tweet, i) => (
            <XCard key={i} tweet={tweet} index={format !== "hottake" ? i : undefined} isHook={i === 0 && tweets.length > 1} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
        textarea:focus { outline: none; }
      `}</style>
    </div>
  );
}