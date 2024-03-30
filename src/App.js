import "./App.scss";

import React, { useState } from "react";
import SearchBar, { WorldMapContext } from "./components/SearchBar";
import WorldMap from "./components/WorldMap";
import { LoadingOverlay } from "./components/LoadingOverlay";
import { AnimatePresence } from "framer-motion";

export default function App() {
  const [names, setNames] = useState([]);
  const [focus, setFocus] = useState("");

  const loading = names.length === 0;

  return (
    <div>
      <AnimatePresence>{loading && <LoadingOverlay />}</AnimatePresence>
      <WorldMapContext.Provider
        value={{ names, setNames, selected: focus, setSelected: setFocus }}
      >
        <WorldMap />
        <SearchBar />
      </WorldMapContext.Provider>
    </div>
  );
}
