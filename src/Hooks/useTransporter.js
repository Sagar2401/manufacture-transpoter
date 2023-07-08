import axios from "axios";
import { createContext, useContext, useState } from "react";
import { getCookie } from "../Assets/cookies";

const ctx = createContext();
export const useTransporter = () => useContext(ctx);

export const TransporterProvider = ({ children }) => {
  const token = getCookie("user_token");
  const { address } = JSON.parse(getCookie("user_data"));
  const [notification, setNotification] = useState({
    visible: false,
    message: "",
    type: "success",
  });

  const [open, setOpen] = useState(false);

  const [data, setData] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [formData, setFormData] = useState({
    pickup: address,
  });
  const [loading, setLoading] = useState(false);
  //   console.log(userdata);
  const getManufacturer = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER}api/manufacturor`,
        {
          headers: {
            authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      if (response?.data?.status) {
        setData(response.data.data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };
  const AddPrice = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER}api/manufacturor/updatePrice`,
        {
          order_id: currentData?._id,
          price: Number(currentData?.price),
        },
        {
          headers: {
            authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      if (response?.data?.status) {
        setNotification({
          visible: true,
          message: response?.data?.message,
          type: "success",
        });
        getManufacturer();
        setCurrentData({});
        setLoading(false);
        setOpen(false);
      } else {
        setNotification({
          visible: true,
          message: response?.data?.message,
          type: "error",
        });
      }
    } catch (error) {
      setLoading(false);
    }
  };
  const handleAddPrice = (data) => {
    setCurrentData(data);
    setOpen(true);
  };
  console.log(currentData);
  return (
    <ctx.Provider
      value={{
        open,
        setOpen,
        getManufacturer,
        AddPrice,
        loading,
        data,
        setFormData,
        formData,
        notification,
        setNotification,
        setData,
        currentData,
        setCurrentData,
        handleAddPrice,
        AddPrice,
      }}
    >
      {children}
    </ctx.Provider>
  );
};

export default useTransporter;
