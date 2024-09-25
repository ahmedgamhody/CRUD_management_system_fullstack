import { Outlet } from "react-router-dom";
import DashboardHeader from "../components/DashboardHeader";
import SideBar from "../components/SideBar";

function Dashboard() {
  return (
    <>
      <DashboardHeader></DashboardHeader>
      <div className="d-flex">
        <SideBar></SideBar>
        <Outlet></Outlet>
        <></>
      </div>
    </>
  );
}
export default Dashboard;
