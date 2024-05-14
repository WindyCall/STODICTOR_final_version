import Button from "@mui/material/Button";
import { useAuth } from "../hooks/useAuth";
import * as React from "react";
import { useState } from "react";
import "../styles.css";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Box from "@mui/material/Box";

function ResetPassword(props) {
  const {
    signInWithGoogle,
    createWithEmailAndPassword,
    signinWithEmailAndPassword,
    sendUserPasswordResetEmail,
    confirmPasswordReset
  } = useAuth();

  const [resetEmail, setResetEmail] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  function handleResetPassword() {
    if (resetEmail === "") {
      alert("Email can not be empty");
      return;
    }
    sendUserPasswordResetEmail(resetEmail, setErrorMessage);
  }

  return (
    <div>
      <Box className="LoginBox">
        <div className="LoginPage">
          <h3 className="ResetText"> ResetPassword </h3>
          <br />
          <strong> Enter your email to reset password </strong>
          <br /> <br />
          <TextField
            sx={{ m: 1, width: "35ch" }}
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
            id="input-with-icon-textfield"
            label="Email"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              )
            }}
            variant="standard"
          />
          <p className="ErrorMessage"> {errorMessage} </p>
          <Button
            onClick={handleResetPassword}
            className="SigninButton"
            variant="contained"
          >
            Confirm
          </Button>
          <br /> <br />
          <Link to="/">
            <Button style={{ marginLeft: 55, width: 180 }} variant="outlined">
              Back to login page
            </Button>
          </Link>
        </div>
      </Box>
    </div>
  );
}

export default ResetPassword;
