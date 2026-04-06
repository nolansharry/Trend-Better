import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function EditProfile() {
  console.log("EditProfile rendering");
  const { user: authUser, updateProfile } = useAuth();
  const [bio, setBio] = useState("");
  const [gender, setGender] = useState(authUser?.gender || "Prefer not to say");
  const [isSubmitting, setIsSubmitting] = useState(false);

  
  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      
      await updateProfile({ bio, gender });
      
      alert("Profile updated successfully!");
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="edit-profile-container">
      <h2 className="settings-title">Edit profile</h2>

      <div className="edit-profile-header">
        <div className="profile-info-row">
          <img
            src={
              authUser?.avatarUrl ||
              "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
            }
            alt="Profile"
            className="profile-avatar"
            referrerPolicy="no-referrer"
          />
          <div className="profile-names">
            <span className="profile-username">
              {authUser?.email?.split("@")[0] || "username"}
            </span>
            <span className="profile-fullname">
              {authUser?.firstName} {authUser?.lastName}
            </span>
          </div>
        </div>
      </div>
      <div className="form-group">
        <label className="form-label">Bio</label>
        <textarea
          className="form-textarea"
          placeholder={authUser?.bio || "Tell us about yourself"}
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

      <button 
        className={`submit-btn ${bio ? "active" : ""}`}
        onClick={handleSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Saving..." : "Submit"}
      </button>
    </div>
  );
}
