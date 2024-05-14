import React, { useState } from "react";
import { Link } from "react-router-dom";

function Head(props) {
  return (
    <div className="HeaderBox">
      {" "}
      <nav>
        <div style={{ display: "flex", flexFlow: "row nowrap" }}>
          <strong> STODICTOR </strong>
          <strong
            style={{ textEmphasisColor: "yellow" }}
            to="/account"
            style={{ margin: "0 85rem" }}
          >
            {" "}
            Profile{" "}
          </strong>
        </div>
      </nav>
    </div>
  );
}

export default Head;
