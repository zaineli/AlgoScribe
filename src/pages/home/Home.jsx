import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import Datatable from "../../components/datatable/Datatable";
import Progress from "../../components/progressBar/Progress"

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="interview" />
          <Widget type="problem" />
          <Widget type="Streak" />
          <Widget type="balance" />
        </div>
        <div className="charts">
          <Featured />
          <Chart title="Last 6 Months (Contributions)" aspect={2 / 1} />
          
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
            <Datatable/>
        </div>
      </div>
    </div>
  );
};

export default Home;
