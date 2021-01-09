import "./App.css";
import React from 'react'
import {useEffect, useState} from 'react'
import { HomePage } from "./components/HomePage";
import { myContext } from "./components/Context";
import { getData, setTokens } from "./components/api";
function App() {

  const [allUsers, setAllUsers] = useState([])
  const [allPets, setAllPets] = useState([])
  const [currentUser, setCurrentUser] = useState(undefined)

  if (localStorage.getItem('user') && !currentUser) {
    setCurrentUser(JSON.parse(localStorage.getItem('user')));
  }

  if (allPets.length > 0 && currentUser === undefined){
    setAllPets([])
    setAllUsers([])
  }

    useEffect(() => {
    if (currentUser !== undefined){
      setInterval(() => {
        setTokens('http://localhost:5000/api/users/token', {user: currentUser.email, token: localStorage.getItem('refreshToken')})
      }, 1000 * 60 * 5)
    }
  }, [])


  useEffect(() => {
    getData('http://localhost:5000/api/users')
    .then(response => {
      if (currentUser && currentUser.isAdmin){
        setAllUsers(response)
      }
    })
    getData('http://localhost:5000/api/pets')
    .then(response => {
      setAllPets(response)
    })
  },[])

  

  return (
    <div className="App">
      <myContext.Provider value={{users: allUsers, pets: allPets, currentUser: currentUser}}>
        <HomePage />
      </myContext.Provider>
    </div>
  );
}

export default App;
