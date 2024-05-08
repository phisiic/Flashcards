import React, { useState, useContext } from "react";
import { TextInput, Button, Flex, Alert } from "@mantine/core";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import { AxiosError } from "axios";
import { IconInfoCircle } from "@tabler/icons-react";

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const { setLoggedIn } = useContext(AuthContext);

  const validateForm = () => {
    let newErrors = { email: "", password: "" };
    // Validate email
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/user/login/",
        {
          email,
          password,
        }
      );
      const { access, refresh } = response.data;
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
      localStorage.setItem("userName", email);
      console.log(response.data); // Handle the response as needed
      setLoggedIn(true);

      navigate("/flashcard");
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.status === 400) {
        setErrorMessage("Invalid email or password");
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
        label="Password"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
      />
      <Button color="green" onClick={handleLogin}>Login</Button>
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
