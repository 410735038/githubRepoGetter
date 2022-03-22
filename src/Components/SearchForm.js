import React from "react";
import Button from "../UI/Button.js";
import InputText from "../UI/InputText.js";
export default function SearchForm(props) {

  return (
    <form onSubmit={props.submit} style={{display: "flex"}}>
      <InputText type="text"></InputText>
      <Button type="submit" click={props.click}>
        Search
      </Button>
    </form>
  );
}
