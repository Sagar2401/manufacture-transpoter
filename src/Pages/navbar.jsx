import React from "react";
import "./navbar.css";
import { getCookie } from "../Assets/cookies";
import { Button } from "@mui/material";

const Navbar = ({ setOpen }) => {
  const userdata = JSON.parse(getCookie("user_data"));

  return (
    <div className="navbar">
      <span className="name">Hello {userdata.first_name}</span>
      <Button sx={{ color: "white" }} onClick={() => setOpen(true)}>
        Add New Data
      </Button>
    </div>
  );
};

export default Navbar;
