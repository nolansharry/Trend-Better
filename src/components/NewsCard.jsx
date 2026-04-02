// import React from "react";
// //import PropTypes from "prop-types";

// const styles = {
//     card: {
//         display: "flex",
//         gap: 12,
//         padding: 12,
//         borderRadius: 8,
//         border: "1px solid #e3e7ee",
//         background: "#fff",
//         alignItems: "flex-start",
//         maxWidth: 680,
//         boxShadow: "0 1px 3px rgba(16,24,40,0.05)",
//     },
//     image: {
//         width: 140,
//         height: 90,
//         objectFit: "cover",
//         borderRadius: 6,
//         flexShrink: 0,
//         background: "#f3f4f6",
//     },
//     content: {
//         display: "flex",
//         flexDirection: "column",
//         gap: 6,
//         minWidth: 0,
//     },
//     headline: {
//         margin: 0,
//         fontSize: 16,
//         lineHeight: "1.2",
//         fontWeight: 600,
//         color: "#0f172a",
//         textDecoration: "none",
//     },
//     meta: {
//         fontSize: 12,
//         color: "#6b7280",
//     },
//     snippet: {
//         margin: 0,
//         fontSize: 14,
//         color: "#374151",
//         overflow: "hidden",
//         textOverflow: "ellipsis",
//         display: "-webkit-box",
//         WebkitLineClamp: 3,
//         WebkitBoxOrient: "vertical",
//     },
// };

// function formatDate(iso) {
//     if (!iso) return null;
//     try {
//         const d = new Date(iso);
//         return d.toLocaleDateString();
//     } catch {
//         return iso;
//     }
// }

// /**
//  * NewsCard
//  * Props:
//  *  - headline: string (required)
//  *  - photo: string (optional)
//  *  - snippet: string (optional)
//  *  - url: string (optional)  -> wraps headline and image
//  *  - source: string (optional)
//  *  - date: string (ISO or parsable) (optional)
//  */
// export default function NewsCard({
//     headline,
//     photo,
//     snippet,
//     url,
//     source,
//     date,
// }) {
//     const content = (
//         <>
//             <img
//                 src={photo || "https://via.placeholder.com/280x180?text=No+Image"}
//                 alt={headline || "news image"}
//                 style={styles.image}
//             />
//             <div style={styles.content}>
//                 <h3 style={styles.headline}>{headline}</h3>
//                 <p style={styles.meta}>
//                     {source || "Unknown source"}
//                     {date ? " • " + formatDate(date) : null}
//                 </p>
//                 {snippet ? <p style={styles.snippet}>{snippet}</p> : null}
//             </div>
//         </>
//     );

//     return url ? (
//         <a
//             href={url}
//             target="_blank"
//             rel="noopener noreferrer"
//             style={{ textDecoration: "none" }}
//             aria-label={headline}
//         >
//             <article style={styles.card}>{content}</article>
//         </a>
//     ) : (
//         <article style={styles.card}>{content}</article>
//     );
// }

// NewsCard.propTypes = {
//     headline: PropTypes.string.isRequired,
//     photo: PropTypes.string,
//     snippet: PropTypes.string,
//     url: PropTypes.string,
//     source: PropTypes.string,
//     date: PropTypes.string,
// };

/**
 * NewsCard.jsx
 *
 * Props — article object:
 *   headline    string   — article title
 *   summary     string   — short description / lede
 *   source      string   — publication name e.g. "Reuters"
 *   category    string   — e.g. "Economy"
 *   timestamp   string   — human-readable e.g. "3 hours ago"
 *   url         string   — link to the full article
 *   imageUrl    string?  — optional thumbnail image
 */

export default function NewsCard({ article }) {
  const { headline, summary, source, category, timestamp, url, imageUrl } = article;

  const handleOpen = () => {
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      onClick={handleOpen}
      style={{
        background: "var(--color-background-primary)",
        border: "0.5px solid var(--color-border-tertiary)",
        borderRadius: "var(--border-radius-lg)",
        padding: "1rem 1.25rem",
        cursor: url ? "pointer" : "default",
        transition: "border-color 0.15s",
      }}
      onMouseEnter={e => e.currentTarget.style.borderColor = "var(--color-border-secondary)"}
      onMouseLeave={e => e.currentTarget.style.borderColor = "var(--color-border-tertiary)"}
    >

      <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>

        {/* Text content */}
        <div style={{ flex: 1, minWidth: 0 }}>

          {/* Tag row */}
          <div style={{
            display: "flex", alignItems: "center",
            justifyContent: "space-between", marginBottom: 10,
          }}>
            <span style={{
              fontSize: 11, fontWeight: 500, padding: "2px 8px",
              borderRadius: "var(--border-radius-md)",
              background: "#EAF3DE", color: "#27500A",
            }}>
              News
            </span>
            <span style={{ fontSize: 12, color: "var(--color-text-tertiary)" }}>
              {category}
            </span>
          </div>

          {/* Headline */}
          <div style={{
            fontSize: 15, fontWeight: 500,
            color: "var(--color-text-primary)",
            lineHeight: 1.4, marginBottom: 6,
          }}>
            {headline}
          </div>

          {/* Summary */}
          {summary && (
            <div style={{
              fontSize: 14,
              color: "var(--color-text-secondary)",
              lineHeight: 1.6,
              marginBottom: 12,
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}>
              {summary}
            </div>
          )}

          {/* Footer — source + timestamp + external link hint */}
          <div style={{
            display: "flex", alignItems: "center",
            justifyContent: "space-between",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {/* Source favicon placeholder */}
              <div style={{
                width: 16, height: 16, borderRadius: 4,
                background: "var(--color-background-secondary)",
                border: "0.5px solid var(--color-border-tertiary)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <span style={{ fontSize: 9, fontWeight: 500, color: "var(--color-text-tertiary)" }}>
                  {source?.[0]?.toUpperCase()}
                </span>
              </div>
              <span style={{ fontSize: 12, color: "var(--color-text-secondary)", fontWeight: 500 }}>
                {source}
              </span>
              <span style={{ fontSize: 12, color: "var(--color-text-tertiary)" }}>
                · {timestamp}
              </span>
            </div>

            {/* External link indicator */}
            {url && (
              <span style={{
                fontSize: 11, color: "var(--color-text-tertiary)",
                letterSpacing: "0.02em",
              }}>
                ↗
              </span>
            )}
          </div>

        </div>

        {/* Optional thumbnail */}
        {imageUrl && (
          <div style={{
            width: 80, height: 80, flexShrink: 0,
            borderRadius: "var(--border-radius-md)",
            overflow: "hidden",
            border: "0.5px solid var(--color-border-tertiary)",
          }}>
            <img
              src={imageUrl}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={e => e.currentTarget.style.display = "none"}
            />
          </div>
        )}

      </div>
    </div>
  );
}