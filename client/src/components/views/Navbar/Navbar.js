import React from "react";
import axios from "axios";
import { useNavigate } from "react-router";
function Navbar() {
  const navigate = useNavigate();

  const onClickHandler = () => {
    axios.get("/api/users/logout").then((_res) => {
      if (_res.data.success) navigate("/login");
      else alert("로그아웃 실패");
    });
  };

  return (
    <div id="main-navbar">
      <button onClick={onClickHandler}>로그아웃</button>
    </div>
  );
}

export default Navbar;
