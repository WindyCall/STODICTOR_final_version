import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import PageSystem from "./pages/PageSystem";
import PageLogin from "./pages/PageLogin";
import LoginRouter from "./pages/LoginRouter";
import { useAuth } from "./hooks/useAuth";

import "./styles.css";

export default function App() {
  // console.log(useAuth())
  const { user } = useAuth();

  return (
    <>
      <div>{user ? <PageSystem /> : <LoginRouter />}</div>
    </>
  );
}
