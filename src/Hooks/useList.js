/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { getCookie } from "../Assets/cookies";
import { io } from "socket.io-client";

export const useList = () => {
  const socket = io(`${process.env.REACT_APP_SERVER}`);

  socket.on("connect", () => {
    console.log("connected");
  });
  const token = getCookie("user_token");
  const userData = JSON.parse(getCookie("user_data"));
  const [notification, setNotification] = useState({
    visible: false,
    message: "",
    type: "success",
  });
  const [search, setSearch] = useState("");
  const [allmessages, setAllMessages] = useState([]);
  const [messages, setMessages] = useState("");
  const [orderData, setOrderData] = useState({});
  useEffect(() => {
    if (userData) {
      socket.emit("add-user", userData._id);
    }
  }, [userData]);

  const handleSendMsg = async (msg) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/message/addmsg",
        {
          order_id: orderData._id,

          message: messages,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      socket.emit("send-msg", {
        to: !userData?.isManufacturor
          ? orderData.created_by
          : orderData.transporter,
        messages,
      });
      if (response?.data?.status) {
        const msgs = [...allmessages];
        msgs.push({ fromSelf: true, message: messages, time: new Date() });
        setAllMessages(msgs);
        setMessages("");
      } else {
        setNotification({
          visible: true,
          message: response?.data?.message,
          type: "error",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllMessages = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER}api/message/getmsg`,
        {
          order_id: orderData._id,
        },
        {
          headers: {
            authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      if (response?.data?.status) {
        setAllMessages([...response.data.data]);
      }
    } catch (error) {}
  };

  // useEffect(() => {
  //   if (socket.current) {
  socket.on("msg-recieve", (msg) => {
    setAllMessages([
      ...allmessages,
      { fromSelf: false, message: msg.messages, time: msg.time },
    ]);
  });
  //   }
  // }, []);

  useEffect(() => {
    getAllMessages();
  }, [orderData]);
  return {
    search,
    setSearch,
    notification,
    setNotification,
    messages,
    setMessages,
    handleSendMsg,
    setOrderData,
    getAllMessages,
    allmessages,
  };
};
