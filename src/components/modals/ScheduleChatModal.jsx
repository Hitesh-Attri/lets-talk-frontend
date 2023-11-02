import {
  Box,
  Button,
  FormControl,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
  Input,
  ModalFooter,
  Spinner,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setChats } from "../../redux/features/counter";
import UserBadgeItem from "../UserAv/UserBadgeItem";
import UserListItem from "../UserAv/UserListItem";
import { BASE_URL } from "../../../base";
import axios from "axios";

const ScheduleChatModal = ({ user, children }) => {
  const dispatch = useDispatch();
  const toast = useToast();

  const { chats } = useSelector((state) => state.counter);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [message, setMessage] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [date, setDate] = useState();

  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      toast({
        title: "User already added",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
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
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      console.log(error);
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };

  const handleSubmit = async () => {
    if (!message || !selectedUsers || selectedUsers.length === 0 || !date) {
      toast({
        title: "Please fill all the feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        `${BASE_URL}/api/message/schedule`,
        {
          messageData: message,
          users: selectedUsers.map((u) => u._id),
          date,
        },
        config
      );
      console.log(data, "<schedule msg");
      // return;
      // dispatch(setChats([data, ...chats]));
      onClose();
      toast({
        title: "Message Scheduled!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed schedule message!",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal
        closeOnOverlayClick={false}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="35px"
            fontFamily="Work sans"
            display="flex"
            justifyContent="center"
          >
            Schedule A Message
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDir="column" alignItems="center">
            <FormControl>
              <Input
                placeholder="Message to schedule"
                mb={3}
                onChange={(e) => setMessage(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add Users"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <Input
                type="datetime-local"
                placeholder="Select Date and Time"
                mb={1}
                onChange={(e) => {
                  console.log(e.target.value);
                  setDate(e.target.value);
                }}
              />
            </FormControl>
            <Box w="100%" d="flex" flexWrap="wrap">
              {selectedUsers.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  handleFunction={() => handleDelete(u)}
                />
              ))}
            </Box>
            {loading ? (
              <div>
                <Spinner />
              </div>
            ) : (
              searchResult
                ?.slice(0, 4)
                .map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunc={() => handleGroup(user)}
                  />
                ))
            )}
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleSubmit} colorScheme="blue">
              Schedule
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ScheduleChatModal;
