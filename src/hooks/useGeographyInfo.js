import React from "react";
const GEOGRAPHY_FETCH_URL =
  "https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=extracts&exchars=200&explaintext&titles=";

const cache = new Map();
setInterval(() => cache.clear(), 50000);

async function getGeographyInfo(geographyName) {
  if (cache.has(geographyName)) {
    return cache.get(geographyName);
  }
  try {
    let response = await fetch(GEOGRAPHY_FETCH_URL + geographyName);

    if (!response.ok) {
      throw new Error("Failed fetch request to Wikipedia");
    }

    let data = await response.json();
    let id = Object.keys(data.query.pages)[0];

    if (id == -1) {
      throw new Error(`Entry for ${geographyName} does not exist in Wikipedia`);
    }

    let result = data.query.pages[id].extract;
    if (!result) {
      throw new Error("Extract is empty!");
    }
    cache.set(geographyName, result);
    return result;
  } catch (err) {
    throw new Error(
      `Failed to fetch geography info for ${geographyName}: ${err}`,
    );
  }
}

export function useGeographyInfo(geographyName) {
  const [info, setInfo] = React.useState("");
  const [error, setError] = React.useState();

  React.useEffect(() => {
    setError(null);
    setInfo("");
    if (!geographyName) return;

    getGeographyInfo(geographyName)
      .then((fetchedInfo) => setInfo(fetchedInfo))
      .catch((error) => {
        console.error(error);
        setError(error);
      });
  }, [geographyName]);

  return { info, error };
}
