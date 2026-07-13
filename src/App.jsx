import { Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import { useState } from "react";
import Products from "./Pages/Products";
import Login from "./Pages/login";
import Register from "./Pages/Register";
import Dashboardlayot from "./Pages/Dashboardlayot";
import ProtectedRoute from "./protectedroutes/Protectedroute";
import Orders from "./Pages/Orders";



function App() {
const [opensidebar, setopensidebar] = useState(true);
  return (
    <>

      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route element ={<ProtectedRoute />}>
        <Route element={<Dashboardlayot osb={opensidebar} sosb={setopensidebar}/>}>
          <Route path="/" element={<Dashboard osb={opensidebar}/>} />
          <Route path="/products" element={<Products osb={opensidebar} />} />
          <Route path="/Orders" element={<Orders osb={opensidebar}/>} />
        </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;