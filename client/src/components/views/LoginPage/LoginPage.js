import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { loginUser } from "../../../_actions/user_action";
import Auth from "../../../hoc/auth";
const LoginPage = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    let body = {
      email: email,
      password: password,
    };
    dispatch(loginUser(body)).then((response) => {
      if (response.payload.loginSuccess) {
        navigate("/");
      } else {
        alert("error");
      }
    });
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <form className="flex flex-col" onSubmit={onSubmitHandler}>
        <label>Email</label>
        <input className="border-2" type="email" value={email} onChange={onEmailHandler} />
        <label>Password</label>
        <input className="border-2" type="password" value={password} onChange={onPasswordHandler} />
        <br />
        <button className="rounded border-2">로그인</button>
      </form>
    </div>
  );
};

export default Auth(LoginPage, false);
