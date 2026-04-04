
/**
 * TweetCard.jsx
 *
 * Props — tweet object:
 *   handle        string   — e.g. "@NickTimiraos"
 *   displayName   string   — e.g. "Nick Timiraos"
 *   affiliation   string?  — optional e.g. "WSJ"
 *   body          string   — tweet text content
 *   timestamp     string   — human-readable e.g. "2h ago"
 *   likes         string   — formatted like count e.g. "4.1K"
 *   isExternal    bool     — true = X/Twitter, false = internal TrendBetter user
 *   tweetUrl      string?  — optional link to original tweet
 *   avatarUrl     string?  — optional profile image URL
 */

function Avatar({ displayName, avatarUrl, isExternal }) {
  const initials = displayName
    ? displayName.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase()
    : "?";

  const bgColor = isExternal ? "#EEEDFE" : "#E1F5EE";
  const textColor = isExternal ? "#3C3489" : "#085041";

  return (
    <div style={{
      width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
      background: avatarUrl ? "transparent" : bgColor,
      border: "0.5px solid var(--color-border-tertiary)",
      display: "flex", alignItems: "center", justifyContent: "center",
      overflow: "hidden",
    }}>
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={displayName}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          onError={e => {
            e.currentTarget.style.display = "none";
            e.currentTarget.parentElement.style.background = bgColor;
          }}
        />
      ) : (
        <span style={{ fontSize: 12, fontWeight: 500, color: textColor }}>
          {initials}
        </span>
      )}
    </div>
  );
}

function SourceBadge({ isExternal }) {
  return (
    <span style={{
      fontSize: 11, fontWeight: 500, padding: "2px 8px",
      borderRadius: "var(--border-radius-md)",
      background: isExternal ? "#EEEDFE" : "#E1F5EE",
      color: isExternal ? "#3C3489" : "#085041",
    }}>
      {isExternal ? "X / Twitter" : "TrendBetter"}
    </span>
  );
}

export default function TweetCard({ tweet }) {
  const {
    handle, displayName, affiliation,
    body, timestamp, likes,
    isExternal, tweetUrl, avatarUrl,
  } = tweet;

  const handleOpen = () => {
    if (tweetUrl) window.open(tweetUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      style={{
        background: "var(--color-background-primary)",
        border: "0.5px solid var(--color-border-tertiary)",
        borderRadius: "var(--border-radius-lg)",
        padding: "1rem 1.25rem",
        transition: "border-color 0.15s",
        cursor: tweetUrl ? "pointer" : "default",
      }}
      onClick={tweetUrl ? handleOpen : undefined}
      onMouseEnter={e => e.currentTarget.style.borderColor = "var(--color-border-secondary)"}
      onMouseLeave={e => e.currentTarget.style.borderColor = "var(--color-border-tertiary)"}
    >

      {/* Tag row */}
      <div style={{
        display: "flex", alignItems: "center",
        justifyContent: "space-between", marginBottom: 10,
      }}>
        <SourceBadge isExternal={isExternal} />
        {tweetUrl && (
          <span style={{ fontSize: 11, color: "var(--color-text-tertiary)" }}>↗</span>
        )}
      </div>

      {/* Author row */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <Avatar displayName={displayName} avatarUrl={avatarUrl} isExternal={isExternal} />
        <div style={{ minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
            <span style={{
              fontSize: 14, fontWeight: 500,
              color: "var(--color-text-primary)",
              whiteSpace: "nowrap",
            }}>
              {displayName}
            </span>
            {affiliation && (
              <span style={{
                fontSize: 12, color: "var(--color-text-tertiary)",
                whiteSpace: "nowrap",
              }}>
                · {affiliation}
              </span>
            )}
          </div>
          <div style={{ fontSize: 12, color: "var(--color-text-tertiary)" }}>
            {handle}
          </div>
        </div>
      </div>

      {/* Tweet body */}
      <div style={{
        fontSize: 14, lineHeight: 1.6,
        color: "var(--color-text-primary)",
        marginBottom: 12,
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
      }}>
        {body}
      </div>

      {/* Footer — timestamp + likes */}
      <div style={{
        display: "flex", alignItems: "center",
        justifyContent: "space-between",
        borderTop: "0.5px solid var(--color-border-tertiary)",
        paddingTop: 10,
      }}>
        <span style={{ fontSize: 12, color: "var(--color-text-tertiary)" }}>
          {timestamp}
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {/* Heart icon */}
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
            stroke="var(--color-text-tertiary)" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          <span style={{ fontSize: 12, color: "var(--color-text-tertiary)" }}>
            {likes}
          </span>
        </div>
      </div>

    </div>
  );
}