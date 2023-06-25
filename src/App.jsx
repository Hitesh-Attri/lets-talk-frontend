import { useState } from "react";
import { Registration } from "./pages/Registration";
import "./style.scss";
import { Login } from "./pages/Login";
import Home from "./pages/Home";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Button } from "@chakra-ui/react";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" Component={Login} />
        <Route path="/register" Component={Registration} />
        <Route path="/home" Component={Home} />

        {/* <Route path='/'> */}
        {/* <Route element={<Home/>} exact />
         <Route path='/login' element={<Login />} />
         <Route path='/register' element={<Registration />} /> */}
        {/* </Route> */}
      </Routes>
    </div>
  );
}

export default App;
