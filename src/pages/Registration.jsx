import React, { useState, useEffect } from "react";
import Add from "../../img/photoAddIcon.png";
import axios from "axios";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  connectStorageEmulator,
} from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export const Registration = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dsable, setDsable] = useState(false);
  const [pic, setPic] = useState(null);
  const [warning1, setWarning1] = useState(false);
  const [warning2, setWarning2] = useState(false);
  const [label, setLable] = useState("Add your Profile pic");

  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    // console.log("clicked");

    event.preventDefault();
    // console.log(event.target[0].value);

    const userName = event.target[0].value;
    const email = event.target[1].value;
    const password = event.target[2].value;
    const confirmPassword = event.target[3].value;
    const file = event.target[4].files[0];

    if (!userName || !email || !password || !confirmPassword) {
      setWarning1(true);
      return;
    } else if (password !== confirmPassword) {
      setWarning2(true);
      return;
    }

    setDsable(true);
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "Chat-App");
      data.append("cloud_name", "buntyy");

      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/buntyy/image/upload",
        data
      );
      setPic(res.data.url);
      console.log(res.data.url);
      console.log(pic, typeof pic);

      // fetch("https://api.cloudinary.com/v1_1/buntyy/image/upload", {
      //   method: "post",
      //   body: data,
      // })
      //   .then((res) => res.json())
      //   .then((data) => {
      //     setPic(data.url.toString());
      //     console.log(data.url.toString());
      //     setLoading(false);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //     setLoading(false);
      //   });
    } else {
      console.log("no image selected");
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://localhost:5000/api/user",
        { name: userName, email, password, pic },
        config
      );
      console.log(data, "respnse from /api/user");
      // goto login page
      navigate("/");
      // return;
    } catch (error) {
      setErr(true);
      console.log(err);
    }

    console.log("here");
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    console.log(e.currentTarget.files[0].name);
    setLable(e.currentTarget.files[0].name);

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Chat-App</span>
        <span className="title">Register</span>
        {warning1 && (
          <span style={{ color: "red", fontWeight: 700 }}>
            Enter All Fields!
          </span>
        )}
        {warning2 && (
          <span style={{ color: "red", fontWeight: 700 }}>
            Passwords doesn't match!
          </span>
        )}
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Username" />
          <input type="email" placeholder="E-mail" />
          <input type="password" placeholder="Password" />
          <input type="password" placeholder="Confirm Password" />
          <input
            style={{ display: "none" }}
            onChange={onSelectFile}
            type="file"
            id="file"
          />
          <label htmlFor="file">
            <img src={Add} alt="add photo icon" />
            <span id="addImageLabel">{label}</span>
          </label>
          {selectedFile && (
            <img style={{ width: 50, height: 50 }} src={preview} />
          )}
          <button disabled={dsable}>
            {dsable ? "Please wait" : "Sign Up"}
          </button>
          {err && <span>Something Went Wrong!</span>}
        </form>
        {/* <button
          disabled={dsable}
          onClick={() => {
            setDsable(true);
            console.log("btnclicked");
          }}
        >
          btn
        </button> */}
        <p>
          Already have an account? <span className="goto">Login</span>
        </p>
      </div>
    </div>
  );
};
