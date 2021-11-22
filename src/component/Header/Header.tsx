import React, { FunctionComponent } from "react";
import "./header.css";
import { Link } from "react-router-dom";

export const Header: FunctionComponent<any> = ({ logo = "Header" }) => {
  const sourceLogo = require('../../assets/img/logo.png');
  return (
    <nav>
      <div className="logo">
        <span>LOGO</span>
      </div>
      <div className="menu-header">
        <Link to="/">Home</Link>
        {/* <Link to="/about">About</Link> */}
        <Link to="/movie">Movie List</Link>
      </div>
    </nav>
  );
};
