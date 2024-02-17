import React from "react";

export function useSvgBBox(svgEl) {
  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);
  const [x, setX] = React.useState(0);
  const [y, setY] = React.useState(0);

  const resizeCallback = React.useCallback(() => {
    setWidth(svgEl.current.getBBox().width);
    setHeight(svgEl.current.getBBox().height);
    setX(svgEl.current.getBBox().x);
    setY(svgEl.current.getBBox().y);
  }, [svgEl]);

  React.useEffect(() => {
    if (!svgEl) {
      return;
    }

    resizeCallback();

    let observer = new ResizeObserver(() => resizeCallback());
    observer.observe(svgEl.current);
    return () => {
      observer.disconnect();
    };
  }, [svgEl, resizeCallback]);
  return [x, y, width, height];
}
