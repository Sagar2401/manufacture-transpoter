import { useState } from "react";

export const useProduct = () => {
  const [notification, setNotification] = useState({
    visible: false,
    message: "",
    type: "success",
  });

  const notify = (type, message) => {
    console.log(type, message);
    setNotification({
      visible: true,
      message: message,
      type: type,
    });
  };

  const value = {
    notification,
    setNotification,
    notify,
  };
  return { value };
};
