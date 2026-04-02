import { useState, useEffect, useRef, useCallback } from "react";
import KalshiCard from "../../components/KalshiCard";
import NewsCard from "../../components/NewsCard";
import TweetCard from "../../components/TweetCard";

const FILTERS = [
  { label: "All", value: "all" },
  { label: "Kalshi Markets", value: "kalshi" },
  { label: "News", value: "news" },
  { label: "Tweets", value: "tweet" },
];

const PAGE_SIZE = 10;

/**
 * Feed.jsx
 *
 * Props:
 *   fetchItems(filter, page) -> Promise<{ items: [], hasMore: bool }>
 *     - filter: "all" | "kalshi" | "news" | "tweet"
 *     - page: number (0-indexed)
 *     - items: array of feed item objects (see card components for shape)
 *     - hasMore: whether more pages exist
 *
 * If no fetchItems prop is provided, falls back to MOCK_DATA for development.
 */

const MOCK_DATA = [
  {
    id: "k1", type: "kalshi",
    title: "Will the Fed cut rates at the May 2025 meeting?",
    closeDate: "May 7, 2025", category: "Politics & Macro",
    yesPrice: 72, noPrice: 28, volume: "$1.4M",
    marketUrl: "https://kalshi.com",
  },
  {
    id: "n1", type: "news",
    headline: "Fed minutes signal growing caution over inflation stalling",
    summary: "Officials expressed concern that progress on inflation may have plateaued, complicating the path toward rate cuts later this year.",
    source: "Reuters", category: "Economy", timestamp: "3 hours ago",
    url: "https://reuters.com",
  },
  {
    id: "t1", type: "tweet",
    handle: "@NickTimiraos", displayName: "Nick Timiraos", affiliation: "WSJ",
    body: "The May meeting is live in a way markets aren't fully pricing. Chair Powell has left the door open more than his colleagues.",
    timestamp: "2h ago", likes: "4.1K", isExternal: true,
  },
  {
    id: "k2", type: "kalshi",
    title: "Will the S&P 500 close above 5,500 by end of April?",
    closeDate: "Apr 30, 2025", category: "Equities",
    yesPrice: 41, noPrice: 59, volume: "$890K",
    marketUrl: "https://kalshi.com",
  },
  {
    id: "n2", type: "news",
    headline: "Tech earnings season kicks off with mixed signals from megacaps",
    summary: "Alphabet beat expectations while Microsoft guided cautiously, leaving investors uncertain about AI spending momentum.",
    source: "Bloomberg", category: "Technology", timestamp: "1 hour ago",
    url: "https://bloomberg.com",
  },
  {
    id: "t2", type: "tweet",
    handle: "@unusual_whales", displayName: "Unusual Whales", affiliation: null,
    body: "SPY options flow going into tomorrow's open is heavily skewed to puts. Largest single bet seen in 3 weeks.",
    timestamp: "45m ago", likes: "12.3K", isExternal: true,
  },
  {
    id: "k3", type: "kalshi",
    title: "Will Bitcoin exceed $100K before June 2025?",
    closeDate: "Jun 1, 2025", category: "Crypto",
    yesPrice: 55, noPrice: 45, volume: "$3.2M",
    marketUrl: "https://kalshi.com",
  },
  {
    id: "n3", type: "news",
    headline: "Treasury yields climb as debt ceiling negotiations stall",
    summary: "Investors are pricing in renewed fiscal uncertainty as Congress struggles to reach a deal before the summer deadline.",
    source: "FT", category: "Fixed Income", timestamp: "30 minutes ago",
    url: "https://ft.com",
  },
  {
    id: "t3", type: "tweet",
    handle: "@KobeissiLetter", displayName: "The Kobeissi Letter", affiliation: null,
    body: "BREAKING: Treasury Secretary signals willingness to invoke extraordinary measures as early as next month. This changes the calculus on rate cuts.",
    timestamp: "15m ago", likes: "8.7K", isExternal: true,
  },
  {
    id: "k4", type: "kalshi",
    title: "Will unemployment rise above 4.5% in Q2 2025?",
    closeDate: "Jun 30, 2025", category: "Labor",
    yesPrice: 33, noPrice: 67, volume: "$540K",
    marketUrl: "https://kalshi.com",
  },
];

function mockFetch(filter, page) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filtered = filter === "all"
        ? MOCK_DATA
        : MOCK_DATA.filter((item) => item.type === filter);

      const start = page * PAGE_SIZE;
      const slice = filtered.slice(start, start + PAGE_SIZE);

      // Simulate more pages by duplicating mock data with new ids
      const items = page > 0
        ? slice.map((item) => ({ ...item, id: `${item.id}-p${page}` }))
        : slice;

      resolve({
        items,
        hasMore: page < 2 && filtered.length > 0,
      });
    }, 600);
  });
}

function CardRouter({ item }) {
  switch (item.type) {
    case "kalshi": return <KalshiCard market={item} />;
    case "news":   return <NewsCard article={item} />;
    case "tweet":  return <TweetCard tweet={item} />;
    default:       return null;
  }
}

function Spinner() {
  return (
    <div style={{
      display: "flex", justifyContent: "center", padding: "2rem 0",
    }}>
      <div style={{
        width: 24, height: 24,
        border: "2px solid var(--color-border-tertiary)",
        borderTopColor: "var(--color-text-secondary)",
        borderRadius: "50%",
        animation: "spin 0.7s linear infinite",
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default function Feed({ fetchItems }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const observerRef = useRef(null);
  const sentinelRef = useRef(null);

  const fetcher = fetchItems || mockFetch;

  const loadPage = useCallback(async (filter, pageNum, replace = false) => {
    if (loading) return;
    setLoading(true);
    setError(null);
    try {
      const { items: newItems, hasMore: more } = await fetcher(filter, pageNum);
      setItems((prev) => replace ? newItems : [...prev, ...newItems]);
      setHasMore(more);
      setPage(pageNum);
    } catch (err) {
      setError("Failed to load feed. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [fetcher, loading]);

  // Initial load and filter changes
  useEffect(() => {
    setItems([]);
    setPage(0);
    setHasMore(true);
    loadPage(activeFilter, 0, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFilter]);

  // Infinite scroll via IntersectionObserver
  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadPage(activeFilter, page + 1);
        }
      },
      { threshold: 0.1 }
    );

    if (sentinelRef.current) {
      observerRef.current.observe(sentinelRef.current);
    }

    return () => observerRef.current?.disconnect();
  }, [hasMore, loading, page, activeFilter, loadPage]);

  const handleFilterChange = (value) => {
    if (value === activeFilter) return;
    setActiveFilter(value);
  };

  return (
    <div style={{ maxWidth: 620, margin: "0 auto", padding: "1.5rem 1rem" }}>

      {/* Filter bar */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: "1.25rem" }}>
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => handleFilterChange(f.value)}
            style={{
              fontSize: 13,
              padding: "5px 14px",
              borderRadius: 999,
              border: activeFilter === f.value
                ? "none"
                : "0.5px solid var(--color-border-secondary)",
              background: activeFilter === f.value
                ? "var(--color-text-primary)"
                : "transparent",
              color: activeFilter === f.value
                ? "var(--color-background-primary)"
                : "var(--color-text-secondary)",
              cursor: "pointer",
              fontFamily: "var(--font-sans)",
              transition: "all 0.15s",
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Feed items */}
      <div>
        {items.map((item) => (
          <div key={item.id} style={{ marginBottom: 12 }}>
            <CardRouter item={item} />
          </div>
        ))}
      </div>

      {/* Error state */}
      {error && (
        <div style={{
          textAlign: "center", padding: "1.5rem",
          color: "var(--color-text-danger)",
          fontSize: 14,
        }}>
          {error}
          <button
            onClick={() => loadPage(activeFilter, page)}
            style={{ marginLeft: 8, textDecoration: "underline", cursor: "pointer", background: "none", border: "none", color: "inherit" }}
          >
            Retry
          </button>
        </div>
      )}

      {/* Loading spinner */}
      {loading && <Spinner />}

      {/* End of feed message */}
      {!hasMore && !loading && items.length > 0 && (
        <div style={{
          textAlign: "center", padding: "2rem 0",
          fontSize: 13, color: "var(--color-text-tertiary)",
        }}>
          You're all caught up
        </div>
      )}

      {/* Empty state */}
      {!loading && items.length === 0 && !error && (
        <div style={{
          textAlign: "center", padding: "3rem 0",
          fontSize: 14, color: "var(--color-text-tertiary)",
        }}>
          No items found for this filter.
        </div>
      )}

      {/* Invisible sentinel for IntersectionObserver */}
      <div ref={sentinelRef} style={{ height: 1 }} />
    </div>
  );
}
