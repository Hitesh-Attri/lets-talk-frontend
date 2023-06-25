import React, { useEffect, useState } from "react";
import Message from "./Message";
import axios from "axios";

const Messages = () => {
  const [chats, setChats] = useState([]);

  const fetchChats = async () => {
    // const res = await axios.get("http://localhost:5000/api/chats");
    // console.log(res);
    // setChats(res.data);
    // console.log(chats);
    // chats.map((chat) => {
    //   console.log(chat.chatName);
    // });
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <div className="messages">
      {/* <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message /> */}
      {chats.map((chat) => {
        return <Message key={chat._id} chatName={chat.chatName} />;
        console.log(chat.chatName);
      })}
      {/* <Message chatName="asdfds" /> */}
    </div>
  );
};

export default Messages;
