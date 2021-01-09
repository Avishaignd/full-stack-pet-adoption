import React from "react";
import { Card, ListGroup, ListGroupItem, Button } from "react-bootstrap";

export default function MoreInfo(props) {

  return (
    <div>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={props.props.pet.image} />
        <Card.Body>
            <Button>Adopt pet</Button>
            <Button>Foster pet</Button>
          <Card.Title>{props.props.pet.name}</Card.Title>
          <Card.Text>Pet Description:</Card.Text>
            <ListGroup>
              <ListGroupItem>Height: {props.props.pet.height} </ListGroupItem>
              <ListGroupItem>Weight: {props.props.pet.weight} </ListGroupItem>
              <ListGroupItem>Type: {props.props.pet.type} </ListGroupItem>
              <ListGroupItem>Color: {props.props.pet.color}</ListGroupItem>
              <ListGroupItem>Hypoallergenic: {props.props.pet.hypoallergenic ? "Yes" : "No"}</ListGroupItem>
              <ListGroupItem>Dietary Restrictions: {props.props.pet.dietaryRestrictions}</ListGroupItem>
              <ListGroupItem>Breed: {props.props.pet.breed}</ListGroupItem>
            </ListGroup>
            <Button>Return pet</Button>
            <Button>Save pet</Button>
        </Card.Body>
      </Card>
    </div>
  );
}
