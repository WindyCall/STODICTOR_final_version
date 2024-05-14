import { useAuth } from "../hooks/useAuth";
import * as React from "react";
import { useState } from "react";
import "../styles.css";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import AccountCircle from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Link } from "react-router-dom";
import MenuAppBar from "../Component/MenuAppBar";

export default function PageLogin() {
  const {
    signInWithGoogle,
    createWithEmailAndPassword,
    signinWithEmailAndPassword
  } = useAuth();

  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [showSignInPassword, setShowSignInPassword] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  function handleSignIn() {
    signinWithEmailAndPassword(signInEmail, signInPassword, setErrorMessage);
  }

  function getSigninPage() {
    return (
      <div>
        <h3 className="SignText"> Sign in </h3>
        <TextField
          sx={{ m: 1, width: "35ch" }}
          value={signInEmail}
          onChange={(e) => setSignInEmail(e.target.value)}
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
        <br />
        <FormControl sx={{ m: 1, width: "35ch" }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">
            Password
          </InputLabel>
          <Input
            id="standard-adornment-password"
            type={showSignInPassword ? "text" : "password"}
            value={signInPassword}
            onChange={(e) => setSignInPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowSignInPassword(!showSignInPassword)}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showSignInPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <br />
        <p className="ErrorMessage">{errorMessage}</p>
        <Button
          className="SigninButton"
          onClick={handleSignIn}
          variant="contained"
        >
          Sign in
        </Button>
      </div>
    );
  }

  return (
    <>
      <div>
        <Box className="LoginBox">
          <div className="LoginPage">
            {getSigninPage()}
            <br />
            <Stack spacing={2} direction="row">
              <Link to="/reset">
                <Button variant="outlined">Forget Password?</Button>
              </Link>
              <Link to="/signup">
                <Button className="SignupButton" variant="outlined">
                  Sign up
                </Button>
              </Link>
            </Stack>
          </div>
        </Box>
      </div>
    </>
  );
}
