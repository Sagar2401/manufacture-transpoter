import * as React from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { LoadingButton } from "@mui/lab";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import useRegister from "../../Hooks/useRegister";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import { Radio, RadioGroup, Switch } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export default function SignUp() {
  const { handleSubmit, value, handleChange, loading } = useRegister();
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "10px",
              }}
            >
              Register as:
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={value}
                onChange={handleChange}
                sx={{ display: "flex", flexDirection: "row" }}
              >
                <FormControlLabel
                  value="manufacturer"
                  control={<Radio />}
                  label="Manufacturer"
                />
                <FormControlLabel
                  value="transporter"
                  control={<Radio />}
                  label="Transporter"
                />
              </RadioGroup>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>

            {value === "manufacturer" && (
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="address"
                  label="Address"
                  type="address"
                  id="address"
                  autoComplete="new-address"
                />
              </Grid>
            )}
          </Grid>
          <LoadingButton
            type="submit"
            fullWidth
            loading={loading}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </LoadingButton>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
