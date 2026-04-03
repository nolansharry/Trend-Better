import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <div className="home-left">
        <div className="home-tb">
          trend<span>better</span>
        </div>
        <p className="home-desc">
          Everything that moves your money.
        </p>
      </div>
      <div className="home-right">
        <button className="home-btn" onClick={() => navigate("/register")}>
          Sign up
        </button>
        <button className="home-btn" onClick={() => navigate("/login")}>
          Sign in
        </button>
        <button className="home-btn" onClick={() => navigate("/feed")}>
          Feed
        </button>
      </div>
    </div>
  );
}
