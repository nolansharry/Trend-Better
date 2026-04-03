import { Outlet, NavLink } from "react-router-dom";
import {
    User,
    Bell,
    Settings as SettingsIcon,
    Moon,
    Sun, BanIcon
} from "lucide-react";


export default function Settings() {
    console.log("Settings rendering at", window.location.pathname);
    return (
        <div className="settings-layout">
            <aside className="settings-sidebar">
                <h1>Settings</h1>

                <div className="settings-section">
                    <nav>
                        <ul className="settings-nav-list">
                            <li>
                                <NavLink to="/settings/edit-profile" className={({ isActive }) => `settings-link ${isActive ? 'active' : ''}`}>
                                    <User size={20} /> Edit profile
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/settings/notifications" className={({ isActive }) => `settings-link ${isActive ? 'active' : ''}`}>
                                    <Bell size={20} /> Notifications
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/settings/preferences" className={({ isActive }) => `settings-link ${isActive ? 'active' : ''}`}>
                                    <SettingsIcon size={20} /> Preferences
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/settings/blocked-accounts" className={({ isActive }) => `settings-link ${isActive ? 'active' : ''}`}>
                                    <BanIcon size={20} /> Blocked Accounts
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>

            

            <div className="settings-content">
                <Outlet />
            </div>
        </div>
    );
}
