import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedChat, setChats } from "../redux/features/counter";
import {
  Avatar,
  Box,
  Button,
  Stack,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { BASE_URL } from "../../base";
import { AddIcon } from "@chakra-ui/icons";
import { getSender, getSenderPic } from "./methods/logics";
import GroupChatModal from "./modals/GroupChatModal";
// import { Socket } from "socket.io-client";
import io from "socket.io-client";

const Mychats = ({ user, fetchAgain }) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const { chats, selectedChat } = useSelector((state) => state.counter);

  const [loggedInUser, setLoggedInUser] = useState({});

  const socket = io(BASE_URL);

  const getChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`${BASE_URL}/api/chat`, config);
      console.log(data);
      dispatch(setChats(data));
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to load chats. ${error.message}}`,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
    }
  };

  useEffect(() => {
    socket.emit("setup", user);
    socket.on("connection", () => {
      console.log("connected mychats");
    });

    socket.on("message received", (newMessage) => {
      console.log(newMessage, "newMessage");
      getChats();
    });
  }, []);

  useEffect(() => {
    setLoggedInUser(user);
    getChats();
  }, [fetchAgain]);

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDirection={"column"}
      alignItems={"center"}
      p={3}
      bg="white"
      w={{ base: "100%", md: "30%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text>My Chats</Text>
        <GroupChatModal user={user}>
          <Button
            d="flex"
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>
      <Box
        display="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat) => {
              console.log(getSenderPic(loggedInUser, chat.users), "asd");
              return (
                <Box
                  onClick={() => dispatch(setSelectedChat(chat))}
                  cursor="pointer"
                  bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                  color={selectedChat === chat ? "white" : "black"}
                  px={3}
                  py={2}
                  borderRadius="lg"
                  key={chat._id}
                  display={"flex"}
                >
                  {!chat.isGroupChat && (
                    <Avatar
                      size={"sm"}
                      src={getSenderPic(loggedInUser, chat.users)}
                      name={getSender(loggedInUser, chat.users)}
                    />
                  )}
                  <Box ml={3}>
                    <Text fontSize={{ base: "sm", md: "md" }} fontWeight={500}>
                      {!chat.isGroupChat
                        ? getSender(loggedInUser, chat.users)
                        : chat.chatName}
                    </Text>
                    {chat.latestMessage && (
                      <Text
                        fontSize="xs"
                        ml={1}
                        color={
                          chat.latestMessage.sender.name === loggedInUser.name
                            ? "#38B2AC"
                            : "black"
                        }
                      >
                        <b>
                          {chat.isGroupChat &&
                          chat.latestMessage.sender.name !== loggedInUser.name
                            ? chat.latestMessage.sender.name + ": "
                            : ""}
                        </b>
                        {chat.latestMessage.content.length > 50
                          ? chat.latestMessage.content.substring(0, 51) + "..."
                          : chat.latestMessage.content}
                      </Text>
                    )}
                  </Box>
                </Box>
              );
            })}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default Mychats;
