import React, { useMemo, useState, useEffect } from "react";
import { auth, db } from "../firebase/firebaseConfig";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, doc, getDoc, getDocs, orderBy, query } from "firebase/firestore";

import PostForm from "./components/PostForm";
import PostsList from "./components/PostsList";
import { departments } from "../data/departments";

import "./admin.css";

const formatNumber = (value) => new Intl.NumberFormat("en").format(value || 0);

const getDateKey = (date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const getPeriodTotals = (records) => {
  const now = new Date();
  const todayKey = getDateKey(now);
  const weekStart = new Date(now);
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const yearStart = new Date(now.getFullYear(), 0, 1);

  weekStart.setDate(now.getDate() - 6);
  weekStart.setHours(0, 0, 0, 0);

  const totals = {
    today: 0,
    week: 0,
    month: 0,
    year: 0,
    pageViews: 0,
  };

  records.forEach((record) => {
    const visitors = record.visitors || 0;
    const pageViews = record.pageViews || 0;
    const recordDate = new Date(`${record.date}T00:00:00`);

    totals.pageViews += pageViews;

    if (record.date === todayKey) {
      totals.today += visitors;
    }

    if (recordDate >= weekStart) {
      totals.week += visitors;
    }

    if (recordDate >= monthStart) {
      totals.month += visitors;
    }

    if (recordDate >= yearStart) {
      totals.year += visitors;
    }
  });

  return totals;
};

const buildTrendData = (records) => {
  const recordMap = new Map(records.map((record) => [record.date, record.visitors || 0]));
  const days = [];

  for (let index = 13; index >= 0; index -= 1) {
    const date = new Date();
    date.setDate(date.getDate() - index);

    const key = getDateKey(date);
    days.push({
      date: key,
      label: date.toLocaleDateString("en", { weekday: "short" }),
      visitors: recordMap.get(key) || 0,
    });
  }

  return days;
};

const VisitorAnalytics = ({ records }) => {
  const totals = getPeriodTotals(records);
  const trendData = buildTrendData(records);
  const maxVisitors = Math.max(...trendData.map((day) => day.visitors), 1);
  const bestDay = trendData.reduce(
    (highest, day) => (day.visitors > highest.visitors ? day : highest),
    trendData[0]
  );
  const averageDailyVisitors = Math.round(totals.week / 7);

  return (
    <section className="visitor-analytics">
      <div className="analytics-heading">
        <div>
          <span>Website Visitors</span>
          <h3>Visitor Analytics</h3>
        </div>
        <p>Daily, weekly, monthly, and yearly visitor performance.</p>
      </div>

      <div className="visitor-summary-grid">
        <div className="visitor-card highlight">
          <span>Today</span>
          <strong>{formatNumber(totals.today)}</strong>
          <p>Unique visitors</p>
        </div>
        <div className="visitor-card">
          <span>This Week</span>
          <strong>{formatNumber(totals.week)}</strong>
          <p>Last 7 days</p>
        </div>
        <div className="visitor-card">
          <span>This Month</span>
          <strong>{formatNumber(totals.month)}</strong>
          <p>Current month</p>
        </div>
        <div className="visitor-card">
          <span>This Year</span>
          <strong>{formatNumber(totals.year)}</strong>
          <p>Current year</p>
        </div>
      </div>

      <div className="analytics-body">
        <div className="analytics-chart-card">
          <div className="chart-header">
            <div>
              <h4>14-Day Visitor Trend</h4>
              <p>Unique visitors recorded each day.</p>
            </div>
            <span>{formatNumber(totals.pageViews)} page views</span>
          </div>

          <div className="visitor-chart" aria-label="14-day visitor trend">
            {trendData.map((day) => (
              <div className="chart-column" key={day.date}>
                <div className="chart-value">{formatNumber(day.visitors)}</div>
                <div
                  className="chart-bar"
                  style={{ height: `${Math.max((day.visitors / maxVisitors) * 100, 6)}%` }}
                />
                <span>{day.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="analytics-insight-card">
          <span>Written Summary</span>
          <h4>{formatNumber(totals.month)} visitors this month</h4>
          <p>
            Your website has welcomed {formatNumber(totals.week)} visitors in the last
            7 days, with an average of {formatNumber(averageDailyVisitors)} visitors per
            day.
          </p>
          <p>
            The strongest day in the current trend is {bestDay.label}, with{" "}
            {formatNumber(bestDay.visitors)} visitors.
          </p>
        </div>
      </div>
    </section>
  );
};

const getDepartmentPageId = (departmentValue) => `departments_${departmentValue}`;

const DepartmentAnalytics = ({ stats, selectedDepartment }) => {
  const selectedStats =
    stats.find((department) => department.value === selectedDepartment) || stats[0];

  if (!selectedStats) {
    return null;
  }

  return (
    <section className="department-analytics">
      <div className="analytics-heading">
        <div>
          <span>Programs & Events</span>
          <h3>Department Analytics</h3>
        </div>
        <p>Page visits, upload views, and likes for every department.</p>
      </div>

      <div className="department-focus-card">
        <div>
          <span>Selected Department</span>
          <h4>{selectedStats.label}</h4>
          <p>
            Exact page analysis for /departments/{selectedStats.value}, plus the
            social engagement from its uploaded programs.
          </p>
        </div>

        <div className="department-focus-metrics">
          <strong>{formatNumber(selectedStats.pageVisitors)} page visitors</strong>
          <strong>{formatNumber(selectedStats.pageViews)} page views</strong>
          <strong>{formatNumber(selectedStats.watches)} item views</strong>
          <strong>{formatNumber(selectedStats.likes)} likes</strong>
        </div>
      </div>

      <div className="department-analytics-grid">
        {stats.map((department) => (
          <article
            className={`department-analytics-card ${
              department.value === selectedDepartment ? "active" : ""
            }`}
            key={department.value}
          >
            <div>
              <span>{department.label}</span>
              <h4>{formatNumber(department.count)} uploads</h4>
            </div>

            <div className="department-mini-metrics">
              <p>
                <strong>{formatNumber(department.pageVisitors)}</strong>
                Page visitors
              </p>
              <p>
                <strong>{formatNumber(department.pageViews)}</strong>
                Page views
              </p>
              <p>
                <strong>{formatNumber(department.watches)}</strong>
                Item views
              </p>
              <p>
                <strong>{formatNumber(department.likes)}</strong>
                Likes
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

const AdminDashboard = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loggedIn, setLoggedIn] = useState(false);
  const [posts, setPosts] = useState([]);
  const [department, setDepartment] = useState("drama");

  const [departmentStats, setDepartmentStats] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [visitorRecords, setVisitorRecords] = useState([]);

  const engagementTotals = useMemo(
    () =>
      departmentStats.reduce(
        (totals, dept) => ({
          watches: totals.watches + (dept.watches || 0),
          likes: totals.likes + (dept.likes || 0),
          pageVisitors: totals.pageVisitors + (dept.pageVisitors || 0),
        }),
        { watches: 0, likes: 0, pageVisitors: 0 }
      ),
    [departmentStats]
  );

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
        const pageAnalyticsSnapshot = await getDoc(
          doc(db, "pageAnalytics", getDepartmentPageId(dept.value))
        );
        const pageAnalytics = pageAnalyticsSnapshot.exists()
          ? pageAnalyticsSnapshot.data()
          : {};
        const engagement = snapshot.docs.reduce(
          (totals, postDocument) => {
            const post = postDocument.data();

            return {
              watches: totals.watches + (post.watchCount || 0),
              likes: totals.likes + (post.likeCount || 0),
            };
          },
          { watches: 0, likes: 0 }
        );

        total += snapshot.size;

        return {
          ...dept,
          count: snapshot.size,
          watches: engagement.watches,
          likes: engagement.likes,
          pageVisitors: pageAnalytics.visitors || 0,
          pageViews: pageAnalytics.pageViews || 0,
        };
      })
    );

    setDepartmentStats(stats);
    setTotalPosts(total);
  };

  const fetchVisitorAnalytics = async () => {
    const analyticsQuery = query(
      collection(db, "visitorAnalyticsDaily"),
      orderBy("date", "desc")
    );
    const snapshot = await getDocs(analyticsQuery);

    const records = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setVisitorRecords(records);
  };

  const refreshDashboard = () => {
    fetchPosts();
    fetchDepartmentStats();
    fetchVisitorAnalytics();
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

        <div className="summary-card">
          <span>Total Item Views</span>
          <h3>{formatNumber(engagementTotals.watches)}</h3>
          <p>Program opens and video watches</p>
        </div>

        <div className="summary-card">
          <span>Total Likes</span>
          <h3>{formatNumber(engagementTotals.likes)}</h3>
          <p>One like per device</p>
        </div>

        <div className="summary-card">
          <span>Department Visitors</span>
          <h3>{formatNumber(engagementTotals.pageVisitors)}</h3>
          <p>Unique page visitors</p>
        </div>

        {departmentStats.map((dept) => (
          <div className="summary-card" key={dept.value}>
            <span>{dept.label}</span>
            <h3>{dept.count}</h3>
            <p>
              {formatNumber(dept.watches)} views / {formatNumber(dept.likes)} likes
            </p>
          </div>
        ))}
      </section>

      <VisitorAnalytics records={visitorRecords} />

      <DepartmentAnalytics stats={departmentStats} selectedDepartment={department} />

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
