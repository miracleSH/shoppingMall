import React, { useEffect } from "react";
import axios from "axios";
import Auth from "../../../hoc/auth";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
function LandingPage() {
  useEffect(() => {}, []);
  return (
    <div className="container">
      <Navbar></Navbar>
      <Footer></Footer>
    </div>
  );
}

export default Auth(LandingPage, null);
