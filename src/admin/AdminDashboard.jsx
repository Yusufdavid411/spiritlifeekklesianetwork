import React, { useState } from "react";
import { auth, db } from "../firebase/firebaseConfig";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import "./admin.css";

const AdminDashboard = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loggedIn, setLoggedIn] = useState(false);

  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [department, setDepartment] = useState("drama");

  // ================= LOGIN =================

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoggedIn(true);
    } catch (error) {
      alert(error.message);
    }
  };

  // ================= LOGOUT =================

  const handleLogout = async () => {
    await signOut(auth);
    setLoggedIn(false);
  };

  // ================= POST CONTENT =================

  const handlePost = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, department), {
        title: title,
        videoUrl: videoUrl,
        createdAt: serverTimestamp(),
      });

      alert("Posted successfully");

      setTitle("");
      setVideoUrl("");

    } catch (error) {
      alert(error.message);
    }
  };

  // ================= LOGIN SCREEN =================

  if (!loggedIn) {
    return (
      <div className="admin-login-container">
        <form className="admin-login" onSubmit={handleLogin}>
          <h2>Admin Login</h2>

          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  // ================= DASHBOARD =================

  return (
    <div className="admin-dashboard">

      <div className="admin-header">
        <h2>Admin Dashboard</h2>

        <button onClick={handleLogout}>
          Logout
        </button>
      </div>

      <form className="admin-post-form" onSubmit={handlePost}>

        <h3>Create New Post</h3>

        <label>Department</label>

        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        >
          <option value="drama">Drama Department</option>
          <option value="evan">Evangelism</option>
          <option value="choir">Choir</option>
        </select>

        <label>Video Title</label>

        <input
          type="text"
          placeholder="Drama Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label>YouTube / Facebook Video Link</label>

        <input
          type="text"
          placeholder="Paste video link"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          required
        />

        <button type="submit">
          Publish Post
        </button>

      </form>

    </div>
  );
};

export default AdminDashboard;