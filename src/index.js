import { createRoot } from "react-dom/client";
import React from "react";
import App from "./App";

const el = document.getElementById("app");
const root = createRoot(el);

root.render(<App />);
