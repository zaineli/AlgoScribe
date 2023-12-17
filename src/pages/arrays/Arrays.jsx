import React from 'react'
import "./Arrays.scss"
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";


const Arrays = () => {
  return (
    <div className="visualize">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <h1>Arrays</h1>
      </div>
    </div>
  )
}

export default Arrays
