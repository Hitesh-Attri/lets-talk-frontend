import React, { createContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ childern }) => {
  // const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log("here");
    const userInfo = JSON.parse(localStorage.getItem("user"));
    if (!userInfo) {
      setUser(null);
      // navigate("/");
    } else {
      setUser(userInfo);
    }
  }, []);

  return (
    <ChatContext.Provider value={{ user, setUser }}>
      {childern}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
