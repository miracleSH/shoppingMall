import React, { useEffect } from "react";
import axios from "axios";
import Auth from "../../../hoc/auth";
function LandingPage() {
  useEffect(() => {}, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      시작페이지
    </div>
  );
}

export default Auth(LandingPage, null);
