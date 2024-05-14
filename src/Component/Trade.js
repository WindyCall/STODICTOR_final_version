import React, { useState } from "react";
import Record from "./Record";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Sale from "../pictures/Sale.png";
import Purchase from "../pictures/Purchase.png";

function Trade(props) {
  const { setTradeType } = props;

  // check if name and id are consistent
  return (
    <div className="MainpageBox">
      <Link to="/">
        <Button
          variant="outlined"
          style={{ marginLeft: -20, width: 200, marginTop: 10 }}
        >
          {" "}
          Back to DashBoard{" "}
        </Button>
      </Link>

      <h3 className="TradeType"> Choose your trade type </h3>
      <Stack direction="row">
        <Link
          className="TradeLink"
          onClick={() => setTradeType(false)}
          to="/trade/itemselection"
        >
          <Box className="DashBoardPictureBox">
            <img className="DashboardPictures" src={Sale} alt="Logo" />
          </Box>
        </Link>
        <br />
        <Link
          className="TradeLink"
          onClick={() => setTradeType(true)}
          to="/trade/itemselection"
        >
          <Box className="DashBoardPictureBox">
            <img className="DashboardPictures" src={Purchase} alt="Logo" />
          </Box>
        </Link>
      </Stack>
    </div>
  );
}

export default Trade;
