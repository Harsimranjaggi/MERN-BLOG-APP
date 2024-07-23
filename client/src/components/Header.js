import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  Typography,
  Tabs,
  Tab,
  Grid
} from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import toast from "react-hot-toast";

const Header = () => {
  // Global state
  let isLogin = useSelector((state) => state.isLogin);
  isLogin=isLogin || localStorage.getItem("userId");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // State
  const [value, setValue] = useState(0); // Initial value for Tabs

  // Logout
  const handleLogout = () => {
    try {
      dispatch(authActions.logout());
      toast.success("Logout Successfully");
      navigate("/login");
      localStorage.clear();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item xs={12} sm={4}>
              <Typography variant="h4">The Daily Muse</Typography>
            </Grid>
            <Grid item xs={12} sm={8} container justifyContent="space-between" alignItems="center">
              <Grid item xs={12} md={6}>
                <Tabs value={value} onChange={(e, val) => setValue(val)} textColor="inherit">
                  <Tab label="Home" LinkComponent={Link} to="/blogs" />
                  {isLogin && <Tab label="My Blogs" LinkComponent={Link} to="/my-blogs" />}
                </Tabs>
              </Grid>
              <Grid item xs={12} md={6} container justifyContent="flex-end" alignItems="center">
                {isLogin ? (
                  <Button onClick={handleLogout} sx={{ margin: 1, color: "white" }}>
                    Logout
                  </Button>
                ) : (
                  <>
                    <Button
                      sx={{ margin: 1, color: "white" }}
                      LinkComponent={Link}
                      to="/login"
                    >
                      Login
                    </Button>
                    <Button
                      sx={{ margin: 1, color: "white" }}
                      LinkComponent={Link}
                      to="/register"
                    >
                      Register
                    </Button>
                  </>
                )}
                {isLogin && (
                  <Button
                    sx={{ margin: 1, color: "white" }}
                    LinkComponent={Link}
                    to="/create-blog"
                  >
                    Create Blog
                  </Button>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
