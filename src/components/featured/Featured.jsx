import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import Progress from "../../components/progressBar/Progress"

const Featured = () => {
  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Technologies</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={70} text={"70%"} strokeWidth={5} />
        </div>
        <p className="title">JavaScript</p>
        <div className="lang">
          <div className="language">
            <p>React JS</p>
            <progress value={40} max={100}>{40}%</progress>
          </div>
          <div className="language">
            <p>Node JS</p>
            <progress value={50} max={100}>{50}%</progress>
          </div>
          <div className="language">
            <p>Redux</p>
            <progress value={30} max={100}>{30}%</progress>
          </div>
          <div className="language">
            <p>FireBase</p>
            <progress value={80} max={100}>{80}%</progress>
          </div>
          <div className="language">
            <p>GitHub</p>
            <progress value={75} max={100}>{75}%</progress>
          </div>
        </div>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Target</div>
            <div className="itemResult negative">
              <KeyboardArrowDownIcon fontSize="small"/>
              <div className="resultAmount">Node JS</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Week</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              <div className="resultAmount">JavaScript</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Month</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              <div className="resultAmount">Redux</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
