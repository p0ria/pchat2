import React, { useState, createRef } from "react";
import "./LoginPage.scss";
import TextInput from "../../components/TextInput/TextInput";
import LogoText from "../../components/Logo-Text/Logo-Text";
import Button, { ButtonKind } from "../../components/Button/Button";
import { validateEmail } from "../../commons/string-utilities";
import { useSelector, useDispatch } from "react-redux";
import { selectUiState } from "../../state/login/login.selectors";
import { LoginUiState } from "../../state/login/login.state";
import call, { Api } from "../../services/api";

export default () => {
  const uiState:LoginUiState = useSelector(selectUiState);
  const dispatch = useDispatch();
  const [emailError, setEmailAddressError] = useState<string | null>();
  const emailRef = createRef<HTMLInputElement>();
  const handleEmailSubmit = async () => {
    const email = emailRef.current?.value;
    if(!email) {
      setEmailAddressError('Email can not be empty');
    } else if(!validateEmail(email)) {
      setEmailAddressError('Email is invalid');
    } else {
      // dispatch(loginGenerateCode(emailAddress));
      let r = await call(Api.getVerificationCode, {url: `${email}`});
      console.log(r);
    }
  }
  const handleEnter = (e: KeyboardEvent) => {
    const ENTER = 13;
    if(e.which === ENTER) {
      handleEmailSubmit();
    }
  }
  return (
    <div className="LoginPage">
      <div className="LoginPage-Left">
        <div className="LoginPage-Left__Welcome">
          Welcome to <LogoText fontSize={24} /> Application
        </div>
        <div className="LoginPage-Left__Inputs">
          <div className="Dialog EmailAddress-Dialog active">
            <TextInput label="Please enter your email address" 
              placeholder="email@address.com" 
              error={emailError}
              onKeyDown={handleEnter}
              ref={emailRef} onChange={(_: any) => setEmailAddressError(null)} />
            <Button kind={ButtonKind.Success}
              onClick={handleEmailSubmit}>Submit</Button>  
          </div>
          <div className="Dialog VerificationCode-Dialog">
            {uiState}
          </div>
        </div>
      </div>
      <div className="LoginPage-Right">
        
      </div>
    </div>
  )
}