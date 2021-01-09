import React, { useContext, useState } from "react";
import { ToggleButtonGroup, ToggleButton, Modal } from "react-bootstrap";
import { myContext } from "./Context";
import PetCard from "./PetCard";
import UserCard from "./UserCard";

export default function AdminDashboard() {
  const [usersOrPets, setUsersOrPets] = useState("users");
  const [chosenUser, setChosenUser] = useState(undefined)
  const {users, pets} = useContext(myContext);

  const setPets = (id) => {
    setChosenUser(id)
  }

  function handlePets() {
    setUsersOrPets("pets");
  }

  function handleUsers() {
    setUsersOrPets("users");
  }
  return (
    <div>
      <ToggleButtonGroup className="mt-1 d-flex" type="radio" name="lists">
        <ToggleButton value={1} variant="secondary" onClick={handlePets}>
          Pets
        </ToggleButton>
        <ToggleButton value={2} onClick={handleUsers}>
          Users
        </ToggleButton>
      </ToggleButtonGroup>
      <ul className="card-list">
        {usersOrPets === "users"
          ? users.map((user) => {
              return <li key={Math.random()}> <UserCard user={user} setPets={(id) => setPets(id)}/> </li>;
            })
          : pets.map((pet) => {
              return (
                <li key={Math.random()}>
                  <PetCard pet={pet} />
                </li>
              );
            })}
      </ul>
        <ul>
          {chosenUser ? 
          pets.map((pet) => {
            if (pet.ownerId === chosenUser){
              return <li key={Math.random()}> <PetCard pet={pet} /> </li>
            }
          })
          : <></>}
        </ul>
    </div>
  );
}
