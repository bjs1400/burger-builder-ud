import React from "react";

import burgerLogo from "../../assets/images/burger-logo.png";

const Logo = props => (
  <div className="Logo" style={{ height: props.height }}>
    <img src={burgerLogo} alt="My Burger" />
  </div>
);

export default Logo;
