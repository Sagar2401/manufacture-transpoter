import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const url = "http://localhost:5000";
const useRegister = () => {
  const navigate = useNavigate();
  const [value, setValue] = React.useState("manufacturer");
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    setLoading(true);
    try {
      const response = await axios.post(`${url}/api/user/register`, {
        email: data.get("email"),
        password: data.get("password"),
        first_name: data.get("firstName"),
        last_name: data.get("lastName"),
        address: "surat",
        isManufacturor: value === "manufacturer" ? true : false,
      });
      if (response?.data?.status) {
        setLoading(false);

        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      setLoading(false);
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
  };
};

export default useRegister;
