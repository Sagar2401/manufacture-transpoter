import React from "react";
import "./navbar.css";
import { getCookie } from "../../Assets/cookies";
import { Button } from "@mui/material";

const Navbar = ({ handleOpenModel, button }) => {
  const userdata = JSON.parse(getCookie("user_data"));

  return (
    <div className="navbar">
      <span className="name">Hello {userdata.first_name}</span>
      {button && (
        <Button sx={{ color: "white" }} onClick={handleOpenModel}>
          Add New Data
        </Button>
      )}
    </div>
  );
};

export default Navbar;
