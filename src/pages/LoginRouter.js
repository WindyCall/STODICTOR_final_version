import PageLogin from "./PageLogin";
import ResetPassword from "../Component/ResetPassword";
import PageSignup from "./PageSignup";
import "../styles.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useState } from "react";
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

function LoginRouter() {
  return (
    <Router>
      <div>
        <MainAppBar />
        <h1 className="Tittle">STODICTOR</h1>
        <Routes>
          <Route path="/" element={<PageLogin />} />
          <Route path="/reset" element={<ResetPassword />} />
          <Route path="/signup" element={<PageSignup />} />
        </Routes>
      </div>
    </Router>
  );
}

function MainAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            STODICTOR
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default LoginRouter;
