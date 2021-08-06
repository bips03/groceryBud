import React from "react";
import { useState } from "react";
import {
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  TextField,
} from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import "./Item.css";
import { useItem } from "../ItemsContext";

function Item({ item }) {
  // state for dialog box to update
  const [form, setForm] = useState(false);

  // state for updated item to update if needed
  const [newItem, setNewItem] = useState({
    name: "",
    qty: "",
    done: false
  });

  const { onDelete , changeDone, editItem } = useItem()
  // function to update the state with text field

  const updateItem = (e) => {
    let newObj = {
      ...newItem,
      [e.target.name]: e.target.value,
    };

    setNewItem(newObj);
  };

  // function to send the new item details to app.js for updating in data and item state as a whole
  const sendItem = (e) => {
    // I am updating the newItem based on null or not
    const keys = Object.keys(newItem)
    keys.forEach( (key) => {
      newItem[key] = (newItem[key]==='')? item[key] : newItem[key]
    })

    // we have our edited newItem which is ready for update
    editItem(item._id,newItem)
    setNewItem({ name: "", qty: "", done: false });
    dialogBox();
  };
  const dialogBox = (e) => {
    setForm(!form);
  };

  return (
    // div for item as a whole
    <div
      className={item.done === true ? "item itemOn" : "item"}
      onDoubleClick={() => changeDone(item._id)}
    >
      {/* div for displaying details */}
      
      <div className='itemText'>
      <h4 style={{margin : '0px'}}>{item.name} </h4>
        <p style={{margin:'2px 0px'}}><strong> Quantity : {item.qty} </strong></p>
      </div>
      

      {/* div for displaying buttons on the right of each item */}
      <div>
        <IconButton style={{ margin: "5px auto" }} onClick={dialogBox}>
          <Edit fontSize="small" style={{ color: "#063251" }} />
        </IconButton>

        <Dialog open={form} onClose={dialogBox}>
          <DialogTitle>Enter Details</DialogTitle>
          <DialogContent>
            <p>Do not enter details which do not need to be updated</p>

            <TextField
              variant="outlined"
              placeholder="Name"
              name="name"
              margin="normal"
              onChange={updateItem}
              fullWidth
              style={{ marginBottom: "15px" }}
            />
            <TextField
              variant="outlined"
              placeholder="Quantity"
              name="qty"
              margin="normal"
              onChange={updateItem}
              fullWidth
              style={{ marginBottom: "15px" }}
            />
          </DialogContent>

          <DialogActions>
            <button className="dialog_btn" onClick={sendItem}>
              Submit
            </button>

            <button className="dialog_btn" onClick={dialogBox}>
              Cancel
            </button>
          </DialogActions>
        </Dialog>

        <IconButton
          style={{ margin: "5px auto" }}
          onClick={() => onDelete(item._id)}
        >
          <Delete fontSize="small" style={{ color: "#063251" }} />
        </IconButton>
      </div>
    </div>
  );
}

export default Item;
