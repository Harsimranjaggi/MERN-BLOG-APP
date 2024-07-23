import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Button, InputLabel, TextField, Typography, Grid } from "@mui/material";
import toast from "react-hot-toast";

const CreateBlog = () => {
  const id = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
  });

  // Input change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/blog/create-blog", {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: id,
      });
      if (data?.success) {
        navigate("/my-blogs");
        toast.success("Blog Created");
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
              border={3}
              borderRadius={10}
              padding={3}
              boxShadow={"10px 10px 20px #ccc"}
              display="flex"
              flexDirection="column"
              marginTop="30px"
            >
              <Typography
                variant="h3"
                textAlign="center"
                fontWeight="bold"
                padding={3}
                color="gray"
              >
                Create A Blog
              </Typography>
              <InputLabel sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}>
                Title
              </InputLabel>
              <TextField
                name="title"
                value={inputs.title}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                required
                fullWidth
              />
              <InputLabel sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}>
                Description
              </InputLabel>
              <TextField
                name="description"
                value={inputs.description}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                multiline
                rowsMin={4}
                required
                fullWidth
              />
              <InputLabel sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}>
                Image URL
              </InputLabel>
              <TextField
                name="image"
                value={inputs.image}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                required
                fullWidth
              />
              <Button type="submit" color="primary" variant="contained" fullWidth>
                SUBMIT
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default CreateBlog;
