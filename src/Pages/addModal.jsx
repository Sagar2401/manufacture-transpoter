import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import useManufacturer from "../Hooks/useManufacturer";
import { getCookie } from "../Assets/cookies";
const countries = [
  {
    value: "USA",
    label: "USA",
  },
  {
    value: "EUR",
    label: "EUR",
  },
  {
    value: "BTC",
    label: "BTC",
  },
  {
    value: "JPY",
    label: "JPY",
  },
];
const quantity = [
  {
    value: 1,
    label: "1 Ton",
  },
  { value: 2, label: "2 Ton" },
  { value: 3, label: "3 Ton" },
  { value: 4, label: "4 Ton" },
  { value: 5, label: "5 Ton" },
  { value: 6, label: "6 Ton" },
  { value: 7, label: "7 Ton" },
];
const AddModal = ({ open, setOpen }) => {
  const { address } = JSON.parse(getCookie("user_data"));

  const { addManufacturer, setFormData, formData } = useManufacturer();

  return (
    <Dialog className={"root"} maxWidth="md" open={true}>
      <DialogTitle
        className={"padding"}
        sx={{
          borderBottom: "1px  solid",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        Add New Data
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
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  label="From"
                  id="from"
                  onChange={(e) =>
                    setFormData({ ...formData, from: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  label="To"
                  id="to"
                  onChange={(e) =>
                    setFormData({ ...formData, to: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  style={{ marginTop: 20 }}
                  label="Quantity"
                  fullWidth
                  select
                  variant="outlined"
                  value={formData.quantity || quantity[0].value}
                  id="quantity"
                  margin="dense"
                  helperText="Please select your quantity"
                  onChange={(e) =>
                    setFormData({ ...formData, quantity: e.target.value })
                  }
                >
                  {quantity.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  style={{ marginTop: 20 }}
                  label="Transportar"
                  fullWidth
                  select
                  variant="outlined"
                  value={formData.transportar || countries[0].value}
                  id="transportar"
                  margin="dense"
                  helperText="Please select your Transportar"
                  onChange={(e) =>
                    setFormData({ ...formData, transporter: e.target.value })
                  }
                >
                  {countries.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  margin="dense"
                  multiline
                  variant="outlined"
                  label="pickup"
                  id="additional-info"
                  value={address}
                  disabled
                  onChange={(e) =>
                    setFormData({ ...formData, pickup: address })
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
        <Button onClick={addManufacturer}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddModal;
