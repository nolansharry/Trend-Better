import { useState } from "react";

function getGameStatus(commenceTime) {
  if (!commenceTime) return "upcoming";
  const now = new Date();
  const start = new Date(commenceTime);
  const diffMs = now - start;
  if (diffMs < 0) return "upcoming";
  if (diffMs < 3 * 60 * 60 * 1000) return "live";
  return "ended";
}
const SportsCard = ({ prop }) => {
  const {
    player,
    playerId,
    team,
    opponent,
    market,
    line,
    overOdds,
    underOdds,
  } = prop;

  const [selection, setSelection] = useState(null);
  const teamLogo = `https://a.espncdn.com/i/teamlogos/nba/500/${team}.png`;
  const playerImage = `https://a.espncdn.com/i/headshots/nba/players/full/${playerId}.png`;
  const gameDate = new Date(prop.commence_time);

  const formattedTime = gameDate.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
  const status = getGameStatus(prop.commence_time);

  const WINDOW_MS = 30 * 24 * 60 * 60 * 1000;
  const msUntilGame = gameDate - new Date();
  const timePercent =
    status !== "upcoming"
      ? 100
      : Math.max(0, Math.min(100, (1 - msUntilGame / WINDOW_MS) * 100));
  return (
    <div className="pp-card">
      <img src={playerImage} className="pp-player-img" />
      <div className="pp-top">
        <span className="pp-matchup">
          {team} vs. {opponent}
        </span>
        <img src={teamLogo} className="pp-logo" />
      </div>
      <div className="pp-center">
        <h3 className="pp-player-name">{player}</h3>
        <p className="pp-market">{market}</p>
        <p className="pp-line">{line}</p>
      </div>
      <div className="pp-bottom">
        <div className="pp-bar-row">
          <p className="pp-time">Starts {formattedTime}</p>
          {status === "live" && (
            <span className="status-badge badge-live">
              <span className="live-dot" />
              Live
            </span>
          )}
          {status === "upcoming" && (
            <span className="status-badge badge-upcoming">Upcoming</span>
          )}
          {status === "ended" && (
            <span className="status-badge badge-ended">Ended</span>
          )}
        </div>
        <div className="pp-bar">
          <div
            className="pp-bar-fill"
            style={{
              width: `${timePercent}%`,
              background:
                status === "live"
                  ? "#E24B4A"
                  : status === "ended"
                    ? "var(--text-muted)"
                    : "var(--accent)",
            }}
          />
        </div>
        <div className="pp-button-area">
          <button
            className={`pp-btn over ${selection === "over" ? "active-over" : ""}`}
            onClick={() => setSelection("over")}
            disabled={status === "ended"}
          >
            OVER {(overOdds * 100).toFixed(0)}%
          </button>
          <button
            className={`pp-btn under ${selection === "under" ? "active-under" : ""}`}
            onClick={() => setSelection("under")}
            disabled={status === "ended"}
          >
            UNDER {(underOdds * 100).toFixed(0)}%
          </button>
        </div>
      </div>
    </div>
  );
};
export default SportsCard;
