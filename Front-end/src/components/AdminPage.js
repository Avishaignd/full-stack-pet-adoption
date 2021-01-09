import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AddPet from "./AddPet";
import AdminDashboard from "./AdminDashboard";
import { Navbar, Nav } from "react-bootstrap";

export default function AdminPage() {
  return (
    <div>
      <Router>
        <Navbar
          id="nav-bar"
          bg="dark"
          //fixed="top"
          className="justify-content-space-evenly row mt-5"
        >
          <Nav id="nav">
            <Link className="links col-6" to="/AddPet">
              Add a pet
            </Link>
            <Link className="links col-6" to="/Dashboard">
              Dashboard
            </Link>
          </Nav>
        </Navbar>
        <Switch>
          <Route path="/AddPet">
            <AddPet />
          </Route>
          <Route path="/Dashboard">
            <AdminDashboard />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
