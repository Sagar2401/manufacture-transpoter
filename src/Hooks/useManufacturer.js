import axios from "axios";
import { useState } from "react";
import { getCookie } from "../Assets/cookies";
const url = "http://localhost:5000";
const useManufacturer = () => {
  const token = getCookie("user_token");
  const { address } = JSON.parse(getCookie("user_data"));

  const [open, setOpen] = useState(false);

  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    pickup: address,
  });
  const [loading, setLoading] = useState(false);
  //   console.log(userdata);
  const getManufacturer = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${url}/api/manufacturor`, {
        headers: {
          authorization: token ? `Bearer ${token}` : "",
        },
      });
      console.log(response?.data);
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
        `${url}/api/manufacturor/add`,
        {
          transporter: formData?.transportar,
          from: formData?.from,
          to: formData?.to,
          quntity: formData?.quantity,
          pickup: formData?.pickup,
        },
        {
          headers: {
            authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      console.log(response?.data);
      if (response?.data?.status) {
        setData(response.data.data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };
  console.log({ formData });
  return {
    open,
    setOpen,
    getManufacturer,
    addManufacturer,
    loading,
    data,
    setFormData,
    formData,
  };
};

export default useManufacturer;
