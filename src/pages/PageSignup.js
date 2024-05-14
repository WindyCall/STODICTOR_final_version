import Button from "@mui/material/Button";
import { useAuth } from "../hooks/useAuth";
import * as React from "react";
import { useState } from "react";
import "../styles.css";

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

function PageSignup() {
  const {
    signInWithGoogle,
    createWithEmailAndPassword,
    signinWithEmailAndPassword
  } = useAuth();

  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  function getSameSignUpPassword() {
    return signUpPassword === confirmPassword;
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  function handleCreateAccount() {
    if (!getSameSignUpPassword()) {
      alert(
        "Two passwords do not match\n\nplease check for your confirm password"
      );
      return;
    }
    /*if (signUpPassword.length < 6) {
      alert(
        "Your password must be longer than 6 digits\n\nplease reinput your password"
      );
      return;
    }*/
    createWithEmailAndPassword(signUpEmail, signUpPassword, setErrorMessage);
  }

  function getSignupPage() {
    return (
      <div>
        <h3 className="SignText"> Sign up </h3>
        <br />
        <TextField
          sx={{ m: 1, width: "35ch" }}
          value={signUpEmail}
          onChange={(e) => setSignUpEmail(e.target.value)}
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
            error={signUpPassword.length < 6}
            id="standard-adornment-password"
            type={showSignUpPassword ? "text" : "password"}
            value={signUpPassword}
            onChange={(e) => setSignUpPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowSignUpPassword(!showSignUpPassword)}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showSignUpPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <br />
        <FormControl sx={{ m: 1, width: "35ch" }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">
            Confirm Password
          </InputLabel>
          <Input
            error={!getSameSignUpPassword()}
            helperText={"Incorrect entry."}
            id="standard-adornment-password"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <br />
        <p className="ErrorMessage"> {errorMessage} </p>

        <Link to="/">
          <Button
            className="SigninButton"
            onClick={handleCreateAccount}
            variant="contained"
          >
            Create new Acoount
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Box className="SignupBox">
        <div className="LoginPage">
          {getSignupPage()}
          <br />
          <Link to="/">
            <Button style={{ marginLeft: 70, width: 150 }} variant="outlined">
              Login instead?
            </Button>
          </Link>
        </div>
      </Box>
    </div>
  );
}

export default PageSignup;
