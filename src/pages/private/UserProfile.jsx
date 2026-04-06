import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// PLACEHOLDER DATA (replace with API data later)

const PLACEHOLDER_USER = {
  name: "John Doe",
  username: "@johndoe",
  bio: "Finance enthusiast. Investor. Always watching the market.",
  avatarUrl: null,
};

const PLACEHOLDER_VIDEOS = [
  { id: 1, title: "Why the Fed matters to your portfolio", views: 8400, duration: "3:12", category: "Macro", thumbnailUrl: null },
  { id: 2, title: "Top 3 stocks to watch this week", views: 15000, duration: "4:45", category: "Equities", thumbnailUrl: null },
  { id: 3, title: "Is crypto dead or just sleeping?", views: 22000, duration: "5:30", category: "Crypto", thumbnailUrl: null },
  { id: 4, title: "Breaking down the latest CPI report", views: 6100, duration: "2:58", category: "Macro", thumbnailUrl: null },
];

const PLACEHOLDER_ARTICLES = [
  { id: 1, title: "The dollar's dominance is quietly cracking", source: "Bloomberg", publishedAt: "2h ago", category: "FX", imageUrl: null },
  { id: 2, title: "JPMorgan sees S&P at 6,800 by year-end", source: "WSJ", publishedAt: "5h ago", category: "Equities", imageUrl: null },
  { id: 3, title: "Fed minutes reveal deeper rate cut debate", source: "Reuters", publishedAt: "1d ago", category: "Macro", imageUrl: null },
  { id: 4, title: "Inside the AI chip shortage nobody is talking about", source: "FT", publishedAt: "2d ago", category: "Tech", imageUrl: null },
];

const PLACEHOLDER_TWEETS = [
  {
    id: 1,
    author: "Elon Musk",
    handle: "@elonmusk",
    avatarUrl: null,
    content: "The Fed is going to have to cut rates. There's no other option at this point. Inflation is cooling and the economy needs stimulus.",
    timestamp: "2h ago",
    likes: 48200,
    retweets: 8100,
    category: "Macro",
  },
  {
    id: 2,
    author: "Cathie Wood",
    handle: "@CathieWood",
    avatarUrl: null,
    content: "AI is deflationary. The productivity gains from artificial intelligence will compress costs across every sector. Don't sleep on ARKK.",
    timestamp: "5h ago",
    likes: 12400,
    retweets: 3200,
    category: "Tech",
  },
  {
    id: 3,
    author: "Michael Saylor",
    handle: "@saylor",
    avatarUrl: null,
    content: "Bitcoin is the only rational macro hedge in 2026. Everything else is noise. The dollar is losing 7-8% purchasing power annually.",
    timestamp: "1d ago",
    likes: 31000,
    retweets: 7600,
    category: "Crypto",
  },
  {
    id: 4,
    author: "Warren Buffett",
    handle: "@WarrenBuffett",
    avatarUrl: null,
    content: "Never bet against America. Short-term volatility is the price you pay for long-term gains. Stay patient, stay invested.",
    timestamp: "2d ago",
    likes: 92000,
    retweets: 21000,
    category: "Equities",
  },
];

const PLACEHOLDER_KALSHI = {
  stats: { total: 48, winRate: 62, profitLoss: "+$4,200" },
  activity: [
    { id: 1, question: "Will the Fed cut rates in May 2026?", position: "YES", stake: "$250", result: "WON", payout: "+$180" },
    { id: 2, question: "Will BTC hit $100K before June?", position: "NO", stake: "$100", result: "LOST", payout: "-$100" },
    { id: 3, question: "Will CPI drop below 3% in Q2?", position: "YES", stake: "$500", result: "PENDING", payout: "--" },
    { id: 4, question: "Will NVDA beat earnings estimates?", position: "YES", stake: "$300", result: "WON", payout: "+$220" },
  ],
};

// HELPERS

function fmtViews(n) {
  if (n == null) return "";
  return n >= 1000 ? `${(n / 1000).toFixed(1)}K views` : `${n} views`;
}

function fmtCount(n) {
  if (n == null) return "";
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return `${n}`;
}

// COMPONENT

function UserProfile() {
  const [activeTab, setActiveTab] = useState("videos");
  const {user: authUser} = useAuth();

  const user = {
    name: authUser?.firstName ? `${authUser.firstName} ${authUser.lastName}` : "TrendBetter User",
    username: authUser?.email ? `@${authUser.email.split('@')[0]}` : "@user", 
    bio: authUser?.bio || "Finance enthusiast. Investor. Always watching the market.",
    avatarUrl: authUser?.avatarUrl || null,
  };

  const videos = PLACEHOLDER_VIDEOS;
  const articles = PLACEHOLDER_ARTICLES;
  const tweets = PLACEHOLDER_TWEETS;
  const { stats, activity } = PLACEHOLDER_KALSHI;

  const initials = user.name
    ? user.name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase()
    : "?";

  const TABS = [
    { key: "videos",   label: "Videos" },
    { key: "articles", label: "News" },
    { key: "tweets",   label: "Tweets" },
    { key: "kalshi",   label: "Predictions" },
  ];

  const resultStyle = (result) => {
    const base = {
      display: "inline-block",
      fontSize: 10,
      fontWeight: 700,
      padding: "2px 7px",
      borderRadius: 4,
      textTransform: "uppercase",
      letterSpacing: "0.05em",
      marginBottom: 6,
    };
    if (result === "WON")     return { ...base, background: "#dcfce7", color: "#16a34a", border: "1px solid #16a34a" };
    if (result === "LOST")    return { ...base, background: "#fee2e2", color: "#dc2626", border: "1px solid #dc2626" };
    if (result === "PENDING") return { ...base, background: "#fef9c3", color: "#ca8a04", border: "1px solid #ca8a04" };
    return { ...base, border: "1px solid currentColor" };
  };

  return (
    <>
      <style>{`
        .up-root{
          --up-border: #efefef; 
          --up-text-primary: #000000; 
          --up-avatar-bg: #000000; 
          --up-avatar-fg: #ffffff; 
          --up-thumb-bg: #f0f0f0; 
          --up-thumb-color: #aaaaaa; 
        }
        .dark .up-root{
          --up-border: #2a2a2a;
          --up-text-primary: #f0f0f0f0;
          --up-avatar-bg: #f0f0f0f0; 
          --up-avatar-fg: #000000; 
          --up-thumb-bg: #1e1e1e; 
          --up-thumb-color: #555555;
        }
        .up-root {
          min-height: 100vh;
          width: 100%; 
          
          color: var(--up-text-primary);
          font-family: system-ui, -apple-system, sans-serif;
        }

        .up-container {
          width: 100%; 
          max-width: none;
          
        }

        /* Header */
        .up-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 20px;
          border-bottom: 1px solid var(--up-border);
        }
        .up-back-link {
          color: var(--up-text-primary);
          font-size: 20px;
          text-decoration: none;
        }
        .up-header-title {
          margin: 0;
          font-size: 16px;
          font-weight: 600;
        }

        /* Profile info */
        .up-profile-info { padding: 20px 20px 16px; }
        .up-profile-row  { display: flex; gap: 16px; align-items: center; margin-bottom: 16px; }

        .up-avatar-placeholder {
          width: 72px; height: 72px; border-radius: 50%;
          background: var(--up-avatar-bg); color: var(--up-avatar-fg);
          display: flex; align-items: center; justify-content: center;
          font-size: 22px; font-weight: 700; flex-shrink: 0;
        }
        .up-avatar-img {
          width: 72px; height: 72px; border-radius: 50%;
          object-fit: cover; border: 1px solid var(--up-border);
          display: flex; align-items: center; justify-content: center;
        }
        .up-name     { margin: 0 0 2px; font-size: 18px; font-weight: 700; }
        .up-username { margin: 0 0 6px; font-size: 13px; color: var(--up-text-secondary); }
        .up-bio      { margin: 0; font-size: 13px; line-height: 1.5; color: var(--up-text-primary); }
        .up-divider  { height: 1px; background: var(--up-border); }

        /* Tabs */
        .up-tabs { display: flex; border-bottom: 1px solid var(--up-border); }
        .up-tab-btn {
          flex: 1; padding: 12px 0;
          background: none; border: none;
          border-bottom: 2px solid transparent;
          font-size: 13px; cursor: pointer;
          color: var(--up-text-muted); font-weight: 400;
          transition: color 0.15s, border-color 0.15s;
          white-space: nowrap;
        }
        .up-tab-btn.active {
          border-bottom-color: var(--up-tab-active);
          font-weight: 700;
          color: var(--up-text-primary);
        }

        /* Content */
        .up-content { padding: 16px 20px 80px; }
        .up-empty   { text-align: center; color: var(--up-text-muted); padding-top: 40px; }

        /* Videos */
        .up-video-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        @media (min-width: 540px) {
          .up-video-grid { grid-template-columns: 1fr 1fr 1fr; }
        }
        .up-video-card {
          border-radius: 6px; overflow: hidden;
          border: 1px solid var(--up-border);
          cursor: pointer; background: var(--up-bg);
        }
        .up-video-thumb {
          aspect-ratio: 16 / 9; background: var(--up-thumb-bg);
          display: flex; align-items: center; justify-content: center;
          position: relative;
        }
        .up-video-thumb span { font-size: 11px; color: var(--up-thumb-color); }
        .up-video-duration {
          position: absolute; bottom: 5px; right: 5px;
          
          font-size: 10px; padding: 2px 5px; border-radius: 3px;
        }
        .up-video-meta  { padding: 8px 10px; }
        .up-video-title { margin: 0 0 4px; font-size: 12px; font-weight: 600; line-height: 1.4; color: var(--up-text-primary); }
        .up-video-sub   { margin: 0; font-size: 11px; color: var(--up-text-muted); }

        /* Articles */
        .up-article-row {
          padding: 14px 0; border-bottom: 1px solid var(--up-border);
          cursor: pointer; display: flex; gap: 12px; align-items: flex-start;
        }
        .up-article-thumb {
          width: 72px; height: 52px; border-radius: 4px;
          background: var(--up-thumb-bg); flex-shrink: 0; overflow: hidden;
        }
        .up-article-title { margin: 0 0 4px; font-size: 13px; font-weight: 600; line-height: 1.4; color: var(--up-text-primary); }
        .up-article-sub   { margin: 0; font-size: 11px; color: var(--up-text-muted); }

        /* Tweets */
        .up-tweet-card        { padding: 14px 0; border-bottom: 1px solid var(--up-border); cursor: pointer; }
        .up-tweet-author-row  { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
        .up-tweet-avatar {
          width: 36px; height: 36px; border-radius: 50%;
          background: var(--up-avatar-bg); color: var(--up-avatar-fg);
          display: flex; align-items: center; justify-content: center;
          font-size: 12px; font-weight: 700; flex-shrink: 0; overflow: hidden;
        }
        .up-tweet-author-name { margin: 0; font-size: 13px; font-weight: 700; color: var(--up-text-primary); }
        .up-tweet-handle      { margin: 0; font-size: 12px; color: var(--up-text-muted); }
        .up-tweet-timestamp   { margin-left: auto; font-size: 11px; color: var(--up-text-muted); }
        .up-tweet-body        { margin: 0 0 10px; font-size: 13px; line-height: 1.5; color: var(--up-text-primary); }
        .up-tweet-stats       { display: flex; gap: 18px; }
        .up-tweet-stat        { font-size: 12px; color: var(--up-text-muted); display: flex; align-items: center; gap: 4px; }
        .up-tweet-category {
          display: inline-block; font-size: 10px; font-weight: 700;
          padding: 2px 7px; border-radius: 4px;
          border: 1px solid var(--up-border);
          color: var(--up-text-secondary);
          text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 6px;
        }

        /* Kalshi */
        .up-kalshi-stats {
          display: flex; border: 1px solid var(--up-border);
          border-radius: 8px; margin-bottom: 16px; overflow: hidden;
        }
        .up-kalshi-stat {
          flex: 1; padding: 12px 0; text-align: center;
          border-right: 1px solid var(--up-border);
        }
        .up-kalshi-stat:last-child { border-right: none; }
        .up-kalshi-stat-val   { margin: 0; font-size: 16px; font-weight: 700; color: var(--up-text-primary); }
        .up-kalshi-stat-label { margin: 0; font-size: 11px; color: var(--up-stat-label); }
        .up-kalshi-row        { padding: 14px 0; border-bottom: 1px solid var(--up-border); cursor: pointer; }
        .up-kalshi-question   { margin: 0 0 8px; font-size: 13px; font-weight: 600; line-height: 1.4; color: var(--up-text-primary); }
        .up-kalshi-details    { display: flex; gap: 16px; flex-wrap: wrap; }
        .up-kalshi-detail     { font-size: 12px; color: var(--up-text-secondary); }
      `}</style>

      <div className="up-root">
        <div className="up-container">

          {/* Header */}
          <div className="up-header">
            <Link to="/" className="up-back-link">&#8592;</Link>
            <p className="up-header-title">Profile</p>
            <div style={{ width: 20 }} />
          </div>

          {/* Profile info */}
          <div className="up-profile-info">
            <div className="up-profile-row">
              {user.avatarUrl ? (
                <img src={user.avatarUrl} alt={user.name} className="up-avatar-img" />
              ) : (
                <div className="up-avatar-placeholder">{initials}</div>
              )}
              <div>
                <p className="up-name">{user.name}</p>
                <p className="up-username">{user.username}</p>
                {user.bio && <p className="up-bio">{user.bio}</p>}
              </div>
            </div>
          </div>

          <div className="up-divider" />

          {/* Tabs */}
          <div className="up-tabs">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`up-tab-btn${activeTab === tab.key ? " active" : ""}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="up-content">

            {/* Videos */}
            {activeTab === "videos" && (
              videos.length === 0 ? (
                <p className="up-empty">No saved videos yet</p>
              ) : (
                <div className="up-video-grid">
                  {videos.map((video) => (
                    <div key={video.id} className="up-video-card">
                      <div className="up-video-thumb">
                        {video.thumbnailUrl ? (
                          <img src={video.thumbnailUrl} alt={video.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        ) : (
                          <span>No preview</span>
                        )}
                        {video.duration && (
                          <span className="up-video-duration">{video.duration}</span>
                        )}
                      </div>
                      <div className="up-video-meta">
                        <p className="up-video-title">{video.title}</p>
                        <p className="up-video-sub">
                          {[video.category, fmtViews(video.views)].filter(Boolean).join(" · ")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )
            )}

            {/* Articles / News */}
            {activeTab === "articles" && (
              articles.length === 0 ? (
                <p className="up-empty">No saved articles yet</p>
              ) : (
                <div>
                  {articles.map((article) => (
                    <div key={article.id} className="up-article-row">
                      <div className="up-article-thumb">
                        {article.imageUrl && (
                          <img src={article.imageUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        )}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p className="up-article-title">{article.title}</p>
                        <p className="up-article-sub">
                          {[article.source, article.category, article.publishedAt].filter(Boolean).join(" · ")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )
            )}

            {/* Tweets */}
            {activeTab === "tweets" && (
              tweets.length === 0 ? (
                <p className="up-empty">No saved tweets yet</p>
              ) : (
                <div>
                  {tweets.map((tweet) => {
                    const tweetInitials = tweet.author
                      ? tweet.author.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase()
                      : "?";
                    return (
                      <div key={tweet.id} className="up-tweet-card">
                        <div className="up-tweet-author-row">
                          <div className="up-tweet-avatar">
                            {tweet.avatarUrl ? (
                              <img src={tweet.avatarUrl} alt={tweet.author} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            ) : tweetInitials}
                          </div>
                          <div>
                            <p className="up-tweet-author-name">{tweet.author}</p>
                            <p className="up-tweet-handle">{tweet.handle}</p>
                          </div>
                          <span className="up-tweet-timestamp">{tweet.timestamp}</span>
                        </div>
                        {tweet.category && (
                          <span className="up-tweet-category">{tweet.category}</span>
                        )}
                        <p className="up-tweet-body">{tweet.content}</p>
                        <div className="up-tweet-stats">
                          <span className="up-tweet-stat">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                            </svg>
                            {fmtCount(tweet.likes)}
                          </span>
                          <span className="up-tweet-stat">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>
                            </svg>
                            {fmtCount(tweet.retweets)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )
            )}

            {/* Kalshi / Predictions */}
            {activeTab === "kalshi" && (
              activity.length === 0 ? (
                <p className="up-empty">No prediction activity yet</p>
              ) : (
                <div>
                  <div className="up-kalshi-stats">
                    <div className="up-kalshi-stat">
                      <p className="up-kalshi-stat-val">{stats.total}</p>
                      <p className="up-kalshi-stat-label">Total Bets</p>
                    </div>
                    <div className="up-kalshi-stat">
                      <p className="up-kalshi-stat-val">{stats.winRate}%</p>
                      <p className="up-kalshi-stat-label">Win Rate</p>
                    </div>
                    <div className="up-kalshi-stat">
                      <p className="up-kalshi-stat-val">{stats.profitLoss}</p>
                      <p className="up-kalshi-stat-label">Total P&L</p>
                    </div>
                  </div>

                  {activity.map((item) => (
                    <div key={item.id} className="up-kalshi-row">
                      {item.result && (
                        <span style={resultStyle(item.result)}>{item.result}</span>
                      )}
                      <p className="up-kalshi-question">{item.question}</p>
                      <div className="up-kalshi-details">
                        {item.position && <span className="up-kalshi-detail">Position: <strong>{item.position}</strong></span>}
                        {item.stake    && <span className="up-kalshi-detail">Stake: <strong>{item.stake}</strong></span>}
                        {item.payout   && <span className="up-kalshi-detail">P&L: <strong>{item.payout}</strong></span>}
                      </div>
                    </div>
                  ))}
                </div>
              )
            )}

          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;