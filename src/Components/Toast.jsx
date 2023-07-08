import { Alert, Snackbar } from "@mui/material";
import React from "react";

export const Toast = ({ notification, setNotification }) => {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setNotification({ ...notification, visible: false });
  };
  return (
    <Snackbar
      open={notification.visible}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        type={notification.type}
        sx={{ width: "100%" }}
      >
        {notification.message}
      </Alert>
    </Snackbar>
  );
};
