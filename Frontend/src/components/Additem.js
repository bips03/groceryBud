import React from "react";
import { useState } from "react";
import "./Additem.css";
import { TextField } from "@material-ui/core";
import { useItem } from "../ItemsContext";
import { Form,Button } from "react-bootstrap";

function Additem() {
  const { show, setShow, addState } = useItem();
  const [item, setItem] = useState({
    name: "",
    qty: ""
  });

  const changeItem = (e) => {
    let newObj = {
      ...item,
      [e.target.name]: e.target.value,
    };

    setItem(newObj);
  };

  const sendState = (e) => {
    e.preventDefault();

    if (!item.name) {
      alert("Add item");
    }

    addState(item);

    setItem({ name: "", qty: "" });
    setShow(false)
  };

  return show ? (
    <div className="add-item">
      <Form className="add-form" onSubmit={sendState}>
        <TextField
          variant="outlined"
          placeholder="Name"
          value={item.name}
          onChange={changeItem}
          name="name"
          margin="normal"
          fullWidth
          required
          style={{ marginBottom: "15px" }}
        />

        <TextField
          variant="outlined"
          placeholder="Quantity"
          value={item.qty}
          onChange={changeItem}
          name="qty"
          style={{ marginBottom: "15px" }}
          fullWidth
          required
        />

        <Button type="submit" className="btn btn-dark w-100 mx-auto">
          Submit
        </Button>
      </Form>
    </div>
  ) : null;
}

export default Additem;
