import "./Visualize.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { Link } from "react-router-dom";

const Visualize = () => {
  return (
    <div className="visualize">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="grid">
            <button className="item trees">
                <Link to="/visualize/trees">
                    <h2>Trees</h2>
                </Link>
            </button>

            <button className="item arrays">
                <Link to="/visualize/arrays" >
                    <h2>Arrays</h2>
                </Link>
            </button>

            <button className="item graphs">
                <Link to="/visualize/graphs">
                    <h2>Graphs</h2>
                </Link>
            </button>

            <button className="item trees">
                <Link to="/visualize/trees">
                    <h2>Trees</h2>
                </Link>
            </button>
        </div>
      </div>
    </div>
  );
};

export default Visualize;
