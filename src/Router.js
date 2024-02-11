import React from "react";
import {Route,Routes} from 'react-router-dom';
import PCHome from "./components/PCHome/PCHome";
import Home from "./components/Home/Home";
import AdminHome from "./components/AdminHome/AdminHome";

const Router = () => (
  <Routes>
    <Route path='' element={<Home/>}/>
    <Route path ='/pchome' element={<PCHome/>}/>
    <Route path ='/adminhome' element={<AdminHome/>}/>
  </Routes>
);

export default Router