import React from "react";
import Add from "../../img/photoAddIcon.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const [err, setErr] = useState(false);
const [warning1, setWarning1] = useState(false);

export const Login = () => {
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
        <form onSubmit={handleLogin}>
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
          <button>Login</button>
          {err && <span>Something Went Wrong!</span>}
        </form>
        <p>
          Don't have an account? <span className="goto">Sign Up</span>
        </p>
      </div>
    </div>
  );
};
