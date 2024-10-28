import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.less";
import {Aviasales} from "./Components/Aviasales/Aviasales.jsx";

const rootElement = document.querySelector(".root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Aviasales />
  </StrictMode>,
);
