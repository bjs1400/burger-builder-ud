import React, { Component } from "react";

import Modal from "../../components/UI/Modal/Modal";
import Auxilliary from "../Auxilliary";

const withErrorHandler = (WrappedComponent, axios) => {
  // hoc have access to children's props...?
  return class extends Component {
    state = {
      error: null
    };

    componentDidMount() {
      axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });
      axios.interceptors.response.use(
        res => res, // return response
        error => {
          this.setState({ error });
        }
      );
    }
    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };

    render() {
      // there will be a message property on the error message returned by firebase =-)
      return (
        // return our modal and our component w/ whose props???
        <Auxilliary>
          <Modal
            modalClosed={this.errorConfirmedHandler}
            show={this.state.error}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Auxilliary>
      );
    }
  };
};

export default withErrorHandler;
