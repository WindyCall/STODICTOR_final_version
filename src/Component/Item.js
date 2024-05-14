import { useState } from "react";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import CategoryList from "./CategoryList";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "green",
    color: "white"
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0
  }
}));

function Item(props) {
  const { item, onDeleteItem, idx } = props;

  return (
    <StyledTableRow key={item.name}>
      <StyledTableCell align="center" component="th" scope="row">
        <strong>{item.Id}</strong>
      </StyledTableCell>
      <StyledTableCell align="center">
        <strong>{item.category}</strong>
      </StyledTableCell>
      <StyledTableCell align="center">
        <strong>{item.name}</strong>
      </StyledTableCell>
      <StyledTableCell align="center">
        <strong>{item.storage}</strong>
      </StyledTableCell>
      <StyledTableCell align="center">
        <Button
          color="error"
          variant="contained"
          style={{ margin: "0 1rem" }}
          onClick={() => onDeleteItem(item)}
        >
          Delete
        </Button>
      </StyledTableCell>
    </StyledTableRow>
  );
}

export default Item;
