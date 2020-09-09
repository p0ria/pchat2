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
const heartVariants = {
  rest: {
    opacity: [.4, 0],
    x: [-5, 5],
    y: [0, -50],
    transition: {
      delay: 5,
      duration: 2,
      repeat: Infinity,
      repeatDelay: 10
    }
  }
}
const VERIFICATION_TIME = 99;
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
        <motion.svg id="heart"
          variants={heartVariants}
          initial={false}
          animate="rest"
          preserveAspectRatio="xMidYMid meet"
          viewBox="383.28261964559726 213.13837531406716 36 27.039999999999992"
          width="32" height="23.04" fill="red">
          <path d="M386.09 217.08C385.57 217.6 384.86 218.7 384.63 219.32C384.28 220.3 384.19 221.3 384.39 221.93C384.83 223.26 386.2 224.96 388.6 227.15C390.12 228.52 390.79 229.07 394.78 232.25C398.67 235.35 399.64 236.2 400.1 236.87C400.11 236.89 400.18 236.99 400.31 237.18C400.38 237.04 400.42 236.97 400.43 236.95C400.7 236.49 401.57 235.79 405.66 232.7C411.16 228.54 412.46 227.43 414.13 225.51C415.72 223.69 416.36 222.31 416.28 220.89C416.16 219.09 415.2 217.49 413.44 216.19C410.89 214.31 406.98 213.67 403.54 214.57C402.71 214.78 401.64 215.21 400.93 215.61C400.88 215.64 400.67 215.76 400.29 215.97C400.16 215.89 400.08 215.85 400.07 215.84C398.86 215.11 397.39 214.57 395.93 214.33C395.47 214.25 393.94 214.12 393.69 214.14C393.63 214.15 393.29 214.17 392.94 214.2C390.21 214.39 387.74 215.43 386.09 217.08Z" />
        </motion.svg>
      </div>
    </div>
  )
}