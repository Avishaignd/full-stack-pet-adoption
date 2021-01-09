import React, { useState } from "react";
import { Form, Button, ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import { postData } from "./api";
export default function AddPet() {
  const [addPetData, setAddPetData] = useState({
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
      setAddPetData({ ...addPetData, hypoallergenic: true });
    } else {
      setAddPetData({ ...addPetData, hypoallergenic: false });
    }
  };

  const handlePictureChange = (event) => {
    const file = event.target.files[0];
    setAddPetData({ ...addPetData, image: file });
  };

  const handleTypeChange = (event) => {
    if (event === 1) {
      setAddPetData({ ...addPetData, type: "cat" });
    } else {
      setAddPetData({ ...addPetData, type: "dog" });
    }
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', addPetData.name)
    formData.append('weight', addPetData.weight)
    formData.append('height', addPetData.height)
    formData.append('color', addPetData.color)
    formData.append('breed', addPetData.breed)
    formData.append('type', addPetData.type)
    formData.append('hypoallergenic', addPetData.hypoallergenic)
    formData.append('dietaryRestrictions', addPetData.dietaryRestrictions)
    formData.append('breed', addPetData.breed)
    formData.append('bio', addPetData.bio)
    formData.append('petStatus', 'Not Adopted')
    formData.append('ownerId', undefined)
    formData.append('image', addPetData.image)
    postData("http://localhost:5000/AddPet", formData);
  };

  return (
    <div>
      <Form
        className="container mt-5 login-form bg-light"
        onSubmit={(event) => handleOnSubmit(event)}
        action="AddPet"
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
              setAddPetData({ ...addPetData, name: event.target.value })
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
              setAddPetData({ ...addPetData, height: event.target.value })
            }
          />
        </Form.Group>
        <Form.Group controlId="petWeight">
          <Form.Label>Pet Weight</Form.Label>
          <Form.Control
            type="number"
            placeholder="weight"
            onChange={(event) =>
              setAddPetData({ ...addPetData, weight: event.target.value })
            }
          />
        </Form.Group>
        <Form.Group controlId="petColor">
          <Form.Label>Pet Color</Form.Label>
          <Form.Control
            type="text"
            placeholder="Color"
            onChange={(event) =>
              setAddPetData({ ...addPetData, color: event.target.value })
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
              setAddPetData({
                ...addPetData,
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
              setAddPetData({ ...addPetData, breed: event.target.value })
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
              setAddPetData({ ...addPetData, bio: event.target.value })
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
