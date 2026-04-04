import { NavLink, useNavigate } from "react-router-dom";
import { useAppRoutes } from "../routes/routes";
import { useAuth } from "../context/AuthContext";
import { LogOut } from "lucide-react";



export default function Sidebar() {
  
    const { user, logout } = useAuth();
    const routes = useAppRoutes();

    const navigate = useNavigate();

    const navItems = flattenRoutes(routes).filter(r => {
    if (!r.showInNav) return false;
    if (r.protected && !user) return false;
    return true;
    });

    function flattenRoutes(routeArray) {
    return routeArray.flatMap(route =>
        route.children ? route.children : route
    );
    }

    const handleLogout = () => {
      logout();
      navigate("/login");
    }

  return (
    <nav>
      <ul className="main-nav-list">
        {navItems.map((route, i) => {
          const Icon = route.icon;

          return (
            <li key={i}>
              <NavLink
                to={route.path || "/"}
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
              >
                {Icon && <Icon size={24} />}
              </NavLink>
            </li>
          );
        })}

        {user && (
          <li>
            <button
              onClick={handleLogout}
              className="nav-link"
              title="Sign Out"
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                color: "inherit"
              }}
            >
              <LogOut size={24} />
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}
