import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./nav.css";

const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentDepartment = location.pathname.split("/").pop();

  const handleChange = (e) => {
    const selectedDepartment = e.target.value;
    navigate(`/departments/${selectedDepartment}`);
  };

  return (
    <div className="dept-top">
      <button className="back-btn" onClick={() => navigate("/")}>
        ← Back
      </button>
    </div>
  );
};

export default Nav;