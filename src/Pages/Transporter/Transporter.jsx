import React, { useEffect } from "react";
import Navbar from "./navbar";
import ChatList from "./List";
import useTransporter, {
  TransporterProvider,
} from "../../Hooks/useTransporter";
import AddPriceModel from "./addPriceModel";

const Transporter = () => {
  const {
    data,

    setData,
    getManufacturer,
    handleAddPrice,
  } = useTransporter();

  console.log("handleAddPrice");
  useEffect(() => {
    setData([]);
    getManufacturer();
  }, []);
  return (
    <>
      <Navbar />
      <ChatList data={data} handleAddPrice={handleAddPrice} />
      <AddPriceModel />

      {/* <Toast notification={notification} setNotification={setNotification} /> */}
    </>
  );
};

export const Wrapper = () => (
  <TransporterProvider>
    <Transporter />
  </TransporterProvider>
);

export default Wrapper;
