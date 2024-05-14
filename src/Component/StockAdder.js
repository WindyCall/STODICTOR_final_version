import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import CategoryList from "./CategoryList";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

function StockAdder(props) {
  const {
    onAddNewItem,
    categories,
    newItemCategory,
    setNewItemCategory
  } = props;

  const [newItemName, setNewItemName] = useState("");
  const [newItemId, setNewItemId] = useState("");

  function getLinkAfterAddClicked() {
    if (newItemName === "" || newItemId === "" || newItemCategory === "")
      return "/stock/stockadder";
    else return "/stock";
  }

  return (
    <div className="MainpageBox">
      <Link onClick={() => setNewItemCategory("")} to="/stock">
        <Button
          variant="outlined"
          style={{ marginLeft: -20, width: 200, marginTop: 10 }}
        >
          Back to Stock
        </Button>
      </Link>
      <h1> StockAdder </h1>
      <div>
        <strong> Name </strong>
        <input
          type="text"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder="Input name"
        />
        <br />
        <br />
        <br />
        <strong> ID </strong>
        <input
          type="text"
          value={newItemId}
          onChange={(e) => setNewItemId(e.target.value)}
          placeholder="Input ID"
        />
        <p>(ID should contain only 11 digits) </p>
        <br />
        <CategoryList
          newItemCategory={newItemCategory}
          setNewItemCategory={setNewItemCategory}
          categories={categories}
          position="AddItem"
        />
        <br />
        <br />
        <Link
          to={getLinkAfterAddClicked()}
          onClick={() => {
            onAddNewItem(newItemName, newItemId, newItemCategory);
          }}
        >
          <Button variant="contained">Add new item</Button>
        </Link>
      </div>
    </div>
  );
}

export default StockAdder;
