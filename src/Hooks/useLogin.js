import axios from "axios";
import React from "react";
import { setCookie } from "../Assets/cookies";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER}api/user/login`,
        {
          email: data.get("email"),
          password: data.get("password"),
        }
      );
      if (response?.data?.status) {
        const userData = response.data.data;
        setCookie("user_token", userData.token, 100);
        setCookie(
          "user_data",
          JSON.stringify({ ...userData, token: undefined }),
          100
        );
        setLoading(false);

        if (userData.isManufacturor) {
          navigate("/manufacturer");
        } else {
          navigate("/transporter");
        }
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return {
    handleSubmit,
    loading,
  };
};

export default useLogin;
