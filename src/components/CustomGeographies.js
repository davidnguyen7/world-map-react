import React, { useEffect, useContext, useCallback } from "react";
import { Geographies, Geography } from "react-simple-maps";
import { motion } from "framer-motion";
import { useGeographies } from "react-simple-maps";
import { WorldMapContext } from "./SearchBar";
import { useSvgBBox } from "../hooks/useSvgBBox";
import { TrackedGeography } from "./TrackedGeography";

export const transformTemplate = ({ x, y, scale }) => {
  return `scale(${scale}) translateX(${x}) translateY(${y})`;
};

export const CustomGeographies = ({ geography }) => {
  const { geographies } = useGeographies({
    geography,
  });

  const { setNames, selected, setSelected } = useContext(WorldMapContext);

  const geographyRef = React.useRef();
  const [geographyX, geographyY, geographyWidth, geographyHeight] = useSvgBBox(geographyRef);

  const [selectedRef, setSelectedRef] = React.useState();
  const [selectedRefX, selectedRefY, selectedRefWidth, selectedRefHeight] = useSvgBBox(selectedRef);

  useEffect(() => {
    if (!geographies) return;

    const names = geographies.map((geo) => geo.properties?.NAME_EN);
    names.sort();
    setNames(names);
  }, [geographies]);

  // TODO: Investigate why subtracting 20 from y makes
  // centering consistent with scale
  const animation = {
    x: selectedRef
      ? (geographyWidth / 2) + (geographyX - selectedRefX) - (selectedRefWidth / 2)
      : 0,
    y: selectedRef
      ? (geographyHeight / 2) + (geographyY - selectedRefY) - (selectedRefHeight / 2) - 20
      : 0,
    scale: 1,
  };

  const onGeographyClick = useCallback((geography) => {
    const selectedName = geography.properties?.NAME_EN;
    setSelected(name => name !== selectedName 
      ? selectedName ?? "" 
      : ""
    );
  }, [])

  return (
    <motion.g
      transformTemplate={transformTemplate}
      style={{ originX: "50%", originY: "50%" }}
      animate={animation}
      transition={{
        type: "spring",
        bounce: 0,
      }}
    >
      {[...new Array(2)].map((_, i) => (
        <g
          key={i}
          style={{
            transform: `translateX(${i % 2 == 0 ? geographyWidth + 1 : -geographyWidth - 1}px)`,
          }}
        >
          {geographies &&
            geographies.length > 0 &&
            geographies.map((geo) => {
            return (
              <path
                key={`${i}_${geo.rsmKey}`}
                d={geo.svgPath}
                style={{
                  fill: "#A78A7F"
                }}
              />
            );
          })}
        </g>
      ))}
      <g ref={geographyRef}>
        {geographies &&
          geographies.length > 0 &&
          geographies.map((geo) => (
            <>
              <TrackedGeography
                onClick={onGeographyClick}
                key={geo.rsmKey}
                geo={geo}
                selected={selected != "" && selected === geo.properties?.NAME_EN}
                setSelectedRef={setSelectedRef} />
            </>
          ))}
      </g>
    </motion.g>
  );
};

CustomGeographies.displayName = "CustomGeographies";