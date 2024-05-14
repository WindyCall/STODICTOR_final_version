import React from "react";

function CategoryList(props) {
  const {
    categories,
    position,
    searchItemCategory,
    setSearchItemCategory,
    newItemCategory,
    setNewItemCategory,
    searchRecordCategory,
    setSearchRecordCategory,
    updateRecordCategory,
    setUpdateRecordCategory,
    searchTradeItemCategory,
    setSearchTradeItemCategory,
    setSearchPredictItemCategory
  } = props;

  function getDefaultValue() {
    return position === "UpdateRecord" ? updateRecordCategory : "";
  }

  function getDefaultDisplay() {
    return position === "UpdateRecord" ? updateRecordCategory : "";
  }

  return (
    <div>
      <strong> Category </strong>
      <select
        className="UpdateInput"
        style={{ margin: "0 1rem" }}
        aria-label="Default select example"
        onChange={(e) => {
          const selectType = e.target.value;
          if (position === "SearchItem") setSearchItemCategory(selectType);
          if (position === "AddItem") setNewItemCategory(selectType);
          if (position === "SearchRecord") setSearchRecordCategory(selectType);
          if (position === "UpdateRecord") setUpdateRecordCategory(selectType);
          if (position === "SearchTradeItem")
            setSearchTradeItemCategory(selectType);
          if (position === "SearchPredictItem")
            setSearchPredictItemCategory(selectType);
        }}
      >
        <option value={getDefaultValue()}>{getDefaultDisplay()}</option>
        {categories.map((type) => {
          return (
            <option value={type.name} key={type.id}>
              {type.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default CategoryList;
