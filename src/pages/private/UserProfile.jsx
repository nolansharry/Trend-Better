import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  PLACEHOLDER_VIDEOS,
  PLACEHOLDER_ARTICLES,
  PLACEHOLDER_TWEETS,
  PLACEHOLDER_KALSHI,
} from "../../data/userProfile";
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
  const { user: authUser } = useAuth();

  const user = {
    name: authUser?.firstName + " " + authUser?.lastName || "TrendBetter User",
    username: authUser?.email ? `@${authUser.email.split("@")[0]}` : "@user", // Creates a fake handle from their email
    bio:
      authUser?.bio ||
      "Finance enthusiast. Investor. Always watching the market.",
    avatarUrl: authUser?.avatarUrl || null,
  };

  const videos = PLACEHOLDER_VIDEOS;
  const articles = PLACEHOLDER_ARTICLES;
  const tweets = PLACEHOLDER_TWEETS;
  const { stats, activity } = PLACEHOLDER_KALSHI;

  const initials = user.name
    ? user.name
        .split(" ")
        .map((w) => w[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "?";

  const TABS = [
    { key: "videos", label: "Videos" },
    { key: "articles", label: "News" },
    { key: "tweets", label: "Tweets" },
    { key: "kalshi", label: "Predictions" },
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
    if (result === "WON")
      return {
        ...base,
        background: "#dcfce7",
        color: "#16a34a",
        border: "1px solid #16a34a",
      };
    if (result === "LOST")
      return {
        ...base,
        background: "#fee2e2",
        color: "#dc2626",
        border: "1px solid #dc2626",
      };
    if (result === "PENDING")
      return {
        ...base,
        background: "#fef9c3",
        color: "#ca8a04",
        border: "1px solid #ca8a04",
      };
    return { ...base, border: "1px solid currentColor" };
  };

  return (
    <>
      <div className="up-root">
        <div className="up-container">
          {/* Header */}
          <div className="up-header">
            <Link to="/" className="up-back-link">
              &#8592;
            </Link>
            <p className="up-header-title">Profile</p>
            <div style={{ width: 20 }} />
          </div>

          {/* Profile info */}
          <div className="up-profile-info">
            <div className="up-profile-row">
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="up-avatar-img"
                />
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
            {activeTab === "videos" &&
              (videos.length === 0 ? (
                <p className="up-empty">No saved videos yet</p>
              ) : (
                <div className="up-video-grid">
                  {videos.map((video) => (
                    <div key={video.id} className="up-video-card">
                      <div className="up-video-thumb">
                        {video.thumbnailUrl ? (
                          <img
                            src={video.thumbnailUrl}
                            alt={video.title}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        ) : (
                          <span>No preview</span>
                        )}
                        {video.duration && (
                          <span className="up-video-duration">
                            {video.duration}
                          </span>
                        )}
                      </div>
                      <div className="up-video-meta">
                        <p className="up-video-title">{video.title}</p>
                        <p className="up-video-sub">
                          {[video.category, fmtViews(video.views)]
                            .filter(Boolean)
                            .join(" · ")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}

            {/* Articles / News */}
            {activeTab === "articles" &&
              (articles.length === 0 ? (
                <p className="up-empty">No saved articles yet</p>
              ) : (
                <div>
                  {articles.map((article) => (
                    <div key={article.id} className="up-article-row">
                      <div className="up-article-thumb">
                        {article.imageUrl && (
                          <img
                            src={article.imageUrl}
                            alt=""
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        )}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p className="up-article-title">{article.title}</p>
                        <p className="up-article-sub">
                          {[
                            article.source,
                            article.category,
                            article.publishedAt,
                          ]
                            .filter(Boolean)
                            .join(" · ")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}

            {/* Tweets */}
            {activeTab === "tweets" &&
              (tweets.length === 0 ? (
                <p className="up-empty">No saved tweets yet</p>
              ) : (
                <div>
                  {tweets.map((tweet) => {
                    const tweetInitials = tweet.author
                      ? tweet.author
                          .split(" ")
                          .map((w) => w[0])
                          .slice(0, 2)
                          .join("")
                          .toUpperCase()
                      : "?";
                    return (
                      <div key={tweet.id} className="up-tweet-card">
                        <div className="up-tweet-author-row">
                          <div className="up-tweet-avatar">
                            {tweet.avatarUrl ? (
                              <img
                                src={tweet.avatarUrl}
                                alt={tweet.author}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                }}
                              />
                            ) : (
                              tweetInitials
                            )}
                          </div>
                          <div>
                            <p className="up-tweet-author-name">
                              {tweet.author}
                            </p>
                            <p className="up-tweet-handle">{tweet.handle}</p>
                          </div>
                          <span className="up-tweet-timestamp">
                            {tweet.timestamp}
                          </span>
                        </div>
                        {tweet.category && (
                          <span className="up-tweet-category">
                            {tweet.category}
                          </span>
                        )}
                        <p className="up-tweet-body">{tweet.content}</p>
                        <div className="up-tweet-stats">
                          <span className="up-tweet-stat">
                            <svg
                              width="13"
                              height="13"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                            </svg>
                            {fmtCount(tweet.likes)}
                          </span>
                          <span className="up-tweet-stat">
                            <svg
                              width="13"
                              height="13"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="17 1 21 5 17 9" />
                              <path d="M3 11V9a4 4 0 0 1 4-4h14" />
                              <polyline points="7 23 3 19 7 15" />
                              <path d="M21 13v2a4 4 0 0 1-4 4H3" />
                            </svg>
                            {fmtCount(tweet.retweets)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}

            {/* Kalshi / Predictions */}
            {activeTab === "kalshi" &&
              (activity.length === 0 ? (
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
                        <span style={resultStyle(item.result)}>
                          {item.result}
                        </span>
                      )}
                      <p className="up-kalshi-question">{item.question}</p>
                      <div className="up-kalshi-details">
                        {item.position && (
                          <span className="up-kalshi-detail">
                            Position: <strong>{item.position}</strong>
                          </span>
                        )}
                        {item.stake && (
                          <span className="up-kalshi-detail">
                            Stake: <strong>{item.stake}</strong>
                          </span>
                        )}
                        {item.payout && (
                          <span className="up-kalshi-detail">
                            P&L: <strong>{item.payout}</strong>
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
