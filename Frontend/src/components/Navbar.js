import React from "react";
import "./Navbar.css";
import { Add, Remove } from "@material-ui/icons";
import { useItem } from "../ItemsContext";
import { useHistory } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import "./Navbar.css";

function Navbar() {
  const { user, signout, show, showAdd } = useItem();
  const history = useHistory();
 

  const signOut = async () => {
    try {
      await signout();
      history.push("/login");
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <header className="header">
      <h2 className="text animate__animated animate__fadeInLeft">
        Grocery Bud
      </h2>

      <button className="btn btn-dark  my-auto me-3 " onClick={showAdd}>
        {show ? <Remove /> : <Add />}
      </button>

      <Dropdown className="my-auto me-3 ">
        <Dropdown.Toggle className="menu-toggle shadow-none">
          {user.displayName && user.displayName}
          {!user.displayName && "Profile"}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item className="text-center menu-item" onClick={signOut}>
            Sign Out
          </Dropdown.Item>

          <Dropdown.Item href="/update" className="text-center menu-item">
            Update
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      
      
    </header>
  );
}

export default Navbar;
