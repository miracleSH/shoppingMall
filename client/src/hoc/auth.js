import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../_actions/user_action";
import { useNavigate } from "react-router-dom";

export default function (SpecificComponent, option, adminRoute = null) {
  //option정의
  //null => 아무나 출입 가능 페이지
  //true => 로그인한 유저만 출입 가능 페이지
  //false => 로그인한 유저는 출입 불가능한 페이지

  const AuthenticationCheck = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
      dispatch(auth()).then((_res) => {
        console.log(_res);
        //로그인 되어 있지 않은 상태
        if (!_res.payload.isAuth) {
          if (option) {
            navigate("/login");
          }
        } else {
          //로그인한 상태
          if (adminRoute && _res.payload.isAdmin) {
            navigate("/");
          } else {
            if (!option) {
              navigate("/");
            }
          }
        }
      });
    }, []);
    return <SpecificComponent />;
  };
  return AuthenticationCheck;
}
