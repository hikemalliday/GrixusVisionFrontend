import React, { useState } from "react";
import { signInInputStyles, signInButtonStyles } from "./style";
import { Button, TextField, Typography } from "@mui/material";
import { AxiosResponse } from "axios";
import { useCreateUser } from "../requests/fetches";

export function SignUp(): React.JSX.Element {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([""]);
  const { action } = useCreateUser();
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
      console.log("Form submitted!");
      try {
        const response = (await action({
          username,
          password,
        })) as AxiosResponse;
        console.log(response);
        if (response !== undefined) {
          // need to store accessToken here
        }
      } catch {
        console.log("Error during login");
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

  return (
    <div className="sign-in-container">
      <Typography
        sx={{
          marginBottom: "100px",
        }}
      >
        SIGN UP
      </Typography>
      <TextField
        sx={signInInputStyles}
        id="filled-basic"
        label="username"
        variant="filled"
        onChange={handleUsernameChange}
      />
      <TextField
        sx={signInInputStyles}
        id="filled-basic"
        label="password"
        variant="filled"
        onChange={handlePasswordChange}
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
