import React from "react";
import { Outlet } from "react-router-dom";
import Profile from "../Profile/Profile";

import classes from './Root.module.css';


const RootLayout = (props) => {
  return (
    <div className={classes.display}>
      <Profile />
      <Outlet />
    </div>
  );
};

export default RootLayout;