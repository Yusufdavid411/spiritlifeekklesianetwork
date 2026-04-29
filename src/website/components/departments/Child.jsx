import React from "react"
import { useNavigate } from "react-router-dom"
import Nav from "./Nav";
import "./child.css"

const Child = () => {

  return (
    <div className="dept-page child-theme">

      <Nav />

      {/* HERO */}
      <section className="dept-hero">
        <h1>Children Ministry</h1>
      </section>

    </div>
  )
}

export default Child
