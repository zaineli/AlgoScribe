import React from 'react'
import "./Graphs.scss"
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import App from './App';


const Graphs = () => {
  return (
    <div className="visualize">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        {/* <h1>Graphs</h1> */}
        <App />
      </div>
    </div>
  )
}

export default Graphs
