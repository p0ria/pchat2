import React, { useState } from 'react';
import "./TextInput.scss";


export default ({label, error, ...props}: any) => {
  const [focus, setFocus] = useState(false);
  return (
    <div className={`TextInput ${error ? 'error' : ''} ${focus ? 'focus' : ''}`}>
      <div className="TextInput-Label">
        {label}:
      </div>
      <div className="TextInput-Border">
        <input className="TextInput-Input" type="text"
          onFocus={() => setFocus(true)} 
          onBlur={() => setFocus(false)}
          {...props} />
        <div className="TextInput-Error">
          {error}
        </div>
      </div> 
    </div>
  )
}