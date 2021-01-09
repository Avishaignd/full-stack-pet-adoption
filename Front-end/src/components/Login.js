import React, {useState} from "react";
import { Button, Form} from "react-bootstrap";
import { postLogin } from "./api";

export default function Login() {

  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')

  const handleOnSubmit = (event) => {
    event.preventDefault()
    const loginObj = {email: userEmail, password: userPassword}
    postLogin("http://localhost:5000/api/users/login", loginObj, {withCredentials: true})
    
  }

  return (
    <Form className="container mt-5 login-form bg-light" onSubmit={(event) => handleOnSubmit(event)}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={event => setUserEmail(event.target.value)}/>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={event => setUserPassword(event.target.value)}/>
      </Form.Group>
      <Form.Group controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
