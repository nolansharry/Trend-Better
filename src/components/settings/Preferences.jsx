import { useState } from "react";
import { Moon, Sun } from "lucide-react";


export default function Preferences() {
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