import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ProvideAuth } from "./hooks/useAuth";
import ReactDOM from "react-dom";
import "./styles.css";

import CssBaseline from "@material-ui/core/CssBaseline";

import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <CssBaseline />
    <ProvideAuth>
      <App />
    </ProvideAuth>
  </StrictMode>
);
