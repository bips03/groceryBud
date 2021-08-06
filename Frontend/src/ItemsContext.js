import React, { useState, useEffect, createContext, useContext } from "react";
import { auth } from "./firebase";
const ItemContext = createContext();
export const useItem = () => {
  return useContext(ItemContext);
};

export function ItemsContextProvider({ children }) {
  const [items, setItems] = useState([]);
  const [show, setShow] = useState(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  // when loads get data from file and store to items
  useEffect(() => {
    const getData = async () => {
      const data = await fetch("http://localhost:5000/items");
      const stateData = await data.json();
      setItems(stateData);
    };

    // when the componenet mounts set the user if there already exists
    // a user
    const cleanup = auth.onAuthStateChanged((u) => {
      setUser(u);
      setLoading(false);
    });
    getData();
    return cleanup;
  }, []);

  const signup = (e, p) => {
    return auth.createUserWithEmailAndPassword(e, p);
  };

  const login = (e, p) => {
    return auth.signInWithEmailAndPassword(e, p);
  };

  const signout = () => {
    return auth.signOut();
  };

  const update = (p) => {
    return auth.currentUser.updatePassword(p);
  };
  // !!! CREATE !!!
  // add state
  const addState = async (item) => {
    const res = await fetch("http://localhost:5000/items", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(item),
    });

    // res has the data that has been added

    const data = await res.json();

    setItems([...items, data]);
  };

  // !!!READ!!!
  // fetch data of id

  const getItem = async (id) => {
    const itemGot = await fetch(`http://localhost:5000/items/${id}`);
    const jdata = await itemGot.json();
    return jdata;
  };

  // DELETE
  // delete item
  const onDelete = async (id) => {
    await fetch(`http://localhost:5000/items/${id}`, {
      method: "DELETE",
    });

    setItems(
      items.filter((item) => {
        return item._id !== id;
      })
    );
  };

  // UPDATE
  // change the status of done on double click
  const changeDone = async (id) => {
    const itemToChange = await getItem(id);
    const uData = { ...itemToChange, done: !itemToChange.done };

    const res = await fetch(`http://localhost:5000/items/${id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(uData),
    });

    const newData = await res.json();

    const newState = items.map((item) => {
      return item._id === id ? newData : item;
    });

    setItems(newState);
  };

  // edit item name or quantity
  const editItem = async (id, editedItem) => {
    const res = await fetch(`http://localhost:5000/items/${id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(editedItem),
    });

    const newData = await res.json();

    const newState = items.map((item) => {
      return item._id === id ? newData : item;
    });

    setItems(newState);
  };

  const showAdd = () => {
    setShow(!show);
  };

  const value = {
    items,
    setItems,
    show,
    setShow,
    addState,
    onDelete,
    changeDone,
    editItem,
    showAdd,
    user,
    signup,
    login,
    signout,
    update,
  };
  return (
    !loading && (
      <ItemContext.Provider value={value}>{children}</ItemContext.Provider>
    )
  );
}
