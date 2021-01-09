import React, { useContext, useState } from "react";
import {Form, Button, ToggleButtonGroup, ToggleButton, FormGroup, Collapse,} from "react-bootstrap";
import { myContext } from "./Context";
import LogOutButton from "./LogOutButton";
import PetCard from "./PetCard";
import SearchResults from "./SearchResults";


export default function Search() {
  const [dogsOrCats, setDogsOrCats] = useState("dogs");
  const [searchText, setSearchText] = useState({
    name: "",
    weight: 0,
    height: 0,
    petStatus: "",
    type: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [searchedPets, setSearchedPets] = useState([]);
  const {pets} = useContext(myContext);

  function handleDogs() {
    setDogsOrCats("dogs");
  }
  function handleCats() {
    setDogsOrCats("cats");
  }

  const onSearchSubmit = (event) => {
    event.preventDefault();
    let petArray = [];
    pets.map((pet) => {
      for (const key in searchText) {
        for (const prop in pet) {
          if (key === prop && searchText[key] === pet[prop]) {
            if (!petArray.includes(pet)){
              petArray.push(pet);
            }
          }
        }
      }
    });
    setSearchedPets(petArray);

    setSearchText({ name: "", weight: 0, height: 0, petStatus: "", type: "" });
  };

  return (
    <div>
      <LogOutButton />
      <ToggleButtonGroup className="mt-5 d-flex" type="radio" name="lists">
        <ToggleButton value={1} onClick={handleDogs} className="flex-grow-0">
          Dogs
        </ToggleButton>
        <ToggleButton value={2} onClick={handleCats} className="flex-grow-0">
          Cats
        </ToggleButton>
        <Button
          className="flex-grow-0"
          onClick={() => setIsOpen(!isOpen)}
          variant="secondary"
          aria-controls="example-collapse-text"
          aria-expanded={isOpen}
        >
          Advanced Search
        </Button>
      </ToggleButtonGroup>
      <Collapse in={isOpen}>
        <Form onSubmit={(event) => onSearchSubmit(event)}>
          <FormGroup className="d-flex">
            <Form.Control
              type="text"
              placeholder="Pet Name"
              onChange={(event) =>
                setSearchText({ ...searchText, name: event.target.value })
              }
            />
            <Form.Control
              type="number"
              placeholder="Pet Weight"
              onChange={(event) =>
                setSearchText({ ...searchText, weight: event.target.value })
              }
            />
            <Form.Control
              type="number"
              placeholder="Pet Height"
              onChange={(event) =>
                setSearchText({ ...searchText, height: event.target.value })
              }
            />
            <Form.Control
              type="text"
              placeholder="Pet Status"
              onChange={(event) =>
                setSearchText({ ...searchText, petStatus: event.target.value })
              }
            />
            <Form.Control
              type="text"
              placeholder="Pet Type"
              onChange={(event) =>
                setSearchText({ ...searchText, type: event.target.value })
              }
            />
            <Button type="submit">Submit</Button>
          </FormGroup>
        </Form>
      </Collapse>
      {isOpen ? (
        <><SearchResults props={searchedPets} /> </>
      ) : (
        <ul className="card-list">
          {dogsOrCats === "dogs"
            ? pets.map((pet) => {
                if (pet.type === "dog") {
                  return (
                    <li key={Math.random()}>
                      <PetCard pet={pet} />
                    </li>
                  );
                }
              })
            : pets.map((pet) => {
                if (pet.type === "cat") {
                  return (
                    <li key={Math.random()}>
                      <PetCard pet={pet} />
                    </li>
                  );
                }
              })}
        </ul>
      )}
    </div>
  );
}
