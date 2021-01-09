import React, { useContext, useState } from "react";
import { Form, Button, ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import { updatePetData } from "./api";
import { useParams } from "react-router-dom";
import { myContext } from "./Context";


export default function EditPet() {

    const { pets } = useContext(myContext)
    const petId = useParams();
    let singlePet = {};
    pets.map((pet) => {
      if (pet._id === petId.id) {
        singlePet = pet;
      }
    });

  const [editPetData, setEditPetData] = useState({
    image: "",
    name: "",
    type: "",
    height: 0,
    weight: 0,
    color: "",
    hypoallergenic: false,
    dietaryRestrictions: "",
    breed: "",
    bio: "",
  });

  const handleHypoChange = (event) => {
    if (event === 1) {
      setEditPetData({ ...editPetData, hypoallergenic: true });
    } else {
      setEditPetData({ ...editPetData, hypoallergenic: false });
    }
  };

  const handlePictureChange = (event) => {
    const file = event.target.files[0];
    setEditPetData({ ...editPetData, image: file });
  };

  const handleTypeChange = (event) => {
    if (event === 1) {
      setEditPetData({ ...editPetData, type: "cat" });
    } else {
      setEditPetData({ ...editPetData, type: "dog" });
    }
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    let filteredData = {}
    for  (const key in editPetData){
        if (editPetData[key].length > 0 && editPetData[key] !== 0){
            filteredData[key] = editPetData[key]
        }
    }
    updatePetData(`http://localhost:5000/api/pets/update/:${petId.id}`, filteredData);
  };

  return (
    <div>
      <Form
        className="container mt-5 login-form bg-light"
        onSubmit={(event) => handleOnSubmit(event)}
        action="update"
        method="post"
        encType="multipart/form-data"
      >
        <Form.Group>
          <Form.Label>Pet Image</Form.Label>
          <Form.Control
            type="file"
            placeholder="Upload image"
            controlid="petImage"
            name="image"
            onChange={(event) => handlePictureChange(event)}
          />
        </Form.Group>
        <Form.Group controlId="petName">
          <Form.Label>Pet Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name"
            onChange={(event) =>
              setEditPetData({ ...editPetData, name: event.target.value })
            }
          />
        </Form.Group>
        <Form.Group controlId="petType">
          <Form.Label>Pet Type</Form.Label>
          <ToggleButtonGroup
            type="radio"
            name="petType"
            onChange={(event) => handleTypeChange(event)}
          >
            <ToggleButton value={1}>Cat</ToggleButton>
            <ToggleButton value={2}>Dog</ToggleButton>
          </ToggleButtonGroup>
        </Form.Group>
        <Form.Group controlId="petHeight">
          <Form.Label>Pet Height</Form.Label>
          <Form.Control
            type="number"
            placeholder="Height"
            onChange={(event) =>
              setEditPetData({ ...editPetData, height: event.target.value })
            }
          />
        </Form.Group>
        <Form.Group controlId="petWeight">
          <Form.Label>Pet Weight</Form.Label>
          <Form.Control
            type="number"
            placeholder="weight"
            onChange={(event) =>
              setEditPetData({ ...editPetData, weight: event.target.value })
            }
          />
        </Form.Group>
        <Form.Group controlId="petColor">
          <Form.Label>Pet Color</Form.Label>
          <Form.Control
            type="text"
            placeholder="Color"
            onChange={(event) =>
              setEditPetData({ ...editPetData, color: event.target.value })
            }
          />
        </Form.Group>
        <Form.Group controlId="petHypo">
          <Form.Label>Is Pet Hypoallergenic?</Form.Label>
          <ToggleButtonGroup
            type="radio"
            name="petHypo"
            onChange={(event) => handleHypoChange(event)}
          >
            <ToggleButton value={1}>Yes</ToggleButton>
            <ToggleButton value={2}>No</ToggleButton>
          </ToggleButtonGroup>
        </Form.Group>
        <Form.Group controlId="petDiet">
          <Form.Label>Pet Dietary Restrictions</Form.Label>
          <Form.Control
            type="text"
            placeholder="Diet"
            onChange={(event) =>
              setEditPetData({
                ...editPetData,
                dietaryRestrictions: event.target.value,
              })
            }
          />
        </Form.Group>
        <Form.Group controlId="petBreed">
          <Form.Label>Pet Breed</Form.Label>
          <Form.Control
            type="text"
            placeholder="Breed"
            onChange={(event) =>
              setEditPetData({ ...editPetData, breed: event.target.value })
            }
          />
        </Form.Group>
        <Form.Group controlId="petBio">
          <Form.Label>Pet Bio</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Bio"
            onChange={(event) =>
              setEditPetData({ ...editPetData, bio: event.target.value })
            }
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
