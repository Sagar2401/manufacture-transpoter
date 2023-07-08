import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const useRegister = () => {
  const [notification, setNotification] = useState({
    visible: false,
    message: "",
    type: "success",
  });
  const navigate = useNavigate();
  const [value, setValue] = React.useState("manufacturer");
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER}api/user/register`,
        {
          email: data.get("email"),
          password: data.get("password"),
          first_name: data.get("firstName"),
          last_name: data.get("lastName"),
          address:
            value === "manufacturer" ? data.get("address") : "no address",
          isManufacturor: value === "manufacturer" ? true : false,
        }
      );
      if (response?.data?.status) {
        setLoading(false);
        setNotification({
          visible: true,
          message: response?.data?.message,
          type: "success",
        });
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        setNotification({
          visible: true,
          message: response?.data?.message,
          type: "error",
        });
      }
    } catch (error) {
      setLoading(false);
      setNotification({
        visible: true,
        message: "something went wrong",
        type: "error",
      });
    }
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return {
    handleSubmit,
    value,
    handleChange,
    loading,
    notification,
    setNotification,
  };
};

export default useRegister;
