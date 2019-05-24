import React from "react";

import Auxilliary from "../../hoc/Auxilliary"; // higher order component
import classes from "./Layout.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

const layout = props => (
  <Auxilliary>
    <Toolbar />
    <SideDrawer />
    <main className="content">{props.children}</main>
  </Auxilliary>
);

export default layout;
