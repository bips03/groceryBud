import React, {useState} from "react";
import "./Navbar.css";
import { Add, Remove } from "@material-ui/icons";
import { useItem } from "../ItemsContext";
import { useHistory } from "react-router-dom";

function Navbar() {
  const { signout, show, showAdd } = useItem()
  const [disabled, setDisabled] = useState(false)
  const history = useHistory()

  const signOut = async () => {
    setDisabled(true)
    try {
      await signout()
      history.push('/login')
    } catch (error) {
      console.log(error)
    }
    setDisabled(false)
  }
 
  return (
    <header className="header">
      <h2 className="text animate__animated animate__fadeInLeft">
        Grocery Bud
      </h2>

      <button className="btn btn-dark  my-auto me-3 " onClick={showAdd}>
        {show ? <Remove /> : <Add />}
      </button>
      <button disabled={disabled} className="btn btn-dark me-3 " onClick={signOut}>
        Sign out
      </button>
    </header>
  );
}

export default Navbar;
