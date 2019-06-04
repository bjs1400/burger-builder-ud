import React from "react";
import { NavLink } from "react-router-dom";

const navigationItem = props => (
  <li className="NavigationItem">
    <NavLink exact to={props.link} activeClassName="active">
      {props.children}
    </NavLink>
  </li>
);

export default navigationItem;
