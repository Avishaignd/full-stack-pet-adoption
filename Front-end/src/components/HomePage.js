import { React, useState, useContext, useEffect } from "react";
import { Button, Navbar, Nav } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SignUp from "./SignUp";
import Login from "./Login";
import Modal from "react-modal";
import ProfileSettings from "./ProfileSettings";
import MyPetPage from "./MyPetPage";
import { myContext } from "./Context";
import Search from "./Search";
import AdminPage from "./AdminPage";
import { postData } from "./api";
import PetPage from "./PetPage";
import LogOutButton from "./LogOutButton";
import EditPet from "./EditPet";


export function HomePage() {
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
  const [SignUpModalIsOpen, setSignUpModalIsOpen] = useState(false);
  const [carouselImages, setCarouselImages] = useState([])

  const {users, pets, currentUser} = useContext(myContext)

  function handleOnLoginClick() {
    setLoginModalIsOpen(true);
  }
  function handleOnSignUpClick() {
    setSignUpModalIsOpen(true);
  }
  function closeLoginModal() {
    setLoginModalIsOpen(false);
  }

  function closeSignUpModal() {
    setSignUpModalIsOpen(false);
  }

  return (
    <div className="container">
      <Router>
        <Navbar
          id="nav-bar"
          bg="dark"
          fixed="top"
          className="justify-content-space-evenly row"
        >
          <Nav id="nav">
            <Link className="links col" to="/">
              Home
            </Link>
            {currentUser && currentUser.isAdmin ? (
              <Link className="links col" to="/AdminPage">
                Admin
              </Link>
            ) : (
              <></>
            )}
            <Link className="links col" to="/MyPetPage">
              My Pets
            </Link>
            <Link className="links col" to="/ProfileSettings">
              Profile Settings
            </Link>
            <Link className="links col" to="/Search">
              Search Pets
            </Link>
          </Nav>
        </Navbar>
        <Switch>
          <Route exact path="/">
            {currentUser ?  <LogOutButton /> : <></>}
            {currentUser ? (
              <h2>
                Welcome back to Home4Pets,{" "}
                {currentUser.firstName + " " + currentUser.lastName}
              </h2>
            ) : (
              <>
                <h2>
                  Welcome to Home4Pets! Do you have an account?
                </h2>
                <div id="home-page-buttons" className="mt-5">
                  <Button variant="primary" onClick={handleOnLoginClick}>
                    Login
                  </Button>
                  <Button variant="primary" onClick={handleOnSignUpClick}>
                    Sign Up
                  </Button>
                </div>
              </>
            )}
            <Modal
              className="modals"
              ariaHideApp={false}
              isOpen={loginModalIsOpen}
              onRequestClose={closeLoginModal}
            >
              <Login />
            </Modal>
            <Modal
              className="modals"
              ariaHideApp={false}
              isOpen={SignUpModalIsOpen}
              onRequestClose={closeSignUpModal}
            >
              <SignUp />
            </Modal>
            {/* <PetsCarousel pets={carouselImages} /> */}
          </Route>
          <Route path="/ProfileSettings">
            <ProfileSettings />
          </Route>
          <Route path="/Search">
            <Search />
          </Route>
          <Route path="/AdminPage">
            <AdminPage />
          </Route>
            <Route path="/MyPetPage">
              <MyPetPage props={currentUser}/>
            </Route>
            <Route path="/Search">
              <Search props={pets}/>
            </Route>
            <Route path="/PetPage/:id">
              <PetPage />
            </Route>
            <Route path="/EditPet/:id">
              <EditPet />
            </Route>
        </Switch>
      </Router>
    </div>
  );
}