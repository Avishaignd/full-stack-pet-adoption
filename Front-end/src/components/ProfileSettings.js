import React, { useContext, useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { updateUser, postData, getData } from "./api";
import { myContext } from "./Context";
import LogOutButton from "./LogOutButton";

export default function ProfileSettings() {
  // console.log(user);
  const [updateInfo, setUpdateInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    bio: ''
  });

  const {currentUser} = useContext(myContext)

  useEffect(() => {
    getData('http://localhost:5000/api/users/')
  }, [])

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    updateUser(`http://localhost:5000/api/users/${currentUser._id}`, {
      data: updateInfo,
    });
  };
  return (
      <div>
        <LogOutButton />
        {currentUser ? 
        <Form
        className="container"
        id="user-form"
        onSubmit={(event) => handleOnSubmit(event)}
      >
        <Form.Group id="first-name">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" placeholder={currentUser.firstName} 
          onChange={event => setUpdateInfo({...updateInfo, firstName: event.target.value})} required />
        </Form.Group>
        <Form.Group id="last-name">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" placeholder={currentUser.lastName}
          onChange={event => setUpdateInfo({...updateInfo, lastName: event.target.value})} required />
        </Form.Group>
        <Form.Group id="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder={currentUser.email}
          onChange={event => setUpdateInfo({...updateInfo, email: event.target.value})} required />
        </Form.Group>
        <Form.Group id="phone">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control type="number" placeholder={currentUser.phoneNumber}
          onChange={event => setUpdateInfo({...updateInfo, phoneNumber: event.target.value})} required />
        </Form.Group>
        <Form.Group id="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" onChange={event => setUpdateInfo({...updateInfo, password: event.target.value})} required/>
        </Form.Group>
        <Form.Group id="bio">
          <Form.Label>Tell us about yourself:</Form.Label>
          <Form.Control as="textarea" placeholder={currentUser.bio}
          onChange={event => setUpdateInfo({...updateInfo, bio: event.target.value})} />
        </Form.Group>
        <Button className="w-100" type="submit">
          Save
        </Button>
      </Form> 
      : <Alert variant="danger" id="must-be-logged-in">You must be logged in to access this content</Alert>}
      </div>
  );
}
