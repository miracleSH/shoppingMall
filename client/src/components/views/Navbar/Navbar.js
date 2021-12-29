import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useDispatch, useStore } from "react-redux";
import { Link } from "react-router-dom";
import { auth } from "../../../_actions/user_action";

function Navbar(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /**
   * state 부분
   */
  const [isLogin, setIsLogIn] = useState(false);
  const [userName, setUserName] = useState("");

  /**
   * 로그인 시 유저 이름을 나타나게 하는 부분
   * ! 로그인을 하면 redux를 통해 상태가 변하게 되고 이를 감지해 navbar.js도 랜더링이 된다.
   */

  dispatch(auth()).then((_res) => {
    if (_res.payload.isAuth) {
      setIsLogIn(true);
      setUserName(_res.payload.name);
    } else {
      setIsLogIn(false);
    }
  });

  /**
   * 로그아웃 클릭 메소드
   */
  const onClickHandler = () => {
    axios.get("/api/users/logout").then((_res) => {
      if (_res.data.success) {
        setUserName("");
        navigate("/login");
      } else alert("로그아웃 실패");
    });
  };

  /**
   * 랜더링되는 부분
   */
  return (
    <div className="absolute h-10 inset-x-0 top-0 bg-black">
      <div className="container mx-auto">
        <ul className="mt-2">
          <li>
            <button className="items-center float-right font-bold text-white" onClick={onClickHandler}>
              로그아웃
            </button>
          </li>
          <li className="items-center mr-10 float-right font-bold text-white">
            {isLogin ? <span>{userName}</span> : <Link to={"/login"}>로그인</Link>}
          </li>
          <li>
            <Link className="items-center mr-10 float-right" to={"/product/upload"}>
              <span className="font-bold text-white">상품등록</span>
            </Link>
          </li>
          <li>
            <Link className="items-center mr-10 float-right" to={"/register"}>
              <span className="font-bold text-white">회원가입</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
