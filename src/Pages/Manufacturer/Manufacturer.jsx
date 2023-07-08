/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Navbar from "./navbar";
import useManufacturer, {
  ManufacturerProvider,
} from "../../Hooks/useManufacturer";
import AddModal from "./addModal";
import ChatList from "./List";
import { Toast } from "../../Components/Toast";

const Manufacturer = () => {
  const {
    open,
    setOpen,
    getManufacturer,
    handleOpenModel,
    notification,
    setNotification,
    setData,
    data,
  } = useManufacturer();

  useEffect(() => {
    setData([]);
    getManufacturer();
  }, []);
  console.log(11);

  return (
    <>
      <Navbar button={true} handleOpenModel={handleOpenModel} />
      <ChatList data={data} />
      <AddModal open={open} setOpen={setOpen} />
      <Toast notification={notification} setNotification={setNotification} />
    </>
  );
};

export const Wrapper = () => (
  <ManufacturerProvider>
    <Manufacturer />
  </ManufacturerProvider>
);

export default Wrapper;
