import React, { useEffect, useRef } from "react";
import { Button, Form } from "react-bootstrap";
import classes from "./UpdateProfileForm.module.css";

const UpdateProfileForm = (props) => {
  const formRef = useRef();
  let emailInputRef = useRef();
  let nameInputRef = useRef();
  const contactInputRef = useRef();
  const locationInputRef = useRef();
  // console.log(props.user)
  useEffect(()=> {
    if (props.user) {
        if(props.user.displayName){
            nameInputRef.current.value = props.user.displayName;
        }
        emailInputRef.current.value = props.user.email;
      }
  },[props.user])
  // nameInputRef = props.user.displayName;

    const clickUpdateHandler = async (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredContact = contactInputRef.current.value;
    const enteredLocation = locationInputRef.current.value;
    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAN3tXGAn9QdrcrvtE2RTIwHkKbiEq8yxE",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: localStorage["user"],
            displayName: enteredName,
            contact: enteredContact,
            location: enteredLocation,
            returnSecureToken: true,
          }),
          headers: {
            "content-type": "application/json",
          },
        }
      );
      const upData = await res.json();
      if (res.ok) {
        alert("Profile Updated");
        props.update()
        nameInputRef.current.value = props.user.displayName;
        emailInputRef.current.value = props.user.email;

      } else {
        throw new Error("Upadation failed!. Please try again.");
      }
      formRef.current.reset();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <section className={classes.updateForm}>
      <h1>Update profile</h1>
      <Form ref={formRef}>
      <Form.Group className={classes["mb-3"]}>
          <Form.Label className={classes.label}>Email</Form.Label>
          <Form.Control placeholder="Email" ref={emailInputRef} />
        </Form.Group>
        <Form.Group className={classes["mb-3"]}>
          <Form.Label className={classes.label}>Full Name:</Form.Label>
          <Form.Control placeholder="Full Name" ref={nameInputRef} />
        </Form.Group>
        <Form.Group className={classes["mb-3"]}>
          <Form.Label className={classes.label}>Contact No.:</Form.Label>
          <Form.Control placeholder="Contact No." ref={contactInputRef} />
        </Form.Group>
        <Form.Group className={classes["mb-3"]}>
          <Form.Label className={classes.label}>Location: </Form.Label>
          <Form.Control placeholder="Location" ref={locationInputRef} />
        </Form.Group>
        <Button type="submit" onClick={clickUpdateHandler}>
          Update
        </Button>
      </Form>
    </section>
  );
};

export default UpdateProfileForm;
