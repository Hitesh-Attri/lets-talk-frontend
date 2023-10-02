import { Box } from "@chakra-ui/react";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import Mychats from "../components/Mychats";
import ChatBox from "../components/ChatBox";
import SideBar from "../components/SideBar";

const ChatPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [fetchAgain, setFetchAgain] = useState(false);

  let user = localStorage.getItem("userInfo");
  user = JSON.parse(user);
  useEffect(() => {
    if (!user) {
      navigate("/");
    } else {
      // console.log(JSON.parse(user), "user", typeof JSON.parse(user));
    }
  }, []);

  return (
    <div style={{ width: "100%" }}>
      {user && <SideBar user={user} />}
      <Box
        display={"flex"}
        height={"92vh"}
        p={"0.7rem"}
        justifyContent={"space-between"}
      >
        {user && <Mychats user={user} fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox
            user={user}
            fetchAgain={fetchAgain}
            setFetchAgain={setFetchAgain}
          />
        )}
      </Box>
    </div>
  );
};

export default ChatPage;
