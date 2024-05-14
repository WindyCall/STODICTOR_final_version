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

import Item from "./Item";

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

function Stock(props) {
  const { items, onDeleteItem, categories, onAddNewCategory } = props;

  const [searchItemName, setSearchItemName] = useState("");
  const [searchItemId, setSearchItemId] = useState("");
  const [searchItemCategory, setSearchItemCategory] = useState("");

  const [addNewCategoryName, setAddNewCategoryName] = useState("");

  // need to add type later
  function getValidItems() {
    /*const validItems = items.map((item) => {
      return {
        Id: item.Id,
        category: item.category,
        name: item.name,
        predictSale: item.predictSale,
        storage: item.storage,
        isChosen:
          (searchItemCategory === "" || item.category === searchItemCategory) &&
          item.Id.includes(searchItemId) &&
          item.name.toLowerCase().includes(searchItemName.toLowerCase())
      };
    });*/
    return items.filter((item) => {
      return (
        (searchItemCategory === "" || item.category === searchItemCategory) &&
        item.Id.includes(searchItemId) &&
        item.name.toLowerCase().includes(searchItemName.toLowerCase())
      );
    });
  }

  function getOriginalTable() {
    return (
      <table style={{ margin: "0 auto", width: "100%" }}>
        <thead>
          <tr>
            <th>ID.</th>
            <th>Category</th>
            <th>Name</th>
            <th>Storage</th>
          </tr>
        </thead>
        <tbody>
          {getValidItems().map((item, index) => {
            return (
              <Item
                className="StockItemBox"
                idx={index}
                key={index}
                item={item}
                onDeleteItem={onDeleteItem}
              />
            );
          })}
        </tbody>
      </table>
    );
  }

  return (
    <div className="MainpageBox">
      <h1 className="StockText"> Stock </h1>
      <hr className="LineForMargin" />
      <h3> Search your item here: </h3>
      <Stack direction="row" spacing={2}>
        <strong> ID </strong>
        <input
          style={{ margin: "0 1rem" }}
          type="text"
          value={searchItemId}
          onChange={(e) => setSearchItemId(e.target.value)}
          placeholder="Input ID here"
        />
        <strong> Name </strong>
        <input
          style={{ margin: "0 1rem" }}
          type="text"
          value={searchItemName}
          onChange={(e) => setSearchItemName(e.target.value)}
          placeholder="Input name here"
        />
        <CategoryList
          searchItemCategory={searchItemCategory}
          setSearchItemCategory={setSearchItemCategory}
          position="SearchItem"
          categories={categories}
        />
      </Stack>
      <br />

      <Stack direction="row" spacing={2}>
        <Link style={{ margin: "0 1rem" }} to="/stock/stockadder">
          <Button variant="contained">Add new item</Button>
        </Link>

        <Popup
          onClose={() => setAddNewCategoryName("")}
          closeOnDocumentClick={true}
          style={{ margin: "0 1rem" }}
          trigger={<Button variant="outlined"> Add new category </Button>}
          position="right center"
        >
          <strong> Category name </strong>
          <br /> <br />
          <input
            type="text"
            value={addNewCategoryName}
            onChange={(e) => setAddNewCategoryName(e.target.value)}
            placeholder="input here"
          />
          <br /> <br />
          <button onClick={() => onAddNewCategory(addNewCategoryName)}>
            Confirm
          </button>
        </Popup>
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
                <Item
                  className="StockItemBox"
                  idx={index}
                  key={index}
                  item={item}
                  onDeleteItem={onDeleteItem}
                />
              );
            })}
          </TableBody>
        </Table>
        {getValidItems().length === 0 ? (
          <h1 style={{ marginLeft: 520 }}> No items found </h1>
        ) : (
          <></>
        )}
      </TableContainer>
    </div>
  );
}

export default Stock;
