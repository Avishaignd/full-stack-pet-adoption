import React from "react";
import { Button } from "react-bootstrap";
import Cookies from 'js-cookie'
export default function LogOutButton() {

  const handleLogOut = () => {
    localStorage.clear();
    Cookies.remove("")
    window.location.reload();
  };

  return (
    <Button id="log-out" onClick={handleLogOut}>
      Log Out
    </Button>
  );
}
