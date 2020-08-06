import React, { useState, createRef } from "react";
import "./LoginPage.scss";
import TextInput from "../../components/TextInput/TextInput";
import LogoText from "../../components/Logo-Text/Logo-Text";
import Button, { ButtonKind } from "../../components/Button/Button";
import { validateEmail } from "../../commons/string-utilities";
import { useSelector, useDispatch } from "react-redux";
import { selectUiState } from "../../state/login/login.selectors";
import { loginGenerateCode } from "../../state/login/login.action";
import { LoginUiState } from "../../state/login/login.state";

export default () => {
  const uiState:LoginUiState = useSelector(selectUiState);
  const dispatch = useDispatch();
  const [emailAddressError, setEmailAddressError] = useState<string | null>();
  const emailAddressRef = createRef<HTMLInputElement>();
  const handleEmailAddressSubmit = () => {
    const emailAddress = emailAddressRef.current?.value;
    if(!emailAddress) {
      setEmailAddressError('Email can not be empty');
    } else if(!validateEmail(emailAddress)) {
      setEmailAddressError('Email is invalid');
    } else {
      dispatch(loginGenerateCode(emailAddress));
    }
  }
  const handleEnter = (e: KeyboardEvent) => {
    const ENTER = 13;
    if(e.which === ENTER) {
      handleEmailAddressSubmit();
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
              error={emailAddressError}
              onKeyDown={handleEnter}
              ref={emailAddressRef} onChange={(_: any) => setEmailAddressError(null)} />
            <Button kind={ButtonKind.Success}
              onClick={handleEmailAddressSubmit}>Submit</Button>  
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