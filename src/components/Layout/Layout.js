import React from "react";

import Auxilliary from "../../hoc/Auxilliary"; // higher order component
import classes from "./Layout.css";

const layout = props => (
  <Auxilliary>
    <div>Toolbar, SideDrawer, Backdrop</div>
    <main className="content">{props.children}</main>
  </Auxilliary>
);

export default layout;
