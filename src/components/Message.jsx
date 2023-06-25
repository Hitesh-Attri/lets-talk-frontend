import React, { useEffect } from "react";

const Message = (props) => {
  // console.log(props)
  useEffect(() => {
    console.log("message");
  }, []);

  return (
    <div className="message owner">
      <div className="messageInfo">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0IonFx6vtwTyLZ24AxRGHX98sTFWoMuiLTg&usqp=CAU"
          alt="profile"
        />
        <span>time</span>
      </div>
      <div className="messageContent">
        <p>this is a message {props.chatName}</p>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0IonFx6vtwTyLZ24AxRGHX98sTFWoMuiLTg&usqp=CAU"
          alt="profile"
        />
      </div>
    </div>
  );
};

export default Message;
