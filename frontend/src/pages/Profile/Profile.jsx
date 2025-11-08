import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../features/auth/authThunk";
import "./Profile.css";

const Profile = () => {
  const dispatch = useDispatch();
  const { user, loading, error, successMessage } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile({ name, email, password }));
    setPassword(""); // clear password field after update
  };

  return (
    <div className="profile-page">
      <form className="profile-form" onSubmit={handleSubmit}>
        <h2>Profile Settings</h2>

        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          required
        />

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          required
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Leave blank to keep current"
        />

        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Profile"}
        </button>

        {error && <p className="error">{error}</p>}
        {successMessage && <p className="success">{successMessage}</p>}
      </form>
    </div>
  );
};

export default Profile;
