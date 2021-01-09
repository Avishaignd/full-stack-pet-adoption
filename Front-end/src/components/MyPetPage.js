import { React, useContext, useEffect, useState } from "react";
import PetCard from "./PetCard";
import { myContext } from "./Context";
import LogOutButton from "./LogOutButton";

export default function MyPetPage(props) {
  const { pets, currentUser } = useContext(myContext);
  const [userPets, setUserPets] = useState([]);
  useEffect(() => {
    const myFilter = (pet) => {
      return currentUser._id === pet.ownerId;
    };
    setUserPets(pets.filter(myFilter));
  }, []);

  return (
    <>
    <LogOutButton />
      <div id="my-pet-cards">
        {userPets.map((pet) => (
          <PetCard key={Math.random()} pet={pet} />
        ))}
      </div>
    </>
  );
}
