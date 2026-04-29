import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase/firebaseConfig";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";

import PostForm from "./components/PostForm";
import PostsList from "./components/PostsList";

import "./admin.css";

const departments = [
  { label: "Drama", value: "drama" },
  { label: "Evangelism", value: "evan" },
  { label: "Children", value: "child" },
  { label: "Media", value: "media" },
  { label: "Prayer", value: "prayer" },
  { label: "Protocol", value: "protocol" },
  { label: "Ushering", value: "ushering" },
  { label: "Welfare", value: "welfare" },
  { label: "Zoe Streams", value: "zoestreams" },
];

const AdminDashboard = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loggedIn, setLoggedIn] = useState(false);
  const [posts, setPosts] = useState([]);
  const [department, setDepartment] = useState("drama");

  const [departmentStats, setDepartmentStats] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);

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

  // ================= FETCH SELECTED DEPARTMENT POSTS =================

  const fetchPosts = async () => {
    const snapshot = await getDocs(collection(db, department));

    const list = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setPosts(list);
  };

  // ================= FETCH ALL DEPARTMENT COUNTS =================

  const fetchDepartmentStats = async () => {
    let total = 0;

    const stats = await Promise.all(
      departments.map(async (dept) => {
        const snapshot = await getDocs(collection(db, dept.value));

        total += snapshot.size;

        return {
          ...dept,
          count: snapshot.size,
        };
      })
    );

    setDepartmentStats(stats);
    setTotalPosts(total);
  };

  const refreshDashboard = () => {
    fetchPosts();
    fetchDepartmentStats();
  };

  useEffect(() => {
    if (loggedIn) {
      refreshDashboard();
    }
  }, [department, loggedIn]);

  // ================= LOGIN PAGE =================

  if (!loggedIn) {
    return (
      <div className="admin-login-page">
        <form className="admin-login-card" onSubmit={handleLogin}>
          <div className="admin-logo">SEN</div>

          <h2>Admin Login</h2>
          <p>Login to manage SpiritLife Ekklesia Network content.</p>

          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button>Login</button>
        </form>
      </div>
    );
  }

  // ================= DASHBOARD =================

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div>
          <span>SpiritLife Admin</span>
          <h2>Content Dashboard</h2>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <section className="admin-summary">
        <div className="summary-card total-card">
          <span>Total Uploads</span>
          <h3>{totalPosts}</h3>
          <p>All department posts</p>
        </div>

        {departmentStats.map((dept) => (
          <div className="summary-card" key={dept.value}>
            <span>{dept.label}</span>
            <h3>{dept.count}</h3>
            <p>Uploaded posts</p>
          </div>
        ))}
      </section>

      <section className="admin-control-box">
        <div>
          <h3>Manage Department</h3>
          <p>Select a department to upload and view its content.</p>
        </div>

        <select value={department} onChange={(e) => setDepartment(e.target.value)}>
          {departments.map((dept) => (
            <option value={dept.value} key={dept.value}>
              {dept.label}
            </option>
          ))}
        </select>
      </section>

      <section className="admin-workspace">
        <div className="admin-panel upload-panel">
          <h3>Upload New Content</h3>
          <p>Add new content to the selected department.</p>

          <PostForm department={department} refresh={refreshDashboard} />
        </div>

        <div className="admin-panel posts-panel">
          <h3>Existing Posts</h3>
          <p>Preview and manage uploaded content.</p>

          <PostsList
            posts={posts}
            department={department}
            refresh={refreshDashboard}
          />
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;