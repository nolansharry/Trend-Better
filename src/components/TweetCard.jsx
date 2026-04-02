// import React from "react";
// //import PropTypes from "prop-types";

// const styles = {
//     card: {
//         border: "1px solid #e1e8ed",
//         borderRadius: 12,
//         padding: 12,
//         maxWidth: 640,
//         background: "#fff",
//         fontFamily: "Arial, Helvetica, sans-serif",
//     },
//     row: { display: "flex", gap: 12 },
//     avatar: { width: 48, height: 48, borderRadius: "50%", objectFit: "cover" },
//     header: { display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" },
//     name: { fontWeight: 700 },
//     handle: { color: "#657786", fontSize: 13 },
//     time: { color: "#657786", fontSize: 13, marginLeft: 6 },
//     text: { marginTop: 8, marginBottom: 8, lineHeight: 1.4 },
//     mediaGrid: { display: "grid", gap: 8, marginTop: 8 },
//     mediaImg: { width: "100%", borderRadius: 8, objectFit: "cover" },
//     actions: { display: "flex", gap: 18, marginTop: 10, color: "#657786", fontSize: 13 },
//     actionBtn: { display: "flex", alignItems: "center", gap: 6, cursor: "pointer", userSelect: "none" },
//     count: { color: "#14171a" },
// };

// function timeAgo(date) {
//     if (!date) return "";
//     const diff = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
//     if (diff < 60) return `${diff}s`;
//     if (diff < 3600) return `${Math.floor(diff / 60)}m`;
//     if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
//     return `${Math.floor(diff / 86400)}d`;
// }

// function linkify(text) {
//     if (!text) return null;
//     const parts = [];
//     const regex = /(https?:\/\/[^\s]+)|(@[A-Za-z0-9_]+)|(#\w+)/g;
//     let lastIndex = 0;
//     let match;
//     while ((match = regex.exec(text)) !== null) {
//         if (match.index > lastIndex) {
//             parts.push(text.slice(lastIndex, match.index));
//         }
//         const [full, url, mention, hashtag] = match;
//         if (url) {
//             parts.push(
//                 <a key={match.index} href={url} target="_blank" rel="noopener noreferrer" style={{ color: "#1b95e0" }}>
//                     {url}
//                 </a>
//             );
//         } else if (mention) {
//             parts.push(
//                 <a key={match.index} href={`https://twitter.com/${mention.slice(1)}`} target="_blank" rel="noopener noreferrer" style={{ color: "#1b95e0" }}>
//                     {mention}
//                 </a>
//             );
//         } else if (hashtag) {
//             parts.push(
//                 <a key={match.index} href={`https://twitter.com/hashtag/${hashtag.slice(1)}`} target="_blank" rel="noopener noreferrer" style={{ color: "#1b95e0" }}>
//                     {hashtag}
//                 </a>
//             );
//         } else {
//             parts.push(full);
//         }
//         lastIndex = regex.lastIndex;
//     }
//     if (lastIndex < text.length) parts.push(text.slice(lastIndex));
//     return parts;
// }

// export default function TweetCard({ tweet = {}, onLike, onRetweet, onReply }) {
//     const user = tweet.user || {};
//     const media = tweet.media || [];
//     const imgColumns = media.length === 1 ? "1fr" : media.length === 2 ? "1fr 1fr" : "1fr 1fr";
//     return (
//         <div style={styles.card}>
//             <div style={styles.row}>
//                 <img src={user.avatar || "https://via.placeholder.com/48"} alt="avatar" style={styles.avatar} />
//                 <div style={{ flex: 1 }}>
//                     <div style={styles.header}>
//                         <div style={styles.name}>{user.name || "Unknown"}</div>
//                         <div style={styles.handle}>@{user.handle || "unknown"}</div>
//                         <div style={styles.time}>· {timeAgo(tweet.created_at)}</div>
//                     </div>
//                     <div style={styles.text}>{linkify(tweet.text)}</div>

//                     {media.length > 0 && (
//                         <div style={{ ...styles.mediaGrid, gridTemplateColumns: imgColumns }}>
//                             {media.slice(0, 4).map((m, i) => (
//                                 <img key={i} src={m} alt={`media-${i}`} style={styles.mediaImg} />
//                             ))}
//                         </div>
//                     )}

//                     <div style={styles.actions}>
//                         <div style={styles.actionBtn} onClick={() => onReply && onReply(tweet)}>
//                             <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M14 9V5l-9 9 9 9v-4.1c4.55 0 7.5 1.94 9 5.1-1-5-4-10-9-14z" fill="currentColor"/></svg>
//                             <span>{tweet.reply_count || 0}</span>
//                         </div>

//                         <div style={styles.actionBtn} onClick={() => onRetweet && onRetweet(tweet)}>
//                             <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M23 7l-6-6v4H3v4h14v4L23 7zM1 17l6 6v-4h14v-4H7v-4L1 17z" fill="currentColor"/></svg>
//                             <span style={styles.count}>{tweet.retweet_count || 0}</span>
//                         </div>

//                         <div style={styles.actionBtn} onClick={() => onLike && onLike(tweet)}>
//                             <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 21s-7-4.35-9-7.09C-0.34 8.53 3.6 3 8 3c2.24 0 3.8 1.18 4 2 .2-.82 1.76-2 4-2 4.4 0 8.34 5.53 5 10.91C19 16.65 12 21 12 21z" fill="currentColor"/></svg>
//                             <span style={styles.count}>{tweet.like_count || 0}</span>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// TweetCard.propTypes = {
//     tweet: PropTypes.shape({
//         user: PropTypes.shape({
//             name: PropTypes.string,
//             handle: PropTypes.string,
//             avatar: PropTypes.string,
//         }),
//         text: PropTypes.string,
//         created_at: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
//         media: PropTypes.arrayOf(PropTypes.string),
//         reply_count: PropTypes.number,
//         retweet_count: PropTypes.number,
//         like_count: PropTypes.number,
//     }),
//     onLike: PropTypes.func,
//     onRetweet: PropTypes.func,
//     onReply: PropTypes.func,
// };

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