import React from "react";
import { Spin } from "antd";

const FirstLoad = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "grid",
        placeItems: "center",
        transform: "scale(2)",
      }}
    >
      <Spin size="large" />
    </div>
  );
};

export default FirstLoad;
