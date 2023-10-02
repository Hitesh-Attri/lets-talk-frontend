import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { BASE_URL } from "../../../base";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const Login = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const [loading, setLoading] = useState(false);

  const submitHandler = () => {
    if (!email || !password) {
      toast({
        title: "Invalid credentials",
        description: "Please enter valid credentials",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);
    axios
      .post(`${BASE_URL}/api/user/login`, {
        email,
        password,
      })
      .then((res) => {
        setLoading(false);
        console.log(res.data);
        localStorage.setItem("userInfo", JSON.stringify(res.data));
        toast({
          title: "Login successful",
          description: "You have been logged in successfully",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        navigate("/chats");
        // return <Navigate to={"/chats"} />;
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  return (
    <VStack spacing={"5px"} color="black">
      <FormControl id="login-email" isRequired>
        <FormLabel>Email address</FormLabel>
        <Input
          type="email"
          value={email}
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl id="login-password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width={"4.5rem"}>
            <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        isLoading={loading}
        loadingText="Please wait..."
        colorScheme="facebook"
        width={"100%"}
        style={{ margin: 15 }}
        onClick={submitHandler}
      >
        Login
      </Button>
      <Button
        disabled={loading}
        colorScheme="gray"
        width={"100%"}
        style={{ margin: 15 }}
        onClick={() => {
          setEmail("guest123@gmail.com");
          setPassword("guest");
        }}
      >
        Guest Credentials
      </Button>
    </VStack>
  );
};

export default Login;
