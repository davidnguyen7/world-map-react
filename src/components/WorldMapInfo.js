import React, { useContext } from "react";
import { motion } from "framer-motion";
import { WorldMapContext } from "./SearchBar";
import { useGeographyInfo } from "../hooks/useGeographyInfo";

export const WorldMapInfo = () => {
  const { selected } = useContext(WorldMapContext);
  const { info, error } = useGeographyInfo(selected);

  if (!selected) return null;

  return (
    <motion.div
      initial={{opacity: 0,}}
      animate={{ opacity: 1 }}
      className="world-map info"
    >
      <h1>{selected}</h1>

      {error ? (<p>Whoops! Couldn't fetch any information on this.</p>) : null}
      {info ? (
        <>
          <p>{info}</p>
          <a
            target={"_blank"}
            rel="noreferrer"
            href={`https://en.wikipedia.org/wiki/${selected}`}
          >
            Read more on Wikipedia
          </a>
        </>
      ) : null}
    </motion.div>
  );
};
