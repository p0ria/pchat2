import React, { useState, createRef, useEffect } from "react";
import "./LoginPage.scss";
import TextInput from "../../components/TextInput/TextInput";
import LogoText from "../../components/Logo-Text/Logo-Text";
import Button, { ButtonKind } from "../../components/Button/Button";
import { validateEmail } from "../../commons/string-utilities";
import { useSelector, useDispatch } from "react-redux";
import { selectUiState, selectLoginError, selectEmailAddress } from "../../state/login/login.selectors";
import { LoginUiState } from "../../state/login/login.state";
import { loginVerifyCode, loginByEmail } from "../../state/login/login.actions";
import Spinner from "react-spinner";
import CheckMark from "../../components/CheckMark/CheckMark";
import { motion, AnimatePresence } from "framer-motion";
import { useHistory } from "react-router-dom";
import GoogleBtn from "../../components/GoogleBtn/GoogleBtn";

const dialogVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: .5 }
  },
  exit: {
    opacity: 0,
    x: '-100vw',
    transition: { ease: 'easeInOut', duration: .5 }
  }
}

export default () => {
  const loginEmail = useSelector(selectEmailAddress) as string;
  const uiState: LoginUiState = useSelector(selectUiState);
  const loginError = useSelector(selectLoginError);
  const dispatch = useDispatch();
  const [error, setError] = useState<string | null>();
  const emailRef = createRef<HTMLInputElement>();
  const codeRef = createRef<HTMLInputElement>();
  const history = useHistory();
  useEffect(() => {
    if(uiState === 'verified') {
      setTimeout(() => history.push("/"), 5000);
    }
  }, [uiState])

  const handleEmailSubmit = async () => {
    const email = emailRef.current?.value;
    if (!email) {
      setError('Email can not be empty');
    } else if (!validateEmail(email)) {
      setError('Email is invalid');
    } else {
      dispatch(loginByEmail(email));
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
      case "verified":
        return renderVerified();
      case "loading":
        return renderSpinner();
    }
  };

  const rendererGenerate = () => (
    <motion.div key="0" className="Dialog EmailAddress-Dialog"
      variants={dialogVariants}
      initial="false"
      animate="visible"
      exit="exit"
    >
      <TextInput label="Please enter your email address"
        placeholder="email@address.com"
        error={error}
        onKeyDown={handleEnter}
        ref={emailRef}
        onChange={(_: any) => setError(null)} />
      <Button kind={ButtonKind.Success}
        onClick={handleEmailSubmit}>Submit</Button>
      {renderOAuth()}
    </motion.div>
  );

  const renderOAuth = () => {
    return (
      <div className="Login-OAuth">
        <div className="Login-OAuth__Or">or</div>
        <GoogleBtn />
      </div>
    )
  }

  const renderVerify = () => (
    <motion.div key="1" className="Dialog VerificationCode-Dialog"
      variants={dialogVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <TextInput label={`Please enter the verification code sent to ${loginEmail}`}
        placeholder="(Verification code)"
        error={error}
        onKeyDown={handleEnter}
        ref={codeRef}
        onChange={(_: any) => setError(null)} />
      <Button kind={ButtonKind.Success}
        onClick={handleCodeSubmit}>Submit</Button>
    </motion.div>
  );

  const renderVerified = () => (
    <div className="Dialog Verified-Dialog">
      <CheckMark />
    </div>
  );

  const renderSpinner = () => (
    <motion.div className="Login-Spinner"
      variants={dialogVariants}
      initial={false}
      animate="visible"
      exit="exit"
    >
      <Spinner />
    </motion.div>
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
          <AnimatePresence exitBeforeEnter>
            {renderSwitch()}
          </AnimatePresence>
          {renderError()}
        </div>
      </div>
      <div className="LoginPage-Right">
      </div>
    </div>
  )
}