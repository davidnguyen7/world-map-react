import React, { createContext, useContext, useState, useMemo } from "react";
import { debounce } from "../utils";

export const WorldMapContext = createContext({
  names: ["VERY LONG COUNTRY NAME"],
  // eslint-disable-next-line no-unused-vars
  setNames: (_) => {},
  selected: "",
  // eslint-disable-next-line no-unused-vars
  setSelected: (_) => {},
});

export default function SearchBar() {
  const { names, selected, setSelected } = useContext(WorldMapContext);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const changeQueryCallback = useMemo(
    () =>
      debounce((query, names) => {
        const filteredNames = query
          ? names.filter((v) => v.toLowerCase().includes(query.toLowerCase()))
          : names;

        setSearchResults(filteredNames);
      }, 200),
    [],
  );

  React.useEffect(() => {
    if (query.length === 0) {
      setSearchResults([]);
      return;
    }
    changeQueryCallback(query, names);
  }, [query, changeQueryCallback]);

  // reset state whenever a new selection is made
  React.useEffect(() => {
    setSearchResults([]);
    setQuery("");
  }, [selected]);

  return (
    <div className="sidebar">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter a country..."
      />

      {query.length !== 0 && searchResults.length > 0 && (
        <menu className="country-list">
          {searchResults.map((name, i) => (
            <li
              key={"array".concat(i)}
              className="option"
              onClick={() => setSelected(name)}
            >
              {name}
            </li>
          ))}
        </menu>
      )}
    </div>
  );
}
