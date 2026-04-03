import { useState } from "react";

export default function EditProfile() {
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