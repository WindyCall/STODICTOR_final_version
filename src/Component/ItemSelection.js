import { useState } from "react";
import { Link } from "react-router-dom";
import CategoryList from "./CategoryList";
import TradeItem from "./TradeItem";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
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

import Item from "./Item";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "purple",
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

function ItemSelection(props) {
  const {
    tradeType,
    onDeleteTradeItem,
    categories,
    items,
    setTradeItemId,
    setTradeItemName,
    setTradeItemCategory,
    setTradeItemStorage
  } = props;

  // put item list here with search function

  const [searchTradeItemName, setSearchTradeItemName] = useState("");
  const [searchTradeItemId, setSearchTradeItemId] = useState("");
  const [searchTradeItemCategory, setSearchTradeItemCategory] = useState("");

  // need to add type later
  function getValidItems() {
    return items.filter((item) => {
      return (
        (searchTradeItemCategory === "" ||
          item.category === searchTradeItemCategory) &&
        item.Id.includes(searchTradeItemId) &&
        item.name.toLowerCase().includes(searchTradeItemName.toLowerCase())
      );
    });
  }

  return (
    <div className="MainpageBox">
      <Link to="/trade">
        <Button
          variant="outlined"
          style={{ marginLeft: -20, width: 200, marginTop: 10 }}
        >
          {" "}
          Back{" "}
        </Button>
      </Link>
      <h1 className="ItemSelection"> Item Selection </h1>

      <h3> Search your item here: </h3>
      <Stack direction="row" spacing={2}>
        <strong> ID </strong>
        <input
          style={{ margin: "0 1rem" }}
          type="text"
          value={searchTradeItemId}
          onChange={(e) => setSearchTradeItemId(e.target.value)}
          placeholder="Input ID here"
        />
        <strong> Name </strong>
        <input
          style={{ margin: "0 1rem" }}
          type="text"
          value={searchTradeItemName}
          onChange={(e) => setSearchTradeItemName(e.target.value)}
          placeholder="Input name here"
        />

        <CategoryList
          searchTradeItemCategory={searchTradeItemCategory}
          setSearchTradeItemCategory={setSearchTradeItemCategory}
          position="SearchTradeItem"
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
              <StyledTableCell align="center">Storage</StyledTableCell>
              <StyledTableCell align="center">Operation</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getValidItems().map((item, index) => {
              return (
                <TradeItem
                  setTradeItemId={setTradeItemId}
                  setTradeItemName={setTradeItemName}
                  setTradeItemCategory={setTradeItemCategory}
                  setTradeItemStorage={setTradeItemStorage}
                  tradeType={tradeType}
                  idx={index}
                  key={index}
                  item={item}
                  onDeleteTradeItem={onDeleteTradeItem}
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

export default ItemSelection;
