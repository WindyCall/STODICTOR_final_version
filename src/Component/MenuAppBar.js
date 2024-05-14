import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Link } from "react-router-dom";
import { useState } from "react";
import Pikachu from "../pictures/Pikachu.png";

import { useAuth } from "../hooks/useAuth";

export default function MenuAppBar(props) {
  const { setPageType, profilePhotoURL } = props;

  const { user, signOutWithEmailAndPassword } = useAuth();

  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [isImgError, setIsImgError] = useState(true);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            <Link className="TitleStodictor" to="/">
              STODICTOR
            </Link>
          </Typography>
          {user && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                {profilePhotoURL === Pikachu ? (
                  <AccountCircle className="LittleAvatar" />
                ) : (
                  <img
                    alt="none"
                    className="LittleAvatar"
                    src={profilePhotoURL}
                  />
                )}
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <Link to="/account">
                  <MenuItem
                    onClick={() => {
                      handleClose();
                    }}
                  >
                    Profile
                  </MenuItem>
                </Link>
                <MenuItem
                  onClick={() => {
                    handleClose();
                  }}
                >
                  <Link to="/account/settings">Account settings</Link>
                </MenuItem>
                <Link to="/">
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      signOutWithEmailAndPassword();
                    }}
                  >
                    Log out
                  </MenuItem>
                </Link>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
