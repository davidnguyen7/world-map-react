import React from "react";
import { ComposableMap } from "react-simple-maps";
import { WorldMapInfo } from "./WorldMapInfo";
import { CustomGeographies } from "./CustomGeographies";

export const GEO_URL = "data.json";

export default function WorldMap() {
  return (
    <div className="world-map">
      <div className="overlay">
        <WorldMapInfo />
      </div>
      <ComposableMap projection="geoMercator" width={1000}>
        <CustomGeographies geography={GEO_URL} />
      </ComposableMap>
    </div>
  );
}
