import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useState } from "react";
import AccountSidebar from "./AccountSidebar";
import "../styles.css";

import Profile from "./Profile";
import Email from "./Email";
import Settings from "./Settings";

function AccountRouter(props) {
  return (
    <div className="Account">
      <Router>
        <AccountSidebar />
        <Routes>
          <Route path="/account" element={<Profile />} />
          <Route path="/account/email" element={<Email />} />
          <Route path="/account/settings" element={<Settings />} />
        </Routes>
      </Router>
    </div>
  );
}

export default AccountRouter;
