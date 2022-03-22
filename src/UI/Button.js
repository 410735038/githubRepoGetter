import React from "react";
import classes from './Button.module.css';
export default function Button(props) {
  return (
    <button className={classes.button} type={props.type} onClick={props.click}>
      {props.children}
    </button>
  );
}
