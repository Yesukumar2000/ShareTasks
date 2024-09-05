// Dashboard.js
import SideBar from './SideBar/SideBar';
import Tasks from './Main/Tasks';
import '../../styles/DashBoard/DashBoard.css';
import Header from './Header/Header';

function Dashboard() {
  return (
    <div className="dashboard-container">
      <Header  />
      <SideBar className="side-bar" />
      <div className="main">
        <Tasks />
      </div>
    </div>
  );
}

export default Dashboard;
