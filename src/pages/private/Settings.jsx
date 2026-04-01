import { NavLink, Routes, Route, Navigate } from "react-router-dom";
import {
    User,
    Bell,
    Settings as SettingsIcon,
    Moon,
    Sun, BanIcon
} from "lucide-react";
import { useState } from "react";

const EditProfile = () => {
    console.log("EditProfile rendering");
    const [bio, setBio] = useState("");
    const [gender, setGender] = useState("Male");

    return (
        <div className="edit-profile-container">
            <h2 className="settings-title">Edit profile</h2>

            <div className="edit-profile-header">
                <div className="profile-info-row">
                    <img
                        src="https://picsum.photos/seed/amil/100/100"
                        alt="Profile"
                        className="profile-avatar"
                        referrerPolicy="no-referrer"
                    />
                    <div className="profile-names">
                        <span className="profile-username">username</span>
                        <span className="profile-fullname">full-name</span>
                    </div>
                </div>
                <button className="change-photo-btn">Change photo</button>
            </div>

            <div className="form-group">
                <label className="form-label">Bio</label>
                <textarea
                    className="form-textarea"
                    placeholder="Bio"
                    maxLength={150}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                />
                <span className="char-counter">{bio.length} / 150</span>
            </div>

            <div className="form-group">
                <label className="form-label">Gender</label>
                <select
                    className="form-select"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                    <option value="Custom">Custom</option>
                </select>
                <p className="form-help-text">
                    This won't be part of your public profile.
                </p>
            </div>

            <button className={`submit-btn ${(bio) ? 'active' : ''}`}>Submit</button>
        </div>
    );
};

const Preferences = () => {
    const [isDark, setIsDark] = useState(document.documentElement.classList.contains("dark"));

    const toggleTheme = () => {
        const newTheme = !isDark;
        setIsDark(newTheme);
        if (newTheme) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    };

    return (
        <div>
            <h2 className="settings-title">Preferences</h2>
            <div className="form-group">
                <label className="form-label">Appearance</label>
                <div className="toggle-group">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        {isDark ? <Moon size={20} /> : <Sun size={20} />}
                        <span className="toggle-label">Dark Mode</span>
                    </div>
                    <label className="toggle-switch">
                        <input
                            type="checkbox"
                            checked={isDark}
                            onChange={toggleTheme}
                        />
                        <span className="slider"></span>
                    </label>
                </div>
                <p className="form-help-text">
                    Switch between light and dark themes for the application.
                </p>
            </div>
        </div>
    );
};

const NotificationSettings = () => {
    const [pushNotificationsEnabled, setPushNotificationsEnabled] = useState(false)
    const [emailNotificationsEnabled, setEmailNotificationsEnabled] = useState(false)

    const togglePushNotifications = () => {
        setPushNotificationsEnabled(!pushNotificationsEnabled)
    }

    const toggleEmailNotifications = () => {
        setEmailNotificationsEnabled(!emailNotificationsEnabled)
    }

    return(
        <div>
            <h2 className="settings-title">Notification Settings</h2>
            <div className="toggle-group">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Bell size={20}/>
                    <span>Push Notifications</span>
                </div>
                <label className="toggle-switch">
                    <input
                        type="checkbox"
                        checked={pushNotificationsEnabled}
                        onChange={togglePushNotifications}
                    />
                    <span className="slider"></span>
                </label>
            </div>

            <div className="toggle-group">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Bell size={20}/>
                    <span>Email Notifications</span>
                </div>
                <label className="toggle-switch">
                    <input
                        type="checkbox"
                        checked={emailNotificationsEnabled}
                        onChange={toggleEmailNotifications}
                    />
                    <span className="slider"></span>
                </label>
            </div>
        </div>
    )
}

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
                <Routes>
                    <Route index element={<Navigate to="edit-profile" replace />} />
                    <Route path="edit-profile" element={<EditProfile />} />
                    <Route
                        path="notifications"
                        element={<NotificationSettings/>}
                    />
                    <Route path="preferences" element={<Preferences />} />
                    <Route path="blocked-accounts" element={<h2 className="settings-title">Blocked Accounts</h2>} />
                    <Route path="*" element={<div>Route not found: {window.location.pathname}</div>} />
                </Routes>
            </div>
        </div>
    );
}
