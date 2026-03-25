import { NavLink } from "react-router-dom";
import { Home, Settings as SettingsIcon } from "lucide-react";

export default function Sidebar() {
    return (
        <nav>
            <ul className="main-nav-list">
                <li>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `nav-link ${isActive ? 'active' : ''}`
                        }
                    >
                        <Home size={24} />
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/settings"
                        className={({ isActive }) =>
                            `nav-link ${isActive ? 'active' : ''}`
                        }
                    >
                        <SettingsIcon size={24} />
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}
