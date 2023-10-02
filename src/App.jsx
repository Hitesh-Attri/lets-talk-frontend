import React, { useLayoutEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";

import { useDispatch } from "react-redux";
import { setUser } from "./redux/features/counter";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // let userInfo = localStorage.getItem("userInfo");
  // if (!userInfo) {
  //   <Navigate to="/" />;
  // } else {
  //   dispatch(setUser(JSON.parse(userInfo)));
  //   <Navigate to="/chats" />;
  // }

  return (
    // <Router>
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chats" element={<ChatPage />} />
      </Routes>
    </div>
    // </Router>
  );
}

export default App;
