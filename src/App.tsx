import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Header } from "./component/Header/Header";
import About from "./pages/About/About.page";
import Home from "./pages/Home/Home.page";

const HomePage = lazy(() => import('./pages/Home/Home.page'));
const AboutPage = lazy(() => import('./pages/About/About.page'));

const LoginPage = lazy(() => import('./pages/Auth/Login/Login.page'));

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Suspense fallback={() => <div>Loading.....</div>}>
          <div>
            <Header></Header>

            <Routes>
              {/* Lazy Routing */}
              <Route path="/" element={<HomePage />}></Route>
              <Route path="/about" element={<AboutPage />}></Route>
              <Route path="/login" element={<LoginPage />}></Route>
              
              {/* <Route path="/" element={<Home />}></Route>
              <Route path="/about" element={<About />}></Route> */}
            </Routes>
          </div>
        </Suspense>
      </Router>
    );
  }
}
