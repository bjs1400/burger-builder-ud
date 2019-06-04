import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import axios from "axios";
import Input from "../../../components/UI/Input/Input";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: ""
    },
    loading: false
  };

  orderHandler = event => {
    event.preventDefault();
    this.setState({ loading: true }); // initially loading
    const order = {
      ingredients: this.props.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "Brittany",
        address: {
          street: "123 cranbury st",
          zipcode: "10110",
          country: "United States"
        },
        email: "myemail@emailme.com"
      },
      deliveryMethod: "fastest"
    };
    axios
      .post("/orders.json", order)
      .then(res => {
        this.setState({ loading: false, purchasing: false });
      })
      .catch(err => this.setState({ loading: true, purchasing: false }));
  };

  render() {
    return (
      <div>
        <h4> Enter Your Contact Data </h4>
        <form>
          <Input
            inputtype="input"
            type="text"
            name="name"
            placeholder="Your name"
          />
          <Input
            inputtype="input"
            type="email"
            name="email"
            placeholder="Your email"
          />
          <Input
            inputtype="input"
            type="text"
            name="street"
            placeholder="Street"
          />
          <Input
            inputtype="input"
            type="text"
            name="postal"
            placeholder="Postal Code"
          />
          <Button btnType="success" clicked={this.orderHandler}>
            ORDER
          </Button>
        </form>
      </div>
    );
  }
}

export default ContactData;
