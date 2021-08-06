import React, { useRef, useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useItem } from "../ItemsContext";

function Signup() {
  const { signup } = useItem();
  const [btnDisable, setBtnDisable] = useState(false);
  const [error, setError] = useState("");

  const history = useHistory();

  const email = useRef();
  const pw = useRef();

  const submitUser = async (event) => {
    setError("");

    event.preventDefault();

    try {
      setBtnDisable(true);
      await signup(email.current.value, pw.current.value);
      history.push("/");
    } catch (error) {
      setError(error.message);
    }

    setBtnDisable(false);
  };

  return (
    <>
      {error && <Alert variant="danger">{error}</Alert>}
      <h2 className="w-100 text-center"> Sign Up </h2>
      <Form onSubmit={submitUser}>
        <Form.Group id="email" className="mt-2 text-start">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" ref={email} required />
        </Form.Group>
        <Form.Group id="password" className="mt-2 text-start">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" ref={pw} required />
        </Form.Group>
        <Button disabled={btnDisable} className="w-100 mt-4 btn-dark" type="submit">
          Create Account
        </Button>
      </Form>

      <div className="mt-4 text-center w-100 ">
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </>
  );
}

export default Signup;
