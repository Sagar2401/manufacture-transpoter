/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Navbar from "../../Components/Navbar/navbar";
import useManufacturer, {
  ManufacturerProvider,
} from "../../Hooks/useManufacturer";
import AddModal from "../Model/addModal";
import ChatList from "../List/List";
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

  return (
    <>
      <Navbar button={true} handleOpenModel={handleOpenModel} />
      <ChatList
        data={data}
        setData={setData}
        getManufacturer={getManufacturer}
      />
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
