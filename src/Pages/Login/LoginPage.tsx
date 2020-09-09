import React, { useState, createRef, useEffect, useReducer, useContext } from "react";
import "./LoginPage.scss";
import TextInput from "../../components/TextInput/TextInput";
import LogoText from "../../components/Logo-Text/Logo-Text";
import Button, { ButtonKind } from "../../components/Button/Button";
import { validateEmail } from "../../commons/string-utilities";
import { useSelector, useDispatch } from "react-redux";
import { selectUiState, selectLoginError, selectEmailAddress, selectResent } from "../../state/login/login.selectors";
import { LoginUiState } from "../../state/login/login.state";
import { loginVerifyCode, loginByEmail, loginGetVerificationCode, loginResendVerificationCode } from "../../state/login/login.actions";
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
const timerVariants = {
  visible: {
    x: 0,
    y: 0,
    scale: 1,
    opacity: 1
  },
  heartbit: {
    x: 0,
    y: 0,
    scale: [1.2, .9],
    opacity: 1,
    fontWeight: 900,
    transition: {
      scale: {
        yoyo: Infinity
      }
    }
  },
  exit: {
    x: [-5, 5, -4, 4, -3, 3, -2, 2, -1, 1, 0],
    y: -100,
    opacity: 0,
    scale: 1,
    fontWeight: 500,
    transition: {
      duration: 1
    }
  }
}
const redoVariants = {
  hidden: {
    scale: 2,
    textShadow: "0 2px 4px rgba(0, 0, 0, .5)"
  },
  visible: {
    scale: 1,
    textShadow: "0 2px 4px rgba(0, 0, 0, .3)"
  },
  hover: {
    scale: 1.2,
    rotate: -20,
    transition: { type: 'spring', stiffness: 300, damping: 5 }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: .1
    }
  },
  visible2: {
    scale: 1.2,
    textShadow: "0 2px 4px rgba(0, 0, 0, .3)",
    rotate: -20,
    transition: { type: 'spring', stiffness: 300, damping: 5 }
  },
  exit2: {
    scale: .2,
    rotate: [0, 1000],
    opacity: 0,
    transition: {
      duration: .5
    }
  }
}
const VERIFICATION_TIME = 10;
const TIMER_DANGER_THRESHOLD = 30;
let verificationInterval: any;
export default () => {
  const stateEmail = useSelector(selectEmailAddress) as string;
  const uiState: LoginUiState = useSelector(selectUiState);
  const loginError = useSelector(selectLoginError);
  const dispatch = useDispatch();
  const [error, setError] = useState<string | null>();
  const emailRef = createRef<HTMLInputElement>();
  const codeRef = createRef<HTMLInputElement>();
  const history = useHistory();
  const [verificationTimer, setVerificationTimer] = useState(VERIFICATION_TIME);
  const [resent, setResent] = useState(false);
  const stateResent = useSelector(selectResent);

  useEffect(() => {
    if (uiState === 'verified') {
      setTimeout(() => history.push("/"), 5000);
    }
    if (uiState === 'verify') {
      resetTimer();
    }
  }, [uiState])

  useEffect(() => {
    !verificationTimer && verificationInterval && clearInterval(verificationInterval);
  }, [verificationTimer]);

  useEffect(() => {
    if (stateResent) {
      setResent(true);
      setTimeout(() => {
        resetTimer();
        setResent(false);
      }, 100)
    }
  }, [stateResent])

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
      dispatch(loginVerifyCode(stateEmail, code));
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

  const resendCode = () => {
    dispatch(loginResendVerificationCode());
  }

  const resetTimer = () => {
    setVerificationTimer(VERIFICATION_TIME);
    if (verificationInterval) clearInterval(verificationInterval);
    verificationInterval = setInterval(() => {
      setVerificationTimer(a => a - 1);
    }, 1000)
  }

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
        autoFocus="true"
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
      <div className="VerificationCode-Input">
        <TextInput label={`Please enter the verification code sent to ${stateEmail}`}
          placeholder="(Verification code)"
          error={error}
          onKeyDown={handleEnter}
          ref={codeRef}
          onChange={(_: any) => setError(null)} />
        <AnimatePresence exitBeforeEnter>
          {verificationTimer ?
            <motion.label className={`${verificationTimer < TIMER_DANGER_THRESHOLD ? 'danger' : ''}`}
              key={1}
              variants={timerVariants}
              initial={resent ? 'exit' : false}
              animate={verificationTimer < TIMER_DANGER_THRESHOLD ? 'heartbit' : 'visible'}
              exit="exit"
            >{verificationTimer}
            </motion.label> :
            <>
              {!resent ?
                <motion.label className="redo 1"
                  key={2}
                  variants={redoVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  exit="fastexit"
                  onClick={() => resendCode()}
                >
                  <i className="fa fa-undo"></i>
                </motion.label>
                :
                <motion.label className="redo 2"
                  key={3}
                  variants={redoVariants}
                  initial="visible2"
                  animate="visible2"
                  exit="exit2"
                >
                  <i className="fa fa-undo"></i>
                </motion.label>
              }
            </>
          }
        </AnimatePresence>
      </div>
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