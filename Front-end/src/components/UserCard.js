import React from "react";
import { Card, Button } from "react-bootstrap";

export default function UserCard(props) {

  return (
    <div>
      <Card style={{ width: "16.5rem" }} id="user-card">
        <Card.Body>
          <Card.Title>{props.user.firstName + " " + props.user.lastName}</Card.Title>
          <Card.Text>
              Email: {props.user.email}<br/>
              Phone Number: {props.user.phoneNumber}<br/>
              User ID: {props.user._id}<br/>
              {props.user.isAdmin ? "Admin" : "Not an Admin"}
          </Card.Text>
          <Button onClick={() => props.setPets(props.user._id)}>Show pets</Button>
        </Card.Body>
      </Card>
    </div>
  );
}
