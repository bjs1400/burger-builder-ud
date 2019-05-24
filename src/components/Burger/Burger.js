// burger we are rendering to the screen
import React from "react";
import BurgerIngredient from "../Burger/BurgerIngredient/BurgerIngredient";
import { arrayExpression } from "../../../node_modules/@babel/types";

const burger = props => {
  let transformedIngredients = Object.keys(props.ingredients) // returns an array of keys as strings
    .map(igKey => {
      // igKey = "salad", "meat", "bacon", etc.
      return [...Array(props.ingredients[igKey])].map((_, i) => {
        // props.ingredients["salad"] = 1, 2, etc.
        // Array(5) creates an empty array of 5 elements, so we're creating an array equal to the number of our ingredients...
        //...and destructuring it and then mapping that with its i index & then creating the appropriate number of each...
        //...particular ingredient
        return <BurgerIngredient key={igKey + i} type={igKey} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el); //.concat() joins arrays; arr is initial value,
    }, []);
  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients!</p>;
  }
  console.log(Object.keys(props.ingredients)); // returns the number of salads
  return (
    <div className="Burger">
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
