import React from "react"
import { useNavigate } from "react-router-dom"
import "./child.css"

const Child = () => {
  const navigate = useNavigate()

  return (
    <div className="dept-page child-theme">

      {/* TOP BAR */}
      <div className="dept-top">
        <button className="back-btn" onClick={() => navigate("/")}>
          ← Back
        </button>

        <select
          className="dept-switcher"
          onChange={(e) => navigate(`/departments/${e.target.value}`)}
          defaultValue="child"
        >
          <option value="child">Children</option>
          <option value="drama">Drama</option>
          <option value="evan">Evangelism</option>
          <option value="media">Media</option>
          <option value="prayer">Prayer</option>
          <option value="protocol">Protocol</option>
          <option value="usher">Ushering</option>
          <option value="welfare">Welfare</option>
          <option value="zoestreams">Zoe Streams</option>
        </select>
      </div>

      {/* HERO */}
      <section className="dept-hero">
        <h1>Children Ministry</h1>
        <p>
          Raising godly children in love, truth, and the knowledge of Christ.
        </p>
      </section>

      {/* CONTENT */}
      <section className="dept-content">
        <p>
          The Children’s Ministry is committed to nurturing children in a safe,
          loving, and spiritually enriching environment.
        </p>

        <p>
          We teach biblical foundations in a way that children can understand,
          helping them grow in faith, confidence, and godly character.
        </p>
      </section>

    </div>
  )
}

export default Child
