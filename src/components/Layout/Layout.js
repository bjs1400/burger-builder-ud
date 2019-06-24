import React, { Component } from "react";
import { connect } from 'react-redux';

import Auxilliary from "../../hoc/Auxilliary"; // higher order component
import classes from "./Layout.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    showSideDrawer: true
  };

  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  const mapStateToProps = (state) => {
    return {
      isAuthenticated: state.auth.token !== null
    }
  };

  render() {
    return (
      <Auxilliary>
        <Toolbar isAuth={this.props.isAuthenticated}/>
        <SideDrawer
          isAuth={this.props.isAuthenticated}
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
        />
        <main className="content">{this.props.children}</main>
      </Auxilliary>
    );
  }
}

export default connect(mapStateToProps)(Layout);
