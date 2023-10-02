import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import {
  BASE_URL,
  CLOUD_NAME,
  PIC_PATH,
  PIC_UPLOAD_URL,
  UPLOAD_PRESET,
} from "../../../base";
import { useToast } from "@chakra-ui/react";

const SignUp = () => {
  const toast = useToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  // const [picURL, setPicURL] = useState("");
  let picURL = null;
  const [show, setShow] = useState(false);

  const [loading, setLoading] = useState(false);

  const postDetails = async () => {
    if (file == null) {
      return;
    }
    if ((file && file.type === "image/jpeg") || file.type === "image/png") {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", UPLOAD_PRESET);
      data.append("cloud_name", CLOUD_NAME);
      data.append("folder", PIC_PATH);

      const res = await axios.post(PIC_UPLOAD_URL, data);
      console.log(res.data.url);
      // setPicURL(res.data.url);
      picURL = res.data.url;
    } else {
      toast({
        title: "Invalid picture",
        description: "Please select a valid picture",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
  };

  const submitHandler = async () => {
    setLoading(true);
    await postDetails();

    if (!name || !email || !password) {
      toast({
        title: "Error",
        description: "Please fill all the fields",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      let res = await axios.post(`${BASE_URL}/api/user`, {
        name,
        email,
        password,
        picURL,
      });
      console.log(res.data);

      localStorage.setItem("userInfo", JSON.stringify(res.data));
      setLoading(false);
      toast({
        title: "Registration Successfull",
        description: "Please login to continue",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <VStack spacing={"5px"} color="black">
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          value={name}
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>

      <FormControl id="email" isRequired>
        <FormLabel>Email address</FormLabel>
        <Input
          type="email"
          // value={email} //  still working
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl id="password" isRequired>
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

      <FormControl id="picture">
        <FormLabel>Progile Picture</FormLabel>
        <Input
          type="file"
          accept="image/*"
          p={1.5}
          onChange={(e) => setFile(e.target.files[0])}
        />
      </FormControl>

      <Button
        isLoading={loading}
        loadingText="Please wait..."
        colorScheme="facebook"
        width={"100%"}
        style={{ margin: 15 }}
        onClick={submitHandler}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default SignUp;
