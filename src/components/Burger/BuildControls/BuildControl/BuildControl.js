import React from "react";

// represents each ingredient line on the control box

//if the ingredient is at zero or less, the less button gets disabled
const buildControl = props => (
  <div className="BuildControl">
    <div className="Label">{props.label}</div>
    <button className="Less" onClick={props.removed} disabled={props.disabled}>
      Less
    </button>
    <button className="More" onClick={props.added}>
      More
    </button>
  </div>
);

export default buildControl;
