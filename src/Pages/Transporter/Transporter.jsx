import React, { useEffect } from "react";
import Navbar from "../../Components/Navbar/navbar";
import ChatList from "../List/List";
import useTransporter, {
  TransporterProvider,
} from "../../Hooks/useTransporter";
import AddPriceModel from "../Model/addPriceModel";

const Transporter = () => {
  const {
    data,

    setData,
    getManufacturer,
    handleAddPrice,
  } = useTransporter();

  // useEffect(() => {
  //   setData([]);
  //   getManufacturer();
  // }, []);
  return (
    <>
      <Navbar />
      <ChatList
        data={data}
        setData={setData}
        getManufacturer={getManufacturer}
        handleAddPrice={handleAddPrice}
      />
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
