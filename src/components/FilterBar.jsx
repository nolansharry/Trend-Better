/**
 * FilterBar.jsx
 *
 * Props:
 *   activeFilter    string                       — currently active filter value
 *   onFilterChange  (value: string) => void      — called when user selects a filter
 *   filters         Array<{ label, value }>?     — optional override of default filters
 *
 * Default filters:
 *   { label: "All",            value: "all"    }
 *   { label: "Kalshi Markets", value: "kalshi" }
 *   { label: "News",           value: "news"   }
 *   { label: "Tweets",         value: "tweet"  }
 */

import { useRef, useState, useEffect } from "react";

const DEFAULT_FILTERS = [
  { label: "All",            value: "all"    },
  { label: "Sports Bets",    value: "sports" },
  { label: "News",           value: "news"   },
  { label: "Tweets",         value: "tweet"  },
];

const FILTER_COLORS = {
  all:    { bg: "var(--color-text-primary)",    text: "var(--color-background-primary)" },
  kalshi: { bg: "#185FA5",                      text: "#E6F1FB" },
  news:   { bg: "#3B6D11",                      text: "#EAF3DE" },
  tweet:  { bg: "#534AB7",                      text: "#EEEDFE" },
};

export default function FilterBar({
  activeFilter = "all",
  onFilterChange,
  filters = DEFAULT_FILTERS,
}) {
  const scrollRef = useRef(null);
  const [showLeftFade, setShowLeftFade] = useState(false);
  const [showRightFade, setShowRightFade] = useState(false);

  // Check scroll position to show/hide fade indicators
  const checkFades = () => {
    const el = scrollRef.current;
    if (!el) return;
    setShowLeftFade(el.scrollLeft > 8);
    setShowRightFade(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  };

  useEffect(() => {
    checkFades();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkFades, { passive: true });
    window.addEventListener("resize", checkFades);
    return () => {
      el.removeEventListener("scroll", checkFades);
      window.removeEventListener("resize", checkFades);
    };
  }, []);

  const handleSelect = (value) => {
    if (value === activeFilter) return;
    onFilterChange?.(value);
  };

  const activeColors = FILTER_COLORS[activeFilter] || FILTER_COLORS.all;

  return (
    <div style={{ position: "relative", marginBottom: "1.25rem" }}>

      {/* Left fade */}
      {showLeftFade && (
        <div style={{
          position: "absolute", left: 0, top: 0, bottom: 0,
          width: 32, zIndex: 1, pointerEvents: "none",
          background: "linear-gradient(to right, var(--color-background-primary), transparent)",
        }} />
      )}

      {/* Scrollable pill row */}
      <div
        ref={scrollRef}
        style={{
          display: "flex", gap: 8, overflowX: "auto",
          scrollbarWidth: "none", msOverflowStyle: "none",
          paddingBottom: 2,
        }}
      >
        <style>{`
          .filter-scroll::-webkit-scrollbar { display: none; }
          .filter-pill { transition: background 0.15s, color 0.15s, border-color 0.15s, transform 0.1s; }
          .filter-pill:active { transform: scale(0.96); }
        `}</style>

        {filters.map((f) => {
          const isActive = f.value === activeFilter;
          const colors = FILTER_COLORS[f.value] || FILTER_COLORS.all;

          return (
            <button
              key={f.value}
              className="filter-pill"
              onClick={() => handleSelect(f.value)}
              aria-pressed={isActive}
              style={{
                flexShrink: 0,
                fontSize: 13,
                padding: "5px 14px",
                borderRadius: 999,
                border: isActive
                  ? "none"
                  : "0.5px solid var(--color-border-secondary)",
                background: isActive ? colors.bg : "transparent",
                color: isActive ? colors.text : "var(--color-text-secondary)",
                cursor: "pointer",
                fontFamily: "var(--font-sans)",
                fontWeight: isActive ? 500 : 400,
                whiteSpace: "nowrap",
              }}
              onMouseEnter={e => {
                if (!isActive) e.currentTarget.style.background = "var(--color-background-secondary)";
              }}
              onMouseLeave={e => {
                if (!isActive) e.currentTarget.style.background = "transparent";
              }}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {/* Right fade */}
      {showRightFade && (
        <div style={{
          position: "absolute", right: 0, top: 0, bottom: 0,
          width: 32, zIndex: 1, pointerEvents: "none",
          background: "linear-gradient(to left, var(--color-background-primary), transparent)",
        }} />
      )}

    </div>
  );
}