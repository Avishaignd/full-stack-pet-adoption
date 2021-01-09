import { React, useContext } from "react";
import { Card,  Button} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { myContext } from "./Context.js";
import {updatePetStatus} from './api'
import LogOutButton from "./LogOutButton.js";

export default function PetPage() {

  const { pets, currentUser } = useContext(myContext);
  
  const petId = useParams();
  let singlePet = {};
  pets.map((pet) => {
    if (pet._id === petId.id) {
      singlePet = pet;
    }
  });

  const handleOnReturn = () => {
    updatePetStatus(`http://localhost:5000/api/pets/return/${singlePet._id}`,
    {pet: singlePet._id, updateType: "Return"})
    .then(alert(`${singlePet.name} was returned successfully!`))
  }

  const handleOnFoster = () => {
    updatePetStatus(`http://localhost:5000/api/pets/foster/${singlePet._id}`,
    {pet: singlePet._id, user: currentUser._id, updateType: "Foster"} )
    .then(alert(`${singlePet.name} was fostered successfully!`))
  }

  const handleOnAdopt = () => {
    updatePetStatus(`http://localhost:5000/api/pets/adopt/${singlePet._id}`,
    {pet: singlePet._id, user: currentUser._id} )
    .then(alert(`${singlePet.name} was adopted successfully!`))
  }

  const handleOnSave = () => {
    if (singlePet.petStatus === "Saved"){
      updatePetStatus(`http://localhost:5000/api/pets/save/${singlePet._id}`,
    {pet: singlePet._id, user: currentUser._id, updateType: "Unsave"} )
    .then(alert(`${singlePet.name} was removed from your saved pets list successfully!`))
    } else {
      updatePetStatus(`http://localhost:5000/api/pets/save/${singlePet._id}`,
    {pet: singlePet._id, user: currentUser._id, updateType: "Save"} )
    .then(alert(`${singlePet.name} was saved successfully!`))
    }
  }

  return (
    <div>
      <LogOutButton />
      <Card style={{ width: "22rem" }} className="mt-5" id="pet-profile">
        {currentUser && currentUser.isAdmin ? 
        <Card.Link href={`/EditPet/${singlePet._id}`}>
        Edit pet
        </Card.Link>
         : <></>}
        <Card.Img variant="top" src={singlePet.image} id="single-pet-image" className="mt-1" />
        <Card.Body>
          <Card.Header>{singlePet.name}</Card.Header>
          <Card.Title>Pet Description:</Card.Title>
          <Card.Text>
              Height: {singlePet.height}<br/>
              Weight: {singlePet.weight}<br/>
              Status: {singlePet.petStatus}<br/>
              Type: {singlePet.type}<br/>
              Hypoallergenic: {singlePet.hypoallergenic ? "Yes" : "No"}<br/>
              Dietary Restrictions: {singlePet.dietaryRestrictions}<br/>
              Breed: {singlePet.breed}<br/>
              Bio: {singlePet.bio}
          </Card.Text>
        </Card.Body>
        <Button className="pet-card-buttons" 
        disabled={singlePet.petStatus === "Adopted" ? true : false}
         onClick={handleOnAdopt}>
          Adopt pet
        </Button>
        <Button className="pet-card-buttons"
        disabled={singlePet.petStatus === "Fostered" ? true : false}
        onClick={handleOnFoster}>
          Foster pet
        </Button>
        <Button className="pet-card-buttons"
        disabled={singlePet.petStatus === "Saved" ? true : false}
        onClick={handleOnSave}>
          {singlePet.petStatus === "Saved" && currentUser.savedPets.includes(singlePet._id) ?
           "Remove from saved" : "Save pet"}
          </Button>
        <Button className="pet-card-buttons" onClick={handleOnReturn}>
          Return pet
        </Button>
      </Card>
    </div>
  );
}
