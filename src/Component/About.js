import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import Box from "@mui/material/Box";

/*
 


*/

function About(props) {
  return (
    <div className="MainpageBox">
      <Box className="AboutBox">
        <h1 className="AboutUs"> About US </h1>
        <div className="vl"></div>
        <p className="AboutMotivation ">
          <strong className="AboutSubtitle"> Motivation </strong>
          <br />
          As a store manager, the futures sales of your products is one of the
          biggest things that is relevant to your revenue. The prediction of
          future sales is important for the logistic management of your markets
          since you may not want to pile up too many stocks in your factory, nor
          do you want to have a too empty factory which will cost you an extra
          renting fee. 
        </p>
        <p className="AboutDescription ">
          <strong className="AboutSubtitle"> Description </strong>
          <br />
          Therefore, here we develop an accounting system with sales predicting
          feature so that it will be easy to know and adjust the future sales of
          our existing stocks. In this way, we could change the purchase
          strategy of the stocks we have to optimize our factory loading, which
          optimizes the logistic management cost.
        </p>
        <p className="AboutGuide">
          <strong className="AboutSubtitle"> User Guide </strong>
          <br />
          You may use the trade function in Dashboard to record your every
          trading history. All the tradings you have done can be checked and
          managed on History and Stock page. With enough amount of data being
          collected(more than 100 days of trading history usually), you may use
          the predicting function in Dashboard to make predictions on the sales
          of your good. Note that the more data you collect, the more accurate
          will the predicting system works. Besides, you may check your revenue
          trends anytime on Finance page.
        </p>
      </Box>
    </div>
  );
}

export default About;
