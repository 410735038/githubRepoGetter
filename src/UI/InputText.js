import React from "react";
import classes from "./InputText.module.css";
export default function InputText(props) {
  return <input id="input_text" type={props.type} placeholder={"Search github user, Default User is github"}></input>;
}
