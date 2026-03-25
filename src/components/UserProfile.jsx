import{ useState } from "react";
import { Link } from "react-router-dom";


function fmtViews(n) {
  if (n == null) return "";
  return n >= 1000 ? `${(n / 1000).toFixed(1)}K views` : `${n} views`;
}

// ── COMPONENT ──────────────────────────────────────────────────────────────

function UserProfile() {
  const [activeTab, setActiveTab] = useState("videos");

  const user = PLACEHOLDER_USER;
  const videos = PLACEHOLDER_VIDEOS;
  const articles = PLACEHOLDER_ARTICLES;
  const { stats, activity } = PLACEHOLDER_KALSHI;

  const initials = user.name
    ? user.name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase()
    : "?";

  return (
    <div style={{ minHeight: "100vh", background: "#fff", color: "#000", fontFamily: "system-ui, -apple-system, sans-serif" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", borderBottom: "1px solid #e5e5e5" }}>
        <Link to="/" style={{ color: "#000", fontSize: 20, textDecoration: "none" }}>&#8592;</Link>
        <p style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>Profile</p>
        <div style={{ width: 20 }} />
      </div>

      {/* Profile info */}
      <div style={{ padding: "20px 20px 16px" }}>
        <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 16 }}>

          {/* Avatar */}
          {user.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={user.name}
              style={{ width: 72, height: 72, borderRadius: "50%", objectFit: "cover", border: "1px solid #e5e5e5" }}
            />
          ) : (
            <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#000", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 700, flexShrink: 0 }}>
              {initials}
            </div>
          )}

          {/* Name / handle / bio */}
          <div>
            <p style={{ margin: "0 0 2px", fontSize: 18, fontWeight: 700 }}>{user.name}</p>
            <p style={{ margin: "0 0 6px", fontSize: 13, color: "#555" }}>{user.username}</p>
            {user.bio && <p style={{ margin: 0, fontSize: 13, color: "#333", lineHeight: 1.5 }}>{user.bio}</p>}
          </div>

        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: "#e5e5e5" }} />

      {/* Tabs */}
      <div style={{ display: "flex", borderBottom: "1px solid #e5e5e5" }}>
        {["videos", "articles", "kalshi"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              flex: 1,
              padding: "12px 0",
              background: "none",
              border: "none",
              borderBottom: activeTab === tab ? "2px solid #000" : "2px solid transparent",
              fontSize: 13,
              fontWeight: activeTab === tab ? 700 : 400,
              color: activeTab === tab ? "#000" : "#888",
              cursor: "pointer",
              textTransform: "capitalize",
            }}
          >
            {tab === "kalshi" ? "Predictions" : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div style={{ padding: "16px 20px", paddingBottom: 80 }}>

        {/* Videos tab */}
        {activeTab === "videos" && (
          videos.length === 0 ? (
            <p style={{ textAlign: "center", color: "#aaa", paddingTop: 40 }}>No liked videos yet</p>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {videos.map((video) => (
                <div key={video.id} style={{ borderRadius: 6, overflow: "hidden", border: "1px solid #e5e5e5", cursor: "pointer" }}>
                  <div style={{ aspectRatio: "16/9", background: "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                    {video.thumbnailUrl ? (
                      <img src={video.thumbnailUrl} alt={video.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <span style={{ fontSize: 11, color: "#aaa" }}>No preview</span>
                    )}
                    {video.duration && (
                      <span style={{ position: "absolute", bottom: 5, right: 5, background: "rgba(0,0,0,0.7)", color: "#fff", fontSize: 10, padding: "2px 5px", borderRadius: 3 }}>
                        {video.duration}
                      </span>
                    )}
                  </div>
                  <div style={{ padding: "8px 10px" }}>
                    <p style={{ margin: "0 0 4px", fontSize: 12, fontWeight: 600, lineHeight: 1.4 }}>{video.title}</p>
                    <p style={{ margin: 0, fontSize: 11, color: "#888" }}>
                      {[video.category, fmtViews(video.views)].filter(Boolean).join(" · ")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )
        )}

        {/* Articles tab */}
        {activeTab === "articles" && (
          articles.length === 0 ? (
            <p style={{ textAlign: "center", color: "#aaa", paddingTop: 40 }}>No liked articles yet</p>
          ) : (
            <div>
              {articles.map((article) => (
                <div key={article.id} style={{ padding: "14px 0", borderBottom: "1px solid #e5e5e5", cursor: "pointer", display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div style={{ width: 64, height: 48, borderRadius: 4, background: "#f0f0f0", flexShrink: 0, overflow: "hidden" }}>
                    {article.imageUrl && <img src={article.imageUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ margin: "0 0 4px", fontSize: 13, fontWeight: 600, lineHeight: 1.4 }}>{article.title}</p>
                    <p style={{ margin: 0, fontSize: 11, color: "#888" }}>
                      {[article.source, article.category, article.publishedAt].filter(Boolean).join(" · ")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )
        )}

        {/* Kalshi / Predictions tab */}
        {activeTab === "kalshi" && (
          activity.length === 0 ? (
            <p style={{ textAlign: "center", color: "#aaa", paddingTop: 40 }}>No prediction activity yet</p>
          ) : (
            <div>
              {/* Stats summary */}
              <div style={{ display: "flex", border: "1px solid #e5e5e5", borderRadius: 8, marginBottom: 16, overflow: "hidden" }}>
                <div style={{ flex: 1, padding: "12px 0", textAlign: "center", borderRight: "1px solid #e5e5e5" }}>
                  <p style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>{stats.total}</p>
                  <p style={{ margin: 0, fontSize: 11, color: "#666" }}>Total Bets</p>
                </div>
                <div style={{ flex: 1, padding: "12px 0", textAlign: "center", borderRight: "1px solid #e5e5e5" }}>
                  <p style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>{stats.winRate}%</p>
                  <p style={{ margin: 0, fontSize: 11, color: "#666" }}>Win Rate</p>
                </div>
                <div style={{ flex: 1, padding: "12px 0", textAlign: "center" }}>
                  <p style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>{stats.profitLoss}</p>
                  <p style={{ margin: 0, fontSize: 11, color: "#666" }}>Total P&L</p>
                </div>
              </div>

              {/* Activity list */}
              {activity.map((item) => (
                <div key={item.id} style={{ padding: "14px 0", borderBottom: "1px solid #e5e5e5", cursor: "pointer" }}>
                  {item.result && (
                    <span style={{ display: "inline-block", fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 4, border: "1px solid #000", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>
                      {item.result}
                    </span>
                  )}
                  <p style={{ margin: "0 0 8px", fontSize: 13, fontWeight: 600, lineHeight: 1.4 }}>{item.question}</p>
                  <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                    {item.position && <span style={{ fontSize: 12, color: "#666" }}>Position: <strong>{item.position}</strong></span>}
                    {item.stake    && <span style={{ fontSize: 12, color: "#666" }}>Stake: <strong>{item.stake}</strong></span>}
                    {item.payout   && <span style={{ fontSize: 12, color: "#666" }}>P&L: <strong>{item.payout}</strong></span>}
                  </div>
                </div>
              ))}
            </div>
          )
        )}

      </div>

      {/* Bottom nav */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "#fff", borderTop: "1px solid #e5e5e5", display: "flex" }}>
        <Link to="/videos" style={{ flex: 1, padding: "14px 0", textAlign: "center", fontSize: 13, fontWeight: 600, color: "#000", textDecoration: "none", borderRight: "1px solid #e5e5e5" }}>
          Videos
        </Link>
        <Link to="/news" style={{ flex: 1, padding: "14px 0", textAlign: "center", fontSize: 13, fontWeight: 600, color: "#000", textDecoration: "none", borderRight: "1px solid #e5e5e5" }}>
          News
        </Link>
        <Link to="/predict" style={{ flex: 1, padding: "14px 0", textAlign: "center", fontSize: 13, fontWeight: 600, color: "#000", textDecoration: "none" }}>
          Predict
        </Link>
      </div>

    </div>
  );
}

export default UserProfile;