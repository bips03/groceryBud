import React, { useRef, useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { useItem } from "../ItemsContext";

function Reset() {
  const { user, reset } = useItem();
  const [btnDisable, setBtnDisable] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const email = useRef();
  
  if(user){
    return <Redirect to='/' />
  }

  const updateUser = async (event) => {
    setError("");
    setSuccess("");

    event.preventDefault();

   

    try {
      setBtnDisable(true);
      await reset(email.current.value);
      setSuccess("Check Email for further instructions");
    } catch (error) {
      setError(error.message);
    }

    setBtnDisable(false);
  };

  return (
    <>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <h2 className="w-100 text-center"> Reset Password </h2>
      <Form onSubmit={updateUser}>
        <Form.Group id="email" className="mt-2 text-start">
          <Form.Label>Enter Email</Form.Label>
          <Form.Control type="email" ref={email} required />
        </Form.Group>
       
        <Button
          disabled={btnDisable}
          className="w-100 mt-4 btn-dark"
          type="submit"
        >
          Reset Password
        </Button>
        <Link to='/login' className="w-100 mt-2 btn btn-dark">Go Back</Link>
      </Form>
    </>
  );
}

export default Reset;