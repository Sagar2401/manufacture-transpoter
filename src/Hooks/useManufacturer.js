import axios from "axios";
import { createContext, useContext, useState } from "react";
import { getCookie } from "../Assets/cookies";

const ctx = createContext();
export const useManufacturer = () => useContext(ctx);

export const ManufacturerProvider = ({ children }) => {
  const token = getCookie("user_token");
  const { address } = JSON.parse(getCookie("user_data"));
  const [notification, setNotification] = useState({
    visible: false,
    message: "",
    type: "success",
  });

  const [open, setOpen] = useState(false);

  const [data, setData] = useState([]);
  const [transData, setTransData] = useState([]);
  const [formData, setFormData] = useState({
    pickup: address,
  });
  const [loading, setLoading] = useState(false);
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
  const addManufacturer = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER}api/manufacturor/add`,
        {
          transporter: formData?.transporter,
          from: formData?.from,
          to: formData?.to,
          quantity: formData?.quantity,
          pickup: formData?.pickup,
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
        setFormData({
          transporter: "",
          from: "",
          to: "",
          quantity: "",
          pickup: address,
        });
        setLoading(false);
        setOpen(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };
  const getTranspoter = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER}api/user/alltranspoter`,
        {
          headers: {
            authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      if (response?.data?.status) {
        setTransData(response?.data?.data);
        setLoading(false);
        setOpen(true);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const handleOpenModel = (data) => {
    getTranspoter();
  };

  return (
    <ctx.Provider
      value={{
        open,
        setOpen,
        getManufacturer,
        addManufacturer,
        loading,
        data,
        setFormData,
        formData,
        handleOpenModel,
        transData,
        notification,
        setNotification,
        setData,
      }}
    >
      {children}
    </ctx.Provider>
  );
};

export default useManufacturer;
