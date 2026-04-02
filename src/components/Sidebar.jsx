import React from "react";
import { NavLink } from "react-router-dom";
import { useAppRoutes } from "../routes/routes";

export default function Sidebar() {
    const routes = useAppRoutes();

    // Find the layout route (the one with children)
    const layoutRoute = routes.find(r => r.children);
    const navItems = layoutRoute ? layoutRoute.children.filter(r => r.showInNav) : [];

    return (
        <nav>
            <ul className="main-nav-list">
                {navItems.map((item) => (
                    <li key={item.path || 'index'}>
                        <NavLink
                            to={item.index ? "/" : item.path.replace("/*", "")}
                            className={({ isActive }) =>
                                `nav-link ${isActive ? 'active' : ''}`
                            }
                            title={item.label}
                        >
                            {item.icon && <item.icon size={24} />}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
