import React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import img1 from "../pictures/Trade.png";
import img2 from "../pictures/Predict.png";

function Dashboard(props) {
  return (
    <>
      <div className="MainpageBox">
        <Stack direction="row" margin={2}>
          <Link to={"/trade"} className="DashboardLink">
            <Box className="DashBoardPictureBox">
              <img className="DashboardPictures" src={img1} alt="Logo" />
            </Box>
          </Link>
          <Link to={"/predict"} className="DashboardLink">
            <Box className="DashBoardPictureBox">
              <img className="DashboardPictures" src={img2} alt="Logo" />
            </Box>
          </Link>
        </Stack>
      </div>
    </>
  );
}

export default Dashboard;
