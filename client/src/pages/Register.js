import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button, Grid } from "@mui/material";
import toast from "react-hot-toast";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/user/register", {
        username: inputs.name,
        email: inputs.email,
        password: inputs.password,
      });
      if (data.success) {
        navigate("/login");
        toast.success("User Register Successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} md={6}>
            <Box
              maxWidth={450}
              display="flex"
              flexDirection={"column"}
              alignItems="center"
              justifyContent={"center"}
              margin="auto"
              marginTop={5}
              boxShadow="10px 10px 20px #ccc"
              padding={3}
              borderRadius={5}
            >
              <Typography variant="h4" sx={{ textTransform: "uppercase" }} padding={3} textAlign="center">
                Register
              </Typography>
              <TextField
                placeholder="name"
                value={inputs.name}
                onChange={handleChange}
                name="name"
                margin="normal"
                type={"text"}
                required
                fullWidth
              />
              <TextField
                placeholder="email"
                value={inputs.email}
                name="email"
                margin="normal"
                type={"email"}
                required
                fullWidth
                onChange={handleChange}
              />
              <TextField
                placeholder="password"
                value={inputs.password}
                name="password"
                margin="normal"
                type={"password"}
                required
                fullWidth
                onChange={handleChange}
              />
              <Button type="submit" sx={{ borderRadius: 3, marginTop: 3 }} variant="contained" color="primary" fullWidth>
                Submit
              </Button>
              <Button onClick={() => navigate("/login")} sx={{ borderRadius: 3, marginTop: 3 }} fullWidth>
                Already Registered? Please Login
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default Register;
