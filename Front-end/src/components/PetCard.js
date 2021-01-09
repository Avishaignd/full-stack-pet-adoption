import {React} from "react";
import {Card} from "react-bootstrap";
import { Link } from "react-router-dom";

export default function PetCard(props) {

  return (
    <div>
      <Card style={{ width: "18rem" }} id="pet-card">
        <Card.Img variant="top" id="pet-image" src={props.pet.image} />
        <Card.Body>
          <Card.Title>{props.pet.name}</Card.Title>
          <Card.Text>
            {props.pet.petStatus}
          </Card.Text>
        </Card.Body>
        <Card.Link href={`/PetPage/${props.pet._id}`}>
        See More
        </Card.Link>
      </Card>
    </div>
  );
}
