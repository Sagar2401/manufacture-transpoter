import React, { useEffect } from "react";
import Navbar from "./navbar";
import useManufacturer from "../Hooks/useManufacturer";
import AddModal from "./addModal";

export const Manufacturer = () => {
  const { open, setOpen, getManufacturer } = useManufacturer();

  useEffect(() => {
    console.log("hello");
    getManufacturer();
  }, []);

  return (
    <>
      <Navbar setOpen={setOpen} />
      <AddModal open={open} setOpen={setOpen} />
    </>
  );
};
