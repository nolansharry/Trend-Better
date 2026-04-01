import { NavLink } from "react-router-dom";
import { useAppRoutes } from "../routes/routes";
import { useAuth } from "../context/AuthContext";



export default function Sidebar() {
  
    const { user } = useAuth();
    const routes = useAppRoutes();

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
                {/* Optional: show label if you want text */}
                {/* <span>{route.label}</span> */}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
