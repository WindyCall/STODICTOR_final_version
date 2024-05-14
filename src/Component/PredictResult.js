import { Link } from "react-router-dom";
import { useState } from "react";
import CategoryList from "./CategoryList";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import PredictItem from "./PredictItem";

import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { grey } from "@mui/material/colors";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "darkred",
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

function PredictResult(props) {
  const { categories, items, cntArray } = props;

  const [searchPredictItemId, setSearchPredictItemId] = useState("");
  const [searchPredictItemName, setSearchPredictItemName] = useState("");
  const [searchPredictItemCategory, setSearchPredictItemCategory] = useState(
    ""
  );

  function getValidItems() {
    return items.filter((item) => {
      return (
        (searchPredictItemCategory === "" ||
          item.category === searchPredictItemCategory) &&
        item.Id.includes(searchPredictItemId) &&
        item.name.toLowerCase().includes(searchPredictItemName.toLowerCase())
      );
    });
  }

  return (
    <div className="MainpageBox">
      <Link to="/predict">
        <Button
          variant="outlined"
          style={{ marginLeft: -20, width: 200, marginTop: 10 }}
        >
          Back to Predict
        </Button>
      </Link>
      <h1 className="PredictResult"> PredictResult </h1>
      <h3> Choose the item you want to know storage changes </h3>

      <h3> Search your item here: </h3>
      <Stack direction="row" spacing={2}>
        <strong> ID </strong>

        <input
          style={{ margin: "0 1rem" }}
          type="text"
          value={searchPredictItemId}
          onChange={(e) => setSearchPredictItemId(e.target.value)}
          placeholder="Input ID here"
        />
        <strong> Name </strong>
        <input
          style={{ margin: "0 1rem" }}
          type="text"
          value={searchPredictItemName}
          onChange={(e) => setSearchPredictItemName(e.target.value)}
          placeholder="Input name here"
        />

        <CategoryList
          searchPredictItemCategory={searchPredictItemCategory}
          setSearchPredictItemCategory={setSearchPredictItemCategory}
          position="SearchPredictItem"
          categories={categories}
        />
      </Stack>
      <br />
      <TableContainer className="StockTable" component={Paper}>
        <Table sx={{ minWidth: 800 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">ID.</StyledTableCell>
              <StyledTableCell align="center">Category</StyledTableCell>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">
                Expected storage changes
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getValidItems().map((item, index) => {
              return (
                <PredictItem
                  className="StockItemBox"
                  idx={index}
                  key={index}
                  item={item}
                  cntArray={cntArray}
                />
              );
            })}
          </TableBody>
        </Table>
        {getValidItems().length === 0 ? (
          <h1 style={{ marginLeft: 520 }}> No records found </h1>
        ) : (
          <></>
        )}
      </TableContainer>
    </div>
  );
}

export default PredictResult;
