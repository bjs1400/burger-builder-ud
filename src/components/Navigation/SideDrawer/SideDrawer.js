import React from "react";

import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import navigationItems from "../NavigationItems/NavigationItems";

const sideDrawer = props => {
  //
  return (
    <div className="SideDrawer">
      <Logo />
      <nav>
        <navigationItems />
      </nav>
    </div>
  );
};

export default sideDrawer;
