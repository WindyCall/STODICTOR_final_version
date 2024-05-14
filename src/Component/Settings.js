import ResetPassword from "./ResetPassword";
import { useAuth } from "../hooks/useAuth";
import * as React from "react";
import { useState } from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
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

function Settings(props) {
  const { updateUserPassword } = useAuth();
  const [signUpPassword, setSignUpPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);

  function getSameSignUpPassword() {
    return signUpPassword === confirmPassword;
  }

  function handleResetPassword() {
    if (!getSameSignUpPassword()) {
      alert(
        "Two passwords do not match\nplease check for your confirm password"
      );
      return;
    }
    if (signUpPassword.length < 6) {
      alert(
        "Your password must be longer than 6 digits\n\nplease reinput your password"
      );
      return;
    }
    updateUserPassword(signUpPassword);
    alert("Your password has been updated");
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="MainpageBox">
      <h1 className="StockText"> Account Settings </h1>
      <hr className="LineForMargin" />
      <h3> Reset your password here </h3>
      <FormControl sx={{ m: 1, width: "100ch" }} variant="standard">
        <InputLabel htmlFor="standard-adornment-password">
          New Password
        </InputLabel>
        <Input
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
      <br />
      <FormControl sx={{ m: 1, width: "100ch" }} variant="standard">
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
      <br />
      <br />
      <Button color="success" variant="contained" onClick={handleResetPassword}>
        Confirm
      </Button>
    </div>
  );
}

export default Settings;
