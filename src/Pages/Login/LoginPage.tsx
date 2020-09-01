import React, { useState, createRef } from "react";
import "./LoginPage.scss";
import TextInput from "../../components/TextInput/TextInput";
import LogoText from "../../components/Logo-Text/Logo-Text";
import Button, { ButtonKind } from "../../components/Button/Button";
import { validateEmail } from "../../commons/string-utilities";
import { useSelector, useDispatch } from "react-redux";
import { selectUiState, selectLoginError, selectEmailAddress } from "../../state/login/login.selectors";
import { LoginUiState } from "../../state/login/login.state";
import { loginGetVerificationCode, loginVerifyCode } from "../../state/login/login.actions";
import Spinner from "react-spinner";
import CheckMark from "../../components/CheckMark/CheckMark";

export default () => {
  const loginEmail = useSelector(selectEmailAddress) as string;
  const uiState: LoginUiState = useSelector(selectUiState);
  const loginError = useSelector(selectLoginError);
  const dispatch = useDispatch();
  const [error, setError] = useState<string | null>();
  const emailRef = createRef<HTMLInputElement>();
  const codeRef = createRef<HTMLInputElement>();

  const handleEmailSubmit = async () => {
    const email = emailRef.current?.value;
    if (!email) {
      setError('Email can not be empty');
    } else if (!validateEmail(email)) {
      setError('Email is invalid');
    } else {
      dispatch(loginGetVerificationCode(email));
    }
  };

  const handleCodeSubmit = async () => {
    const code = codeRef.current?.value;
    if (!code) {
      setError('Verification code can not be empty');
    } else {
      dispatch(loginVerifyCode(loginEmail, code));
    }
  };

  const handleEnter = (e: KeyboardEvent) => {
    const ENTER = 13;
    if (e.which === ENTER) {
      if (uiState === "generate")
        handleEmailSubmit();
      else if (uiState === "verify")
        handleCodeSubmit();
    }
  };

  const renderSwitch = () => {
    switch (uiState) {
      case "generate":
        return rendererGenerate();
      case "verify":
        return renderVerify();
      case "generating":
      case "verifying":
        return renderSpinner();
    }
  };

  const rendererGenerate = () => (
    <div className="Dialog EmailAddress-Dialog active">
      <TextInput label="Please enter your email address"
        placeholder="email@address.com"
        error={error}
        onKeyDown={handleEnter}
        ref={emailRef}
        onChange={(_: any) => setError(null)} />
      <Button kind={ButtonKind.Success}
        onClick={handleEmailSubmit}>Submit</Button>
    </div>
  );

  const renderVerify = () => (
    <div className="Dialog VerificationCode-Dialog">
      <TextInput label="Please enter the verification code sent to your email"
        placeholder="(Verification code)"
        error={error}
        onKeyDown={handleEnter}
        ref={codeRef}
        onChange={(_: any) => setError(null)} />
      <Button kind={ButtonKind.Success}
        onClick={handleCodeSubmit}>Submit</Button>
    </div>
  );

  const renderSpinner = () => (
    <Spinner />
  );

  const renderError = () => (
    <div className={`Login-Error ${loginError ? 'error' : ''}`}>
      {loginError}
    </div>
  );

  return (
    <div className="LoginPage">
      <div className="LoginPage-Left">
        <div className="LoginPage-Left__Welcome">
          Welcome to <LogoText fontSize={24} /> Application
        </div>
        <div className="LoginPage-Left__Inputs">
          {renderSwitch()}
          {renderError()}
        </div>
      </div>
      <div className="LoginPage-Right">
        <CheckMark />
      </div>
    </div>
  )
}