import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import React from "react";
import useTransporter from "../../Hooks/useTransporter";
// import "./modal.css";
const AddPriceModel = () => {
  const { open, AddPrice, currentData, setOpen, setCurrentData } =
    useTransporter();

  return (
    <Dialog className={"root"} maxWidth="md" open={open}>
      <DialogTitle
        className={"padding"}
        sx={{
          borderBottom: "1px  solid",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        Add Price
      </DialogTitle>
      <DialogContent className={"padding"}>
        <Grid container sx={{ padding: "20px 10px" }}>
          <Grid item xs={12}>
            <Grid
              container
              direction="row"
              className={"mainContent"}
              spacing={3}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "20px 10px",
                  gap: "10px",
                }}
              >
                <div>
                  Order ID : <span>{currentData?._id}</span>
                </div>
                <div>
                  From : <span>{currentData?.from}</span>
                </div>
                <div>
                  To : <span>{currentData?.to}</span>
                </div>
                <div>
                  Quantity : <span>{currentData?.quantity}</span>
                </div>
                <div>
                  Pickup : <span>{currentData?.pickup}</span>
                </div>
              </div>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  label="Price"
                  type="number"
                  onChange={(e) =>
                    setCurrentData({ ...currentData, price: e.target.value })
                  }
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions
        sx={{
          display: "flex",
          alignItems: "end",
        }}
      >
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button onClick={AddPrice}>Add price</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddPriceModel;
