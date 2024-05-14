import React, { useState } from "react";
import { Link } from "react-router-dom";
import CategoryList from "./CategoryList";

import Item from "./Item";

function Stock(props) {
  const { items, onDeleteItem, categories } = props;

  const [searchItemName, setSearchItemName] = useState("");
  const [searchItemId, setSearchItemId] = useState("");
  const [searchItemCategory, setSearchItemCategory] = useState("");

  // need to add type later
  function getValidItems() {
    return items.filter((item) => {
      return (
        (searchItemCategory === "" || item.category === searchItemCategory) &&
        item.Id.includes(searchItemId) &&
        item.name.toLowerCase().includes(searchItemName.toLowerCase())
      );
    });
  }

  return (
    <div className="MainpageBox">
      <h1 className="PageHerder"> Stock </h1>

      <form>
        <h3> Search your item here: </h3>
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
      </form>

      <Link to="/stock/stockadder">Add new item</Link>

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
                idx={index}
                key={index}
                item={item}
                onDeleteItem={onDeleteItem}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Stock;
