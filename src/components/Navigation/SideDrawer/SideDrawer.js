import React from "react";

import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Auxilliary from "../../../hoc/Auxilliary";

const sideDrawer = props => {
  //...
  return (
    <Auxilliary>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className="SideDrawer">
        <Logo height="11%" />
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Auxilliary>
  );
};

export default sideDrawer;
