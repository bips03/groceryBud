import React, { useRef, useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import { Link, Redirect, useHistory } from "react-router-dom";
import { useItem } from "../ItemsContext";

function Login() {
  const { user,login } = useItem();
  const [btnDisable, setBtnDisable] = useState(false);
  const [error, setError] = useState("");
  const history = useHistory();
  const email = useRef();
  const pw = useRef();

  if (user) {
    return <Redirect to="/" />;
  }
  const loginUser = async (event) => {
    setError("");

    event.preventDefault();

    try {
      setBtnDisable(true);
      await login(email.current.value, pw.current.value);
      history.push("/");
    } catch (error) {
      setError(error.message);
    }

    setBtnDisable(false);
  };


  return (
    <>
      {error && <Alert variant="danger">{error}</Alert>}
      <h2 className="w-100 text-center"> Login </h2>
      <Form onSubmit={loginUser}>
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
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </div>
      <div className="mt-1 text-center w-100 ">
        Forgot Password? <Link to="/reset">Reset Password</Link>
      </div>
    </>
  );
}

export default Login;
