import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import About from "./pages/About/About.page";
import Home from "./pages/Home/Home.page";

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <h1>Welcome to My Ap</h1>
        
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/about" element={<About />}>
            </Route>
          </Routes>
        </div>
      </Router>
    );
  }
}