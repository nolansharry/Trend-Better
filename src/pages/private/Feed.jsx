import { useState, useEffect, useRef } from "react";
import SportsCard from "../../components/SportsCard";
import NewsCard from "../../components/NewsCard";
import TweetCard from "../../components/TweetCard";
import { MOCK_DATA } from "../../data/mockData";

const FILTERS = [
  { label: "All", value: "all" },
  { label: "Sports Bets", value: "sports" },
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



function mockFetch(filter, page) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filtered =
        filter === "all"
          ? MOCK_DATA
          : MOCK_DATA.filter((item) => item.type === filter);

      const start = page * PAGE_SIZE;
      const slice = filtered.slice(start, start + PAGE_SIZE);

      // Simulate more pages by duplicating mock data with new ids
      const items =
        page > 0
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
    case "sports":
      return <SportsCard prop={item} />;
    case "news":
      return <NewsCard article={item} />;
    case "tweet":
      return <TweetCard tweet={item} />;
    default:
      return null;
  }
}

function Spinner() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "2rem 0",
      }}
    >
      <div
        style={{
          width: 24,
          height: 24,
          border: "2px solid var(--color-border-tertiary)",
          borderTopColor: "var(--color-text-secondary)",
          borderRadius: "50%",
          animation: "spin 0.7s linear infinite",
        }}
      />
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

  const sentinelRef = useRef(null);
  const observerRef = useRef(null);
  const fetcher = fetchItems || mockFetch;

  // Runs fresh on every filter change
  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError(null);
      setItems([]);
      try {
        const { items: newItems, hasMore: more } = await fetcher(
          activeFilter,
          0,
        );
        if (cancelled) return;
        setItems(newItems);
        setHasMore(more);
        setPage(0);
      } catch {
        if (!cancelled) setError("Failed to load feed. Please try again.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [activeFilter]);

  // Load next page (called by IntersectionObserver only)
  const loadMore = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const nextPage = page + 1;
      const { items: newItems, hasMore: more } = await fetcher(
        activeFilter,
        nextPage,
      );
      setItems((prev) => [...prev, ...newItems]);
      setHasMore(more);
      setPage(nextPage);
    } catch {
      setError("Failed to load more.");
    } finally {
      setLoading(false);
    }
  };

  // Infinite scroll
  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMore();
        }
      },
      { threshold: 0.1 },
    );

    if (sentinelRef.current) observerRef.current.observe(sentinelRef.current);
    return () => observerRef.current?.disconnect();
  }, [hasMore, loading, page, activeFilter]);

  return (
    <div
      style={{
        maxWidth: 620,
        margin: "0 auto",
        padding: "1.5rem 1rem",
        width: "100%",
      }}
    >
      {/* Filter bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 8,
          flexWrap: "wrap",
          marginBottom: "1.25rem",
        }}
      >
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setActiveFilter(f.value)}
            style={{
              fontSize: 13,
              padding: "5px 14px",
              borderRadius: 999,
              border:
                activeFilter === f.value
                  ? "none"
                  : "0.5px solid var(--color-border-secondary)",
              background:
                activeFilter === f.value
                  ? "var(--color-text-primary)"
                  : "transparent",
              color:
                activeFilter === f.value
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
          <div key={item.id} style={{ marginBottom: 12, width: "100%" }}>
            <CardRouter item={item} />
          </div>
        ))}
      </div>

      {/* Error */}
      {error && (
        <div
          style={{
            textAlign: "center",
            padding: "1.5rem",
            color: "var(--color-text-danger)",
            fontSize: 14,
          }}
        >
          {error}
          <button
            onClick={() => loadMore()}
            style={{
              marginLeft: 8,
              textDecoration: "underline",
              cursor: "pointer",
              background: "none",
              border: "none",
              color: "inherit",
            }}
          >
            Retry
          </button>
        </div>
      )}

      {loading && <Spinner />}

      {!hasMore && !loading && items.length > 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "2rem 0",
            fontSize: 13,
            color: "var(--color-text-tertiary)",
          }}
        >
          You're all caught up
        </div>
      )}

      {!loading && items.length === 0 && !error && (
        <div
          style={{
            textAlign: "center",
            padding: "3rem 0",
            fontSize: 14,
            color: "var(--color-text-tertiary)",
          }}
        >
          No items found for this filter.
        </div>
      )}

      <div ref={sentinelRef} style={{ height: 1 }} />
    </div>
  );
}
