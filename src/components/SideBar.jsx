import { EmailIcon, ChevronDownIcon, BellIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spinner,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import ProfileModal from "./modals/ProfileModal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../base";
import ChatLoading from "./ChatLoading";
import UserListItem from "./UserAv/UserListItem";
import { useDispatch, useSelector } from "react-redux";
import {
  setChats,
  setSelectedChat,
  setNotifications,
} from "../redux/features/counter";
import { getSender } from "./methods/logics";

const SideBar = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { chats, notifications } = useSelector((state) => state.counter);

  const toast = useToast();
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loaddingChat, setLoaddingChat] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const logoutFunc = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Search Field is Empty",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `${BASE_URL}/api/user?search=${search}`,
        config
      );
      console.log(data);
      setSearchResults(data);
      setLoading(false);
    } catch (error) {
      toast({
        title: "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoaddingChat(true);

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(
        `${BASE_URL}/api/chat`,
        { userId },
        config
      );

      if (!chats.find((chat) => chat._id === data._id)) {
        dispatch(setChats([data, ...chats]));
      }

      dispatch(setSelectedChat(data));
      setLoaddingChat(false);
      onClose();
    } catch (error) {
      setLoaddingChat(false);
      toast({
        title: "Error in getting chat",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        bg="white"
        w="100%"
        p="5px 10px"
        borderWidth="5px"
      >
        <Tooltip label="Search" hasArrow placement="bottom-end">
          <Button variant={"ghost"} onClick={onOpen}>
            <i className="fa-solid fa-magnifying-glass"></i>
            <Text
              display={{ base: "none", md: "flex" }}
              px={4}
              fontFamily={"work sans"}
            >
              Search
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize={"2xl"} fontFamily={"work sans"}>
          Lets-Talk
        </Text>
        <div>
          <Menu>
            <MenuButton p={1}>
              {notifications.length > 0 && (
                <Badge colorScheme="purple">New</Badge>
              )}
              <BellIcon fontSize={"2xl"} m={1} />
            </MenuButton>
            <MenuList>
              <MenuItem>
                {!notifications.length && "No new notifications"}
              </MenuItem>
              {notifications.map((notification) => (
                <MenuItem
                  key={notification._id}
                  onClick={() => {
                    dispatch(setSelectedChat(notification.chat));
                    dispatch(
                      setNotifications(
                        notifications.filter((n) => n !== notification)
                      )
                    );
                  }}
                >
                  {notification.chat.isGroupChat
                    ? `New message in ${notification.chat.name}`
                    : `New message from ${getSender(
                        user,
                        notification.chat.users
                      )}`}
                </MenuItem>
              ))}
            </MenuList>
            <Menu>
              <MenuButton as={"button"}>
                <Avatar
                  size={"sm"}
                  cursor={"pointer"}
                  name={UserActivation.name}
                  src={UserActivation.pic}
                />
                <ChevronDownIcon />
              </MenuButton>
              <MenuList>
                <ProfileModal
                  user={user}
                  childern={<MenuItem>Profile</MenuItem>}
                />
                <MenuDivider />
                <MenuItem onClick={logoutFunc}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </Menu>
        </div>
      </Box>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerHeader borderBottomWidth={"1px"}>Search Chats</DrawerHeader>
            <DrawerBody>
              <Box display={"flex"} paddingBottom={2}>
                <Input
                  placeholder="Search by name or email"
                  mr={2}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button onClick={handleSearch}>Go</Button>
              </Box>
              {loading ? (
                <ChatLoading />
              ) : (
                searchResults?.map((user) => {
                  return (
                    <UserListItem
                      key={user._id}
                      user={user}
                      handleFunc={() => accessChat(user._id)}
                    />
                  );
                })
              )}
              {loaddingChat && <Spinner ml="auto" display={"flex"} />}
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};

export default SideBar;
