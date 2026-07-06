import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";

function DashboardLayout({ osb, sosb }) {
  return (
    <>
      <Navbar osb={osb} sosb={sosb} />
      <Sidebar osb={osb} sosb={sosb} />
      <Outlet />
    </>
  );
}

export default DashboardLayout;
