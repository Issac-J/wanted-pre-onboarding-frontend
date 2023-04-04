import React, { useEffect, useState } from "react";

import "./SignIn.css";

const SignIn = () => {
  // Values
  const [email, setEmail] = useState("");
  const [password, setPaassword] = useState("");

  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [isDisableButton, setDisableButton] = useState(true);

  useEffect(() => {
    if (validEmail && validPassword) setDisableButton(false);
    else setDisableButton(true);
  }, [validEmail, validPassword]);

  // Event
  const onChangeEmail = (event) => {
    setEmail(event.target.value);

    const regexEmail = /@/; // @ 를 검사하기 위한 정규식

    if (regexEmail.test(email)) setValidEmail(true);
    else setValidEmail(false);
  };

  const onChangePassword = (event) => {
    setPaassword(event.target.value);

    const regexPassword = /^[\w]{8,}/; // 8자리 이상인지를 검사하기 위한 정규식

    if (regexPassword.test(password)) setValidPassword(true);
    else setValidPassword(false);
  };

  return (
    <div className="contentWrap">
      <div className="contentName">이메일과 비밀번호를 입력해주세요</div>

      {/* Email */}
      <div className="content">
        <div className="inputTitle">이메일 주소</div>
        <input
          className="inputEmail"
          name="email"
          type="email"
          placeholder="example@example.com"
          defaultValue={email}
          onChange={onChangeEmail}
          data-testid="email-input"
        />
        <div className="errorMessage">
          {!validEmail && email.length > 0 && "올바른 이메일을 입력해주세요."}
        </div>

        {/* Password */}

        <div className="inputTitle">비밀번호</div>
        <input
          className="inputPassword"
          name="password"
          type="password"
          placeholder="8자리 이상"
          defaultValue={password}
          onChange={onChangePassword}
          data-testid="password-input"
        />
        <div className="errorMessage">
          {!validPassword &&
            password.length > 0 &&
            "8자리 이상 비밀번호를 입력해주세요."}
        </div>

        {/* ConfirmButton */}
        <button
          className="confirmButton"
          disabled={isDisableButton}
          data-testid="signin-button"
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default SignIn;
