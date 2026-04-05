import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const members = [
  { name: "Amil" },
  { name: "Dalton" },
  { name: "Brian" },
  { name: "Nolan" },
];

export default function Home() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="intro-page" data-visible={visible}>
      <div className="intro-inner">
        <div className="intro-hero">
          <div className="intro-title">
            trend<span>better</span>
          </div>
          <p className="intro-tagline">Everything that moves your money.</p>
        </div>

        {/* Description */}
        <div className="intro-description-container">
          <div className="intro-description-title">
            Web Development · Final Project
          </div>
          <p className="intro-description">
            Description of why we decided to go with this idea. short paragraph
          </p>
        </div>

        {/* Team */}
        <div className="intro-team">
          {members.map((m, i) => (
            <div className="intro-member" key={i}>
              <div>
                <div className="intro-member-name">{m.name}</div>
              </div>
            </div>
          ))}
        </div>

        <button className="get-started-btn" onClick={() => navigate("/feed")}>
          Get started →
        </button>
      </div>
    </div>
  );
}
