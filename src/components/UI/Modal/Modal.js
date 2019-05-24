import React from "react";

const modal = props => (
  <div
    className="Modal"
    style={{
      transform: props.show ? "translateY(0)" : "translateY(-100)",
      opacity: props.show ? "1" : "0"
    }}
  >
    {props.children}
  </div>
);

export default modal;
