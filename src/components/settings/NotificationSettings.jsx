import { useState } from "react";
import { Bell } from "lucide-react";

export default function NotificationSettings() {
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