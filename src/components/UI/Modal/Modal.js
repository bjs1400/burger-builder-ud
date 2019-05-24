import React from "react";

import Auxilliary from "../../../hoc/Auxilliary";
import Backdrop from "../Backdrop/Backdrop";

const modal = props => (
  <Auxilliary>
    <Backdrop show={props.show} clicked={props.modalClosed} />
    <div
      className="Modal"
      style={{
        transform: props.show ? "translateY(0)" : "translateY(-100)",
        opacity: props.show ? "1" : "0"
      }}
    >
      {props.children}
    </div>
  </Auxilliary>
);

export default modal;
