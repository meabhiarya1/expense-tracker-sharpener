import React, { useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import classes from "./SignupForm.module.css";

const SignupForm = (props) => {
  const formRef = useRef();
  const emailInputRef = useRef();
  const passInputRef = useRef();
  const conPassInputRef = useRef();

  const [isLoading, setIsLoading] = useState(false);
  const [varifyMail, setVarifymail] = useState(false);

  const submitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const enteredEmail = emailInputRef.current.value;
    const enteredPass = passInputRef.current.value;
    const enteredConPass = conPassInputRef.current.value;

    if (enteredPass !== enteredConPass) {
      alert("Password not matched with Confirm password.");
    }
    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAN3tXGAn9QdrcrvtE2RTIwHkKbiEq8yxE",
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPass,
            returnSecureToken: true,
          }),
          headers: {
            "content-type": "application/json",
          },
        }
      );
      const data = await res.json();
        console.log(data);
      //   alert("Click Ok for email verification.");
      if (res.ok) {
        try {
          const response = await fetch(
            "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAN3tXGAn9QdrcrvtE2RTIwHkKbiEq8yxE",
            {
              method: "POST",
              body: JSON.stringify({
                requestType: "VERIFY_EMAIL",
                idToken: data.idToken,
              }),
              headers: {
                "content-type": "application/json",
              },
            }
          );
          if(response.ok){
            setIsLoading(false);
            alert("Verification email sent.");
            setVarifymail(true);
            setTimeout(() => {
                setVarifymail(false)
            },10000)
          } else {
              throw new Error ('Sign Up failed. Try again.')
          }
        } catch (error) {
          alert(error)
        }
      } else {
        throw Error("Authentication Failed");
      }
    } catch (error) {
      alert(error);
      setIsLoading(false);
    }
    formRef.current.reset();
  };

  return (
    <div className={classes.signup}>
      <h1>Sign Up</h1>
      <Form ref={formRef}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            ref={emailInputRef}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password(Not less than 6)"
            ref={passInputRef}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            ref={conPassInputRef}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={submitHandler}>
          {!isLoading ? 'Sign up' : 'Sending request...'}
        </Button>
        {varifyMail && (
          <p style={{ margin: "1rem", color: "green" }}>
            Please varify email. Verfication mail already sent.
          </p>
        )}
      </Form>
    </div>
  );
};

export default SignupForm;
