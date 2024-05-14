import "../styles.css";
import OverallHistory from "./OverallHistory";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import Stock from "./Stock";
import Predict from "./Predict";
import Finance from "./Finance";
import Trade from "./Trade";
import Settings from "./Settings";
import Support from "./Support";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StockAdder from "./StockAdder";
import React, { useState } from "react";
import About from "./About";
import ItemSelection from "./ItemSelection";
import RecordAdder from "./RecordAdder";
import MenuAppBar from "../Component/MenuAppBar";
import Profile from "./Profile";
import PredictResult from "./PredictResult";

import { storage } from "../hooks/useAuth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, useAuth } from "../hooks/useAuth";

function DashboardRouter(props) {
  const {
    items,
    onAddNewItem,
    onDeleteItem,
    onAddNewRecord,
    categories,
    onDeleteRecord,
    records,
    sideData,
    profilePhotoURL,
    onUpdateRecord,
    newItemCategory,
    setNewItemCategory,
    onAddNewCategory,
    onUpdateUserProfile,
    onHandlePredicting
  } = props;

  const [tradeType, setTradeType] = useState(false);
  // false => sale, true => purcahse

  const [tradeItemId, setTradeItemId] = useState("");
  const [tradeItemName, setTradeItemName] = useState("");
  const [tradeItemCategory, setTradeItemCategory] = useState("");
  const [tradeItemStorage, setTradeItemStorage] = useState(0);

  const [cntArray, setCntArray] = useState([]);

  return (
    <Router>
      <div>
        <MenuAppBar profilePhotoURL={profilePhotoURL} />
        <Sidebar
          newItemCategory={newItemCategory}
          setNewItemCategory={setNewItemCategory}
        />
        <Routes>
          <Route
            path="/"
            exact
            element={<Dashboard categories={categories} />}
          />
          <Route
            path="/history"
            element={
              <OverallHistory
                onUpdateRecord={onUpdateRecord}
                categories={categories}
                records={records}
                onDeleteRecord={onDeleteRecord}
              />
            }
          />
          <Route
            exact
            path="/trade"
            element={<Trade setTradeType={setTradeType} />}
          />
          <Route
            exact
            path="/trade/itemselection"
            element={
              <ItemSelection
                setTradeItemId={setTradeItemId}
                setTradeItemName={setTradeItemName}
                setTradeItemCategory={setTradeItemCategory}
                categories={categories}
                items={items}
                tradeType={tradeType}
                setTradeType={setTradeType}
                setTradeItemStorage={setTradeItemStorage}
              />
            }
          />
          <Route
            path="/trade/itemselection/recordadder"
            element={
              <RecordAdder
                tradeItemStorage={tradeItemStorage}
                tradeItemId={tradeItemId}
                tradeItemName={tradeItemName}
                tradeItemCategory={tradeItemCategory}
                onAddNewRecord={onAddNewRecord}
                tradeType={tradeType}
              />
            }
          />
          <Route
            path="/predict"
            element={
              <Predict
                onHandlePredicting={onHandlePredicting}
                setCntArray={setCntArray}
                records={records}
                items={items}
                categories={categories}
              />
            }
          />
          <Route
            path="/predict/result"
            element={
              <PredictResult
                cntArray={cntArray}
                items={items}
                categories={categories}
              />
            }
          />
          <Route
            exact
            path="/stock"
            element={
              <Stock
                onAddNewCategory={onAddNewCategory}
                categories={categories}
                onDeleteItem={onDeleteItem}
                items={items}
              />
            }
          />
          <Route
            path="/stock/stockadder"
            element={
              <StockAdder
                newItemCategory={newItemCategory}
                setNewItemCategory={setNewItemCategory}
                categories={categories}
                onAddNewItem={onAddNewItem}
              />
            }
          />
          <Route
            path="/finance"
            element={<Finance items={items} records={records} />}
          />
          <Route path="/support" element={<Support />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/account"
            element={
              <Profile
                profilePhotoURL={profilePhotoURL}
                onUpdateUserProfile={onUpdateUserProfile}
                sideData={sideData}
              />
            }
          />
          <Route path="/account/settings" element={<Settings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default DashboardRouter;
