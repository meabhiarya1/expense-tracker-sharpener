import React, { useContext, useRef } from "react";
import { Button, Form } from "react-bootstrap";

import classes from "./LoginForm.module.css";

const ForgotPassForm = (props) => {
  const emailInputRef = useRef();
//   const authCtx = useContext(AuthContext);

  const submitHandler = async e => {
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value;

    try {
        const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAN3tXGAn9QdrcrvtE2RTIwHkKbiEq8yxE',{
            method: 'POST',
            body: JSON.stringify({
                requestType: "PASSWORD_RESET",
                email: enteredEmail
            })
        })
        alert('Reset mail sent.')
        props.onReset();
    } catch(error) {
        alert(error);
    }
  }

  return (
    <div className={classes.forgotPass}>
      <h1>Forgot Password</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="email"
            placeholder="Enter email"
            ref={emailInputRef}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={submitHandler}>
          Reset
        </Button>
      </Form>
    </div>
  );
};

export default ForgotPassForm;