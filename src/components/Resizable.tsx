import React, { ReactElement, useEffect, useState } from "react";
import { ResizableBox, ResizableBoxProps } from "react-resizable";
import "../css/resizable.css";
interface ResizableProps {
  direction: "horizontal" | "vertical";
  children: ReactElement<any>;
}

export const Resizable: React.FC<ResizableProps> = ({
  direction,
  children,
}) => {
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  let resizableProps: ResizableBoxProps;

  useEffect(() => {
    let timer: any;
    const dimensionListener = () => {
      if (timer) {
        clearTimeout(timer);
      }
      setTimeout(() => {
        setInnerHeight(window.innerHeight);
        setInnerWidth(window.innerWidth);
      }, 100);
    };

    window.addEventListener("resize", dimensionListener);

    return () => window.removeEventListener("resize", dimensionListener);
  });

  if (direction === "horizontal") {
    resizableProps = {
      className: "resize-horizontal",
      width: innerWidth * 0.75,
      height: Infinity,
      minConstraints: [innerWidth * 0.2, Infinity],
      maxConstraints: [innerWidth * 0.75, Infinity],
      resizeHandles: ["e"],
    };
  } else {
    resizableProps = {
      width: Infinity,
      height: 300,
      minConstraints: [Infinity, 24],
      maxConstraints: [Infinity, innerHeight * 0.9],
      resizeHandles: ["s"],
    };
  }

  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};
