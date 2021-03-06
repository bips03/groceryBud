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

  useEffect(() => {
    // when the componenet mounts set the user if there already exists
    // a user
    const cleanup = auth.onAuthStateChanged((u) => {
      setUser(u);
      setLoading(false);
    });

    const getData = async () => {
      const data = await fetch(`https://grocerybud.herokuapp.com/items/${user.uid}`);
      const stateData = await data.json();
      setItems(stateData);
    };

    user && user.uid && getData();
    return cleanup;
  }, [user]);

  const signup = (e, p) => {
    return auth.createUserWithEmailAndPassword(e, p);
  };

  const login = (e, p) => {
    return auth.signInWithEmailAndPassword(e, p);
  };

  const signout = () => {
    return auth.signOut();
  };

  const updatePassword = (p) => {
    return auth.currentUser.updatePassword(p);
  };

  const updateProfile = (name) => {
    return auth.currentUser.updateProfile({
      displayName : name
    })
  }

  const reset = (e) => {
    return auth.sendPasswordResetEmail(e);
  };
  // !!! CREATE !!!
  // add state
  const addState = async (item) => {
    const res = await fetch(`https://grocerybud.herokuapp.com/items/${user.uid}`, {
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
    const itemGot = await fetch(`https://grocerybud.herokuapp.com/items/${user.uid}/${id}`);
    const jdata = await itemGot.json();
    return jdata;
  };

  // DELETE
  // delete item
  const onDelete = async (id) => {

    await fetch(`https://grocerybud.herokuapp.com/items/${user.uid}/${id}`, {
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

    const res = await fetch(`https://grocerybud.herokuapp.com/items/${user.uid}/${id}`, {
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
    const res = await fetch(`https://grocerybud.herokuapp.com/items/${user.uid}/${id}`, {
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
    updatePassword,
    updateProfile,
    reset
  };
  return (
    !loading && (
      <ItemContext.Provider value={value}>{children}</ItemContext.Provider>
    )
  );
}
