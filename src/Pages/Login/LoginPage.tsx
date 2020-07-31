import React, { useState } from "react";
import "./LoginPage.scss";
import TextInput from "../../components/TextInput/TextInput";
import LogoText from "../../components/Logo-Text/Logo-Text";

export default (props: any) => {
  const [phoneNumberError, setPhoneNumberError] = useState<string>();
  return (
    <div className="LoginPage">
      <div className="LoginPage-Left">
        <div className="LoginPage-Left__Welcome">
          Welcome to <LogoText fontSize={24} /> Application
        </div>
        <div className="LoginPage-Left__Inputs">
          <div className="Dialog PhoneNumber-Dialog active">
            <TextInput label="Please enter your phone number" 
              placeholder="09xxxxxxxxx" 
              error={phoneNumberError} />
          </div>
          <div className="Dialog VerificationCode-Dialog">

          </div>
        </div>
      </div>
      <div className="LoginPage-Right">
        
      </div>
    </div>
  )
}