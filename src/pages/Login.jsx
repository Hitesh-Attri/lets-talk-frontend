import React, { useState, useEffect } from "react";
import Add from "../../img/photoAddIcon.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Login = () => {
  const [err, setErr] = useState(false);
  const [warning1, setWarning1] = useState(false);
  const [warning2, setWarning2] = useState(false);
  const [dsable, setDsable] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    const email = event.target[0].value;
    const password = event.target[1].value;

    if (!email || !password) {
      setWarning1(true);
      return;
    }
    setDsable(true);

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://localhost:5000/api/user/login",
        { email, password },
        config
      );
      console.log(data, "respnse from /api/user/user");
      // goto login page
      navigate("/home");
      // return;
    } catch (error) {
      // setErr(true);
      console.log(error.response.status);
      if (error.response.status === 401) {
        setWarning2(true);
        setDsable(false);
      }
    }
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Chat-App</span>
        <span className="title">Login</span>
        {warning1 && (
          <span style={{ color: "red", fontWeight: 700 }}>
            Enter All Fields!
          </span>
        )}
        {warning2 && (
          <span style={{ color: "red", fontWeight: 700 }}>
            Invalid email or password!
          </span>
        )}
        <form onSubmit={handleLogin}>
          <input type="text" placeholder="Username" value={email} />
          <input type="password" placeholder="Password" value={password} />
          <button disabled={dsable}>{dsable ? "Please wait" : "login"}</button>
          {err && <span>Something Went Wrong!</span>}
          <button
            style={{ width: "fit-content" }}
            onClick={(e) => {
              e.preventDefault();
              setEmail("guest123@gmail.com");
              setPassword("123456");
            }}
          >
            Get Guest Credentials
          </button>
        </form>
        <p>
          Don't have an account?{" "}
          <span className="goto" onClick={() => navigate("/register")}>
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};
