import React from 'react'
import "./Trees.scss"
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";


const Trees = () => {
  return (
    <div className="visualize">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <h1>Trees</h1>
      </div>
    </div>
  )
}

export default Trees
