import React, {useState} from "react";
import {Form, Button, Card} from "react-bootstrap"
import {Link} from 'react-router-dom'
import {postSignUp} from './api'

export default function SignUp() {

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConf, setPasswordConf] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")

  function handleOnSubmit(event){
    event.preventDefault()
    if (passwordConf === password){
      const newUser = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
        password: password,
        isAdmin: false
      }
      console.log(newUser);
      postSignUp("http://localhost:5000/api/users/", newUser)
    } else {
      console.log("Passwords do not match");
    }
  }

  return (
    <div id="sign-up-form">
      <>
        <Card className="d-flex align-items-center justify-self-center">
          <Card.Body>
            <h3 className="text-center">Sign Up</h3>
            <Form onSubmit={(event) => handleOnSubmit(event)}>
            <Form.Group id="first-name">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" required onChange={(event) => setFirstName(event.target.value)}/>
              </Form.Group>
              <Form.Group id="last-name">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" required onChange={(event) => setLastName(event.target.value)}/>
              </Form.Group>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" required onChange={(event) => setEmail(event.target.value)}/>
              </Form.Group>
              <Form.Group id="phone">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control type="number" required onChange={(event) => setPhoneNumber(event.target.value)}/>
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" required onChange={(event) => setPassword(event.target.value)}/>
              </Form.Group>
              <Form.Group id="password-confirm">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control
                  type="password"
                  required
                  onChange={(event) => setPasswordConf(event.target.value)}
                />
              </Form.Group>
              <Button className="w-100" type="submit">
                Sign Up
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center">
          Already have an account? <Link to="/Login">Login</Link>
        </div>
      </>
    </div>
  );
}
