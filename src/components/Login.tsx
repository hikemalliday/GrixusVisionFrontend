import React, { useState, KeyboardEventHandler } from "react";
import { signInInputStyles, signInButtonStyles } from "./login-button-styles";
import { Button, TextField, Typography } from "@mui/material";
import { AxiosResponse } from "axios";
import { useLogin } from "../requests/fetches";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export function Login(): React.JSX.Element {
  const { action } = useLogin();
  const { login } = useAuthContext();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([""]);
  //const { action: tokenAction } = useApiToken();

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    const newErrors = [];

    if (username === "") {
      newErrors.push("Please enter a username.");
    }

    if (password === "") {
      newErrors.push("Please enter a password.");
    }

    setErrors(newErrors);

    if (newErrors.length === 0) {
      try {
        const response = (await action({
          username,
          password,
        })) as AxiosResponse;

        const userData = response?.data;
        login(userData);
        navigate("/");
      } catch (err) {
        console.error(err);
        console.log("Error during login");
        navigate("/login");
        return;
      }
    }
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleEnter: KeyboardEventHandler<
    HTMLTextAreaElement | HTMLInputElement | HTMLDivElement
  > = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

  return (
    <div className="sign-in-container">
      <Typography
        sx={{
          marginBottom: "100px",
        }}
      >
        PLEASE SIGN IN
      </Typography>
      <TextField
        sx={signInInputStyles}
        id="filled-basic"
        label="username"
        variant="filled"
        onChange={handleUsernameChange}
        onKeyDown={handleEnter}
      />
      <TextField
        sx={signInInputStyles}
        id="filled-basic"
        label="password"
        variant="filled"
        onChange={handlePasswordChange}
        onKeyDown={handleEnter}
      />
      <Button sx={signInButtonStyles} onClick={handleSubmit}>
        SIGN IN
      </Button>
      {errors.map((error) => (
        <div key={error}>{error}</div>
      ))}
    </div>
  );
}
