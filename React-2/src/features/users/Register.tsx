import React, { useState, useContext } from "react";
import { TextInput, Button, Flex, Alert } from "@mantine/core";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import { IconInfoCircle } from "@tabler/icons-react";

interface ErrorResponseData {
  email?: string;
  username?: string;
}

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    username: "",
    password: "",
  });

  const { setLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate();

  const validateForm = () => {
    let newErrors = { email: "", username: "", password: "" };

    // Validate email
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }

    // Validate username
    if (!username) {
      newErrors.username = "Username is required";
    }

    // Validate password
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);

    // If no errors, return true
    return Object.values(newErrors).every((x) => !x);
  };

  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await axios.post("http://127.0.0.1:8000/api/user/register/", {
        email,
        username,
        password,
      });
      const response = await axios.post("http://127.0.0.1:8000/api/token/", {
        username,
        password,
      });

      const { access, refresh } = response.data;
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
      localStorage.setItem("userName", email);

      console.log(response.data); // Handle the response as needed

      setLoggedIn(true);

      navigate("/flashcard");
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.isAxiosError && axiosError.response) {
        const errorData = axiosError.response.data as ErrorResponseData;
        if (axiosError.response.status === 400) {
          if (errorData.email) {
            setErrorMessage("Email already exists");
          } else if (errorData.username) {
            setErrorMessage("Username already exists");
          }
        } else {
          setErrorMessage("Invalid Data");
        }
      } else {
        console.error(error); // Handle the error as needed
      }
    }
  };

  return (
    <Flex
      mih={100}
      bg="rgba(0, 0, 0, .0)"
      gap="lg"
      justify="center"
      align="center"
      direction="column"
      wrap="wrap"
    >
      <TextInput
        label="Email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
      />
      <TextInput
        label="Username"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        error={errors.username}
      />
      <TextInput
        label="Password"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
      />
      <Button onClick={handleRegister}>Register</Button>
      {errorMessage && (
        <Alert
          title="Error"
          color="red"
          icon={<IconInfoCircle />}
          style={{ marginTop: 10 }}
        >
          {errorMessage}
        </Alert>
      )}
    </Flex>
  );
};

export default Register;
