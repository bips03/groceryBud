import React, { useRef, useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useItem } from "../ItemsContext";

function Update() {
  const { update } = useItem();
  const [btnDisable, setBtnDisable] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const pw = useRef();
  const pwConf = useRef()

  const updateUser = async (event) => {
    setError("");
    setSuccess("");

    event.preventDefault();

    if(pw.current.value !== pwConf.current.value){
        setError('Password do not match')
        return;
    }

    try {
      setBtnDisable(true);
      await update(pw.current.value);
      setSuccess("Update successful");
    } catch (error) {
      setError(error.message);
    }

    setBtnDisable(false);
  };

  return (
    <>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <h2 className="w-100 text-center"> Update Account </h2>
      <Form onSubmit={updateUser}>
        <Form.Group id="password" className="mt-2 text-start">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" ref={pw} required />
        </Form.Group>
        <Form.Group id="confirmPw" className="mt-2 text-start">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" ref={pwConf} required />
        </Form.Group>
        <Button
          disabled={btnDisable}
          className="w-100 mt-4 btn-dark"
          type="submit"
        >
          Create Account
        </Button>
        <Link to='/' className="w-100 mt-2 btn btn-dark">Go Back</Link>
      </Form>
    </>
  );
}

export default Update;
