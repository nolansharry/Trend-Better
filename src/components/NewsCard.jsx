
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