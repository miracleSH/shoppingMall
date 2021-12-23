import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { registerUser } from "../../../_actions/user_action";
function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [samePassword, setSamePassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (password !== samePassword) {
      setErrorMessage("안맞음");
      return;
    }

    let body = {
      name: name,
      email: email,
      password: password,
    };

    dispatch(registerUser(body)).then((response) => {
      if (response.payload.registerSuccess) {
        navigate("/login");
      } else {
        alert("회원가입 실패");
      }
    });
  };

  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onSamePasswordHandler = (event) => {
    setSamePassword(event.currentTarget.value);
  };
  return (
    <div className="flex">
      <h1>회원가입</h1>
      <form onSubmit={onSubmitHandler} className="flex flex-col">
        <label>이름</label>
        <input className="border-2" type="text" value={name} onChange={onNameHandler} />
        <label>이메일</label>
        <input className="border-2" type="email" value={email} onChange={onEmailHandler} />
        <label>비밀번호</label>
        <input className="border-2" type="password" value={password} onChange={onPasswordHandler} />
        <label>비밀번호 확인</label>
        <input className="border-2" type="password" value={samePassword} onChange={onSamePasswordHandler} />
        <p>{errorMessage}</p>
        <br />
        <button className="border-2" type="submit" onSubmit={onSubmitHandler}>
          회원가입
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
