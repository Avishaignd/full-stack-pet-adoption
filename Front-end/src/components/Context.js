import React from "react";

export const myPets = [
  {
    image: "../images/DogBG.jpg",
    name: "Ruffus",
    petStatus: "Adopted",
    type: "Dog",
    height: "50 CM",
    weight: "20 KG",
    color: "black",
    hypoallergenic: true,
    dietaryRestrictions: "none",
    breed: "Golden Retriever",
    ownerId: 1,
  },
  {
    image: "../images/DogBG.jpg",
    name: "Skandal",
    petStatus: "Adopted",
    type: "Cat",
    height: "20 CM",
    weight: "10 KG",
    color: "pink",
    hypoallergenic: false,
    dietaryRestrictions: "none",
    breed: "Tiger",
    ownerId: 1,
  },
  {
    image: "../images/DogBG.jpg",
    name: "Simba",
    petStatus: "Not Adopted",
    type: "Cat",
    height: "22 CM",
    weight: "9 KG",
    color: "blue",
    hypoallergenic: false,
    dietaryRestrictions: "none",
    breed: "Lion",
    ownerId: "",
  },
];

export const users = [
  {
    firstName: "John",
    lastName: "Kennedy",
    email: "JFK@gmail.com",
    password: 123456,
    phoneNumber: 972528930725,
    userId: 1,
    isAdmin: true,
    isLoggedIn: true
  },
  {
    firstName: "Mister",
    lastName: "Cobilbal",
    email: "MCB@gmail.com",
    password: 654321,
    phoneNumber: 307297256289,
    userId: 2,
    isAdmin: false,
    isLoggedIn: false
  },
];

export const myContext = React.createContext({
  users: '',
  pets: '',
  currentUser: undefined
})

export const myData = React.createContext({
  myUsers: users,
  myPets: myPets,
});
