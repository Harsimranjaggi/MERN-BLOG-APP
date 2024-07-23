import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Collapse from "@mui/material/Collapse";


  export default function BlogCard({
    title,
    description,
    image,
    username,
    time,
    id,
    isUser,
  }) {
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState(false);
  
    const handleExpandClick = () => {
      setExpanded(!expanded);
    };
  
    const handleEdit = () => {
      navigate(`/blog-details/${id}`);
    };
  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`/api/v1/blog/delete-blog/${id}`);
      if (data?.success) {
        
        window.location.reload();
       toast.success("Blog Deleted");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "550px",
        margin: "10px auto",
        padding: 2,
        boxShadow: "5px 5px 10px #ccc",
        ":hover:": {
          boxShadow: "10px 10px 20px #ccc",
        },
      }}
    >
      {isUser && (
        <Box display="flex" justifyContent="space-between">
          <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
            <ModeEditIcon color="info" />
          </IconButton>
          <IconButton onClick={handleDelete} >
            <DeleteIcon color="error" />
          </IconButton>
        </Box>
      )}
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {username}
          </Avatar>
        }
        title={username}
        subheader={time}
      />
      <CardMedia
        component="img"
        height="auto"
        image={image}
        alt="Paella dish"
        sx={{ maxHeight: "400px" }}
      />
     <CardContent sx={{ display: "flex", flexDirection: "column" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6" color="text.secondary" sx={{ textAlign: "justify" }}>
              {title}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" color="text.secondary" sx={{ textAlign: "justify" }}>
              {expanded ? description : `${description.substring(0, 100)}...`}
            </Typography>
            {/* Conditionally render Expand buttons based on expanded state */}
            {!expanded && (
              <IconButton onClick={handleExpandClick} aria-expanded={expanded}>
                <ExpandMoreIcon />
              </IconButton>
            )}
            {expanded && (
              <IconButton onClick={handleExpandClick} aria-expanded={expanded}>
                <ExpandLessIcon />
              </IconButton>
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
