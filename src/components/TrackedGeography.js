import React from "react";
import { motion } from "framer-motion";
import { Geography } from "react-simple-maps";

export const MotionGeography = motion(Geography);

export const TrackedGeography = ({ geo, onClick, selected, setSelectedRef }) => {
  const geoRef = React.useRef();

  React.useEffect(() => {
    if (selected) {
      setSelectedRef(geoRef);
      return () => {
        setSelectedRef(null);
      };
    }
  }, [selected]);

  return (
    <motion.path
      ref={geoRef}
      key={geo.rsmKey}
      d={geo.svgPath} 
      onClick={() => onClick(geo)}
      className={"geo-svg"}
      initial={{
        fill: "#735751",
        height: 1,
        stroke: "#A78A7F",
        strokeWidth: 0.5,
      }}
      animate={{
        fill: selected ? "#8C1C13" : "#735751",
        stroke: selected ? "#BF4342" : "#A78A7F"
      }}
      whileHover={{
        fill: "#A78A7F",
        height: 1.25,
      }} 
      tabIndex={-1}
      />
  );
};